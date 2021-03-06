# gadgets

> Reusable React UI widgets - This is my widget library. There are many like it, but this one is mine...

[![build](https://github.com/jmquigley/gadgets/workflows/build/badge.svg)](https://github.com/jmquigley/gadgets/actions)
[![analysis](https://img.shields.io/badge/analysis-tslint-9cf.svg)](https://palantir.github.io/tslint/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![testing](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/gadgets.svg)](https://www.npmjs.com/package/gadgets)


This library provides widgets and composite controls for building desktop apps using [Electron](https://electronjs.org/).  The widgets are listed below.

## Requirements

- [Electron](https://electron.atom.io/) v4.x+
- [Node](https://nodejs.org/en/) v10.x+
- [React](https://facebook.github.io/react/) v16.3+

## Usage

The CSS styles must be included within a project using CSS modules or via webpack configuration:

#### code snippet
```javascript
const styles = require('gadgets/dist/styles.css');

import {
	Button,
	ButtonToggle
} from 'gadgets';

...

<Button />
<ButtonToggle />
```

#### webpack snippet
```javascript
module.exports = {
	entry: [
		path.resolve(__dirname, 'node_modules', 'gadgets', 'dist', 'styles.css'),
	],
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: "dist/",
		libraryTarget: "commonjs"
	},
    ...
```

This will give a webpack module an **entry** point to copy the gadgets CSS file into that build's distribution.  Without this the built in styles for each control will be missing.

Note that React is NOT packaged with the app.  An app that uses this library must supply the React library.  The demo application shows an example of this.


## Installation

This module uses [yarn](https://yarnpkg.com/en/) to manage dependencies and run scripts for development.

To install as an application dependency:
```
$ yarn add gadgets
```

To build the app and run all tests:
```
$ yarn run all
```

To build and run the demo application in electron use:
```
$ yarn run demo
```
This will check out all dependencies, build the code, test, and then try to run it within electron.  This will take some time to complete.

To just attempt to run the application without building use (assuming the app was recently built):
```
$ yarn start
```

### Development
#### Building

The build process happens in two steps:

1. Typescript Compilation (first)
2. Webpack vial babel-loader (second)

The Typescript build converts all of the .ts and .tsx files into their .js and .jsx counterparts, while also generating typing information (.d.ts).  It uses the [tsc compiler](https://www.typescriptlang.org/docs/handbook/compiler-options.html) to generate this code.  The second part uses webpack to take these converted files and generate a webpack bundle.  During the bundle creation the generated typings are placed into the dist directory with the generated bundle.  This process is followed instead of using a webpack loader to handle the typescript compilation (such as [ts-loader](https://github.com/TypeStrong/ts-loader).  The webpack build can't generate typings via the loader and use the copy webpack plugin at the same time.  This happens because the copy plugin tries to copy files in parallel while they are being generated.  This leads to errors and warnings in the build for missing files that are not yet generated.  In the future this may be changed to use a loader and the [webpack-shell-plugin](https://www.npmjs.com/package/webpack-shell-plugin) instead of the webpack copy plugin, but the current solution didn't require custom code to perform the copy.  This two part solution works, but does lead to the following complication.

To change the code while electron is running and use `CMD + R` to refresh electron (in two terminals):

```
$ yarn watch:types.    # starts the typescript compiler in terminal 1
$ yarn watch:webpack   # starts the webpack watcher in terminal 2
```

This starts two separate watchers.  It will watch for changes in the typescript files first.  When detected the typescript compiler will build from `.ts/.tsx` to `.js/.jsx`.  The webpack watcher will then see this and rebuild the bundle with the second watcher.

This library was created for use in the [Electron UI](
https://electron.atom.io/) and has been tested to work with the most recent version of Chromium in Electron.  It contains a custom set of [React](https://facebook.github.io/react/) widgets and composite components used to create a desktop application.  The build uses [Typescript](https://www.typescriptlang.org/) and [Wepback](https://webpack.github.io/) to create the package.  Once built it contains a distribution bundle (`bundle.js`) and a CSS file (`styles.css`) that can be included within another project.  The library also makes use of [styled components](https://www.styled-components.com/).

Click on the each documented element below to see a picture of the component (where applicable).  To see a live demo, build the application (listed above).  It will run a demo electron application demonstrating each component.  The demo application also contains samples that demonstrate how the components are used.

#### Debugging
The library use the [debug](https://www.npmjs.com/package/debug) module to print information to log.  To see debugging information set the environment variable `DEBUG_GADGETS` to `true`.  Also, set a string qualifier to the `DEBUG` environment varaible to turn on messages for a component (this is needed by the debug module).  All of the components have their own namespace that follows the convention:

    "gadgets.{component}[:{action}]"

Where *component* is the React name for the component, i.e. `Accordion`, `List`, etc...  The *:action* is either empty, `:create`, or `:render`.  e.g.

    "gadgets.Accordion:render"

Will print debugging information when the `render()` method is called.  This includes the `props` and `state` at the time the render operation started.  Wildcards can also be used:

    'gadgets.*:create`

When the constructor is called to create each instance of a component, the *create* message will displayed in the console.  It will contain references to the initial props and state.  With the wildcard above this will display the create message for every component as it is created.


## Widgets
The module contains the following widgets (click on each header to see attribute/event details for each):

### [Accordion](docs/lib/accordion/Accordion.md)/[AccordionItem](docs/lib/accordion/AccordionItem.md)
An accordion control contains N number of AccordionItems.  These items will display/hide the contents of that item when the header of that item is clicked.  The content of an AccordionItem can be any set of HTML tags.  The demo application shows a List embedded within the accordion.

### [Badge](docs/lib/badge/Badge.md)
A counter widget that annotates (overlays) another widget.

### [BaseProps](docs/lib/shared/props.md)
This module represents the properties that are shared by every class in the project.  This includes properties such as color, id, disabled, etc.

### [Breadcrumbs](docs/lib/breadcrumbs/Breadcrumbs.md)
A navigation control used to keep track of previous locations visited.  The rightmost item is the current location.  This provides a "path" back to the start of some navigation.

### [Break](docs/lib/break/Break.md)
A wrapper for the `<br>` tag.  This respects the Sizing option for controls so that the height of the break matches the current line height.

### [Browser](docs/lib/browser/Browser.md)
Creates a web browser instance using a [webview](https://electron.atom.io/docs/api/webview-tag/) tag

### [Button](docs/lib/button/Button.md)
A typical button control widget.  This control only uses an icon and no text to represent the button.  The icons are [Font Awesome](http://fontawesome.io/) strings.  That library is built into this module, so any font available in the current release of that library is available.

### [ButtonCircle](docs/lib/buttonCircle/ButtonCircle.md)
A circular button control.  Works like a typical button... except it's a circle.

### [ButtonDialog](docs/lib/buttonDialog/ButtonDialog.md)
A button control that when pushed displays a local dialog box.  The contents of the control make up the dialog window.

### [ButtonText](docs/lib/buttonText/ButtonText.md)
A button control that contains an icon and a text string.  The text string can be to the left or right of the icon.

### [ButtonToggle](docs/lib/buttonToggle/ButtonToggle.md)
A button control that switches between the given icons when clicked.  The state of the button is maintained until it is clicked again.

### [Container](docs/lib/container/Container.md)
A generic control used to group other controls.  It creates a section tag around the given child component.

### [DataGrid](docs/lib/datagrid/Datagrid.md)
A component that represents data in a 2D table format like excel.  The underlying code is a wrapper around the [react-data-grid](https://www.npmjs.com/package/react-data-grid) component.

### DateChooser
TODO: create the DateChooser control

### [DialogBox](docs/lib/dialogBox/DialogBox.md)
A modal, dialog box popup window for yes/no user decisions.

### [DialogWindow](docs/lib/dialogWindow/DialogWindow.md)
A modal dialog window.

### [Dropdown](docs/lib/dropdown/Dropdown.md)
A dropdown list using the HTML select/option elements.

### [DynamicList](docs/lib/dynamicList/DynamicList.md)
A specialized List control that can be manipulated by the user.  They can add/remove/select items from it.

### [Editor](docs/lib/editor/Editor.md)
A multi-line text editor control.  It uses a custom [markup module](https://github.com/jmquigley/quill-markup) under the [Quill](https://quilljs.com/) editor/api.

### Gauge
TODO: create a circular gauge control

### [Icon](docs/lib/icon/Icon.md)
Displays a graphical icon within the current container.

### [Label](docs/lib/label/Label.md)
A text label string control that can be edited.

### [List](docs/lib/list/List.md)/[ListDivider](docs/lib/list/ListDivider.md)/[ListFooter](docs/lib/list/ListFooter.md)/[ListHeader](docs/lib/list/ListHeader.md)/[ListItem](docs/lib/list/ListItem.md)
A container element that holds a list of other elements.  The `List` resolves to a `<ul>` and the items within it resolve to `<li>`.

### [Option](docs/lib/option/Option.md)
A checkbox/radio button control.  This is just a specialized form of ButtonToggle.

### [OptionGroup](docs/lib/option/OptionGroup.md)
A grouping of Option conmponents.

### [Pager](docs/lib/pager/Pager.md)
A pagination control.  This takes an input size `I` and a page size `P` and breaks it up into `N = I/P` entries.  The entries are displayed as a list of pages that can be chosen by the user.

### [Preview](docs/lib/preview/Preview.md)
Takes a string of a markup language (asciidoc, markdown, or restructuredtext), converts it to HTML, and presents it in a webview control.

### ProgressBar
TODO: create the ProgressBar control

### Rating
TODO: create the Rating control

### [Slider](docs/lib/slider/Slider.md)
The Slider control creates a horizontal line overlapped by a chevron that can be moved along this horizontal line.

### [Switch](docs/lib/switch/Switch.md)
A button control that works like a toggle.  Pressing the button will turn it *on* or *off*.  The color of the slider shows the state.

### [TagList](docs/lib/tagList/TagList.md) ([Tag](docs/lib/tagList/Tag.md))
The tag list control is a basic list of strings that act as metadata for another control.  They are used to categorize information.

### [TabContainer](docs/lib/tabs/TabContainer.md) ([Tab](docs/lib/tabs/Tab.md))
A typical tab control container.  This manages `Tab` elements within it.

### [TextArea](docs/lib/textArea/TextArea.md)
A multiline text editing component.  It is a contenteditable div.

### [TextField](docs/lib/textField/TextField.md) ([Validator](docs/lib/textField/validator.md))
The TextField is a wrapper component for the built in `<input>` tag.  This control allows the user to add validation routines to the input control beyond the builtin routines.

### TimeChooser
TODO: create TimeChooser control

### [Title](docs/lib/title/Title.md)
A reusable title block used to format two items: a title and a widget.  The title is generally a text string and the widget can be a text string or another control.

### [Toast](docs/lib/toast/Toast.md)
A popup that contains a message on the top or bottom of that container.  The message will disapper after N seconds.  Contains an X button to remove sooner.  It contains four basic modes: info, warning, error, custom.

### [Toolbar](docs/lib/toolbar/Toolbar.md)/[Divider](docs/lib/divider/Divider.md)
A grouping of buttons and/or controls in a horizontal bar.

### [Tooltip](docs/lib/tooltip/Tooltip.md)
A text popup window on a control used to give help or feedback to the user of that control.

### [Treeview](docs/lib/treeview/Treeview.md)
This component represents data in a hierarchical parent/child view.  The underlying code is a wrapper around the [react-sortable-tree](https://www.npmjs.com/package/react-sortable-tree) component written by Chris Fritz.

### [Triangle](docs/lib/triangle/Triangle.md)
Uses SVG to draw a triangle within the container.

### Voting
TODO: Create a Voting control (up/down arrows to affect vote count like Reddit)

### [Wrapper](docs/lib/shared/wrapper.md)
Each component uses the Wrapper component to catch potential errors within the control.  These are [error boundaries](https://reactjs.org/docs/error-boundaries.html) that are new to React 16.  It also wraps the [ThemeProvider](https://www.styled-components.com/docs/api#themeprovider) used by the [styled-components](https://reactjs.org/docs/error-boundaries.html).

## Styles

The library contains an external style sheet that must be included.  It is located in `node_modules/gadgets/dist/styles.css`.  This library also uses [highlight.js](https://highlightjs.org/).  If the `Editor` control is used, then the highlight CSS files need to be included as well.  They are located in `node_modules/gadgets/dist/highlights/*.css`.  These should be copied to the root of the site/app (with something like the [Copy Webpack Plugin](https://github.com/webpack-contrib/copy-webpack-plugin)).
