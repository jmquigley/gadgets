module.exports = {
	bail: true,
	collectCoverage: true,
	coveragePathIgnorePatterns: [
		"<rootDir>/bin/",
		"<rootDir>/__tests__/helpers",
		"<rootDir>/node_modules"
	],
	moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
	moduleNameMapper: {
		"\\.(css|style)$": "identity-obj-proxy",
		"^dnd-core$": "dnd-core/dist/cjs",
		"^react-dnd$": "react-dnd/dist/cjs",
		"^react-dnd-html5-backend$": "react-dnd-html5-backend/dist/cjs",
		"^react-dnd-touch-backend$": "react-dnd-touch-backend/dist/cjs",
		"^react-dnd-test-backend$": "react-dnd-test-backend/dist/cjs",
		"^react-dnd-test-utils$": "react-dnd-test-utils/dist/cjs"
	},
	notify: false,
	setupFiles: [
		"<rootDir>/jest.setup.js",
		"<rootDir>/bin/workaround.js",
		"<rootDir>/bin/setupEnzyme.js",
		"<rootDir>/bin/setupDOM.js"
	],
	setupFilesAfterEnv: ["<rootDir>/bin/setupTestEnv.js"],
	testEnvironment: "jest-environment-jsdom-fourteen",
	testPathIgnorePatterns: [
		"<rootDir>/bin/",
		"<rootDir>/dist",
		"<rootDir>/__tests__/helpers",
		"<rootDir>/node_modules"
	],
	verbose: true
};
