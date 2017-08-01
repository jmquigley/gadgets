/**
 * The base class for all components in the library.  This enables each module
 * to guarantee certain variable will be present through inheritance.  These
 * variables include:
 *
 * - `classes` - an array of CSS classnames that will be used on the root
 * element of the control
 * - `inlineStyles` - an object that holds user defined style overrides
 * - `locationStyle` - There are 9 locations within a region: topLeft, top,
 * topRight, middleLeft, middle, middleRight, bottomLeft, bottom, bottomRight.
 * The location prop is used to specify the CSS used to calculte this position
 * in a control using transform and relative coordinates.
 * - `styles` - an object that represent the styles in the CSS module associated
 * to this control.
 * - `sizes` - Sizing class that has computed sizes from the base (normal) size
 * font styles for the application.  A property getter named `.styling`
 * retrieves the current font styles set for this component.
 *
 * The values of these variables are computed automatically for any component
 * that inherits from BaseComponent (controlled by props).  This class inherits
 * from `React.PureComponent` to take advantage of `shouldComponentUpdate`
 * shallow object comparison when computing styles based on props/state.
 *
 * #### Examples:
 *
 * ```javascript
 * import {BaseComponent} from '../shared';
 * ...
 * export class XYZ extends BaseComponent<Props, State> {
 *    ...
 * }
 *
 * ...
 *
 * <XYZ sizing={Sizing.xxsmall} location={Location.topRight} />
 * ```
 * In the example above the `sizeStyle` and `locationStyle` would be computed
 * automatically for the given values.  These values are then available to the
 * child class to use in building the component using these styles.
 *
 * @module BaseComponent
 */

'use strict';

import * as React from 'react';
import {Sizes} from './index';
import {defaultSize} from './sizing';

const styles = require('./styles.css');

//
// When using buildStyles in the base class these options are used to
// suppress the use of these variables
//
export interface BaseOptions {
	className?: boolean;
	disabled?: boolean;
	nohover?: boolean;
	visible?: boolean;
}

const defaultBaseOptions: BaseOptions = {
	className: true,
	disabled: true,
	nohover: true,
	visible: true
};

export abstract class BaseComponent<P, S> extends React.PureComponent<P, S> {

	private _classes: string[] = [];
	private _inlineStyle: any = {};     // inline style overrides
	private _locationStyle: string = '';
	private _styles: any = {};          // css modules styles per module
	private _sizes: Sizes = defaultSize;

	constructor(props: P, pstyles: any = {}) {
		super(props);
		this._styles = pstyles;

		if ('location' in props) {
			this._locationStyle = this.styles[props['location']];
		}
	}

	get classes(): string[] {
		return this._classes;
	}

	set classes(arr: string[]) {
		this._classes = arr;
	}

	get inlineStyle(): any {
		return this._inlineStyle;
	}

	set inlineStyle(val: any) {
		this._inlineStyle = Object.assign(this._inlineStyle, val);
	}

	get locationStyle() {
		return this._locationStyle;
	}

	get sizes(): Sizes {
		return this._sizes;
	}

	get styles(): any {
		return this._styles;
	}

	get styling(): Sizes {
		return this._sizes;
	}

	/**
	 * Many components must bind their callbacks to the original instance.  In
	 * the constructor for each React component many `.bind` calls are made.
	 * This function will take N parameter strings, that represent the names of
	 * the callback functions and will bind them to `this`.
	 *
	 * #### Example:
	 * ```
	 * this.bindCallbacks('handleChange', 'handleClick', 'handleFocus');
	 * ```
	 *
	 * This example would bind the three given callbacks (handleChange,
	 * handlClick, and handleFocus) to the instance's `this` pointer.
	 *
	 * @param methods {any} a variable list of string parameters that
	 * represent the name of a callback method that will be bound to `this`
	 * instance.
	 */
	protected bindCallbacks(...methods: string[]) {
		methods.forEach((method: string) => {
			this[method] = this[method].bind(this);
		});
	}

	/**
	 * Every component has a general set of CSS styles that may be applied each time
	 * the component is rendered (like a style to enable/disable).  This function
	 * is used to generate those basic, shared styles in all components.  It uses a
	 * set of common props (className, visible, disable, etc).  There are cases where
	 * one wants to ignore the computation of a value.  The third optional parameter
	 * allows one to ignore a specific value calculated in this set.
	 * @param props {P} the props for the given child class (generic type)
	 * @param style {Object} a set of key value pairs that override any styles in
	 * the props.
	 * @param opts {BaseOption} determines which automatic names will be ignored
	 */
	protected buildStyles(props: P, style: any = {}, opts?: BaseOptions): void {

		// Takes the initial iniline style object, the style object from props and
		// an input user override and merges them together from left to right, Where
		// the rightmost item in the function call has a higher priority when the
		// objects have the same "key"
		this._inlineStyle = Object.assign(this._inlineStyle, props['style'], style);

		opts = Object.assign(
			defaultBaseOptions,
			opts
		);

		if ('className' in props && props['className'] !== '' && opts.className) {
			this._classes.push(props['className']);
		}

		if ('visible' in props && !props['visible'] && opts.visible) {
			this._classes.push(this.styles.invisible);
		}

		if ('disabled' in props && props['disabled'] && opts.disabled) {
			this._classes.push(styles.disabled);
			this._classes.push('nohover');
		}

		if ('nohover' in props && props['nohover'] && opts.nohover) {
			if (this._classes.indexOf('nohover') === -1) {
				this._classes.push('nohover');
			}
		}
	}

	/**
	 * Sets the classes list back to empty.  Each class "buildStyles" will call this
	 * to ensure that it is empty before building the list of classes for that
	 * component.  Without this call the className list will just append duplicates.
	 *
	 */
	protected resetStyles(props: P) {
		this._sizes.currentSizing = props['sizing'];
		this._classes = [];
	}
}
