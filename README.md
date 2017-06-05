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


This library was created for use in the [Electron UI](https://electron.atom.io/).  It has only be tested to work with the most recent version of Chromium in Electron.  It contains a custom set of [React](https://facebook.github.io/react/) widgets used in an internal project.  It uses [Typescript](https://www.typescriptlang.org/) and [Wepback](https://webpack.github.io/) to create the module.  Once built it contains a distribution bundle (`bundle.js`) and a CSS file (`styles.css`).  The library makes use of [css modules](https://github.com/css-modules/css-modules).


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


## Widgets
The module contains the following widgets (click on each header to attribute/event details for each):

### Accordion

### Badge
- A widget that annotates another widget (like a counter)

### [Button](docs/lib/button/Button.md)
A typical button control widget.  This control only uses an icon and no text to represent the button.  The icons are [Font Awesome](http://fontawesome.io/) strings.  That library is built into this module, so any font available in the current release of that library is available.  To customize the style use the `ui-button` selector.

```javascript
import {Button} from 'gadgets';

<Button iconName="cab" onClick={someFunction} />
```


### ButtonDialog
A button control that when pushed displays a local dialog box.  The contents of the control make up the dialog window.


### ButtonToggle

### Card

### Checkbox

### Container

### DateChooser

### Dialog

### Dropdown

### DynamicList

### Editor

### Icon

### Label

### List/ListItem

### Menu

### ProgressBar

### RadioButton

### Slider

### Switch

### Table

### Tabs

### TextField

### TimeChooser

### Toast
A popup (center of screen) with a message that disappers after N seconds.  Contains an X button to remove sooner.

### Toolbar

### Tooltip

### Treeview


## Styles
All of the color and font size CSS values are controlled through global selectors.  The CSS modules within the code are only used to control layout.  By default these are not set with colors to allow for customization.  The demo application contains `[styles.css](https://github.com/jmquigley/gadgets/blob/master/demo/styles.css)` that show each of the global styles and how they are used.  They are also documented within each of components above.
