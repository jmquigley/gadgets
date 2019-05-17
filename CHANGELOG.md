# Changelog

## v0.0.68
#### Enhancements:

- Added the [react-hotkeys]() library to the module to handle keyboard interactions for the following components:
  - [Browser](https://github.com/jmquigley/gadgets/blob/master/docs/lib/browser/Browser.md)
  - [Buttons](https://github.com/jmquigley/gadgets/blob/master/docs/lib/button/Button.md)
  - [DialogBox](https://github.com/jmquigley/gadgets/blob/master/docs/lib/dialogBox/DialogBox.md)
  - [Editor](https://github.com/jmquigley/gadgets/blob/master/docs/lib/editor/Editor.md)
  - [Treeview](https://github.com/jmquigley/gadgets/blob/master/docs/lib/treeview/Treeview.md)
- Changing all "visible" props to "hidden" to match built in HTML attribute value.

#### Bug Fixes:

- Fixed a bug in TagList where the input component did not resize as the user types.
- The sort/nosort now works when a TagList is initialized.

---

## v0.0.67
#### Enhancements:

- Added noborder and border properties to the base props object
- Simplified how children were handled within the [TabContainer](https://github.com/jmquigley/gadgets/blob/master/docs/lib/tabs/TabContainer.md) component
- Added nosearch option to [Treeview](https://github.com/jmquigley/gadgets/blob/master/docs/lib/treeview/Treeview.md) component to turn off the search toolbar.

#### Bug Fixes:

- Fixed broken `onClose` property for the TabContainer.
- The changes in patchset to remove cloneDeep calls and add signatures to callbacks (1e68b85692) caused this issue.  The Label component was changed to use onUpdate with custom parameters instead of using onChange.  The onChange was modified to pass the event.  The node properties were using onChange instead of onUpdate and passing the event object instead of the title string.
- Fixed broken generaltree removal routine in [util.ds](https://github.com/jmquigley/util.ds) dependency for Treeview.

---

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
