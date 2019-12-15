import {createSerializer} from "enzyme-to-json";

expect.addSnapshotSerializer(
	createSerializer({
		noKey: true,
		mode: "shallow"
	}) as any
);

// Increases the default testing timout from 5s to 20s for long running
// tests (such as the dynamic list error test)
jest.setTimeout(20 * 1000); // 20 second timeout
