/**
 * This module contains all of the code to create and manipulate the TreeData
 * structure used by a Treeview react control in the gadgets library.
 *
 */

"use strict";

import {nl} from "util.constants";
import {Queue} from "util.ds";
import logger from "util.log";
import {getUUID, nilEvent} from "util.toolbox";

const log = logger.instance({
	debug: process.env.NODE_ENV !== "production",
	namespace: "TreeData",
	nofile: true
});

export type TreeId = string | number;

export interface TreeItem {
	id?: TreeId;
	data?: any;
	parent?: TreeItem;

	title?: any;
	subtitle?: any;
	expanded?: boolean;
	children?: TreeItem[];
}

export interface TreeIndex {
	[key: string]: TreeItem;
}

export type WalkCallback = (val: TreeItem) => void;

const nullParent: TreeItem = {
	id: null,
	data: null,
	parent: null,
	title: "",
	subtitle: "",
	expanded: true,
	children: []
};

export class TreeData {
	private _treeData: TreeItem[];
	private _treeIndex: TreeIndex = {};

	/**
	 * Creates an instance of the TreeData class.  When the data is loaded via
	 * the constructor the full tree is traversed and the nodes are sanitized.
	 * All of the parent/child keys are set if they are not available.
	 *
	 * @contructor
	 * @param treeData {TreeItem[]} the data that represents the current general
	 * tree.  This field is mandatory when instantiating the class.
	 * @param _testing {boolean} set to true when this class is under
	 * test.  This is needed to generate predicatble keys instead of UUID values.
	 * @param _sequence {number} the starting sequence number in key generation
	 * when the class is under test.
	 * @param _defaultTitle {string} the default string loadeed into
	 * the TreeItem.title field when a new node is created or sanitized.
	 * @param _useindex {boolean} turns on a map index of the node values
	 * that are loaded into the tree.  Used for a fast id lookup.
	 * @param _usesanitize {boolean} when new nodes are processed by
	 * the walk function each node is checked by default to ensure parent/child
	 * keys are set and all fields are in the TreeItem.
	 */
	constructor(
		treeData: TreeItem[],
		private readonly _testing: boolean = false,
		private _sequence: number = 0,
		private _defaultTitle: string = "default",
		private readonly _useindex: boolean = true,
		private readonly _usesanitize: boolean = true
	) {
		this.treeData = treeData;
	}

	get defaultTitle(): string {
		return this._defaultTitle;
	}

	set defaultTitle(val: string) {
		this._defaultTitle = val;
	}

	get sequence(): number {
		return this._sequence;
	}

	set sequence(val: number) {
		this._sequence = val;
	}

	get testing(): boolean {
		return this._testing;
	}

	get treeData(): TreeItem[] {
		return this._treeData;
	}

	set treeData(val: TreeItem[]) {
		this._treeData = val;

		if (val != null) {
			this.walk(nilEvent);
		}
	}

	get treeIndex(): TreeIndex {
		return this._treeIndex;
	}

	set treeIndex(val: TreeIndex) {
		this._treeIndex = val;
	}

	get useindex(): boolean {
		return this._useindex;
	}

	get usesanitize(): boolean {
		return this._usesanitize;
	}

	/**
	 * Creates a new node object with default properties.
	 * @param parentNode {TreeItem }a parent node associated with this instance
	 * @return {TreeItem} a new node instance reference
	 */
	public createNode(parentNode: TreeItem = null): TreeItem {
		return {
			children: [],
			expanded: true,
			id: this.getNewKey(),
			data: "",
			parent: parentNode == null ? nullParent : parentNode,
			subtitle: "",
			title: this._defaultTitle
		};
	}

