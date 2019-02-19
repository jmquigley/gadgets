"use strict";

import * as path from "path";
import {nl} from "util.constants";
import {Fixture} from "util.fixture";
import {join} from "util.join";
import logger from "util.log";
import {cleanup} from "../shared/testing/helpers";
import {TreeData} from "./TreeData";
import {TreeItem} from "./Treeview";

const log = logger.instance({
	debug: process.env.NODE_ENV !== "production",
	namespace: "treeitem.test"
});
const testing: boolean = true;

afterAll((done) => {
	cleanup(path.basename(__filename), done);
});

test("Test using an empty TreeData structure", () => {
	const td = new TreeData(null);
	expect(td).toBeDefined();

	const it: TreeItem = td.find(22);
	expect(it).toBeNull();
});

test("Test the getNewKey function", () => {
	const td = new TreeData(null, true);
	expect(td).toBeDefined();
	expect(td.testing).toBe(true);
	expect(td.defaultTitle).toBe("default");
	expect(td.treeData).toBeNull();
	expect(td.getNewKey()).toBe(0);
	expect(td.getNewKey()).toBe(1);
	expect(td.getNewKey()).toBe(2);
});

test("Test the create node function", () => {
	const td = new TreeData(null, true);
	expect(td).toBeDefined();

	td.defaultTitle = "test title";

	const node = td.createNode();
	expect(node).toBeDefined();
	expect(node).toHaveProperty("id");
	expect(node).toHaveProperty("data");
	expect(node).toHaveProperty("parent");
	expect(node).toHaveProperty("title");
	expect(node).toHaveProperty("subtitle");
	expect(node).toHaveProperty("expanded");
	expect(node).toHaveProperty("children");

	expect(node.title).toBe("test title");
	expect(node.subtitle).toBe("");
	expect(node.expanded).toBe(true);
	expect(node.id).toBe(0);
	expect(node.parent).toBeDefined();
	expect(node.data).toBe("");
	expect(node.children).toBeInstanceOf(Array);
	expect(node.children.length).toBe(0);
});

test("Test the create node function with parent object", () => {
	const td = new TreeData(null, true);
	expect(td).toBeDefined();

	const parentNode = td.createNode(null);
	const node = td.createNode(parentNode);

	expect(node).toBeDefined();
	expect(node).toHaveProperty("id");
	expect(node).toHaveProperty("data");
	expect(node).toHaveProperty("parent");
	expect(node).toHaveProperty("title");
	expect(node).toHaveProperty("subtitle");
	expect(node).toHaveProperty("expanded");
	expect(node).toHaveProperty("children");

	expect(node.title).toBe("default");
	expect(node.subtitle).toBe("");
	expect(node.expanded).toBe(true);
	expect(node.id).toBe(1);
	expect(node.parent).toBeDefined();
	expect(node.parent.id).toBe(0);
	expect(node.data).toBe("");
	expect(node.children).toBeInstanceOf(Array);
	expect(node.children.length).toBe(0);
});

test("Test the sanitize function", () => {
	const td = new TreeData(null, true);
	expect(td).toBeDefined();

	const it: TreeItem = td.sanitize({});

	expect(it).toHaveProperty("id");
	expect(it).toHaveProperty("data");
	expect(it).toHaveProperty("parent");
	expect(it).toHaveProperty("title");
	expect(it).toHaveProperty("subtitle");
	expect(it).toHaveProperty("expanded");
	expect(it).toHaveProperty("children");
});

test("Test the walk function on a basic TreeItem fixture object", () => {
	const fixture = new Fixture("basic", {
		fixtureDirectory: join(__dirname, "fixtures")
	});
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const td = new TreeData(fixture.obj["treeData"]);
	expect(td).toBeDefined();
	expect(td.toString()).toBeDefined();
	expect(typeof td.toString()).toBe("string");

	// Walk through the tree.  Concatenate the title values together
	// to create a string that can be compared for ordering
	let out: string = "";
	td.walk((it: TreeItem) => {
		out += `${it.title} `;
	}, false);
	out = out.trim();

	expect(out).toBeDefined();
	expect(out).toBe("1.0 1.1 1.2 1.3 2.0 2.1 2.2 2.3 3.0 3.1 3.2 3.3");

	log.debug("%s", td.toString());
});

test("Call walk function with bad callback", () => {
	const fixture = new Fixture("basic", {
		fixtureDirectory: join(__dirname, "fixtures")
	});
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const td = new TreeData(fixture.obj["treeData"]);
	expect(td).toBeDefined();

	const treeData: TreeItem[] = td.walk(null);
	expect(treeData).toBeNull();
});

test("Call walk function with null treeData", () => {
	const td = new TreeData(null);
	expect(td).toBeDefined();
	expect(td.treeData).toBeNull();

	const treeData: TreeItem[] = td.walk((it: TreeItem) => {});
	expect(treeData).toBeNull();
});

test("Test searching for an id within the tree", () => {
	const fixture = new Fixture("search", {
		fixtureDirectory: join(__dirname, "fixtures")
	});
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const td = new TreeData(fixture.obj["treeData"]);
	expect(td).toBeDefined();
	td.treeIndex = {};

	// Parent item from tree, found
	expect("4" in td.treeIndex).not.toBe(true);
	let it: TreeItem = td.find(4);
	expect(it).toBeDefined();
	expect(it.title).toBe("2.0");
	expect(it.expanded).toBe(true);
	expect(it.children.length).toBe(3);
	expect(it.parent.id).toBeNull();

	// Search for child in tree, found
	it = td.find(9);
	expect(it).toBeDefined();
	expect(it.title).toBe("3.1");
	expect(it.expanded).toBe(true);
	expect(it.children.length).toBe(0);
	expect(it.parent.id).toBe(8);

	// Item should not be found in the tree
	it = td.find(127);
	expect(it).toBeNull();

	// Call previous id value to show that it uses the index
	expect("4" in td.treeIndex).toBe(true);
	it = td.find(4);
	expect(it).toBeDefined();
	expect(it.title).toBe("2.0");
	expect(it.expanded).toBe(true);
	expect(it.children.length).toBe(3);
	expect(it.parent.id).toBeNull();
});

test("Test using the current TreeData index to find values", () => {
	const fixture = new Fixture("search", {
		fixtureDirectory: join(__dirname, "fixtures")
	});
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const td = new TreeData(fixture.obj["treeData"]);
	expect(td).toBeDefined();
	expect(td.treeIndex).toBeDefined();
	expect(td.treeIndex[0].title).toBe("1.0");
	expect(td.treeIndex[3].title).toBe("1.3");
	expect(td.treeIndex[9].title).toBe("3.1");
});

test("Test turning off TreeData index and showing a value is not in the list", () => {
	const fixture = new Fixture("search", {
		fixtureDirectory: join(__dirname, "fixtures")
	});
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const td = new TreeData(
		fixture.obj["treeData"],
		true,
		0,
		"default",
		false, // turn off indexing
		true
	);
	expect(td).toBeDefined();
	expect(td.treeIndex).toBeDefined();
	expect(td.treeIndex).not.toContain(0);
	expect(td.treeIndex).not.toContain(3);
	expect(td.treeIndex).not.toContain(9);
});
