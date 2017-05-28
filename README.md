# gadgets [![Build Status](https://travis-ci.org/jmquigley/gadgets.svg?branch=master)](https://travis-ci.org/jmquigley/gadgets) [![tslint code style](https://img.shields.io/badge/code_style-TSlint-5ed9c7.svg)](https://palantir.github.io/tslint/) [![Test Runner](https://img.shields.io/badge/testing-ava-blue.svg)](https://github.com/avajs/ava) [![NPM](https://img.shields.io/npm/v/gadgets.svg)](https://www.npmjs.com/package/gadgets) [![Coverage Status](https://coveralls.io/repos/github/jmquigley/gadgets/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/gadgets?branch=master)

> Reusable React UI widgets - This is my widget library. There are many like it, but this one is mine...

**This is a WIP experiment, don't use this right now.  It is volatile.**


## Installation

To install as an application dependency:
```
$ npm install --save gadgets
```

To build the app and run all tests:
```
$ npm run all
```

To run the demo application in electron use:
```
$ npm run demo

OR

$ npm start
```

To change the code while electron is running and use `CMD + R` to refresh electron:
```
# npm run watch
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
The module contains the following widgets:

### Accordion

### Badge
- A button with a text label for info.

### Button

### ButtonDialog

### ButtonToggle

### Card

### Checkbox

### Container

### DateChooser

### Dialog

### Dropdown

### Editor

### Icon

### Label

### List

### ListItem

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