	/**
	 * Performs a breadth search of the tree for a matching id value.
	 * @param id {string} the id value to search for
	 * @return {TreeItem} of the item found otherwise null
	 */
	public find(id: TreeId): TreeItem {
		const q = new Queue<TreeItem>();

		if (this.treeData == null || this.treeData.length < 1) {
			log.warn("treeData is empty");
			return null;
		}

		if (this._useindex && id in this._treeIndex) {
			return this._treeIndex[id];
		}

		let children: TreeItem[] = this.treeData;
		let item: TreeItem = null;

		do {
			for (const child of children) {
				// save the current list into the Q
				q.enqueue(child);
			}

			item = q.dequeue();
			if (item.id === id) {
				// If found, get rid of all remaining q items and return
				q.drain();

				if (this.useindex) {
					this._treeIndex[item.id] = item;
				}

				return item;
			} else {
				children = item.children;
			}
		} while (q.size > 0);

		return null; // no item found
	}

	/**
	 * Generates a new unique key for a node.  When the testing flag is set
	 * to true, then the id is an ordered sequence.  This is done to make
	 * the keys predictable when the code is under test.
	 * @return {string} the new key value.
	 */
	public getNewKey(): TreeId {
		if (this._testing) {
			return this.sequence++;
		}

		return getUUID();
	}

	/**
	 * Takes an input node and ensures that it has all possible fields.	 It
	 * also creates the node key value if one does not exist.
	 * @param node {TreeItem} the node to fix
	 * @return {TreeItem} a referece back of the node that was sanitized
	 */
	public sanitize(node: TreeItem): TreeItem {
		if (!("parent" in node)) {
			node["parent"] = nullParent;
		}

		if (!("id" in node) || node["id"] == null) {
			node["id"] = this.getNewKey();
		}

		if (!("title" in node) || node["title"] == null) {
			node["title"] = this._defaultTitle;
		}

		if (!("subtitle" in node)) {
			node["subtitle"] = "";
		}

		if (!("expanded" in node)) {
			node["expanded"] = true;
		}

		if (!("data" in node)) {
			node["data"] = null;
		}

		if (!("children" in node)) {
			node["children"] = [];
		}

		return node;
	}

	/**
	 * Prints the internals of the current tree.  It will print the id, the
	 * parent id, and the title for each node.
	 * @return {string} a string representing the tree structure.
	 */
	public toString(): string {
		let s: string = `TreeData:${nl}`;

		s += `testing: ${this._testing}${nl}`;
		s += `sequence: ${this._sequence}${nl}`;
		s += `defaultTitle: ${this._defaultTitle}${nl}`;
		s += `useindex: ${this._useindex}${nl}`;
		s += `usesanitize: ${this._usesanitize}${nl}`;

		this.walk((it: TreeItem) => {
			let parentId: TreeId = "";
			if (it.parent != null) {
				parentId = it.parent.id;
			}

			s += `title: ${it.title}, id: ${
				it.id
			}, parent.id: ${parentId}${nl}`;
		});

		return s;
	}

	/**
	 * Performs an inorder traversal of the current tree.  At each node
	 * a callback function is executed and the node being processed
	 * is given as a parameter.
	 * @param fn {WalkCallback} a callback function invoked on each
	 * node as it is encountered.
	 * @return {TreeeItem[]} a reference to the tree structure that was
	 * processed.
	 */
	public walk(fn: WalkCallback): TreeItem[] {
		if (fn == null || typeof fn !== "function") {
			log.warn("walk() parameter must be a function");
			return null;
		}

		if (this._treeData == null) {
			log.warn("treeData is empty on call to walk()");
			return null;
		}

		// creates a binding to this for preorder call that will
		// have its own .this pointer not related to the class.
		const self: TreeData = this;
		if (this._useindex) {
			this._treeIndex = {};
		}

		function preorder(arr: TreeItem[]) {
			for (let it of arr) {
				it = self.usesanitize ? self.sanitize(it) : it;

				if (self._useindex) {
					self._treeIndex[it.id] = it;
				}

				fn(it);

				if ("children" in it && it.children.length > 0) {
					for (const child of it.children) {
						child["parent"] = it;
					}

					preorder(it.children);
				}
			}
		}

		preorder(this._treeData);
		return this._treeData;
	}
}
