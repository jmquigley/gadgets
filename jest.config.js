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
		"\\.(css|style)$": "identity-obj-proxy"
	},
	notify: false,
	setupFiles: [
		"<rootDir>/jest.setup.js",
		"<rootDir>/bin/workaround.js",
		"<rootDir>/bin/setupEnzyme.js",
		"<rootDir>/bin/setupDOM.js"
	],
	setupFilesAfterEnv: ["<rootDir>/bin/setupTestEnv.js"],
	testPathIgnorePatterns: [
		"<rootDir>/bin/",
		"<rootDir>/dist",
		"<rootDir>/__tests__/helpers",
		"<rootDir>/node_modules"
	],
	verbose: true
};
