import assert from "power-assert";
import {parseKeyCombo} from "./keybinding";

test("try to parse an empty combo", () => {
	const keyCombo = parseKeyCombo(null);
	assert(keyCombo);

	assert(keyCombo.altKey === false);
	assert(keyCombo.ctrlKey === false);
	assert(keyCombo.key === "");
	assert(keyCombo.metaKey === false);
	assert(keyCombo.shiftKey === false);
});

test("parse key combination with just a key value", () => {
	const keyCombo = parseKeyCombo("Home");
	assert(keyCombo);

	assert(keyCombo.altKey === false);
	assert(keyCombo.ctrlKey === false);
	assert(keyCombo.key === "HOME");
	assert(keyCombo.metaKey === false);
	assert(keyCombo.shiftKey === false);
});

test("parse key combination with alt plus key value", () => {
	const keyCombo = parseKeyCombo("alt+LeftArrow");
	assert(keyCombo);

	assert(keyCombo.altKey);
	assert(keyCombo.ctrlKey === false);
	assert(keyCombo.key === "LEFTARROW");
	assert(keyCombo.metaKey === false);
	assert(keyCombo.shiftKey === false);
});

test("parse key combination with ctrl plus key value", () => {
	const keyCombo = parseKeyCombo("ctrl+LeftArrow");
	assert(keyCombo);

	assert(keyCombo.altKey === false);
	assert(keyCombo.ctrlKey);
	assert(keyCombo.key === "LEFTARROW");
	assert(keyCombo.metaKey === false);
	assert(keyCombo.shiftKey === false);
});

test("parse key combination with meta plus key value", () => {
	const keyCombo = parseKeyCombo("meta+LeftArrow");
	assert(keyCombo);

	assert(keyCombo.altKey === false);
	assert(keyCombo.ctrlKey === false);
	assert(keyCombo.key === "LEFTARROW");
	assert(keyCombo.metaKey);
	assert(keyCombo.shiftKey === false);
});

test("parse key combination with multiple parts", () => {
	const keyCombo = parseKeyCombo("ctrl+alt+shift+LeftArrow");
	assert(keyCombo);

	assert(keyCombo.altKey);
	assert(keyCombo.ctrlKey);
	assert(keyCombo.key === "LEFTARROW");
	assert(keyCombo.metaKey === false);
	assert(keyCombo.shiftKey);
});
