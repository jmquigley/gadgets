# gadgets [![Build Status](https://travis-ci.org/jmquigley/gadgets.svg?branch=master)](https://travis-ci.org/jmquigley/gadgets) [![tslint code style](https://img.shields.io/badge/code_style-TSlint-5ed9c7.svg)](https://palantir.github.io/tslint/) [![Test Runner](https://img.shields.io/badge/testing-ava-blue.svg)](https://github.com/avajs/ava) [![NPM](https://img.shields.io/npm/v/gadgets.svg)](https://www.npmjs.com/package/gadgets) [![Coverage Status](https://coveralls.io/repos/github/jmquigley/gadgets/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/gadgets?branch=master)

> Reusable React UI widgets - This is my widget library. There are many like it, but this one is mine...

**This is a WIP experiment, don't use this right now.  It is volatile.**


## Installation

This module uses [yarn](https://yarnpkg.com/en/) to manage dependencies and run scripts for development.

To install as an application dependency:
```
$ yarn install --save gadgets
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
https://electron.atom.io/) and has only be tested to work with the most recent version of Chromium in Electron.  It contains a custom set of [React](https://facebook.github.io/react/) widgets used in an internal project.  The build uses [Typescript](https://www.typescriptlang.org/) and [Wepback](https://webpack.github.io/) to create the module.  Once built it contains a distribution bundle (`bundle.js`) and a CSS file (`styles.css`).  The library makes use of [css modules](https://github.com/css-modules/css-modules).


### Requirements

- [Electron](https://electron.atom.io/) v1.6.10+
- [Node](https://nodejs.org/en/) v7.4+
- [React](https://facebook.github.io/react/) v15.6.0+


## Usage

The CSS styles must be included within code using CSS modules or via webpack configuration:

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
		path.resolve(__dirname, 'src', 'js', 'init.tsx')
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

This will give a webpack module an **entry** point to copy in the gadgets CSS file into this distribution.  Without this the built in styles for each control will be missing.

Note that React is NOT packaged with the app.  The app that uses this library must supply the React library.  The demo application shows an example of this.


## Widgets
The module contains the following widgets (click on each header to see attribute/event details for each):

### [Accordion](docs/lib/accordion/Accordion.md)/[AccordionItem](docs/lib/accordion/AccordionItem.md)
An accordion control contains N number of AccordionItems.  These items will display/hide the contents of that item when the header of that item is clicked.  The content of an AccordionItem can be any set of HTML tags.  The demo application shows a List embedded within the accordion.

### [Badge](docs/lib/badge/Badge.md)
A counter widget that annotates (overlays) another widget.

### [BaseProps](docs/lib/shared/props.md)
This module represents the properties that are shared by every class in the project.  This includes properties such as color, id, disabled, etc.

### Breadcrumbs

### [Button](docs/lib/button/Button.md)
A typical button control widget.  This control only uses an icon and no text to represent the button.  The icons are [Font Awesome](http://fontawesome.io/) strings.  That library is built into this module, so any font available in the current release of that library is available.

### ButtonBar

### [ButtonCircle](docs/lib/buttonCircle/ButtonCircle.md)
A circular button control.  Works like a typical button... except it's a circle.

### [ButtonDialog](docs/lib/buttonDialog/ButtonDialog.md)
A button control that when pushed displays a local dialog box.  The contents of the control make up the dialog window.

### [ButtonText](docs/lib/buttonText/ButtonText.md)
A button control that contains an icon and a text string.  The text string can be to the left or right of the icon.

### [ButtonToggle](docs/lib/buttonToggle/ButtonToggle.md)
A button control that switches between the given icons when clicked.  The state of the button is maintained until it is clicked again.

### Card

### Checkbox

### Container

### DateChooser

### Dialog

### Dropdown

### DynamicList

### Editor

### [Icon](docs/lib/icon/Icon.md)
Displays a graphical icon within the current container.

### [Label](docs/lib/label/Label.md)
A text string label that can made editable.  It is ultimately a `<span>` wrapper of the given text string.

### List/ListItem

### Menu

### [Pager](docs/lib/pager/Pager.md)
A pagination control.  This takes an input size `I` and a page size `P` and breaks it up into `N = I/P` entries.  The entries are displayed as a list of pages that can be chosen by the user.

### Popout

### ProgressBar

### RadioButton

### Rating

### [Select](docs/lib/select/Select.md)
A dropdown combo box control.  This uses the [react-select](https://www.npmjs.com/package/react-select) library from NPM maintained by Jed Watson. See the [README](https://github.com/JedWatson/react-select/blob/master/README.md) of this project for events and properties used.

### Slider

### Spinner
A text control with an up/down arrow that will increment a counter.

### Switch

### Table

### Tabs

### TextField

### TimeChooser

### Title

### [Toast](docs/lib/toast/Toast.md)
A popup that contains a message on the top or bottom of that container.  The message will disapper after N seconds.  Contains an X button to remove sooner.  It contains four basic modes: info, warning, error, custom.

### ToolBar

### Tooltip

### Treeview


## Styles
All of the color and font size CSS values are controlled through global selectors.  The CSS modules within the code are only used to control layout.  By default these are not set with colors to allow for customization.  The demo application contains [styles.css](https://github.com/jmquigley/gadgets/blob/master/demo/styles.css) that show each of the global styles and how they are used.  They are also documented within each of components above.
