// This is a workaround shim for React 16 and running jest test cases
// Without this shim the following warning message occurs:
//
// Warning: React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. http://fb.me/react-polyfills
// https://github.com/facebook/jest/issues/4545
//
// This is loaded as part of the jest configuration within package.json.  It is
// addd to the "setupFiles" which are executed before each test file in
// package.json
//
// ...
// "setupFiles": [
//     "<rootDir>/bin/workaround.js",
// ],
// ...
//

(global as any).requestAnimationFrame = (callback: any) => {
	setTimeout(callback, 0);
};
