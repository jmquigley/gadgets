import {defaultSize} from "./base";
import {Sizes} from "./sizing";

test("Testing creation of the Sizing object with default", () => {
	const sizes = Sizes.instance(defaultSize);
	expect(sizes).toBeDefined();
	expect(typeof sizes.toString()).toBe("string");
	expect(sizes).toMatchSnapshot();
});

test("Testing creation of the Sizing object with size 24", () => {
	const sizes = Sizes.instance(24);
	expect(sizes).toBeDefined();
	expect(typeof sizes.toString()).toBe("string");
	expect(sizes).toMatchSnapshot();
});

// TODO: add tests for proving size calculations
