# Changelog

## v0.0.70
#### Enhancements:

- Added an `buttonSizing` parameter to the [Editor](https://github.com/jmquigley/gadgets/blob/master/docs/lib/editor/Editor.md) component so the toolbar buttons could be resized.
- Added the full tag list to `onNew` and `onDelete` callbacks in the [TagList](https://github.com/jmquigley/gadgets/blob/master/docs/lib/tagList/TagList.md).  Originally this was just the tag that was added or removed.  It now includes the full tag list in the callback as a second parameter.
- Changed the [TagList](https://github.com/jmquigley/gadgets/blob/master/docs/lib/tagList/TagList.md) to have the inital props accept tags as an array of strings or a single comma delimited list of tags.  The component now only draws what is passed in the `tags` field (unmanaged).  That means the parent component is responsible for managing the list of tags passed to the component.
- Added a `nosubtitles` option to the [Treeview](https://github.com/jmquigley/gadgets/blob/master/docs/lib/treeview/Treeview.md) component to suppress them from the display.
- Added a new theme color for the `alternating` feature within the [List](https://github.com/jmquigley/gadgets/blob/master/docs/lib/list/List.md) component named `itemAlternatingColor`.

#### Bug Fixes:

- Fixed an issue where the disable/visible props set on a component within a [Toolbar](https://github.com/jmquigley/gadgets/blob/master/docs/lib/toolbar/Toolbar.md) are not maintained.  Without this fix it is not possible to disable or hide an element within a toolbar programatically.
- Fixed a display issue in [Treeview](https://github.com/jmquigley/gadgets/blob/master/docs/lib/treeview/Treeview.md) when using subtitles on the node.
- Fixed a logic error in [Treeview](https://github.com/jmquigley/gadgets/blob/master/docs/lib/treeview/Treeview.md) related to selecting the default node in `componentDidUpdate`.  Zero was included with null when checking for no selection, when 0 is a valid id number.
- Fixed a problem in [List](https://github.com/jmquigley/gadgets/blob/master/docs/lib/list/List.md) in background color specificity for hover to allow other components to override it.
- The hover color effect now works on [Treeview](https://github.com/jmquigley/gadgets/blob/master/docs/lib/treeview/Treeview.md) nodes that contain subtitles.

---

## v0.0.69
#### Enhancements:

- Changed all `onSelect` event handler to `onSelection` to avoid collision with built in HTML onselect.  Without this change the onselect event handler could be called at times where it is unexpected.
- Added a `noscroll` option to disable the horizontal scrollbar in a [Treeview](https://github.com/jmquigley/gadgets/blob/master/docs/lib/treeview/Treeview.md).
- Removed custom bundler code since its functionality can all be done via webpack.
- Added the [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) to handle import spam.
- Added a `super.render()` to base.  There are a few functions common to all render methods in the library and this will be used to wrap it.
- Moved debugging output functions to base.  The create/render debug output is now handled in the base class so all child components do not need to implement them.
- Added state initialization to the base class super for all child modules.  This ensures that the initial state information is available for the create debug output when a component is created.
- Removed the `obj` prop and now use the constructor name.  The [Wrapper](https://github.com/jmquigley/gadgets/blob/master/docs/lib/shared/wrapper.md) was also updated to accept the compnent name.
- Added `selectedId` to the [Treeview](https://github.com/jmquigley/gadgets/blob/master/docs/lib/treeview/Treeview.md) component props.  This allows the parent component to set the selected value within the tree.  By default this id is handled as internal state.
- Removed all getters for base state and props from all components.  They are now set directly in `defaultProps` on the class.  The intial *state* for all components is handled in base.
- Removed all of the *index.ts* modules from each component.  They are now retrieved directly in the single *index.ts* at the root of the project.  It was syntactic sugar that made parts difficult to maintain and easy to forget with updates.

#### Bug Fixes:

- Added an alias to styled-components in webpack config to fix watcher issue (where wrong version of of the library was included)
- Fixed how the TabContainer handles cloning child Tab components and their underlying content.
- Fixed getDefaultBaseState to properly clone the default settings.
- The Pager menu was not displaying and has been fixed.  Related to missing overflow css setting.
- Fixed a problem in the webpack watcher config.  The bundler report pacakge is now disabled when running the watch option in webpack.  This plugin is not compatible with this option, so a command line option was added to turn off specific plugins.
- Fixed missing search textfield in Treeview component.

---

## v0.0.68
#### Enhancements:

- Added the [react-hotkeys](https://github.com/greena13/react-hotkeys) library to the module to handle keyboard interactions for the following components:
  - [Browser](https://github.com/jmquigley/gadgets/blob/master/docs/lib/browser/Browser.md)
  - [Buttons](https://github.com/jmquigley/gadgets/blob/master/docs/lib/button/Button.md)
  - [DialogBox](https://github.com/jmquigley/gadgets/blob/master/docs/lib/dialogBox/DialogBox.md)
  - [Editor](https://github.com/jmquigley/gadgets/blob/master/docs/lib/editor/Editor.md)
  - [Treeview](https://github.com/jmquigley/gadgets/blob/master/docs/lib/treeview/Treeview.md)
- Changing all "visible" props to "hidden" to match built in HTML attribute value.
- Simplified how the base theme is set in the application.  No longer requires a custom module (themed-components).  This module was removed.

#### Bug Fixes:

- Fixed a bug in TagList where the input component did not resize as the user types.
- The sort/nosort now works when a TagList is initialized.
- Tab labels allowed editing inline.  This has a been fixed (they are static and should only be changed through properties)
- Fixed a problem where dts-bundle-generator was including @types files in the bundle for modules that will not be installed when this module is included in a project.
- Fixed how typings are included in the package.  Removed the use of the dts bundler to use native typescript built typings.
- When a Treeview was updated with a new tree data structure it was not selecting an initial node.

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
