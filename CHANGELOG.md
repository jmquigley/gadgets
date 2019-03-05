# Changelog

## v0.0.65
#### Enhancements:

- Updated to latest quill-markup plugin

#### Bug Fixes:

N/A

---

## v0.0.64
#### Enhancements:

- Added the util.treeitem module directly into Treeview component.
- The project style is now managed by [prettier](https://prettier.io/)
- Upgraded project to Jest 24 to take advantage of babel7 tranform of typescript tests without other plugins
- Webpack tranpilation is now done by babel with the typescript compiler only performing type checking.
- Treeview component now uses [GeneralTree](https://github.com/jmquigley/util.ds/blob/master/docs/lib/generaltree.md) in the [util.ds](https://github.com/jmquigley/util.ds) module to manage data.

#### Bug Fixes:

- Fixed a problem with enzyme to json snapshot generation by making object depth shallow.  The Treeview component can have circular references that would break testing.

---
