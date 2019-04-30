# Changelog


## v0.0.66
#### Enhancements:

- Added a new property `direction` to Treeview to allow the search toolbar to be on the top or bottom of the component.
- Added the spinner option to the [TextField](https://github.com/jmquigley/gadgets/blob/master/docs/lib/textField/TextField.md) component.
- Input components now show a blue outline when they receive focus
- Adds the following new components to the library:
  - [Datagrid](https://github.com/jmquigley/gadgets/blob/master/docs/lib/datagrid/Datagrid.md)
  - [Preview](https://github.com/jmquigley/gadgets/blob/master/docs/lib/preview/Preview.md)
  - [TextArea](https://github.com/jmquigley/gadgets/blob/master/docs/lib/textArea/TextArea.md)

#### Bug Fixes:

- Fixed event call signature on all components for typescript checking.
- Removed unnecessary cloneDeep calls for all default prop initializers.
- Fixed a problem where tags could not be removed from tagList.

---

## v0.0.65
#### Enhancements:

- Updated to latest quill-markup plugin
- Changed from travisci to circleci for automated build/testing
- Added circleci workflow to handle deployment of NPM artifacts when a new tag is pushed to a commit.
- The Treeview component now adds a new, empty, default node when the tree becomes empty.  This ensures that the tree will always have one node.
- Changed jest tests to "--runInBand" for Circle CI resource concerns.

#### Bug Fixes:

- Fixed a bug in Treeview control where new node would have a blank title.  They now use the defaultTitle prop

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
