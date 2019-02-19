/**
 * The treeData is an array of `TreeItem` nodes.  A `TreeItem` node is a
 * dictionary that contains the following properties:
 *
 * - `id {string}` - a unique id/key value for the node
 * - `parent {TreeItem}` - reference to the parent node, where the id of the
 *    parent is `parent.id`
 * - `data {any}` - a variable to hold any data associated with the node
 *    (can hold any type of data)
 * - `title {string}` - a string that represents the title displayed on the
 *    Treeview component
 * - `subtitle {string}` - sub string below the main title.
 * - `expanded {boolean}` - a boolean flag that determines if the children of
 *    this node are displayed
 * - `children {TreeItem[]}` - an array of `TreeItem` nodes attached to this
 *  node.
 *
 * An example of this data structure is:
 *
 *     [
 *         {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]},
 *         {title: "string", subtitle: "string", expanded: "boolean", children: [
 *             {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]},
 *             {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]}
 *         ]}
 *         ...
 *     ]
 *
 * This is the structure of a [general tree](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_1.htm),
 * where each node can have an arbitrary number of *children*.
 *
 * # Usage
 *
 * Create an instance of the `TreeData` class, where the constructor is an array
 * of `TreeItem` nodes (shown above).  The resulting instance is then used to
 *  interact with the data.  To create a simple instance:
 *
 * ```javascript
 * import {TreeData, TreeItem} from "util.treeitem";
 *
 * const data: TreeItem[] = [
 *     {id: 0, title: "1.0", children: [{id: 3, title: "1.1", children[]}]}
 *     {id: 1, title: "2.0", children: []}
 *     {id: 2, title: "3.0", children: []}
 * ];
 *
 * const td = new TreeData(data);
 * ```
 *
 * Once the instance is created the tree can be searched by `id` values using
 * the `find` function:
 *
 * ```javascript
 * let it: TreeItem = td.find(1);
 *
 * // it -> {id: 1, title: "2.0", children: []}
 * ```
 *
 * The tree can also be traversed in order with the `walk` function:
 *
 * ```javascript
 * td.walk((node: TreeItem) => {
 *     log.info('node: %O', node);
 * });
 * ```
 *
 * The `walk` function will visit each node in the tree in order invoking a
 * callback function as each node is encountered.  The callback receives a
 * reference to each node.  If the `useindex` property is set when the class
 * is created, which it is by default, then an id-to-node index is created.
 * The `treeIndex` property can be used to quickly find a node by its index:
 *
 * ```javascript
 * let it: TreeItem = td.treeIndex[2];
 *
 * // it -> {id: 2, title: "3.0", children: []}
 * ```
 *
 * # API
 * - [TreeData (class)](docs/lib/treeview/TreeData.md#TreeData)
 * - [TreeData (new)](docs/lib/treeview/TreeData.md#new_TreeData_new)
 *
 * ### properties
 * - `defaultTitle {string} ('default')` - the default string loaded into the
 *   TreeItem.title field when a new node is created or sanitized (when the
 *   title is empty).
 * - `sequence {number} (0)` - the starting sequence number in key generation
 *   when the class is under test
 * - `testing {boolean} (false)` - set to true when this class is under test.
 *   This is needed to generate predicatble keys instead of UUID values.
 * - `treeData {TreeItem[]}` - the data that represents the current general tree
 * - `treeIndex {TreeIndex}` - a key/node value pair used to quickly look up a
 *   node by its unique id value.
 * - `useindex {boolean} (true)` - turns on node indexing when walking the tree
 *   or finding nodes
 * - `usesanitize {boolean} (true)` - if true, then run sanitization on nodes
 *   when walking the tree.  This ensures that all of the parent/child key
 *   relationships are in place and that all valid TreeItem fields are in the
 *   objects (with default values if they are missing).
 *
 * ### methods
 * - [.createNode()](docs/lib/treeview/TreeData.md#TreeData+createNode)
 * - [.find()](docs/lib/treeview/TreeData.md#TreeData+find)
 * - [.getNewKey()](docs/lib/treeview/TreeData.md#TreeData+getNewKey)
 * - [.sanitize()](docs/lib/treeview/TreeData.md#TreeData+sanitize)
 * - [.toString()](docs/lib/treeview/TreeData.md#TreeData+toString)
 * - [.walk()](docs/lib/treeview/TreeData.md#TreeData+walk)
 *
 * @module TreeData
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
