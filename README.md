# gadgets

> Reusable React UI widgets - This is my widget library. There are many like it, but this one is mine...

[![Build Status](https://travis-ci.org/jmquigley/gadgets.svg?branch=master)](https://travis-ci.org/jmquigley/gadgets)
[![tslint code style](https://img.shields.io/badge/code_style-TSlint-5ed9c7.svg)](https://palantir.github.io/tslint/)
[![Test Runner](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/gadgets.svg)](https://www.npmjs.com/package/gadgets)
[![Coverage Status](https://coveralls.io/repos/github/jmquigley/gadgets/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/gadgets?branch=master)

**This is a WIP experiment, don't use this right now.  It is volatile.  I'm using this to learn and practice react and some of the surrounding ecosystem**


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
This will check out all dependencies, build the code, test, and then try to run it within electron.  This will take some time.

To just attempt to run the application without building use:
```
$ yarn start
```

To change the code while electron is running and use `CMD + R` to refresh electron:
```
# yarn run watch
```


This library was created for use in the [Electron UI](
https://electron.atom.io/) and has been tested to work with the most recent version of Chromium in Electron.  It contains a custom set of [React](https://facebook.github.io/react/) widgets used in an internal project.  The build uses [Typescript](https://www.typescriptlang.org/) and [Wepback](https://webpack.github.io/) to create the module.  Once built it contains a distribution bundle (`bundle.js`) and a CSS file (`styles.css`).  The library also makes use of [css modules](https://github.com/css-modules/css-modules).


### Requirements

- [Electron](https://electron.atom.io/) v1.6.10+
- [Node](https://nodejs.org/en/) v7.8+
- [React](https://facebook.github.io/react/) v16.0.0+


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


## Widgets
The module contains the following widgets (click on each header to see attribute/event details for each):

### [Accordion](docs/lib/accordion/Accordion.md)/[AccordionItem](docs/lib/accordion/AccordionItem.md)
An accordion control contains N number of AccordionItems.  These items will display/hide the contents of that item when the header of that item is clicked.  The content of an AccordionItem can be any set of HTML tags.  The demo application shows a List embedded within the accordion.

### [Badge](docs/lib/badge/Badge.md)
A counter widget that annotates (overlays) another widget.

### [BaseProps](docs/lib/shared/props.md)
This module represents the properties that are shared by every class in the project.  This includes properties such as color, id, disabled, etc.

### Breadcrumbs
TODO: create the Breadcrums control

### Browser
TODO: create the Browser control.  This is a wrapped iframe with simple buttons for URL, refresh, back, etc.

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

### DateChooser
TODO: create the DateChooser control

### [DialogBox](docs/lib/dialogBox/DialogBox.md)
A modal, dialog box popup window for yes/no user decisions.

### DialogWindow
TODO: create the DialogWindow control (complex dialog)

### [Dropdown](docs/lib/dropdown/Dropdown.md)
A dropdown list using the HTML select/option elements.

### [DynamicList](docs/lib/dynamicList/DynamicList.md)
A specialized List control that can be manipulated by the user.  They can add/remove/select items from it.

### [Editor](docs/lib/editor/Editor.md)
A multi-line text editor control.  It uses a custom [markup module](https://github.com/jmquigley/quill-markup) under the [Quill](https://quilljs.com/) editor/api.

### Gauge
TODO: create the gague control

### History
TODO: create a History selection control

### [Icon](docs/lib/icon/Icon.md)
Displays a graphical icon within the current container.

### [Label](docs/lib/label/Label.md)
A text label string control that can be edited.

### [List](docs/lib/list/List.md)/[ListDivider](docs/lib/list/ListDivider.md)/[ListFooter](docs/lib/list/ListFooter.md)/[ListHeader](docs/lib/list/ListHeader.md)/[ListItem](docs/lib/list/ListItem.md)
A container element that holds a list of other elements.  The `List` resolves to a `<ul>` and the items within it resolve to `<li>`.

### [Option](docs/lib/option/Option.md)
A checkbox/radio button control.  This is just a specialized form of ButtonToggle.

### OptionGroup
TODO: create the OptionGroup control (radio button like grouping)

### [Pager](docs/lib/pager/Pager.md)
A pagination control.  This takes an input size `I` and a page size `P` and breaks it up into `N = I/P` entries.  The entries are displayed as a list of pages that can be chosen by the user.

### Popout
TODO: create the PopOut control

### PopupMenu
TODO: create the popup Menu control

### ProgressBar
TODO: create the ProgressBar control

### Rating
TODO: create the Rating control

### [Select](docs/lib/select/Select.md)
A dropdown combo box control.  This uses the [react-select](https://www.npmjs.com/package/react-select) library from NPM maintained by Jed Watson. See the [README](https://github.com/JedWatson/react-select/blob/master/README.md) of this project for events and properties used.

### Slider
TODO: create the Slider control

### Spinner
A text control with an up/down arrow that will increment a counter.
TODO: create the Spinner control

### [Switch](docs/lib/switch/Switch.md)
A button control that works like a toggle.  Pressing the button will turn it *on* or *off*.  The color of the slider shows the state.

### [TagList](docs/lib/tagList/TagList.md) ([Tag](docs/lib/tagList/Tag.md))
The tag list control is a basic list of strings that act as metadata for another control.  They are used to categorize information.

### Table
TODO: create the Table control

### [TabContainer](docs/lib/tabs/TabContainer.md) ([Tab](docs/lib/tabs/Tab.md))
A typical tab control container.  This manages `Tab` elements within it.

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

### Treeview
TODO: create a Treeview control

### [Triangle](docs/lib/triangle/Triangle.md)
Uses SVG to draw a triangle within the container.

## Styles
All of the color and font size CSS values are controlled through global selectors.  The CSS modules within the code are only used to control layout.  By default these are not set with colors to allow for customization.  The demo application contains [styles.css](https://github.com/jmquigley/gadgets/blob/master/demo/styles.css) that show each of the global styles and how they are used.  They are also documented within each of components above.
