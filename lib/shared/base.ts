/**
 * The base class for all components in the library.  This enables each module
 * to guarantee certain variable will be present through inheritance.  These
 * variables include:
 *
 * - `boxSizeStyle` -  Each `Icon` control exists within a box/square.  The
 * `sizing` parameter determines which CSS class will be used for this box size.
 * - `classes` - an array of CSS classnames that will be used on the root element
 * of the control
 * - `inlineStyles` - an object that holds user defined style overrides
 * - `locationStyle` - There are 9 locations within a region: topLeft, top,
 * topRight, middleLeft, middle, middleRight, bottomLeft, bottom, bottomRight. The
 * location prop is used to specify the CSS used to calculte this position in a
 * control using transform and relative coordinates.
 * - `sizeStyles` - The BaseProps used by most controls contains a field named
 * `sizing`.  When this prop is set, then this variable will contain the name
 * of the CSS class for that sizing type for fonts.
 * - `styles` - an object that represent the styles in the CSS module associated
 * to this control.
 *
 * The values of these variables are computed automatically for any component
 * that inhertis from BaseComponent (controlled by props).
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
import {Location, Sizing} from './index';

const styles = require('./styles.css');

//
// When using buildStyles in the base class these options are used to
// suppress the use of these variables
//
export interface BaseOptions {
	className?: boolean;
	disabled?: boolean;
	visible?: boolean;
}

const defaultBaseOptions: BaseOptions = {
	className: true,
	disabled: true,
	visible: true
};

export abstract class BaseComponent<P, S> extends React.Component<P, S> {

	private _boxSizeStyle: string = '';
	private _classes: string[] = [];
	private _inlineStyle: any = {};    // inline style overrides
	private _locationStyle: string = '';
	private _sizeStyle: string = '';
	private _styles: any = {};         // css modules styles

	constructor(props: P, pstyles: any = {}) {
		super(props);
		this._styles = pstyles;

		if ('sizing' in props) {
			this._sizeStyle = this.getSizeStyle();
			this._boxSizeStyle = this.getBoxSizeStyle();
		}

		if ('location' in props) {
			this._locationStyle = this.getLocationStyle();
		}
	}

	get classes(): string[] {
		return this._classes;
	}

	set classes(str: string[]) {
		this._classes = str;
	}

	get boxSizeStyle(): string {
		return this._boxSizeStyle;
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

	get sizeStyle(): string {
		return this._sizeStyle;
	}

	get style(): string {
		return this._inlineStyle;
	}

	get styles(): any {
		return this._styles;
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
		this._classes = [];

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
	}

	/**
	 * Takes a location parameter from the current props and searchs for the
	 * corresponding style class CSS.  If it is found, then it returns the
	 * location style for that location.  This maps CSS module generated strings
	 * to their enumerations.
	 * @returns {string} the name of the local style for that size.  If it
	 * is not found, then and empty string is returned.
	 * @private
	 */
	private getLocationStyle() {
		switch (this.props['location']) {
		case Location.topLeft:
			if (Location.topLeft in this.styles) {
				return this.styles.topLeft;
			}
			break;

		case Location.top:
			if (Location.top in this.styles) {
				return this.styles.top;
			}
			break;

		case Location.topRight:
			if (Location.topRight in this.styles) {
				return this.styles.topRight;
			}
			break;

		case Location.middleLeft:
			if (Location.middleLeft in this.styles) {
				return this.styles.middleLeft;
			}
			break;

		case Location.middle:
			if (Location.middle in this.styles) {
				return this.styles.middle;
			}
			break;

		case Location.middleRight:
			if (Location.middleRight in this.styles) {
				return this.styles.middleRight;
			}
			break;

		case Location.bottomLeft:
			if (Location.bottomLeft in this.styles) {
				return this.styles.bottomLeft;
			}
			break;

		case Location.bottom:
			if (Location.bottom in this.styles) {
				return this.styles.bottom;
			}
			break;

		case Location.bottomRight:
			if (Location.bottomRight in this.styles) {
				return this.styles.bottomRight;
			}
			break;
		}

		return '';
	}

	/**
	 * Takes a sizing parameter and a styles object and searches for the
	 * corresponding style class CSS.  If it is found, then it returns the local
	 * style for that size.  This maps CSS module generated strings to their
	 * enumerations.
	 * @returns {string} the name of the local style for that size.  If
	 * it is not found, then an empty string is returned.
	 * @private
	 */
	private getSizeStyle() {

		switch (this.props['sizing']) {
		case Sizing.xxsmall:
			if (Sizing.xxsmall in this.styles) {
				return this.styles.xxsmall;
			}
			break;

		case Sizing.xsmall:
			if (Sizing.xsmall in this.styles) {
				return this.styles.xsmall;
			}
			break;

		case Sizing.small:
			if (Sizing.small in this.styles) {
				return this.styles.small;
			}
			break;

		case Sizing.large:
			if (Sizing.large in this.styles) {
				return this.styles.large;
			}
			break;

		case Sizing.xlarge:
			if (Sizing.xlarge in this.styles) {
				return this.styles.xlarge;
			}
			break;

		case Sizing.xxlarge:
			if (Sizing.xxlarge in this.styles) {
				return this.styles.xxlarge;
			}
			break;

		case Sizing.normal:
		case Sizing.medium:
		default:
			if (Sizing.medium in this.styles) {
				return this.styles.medium;
			}
		}

		return '';
	}

	/**
	 * Takes a sizing parameter and a styles object and searches for the
	 * corresponding box/square style size class CSS.  If it is found, then it
	 * returns the local style for that size.  This maps CSS module
	 * generated strings to their enumerations.
	 * @returns {string} the name of the local style for that size.  If
	 * it is not found, then an empty string is returned.
	 * @private
	 */
	private getBoxSizeStyle() {

		switch (this.props['sizing']) {
		case Sizing.xxsmall:
			if (Sizing.xxsmall in this.styles) {
				return this.styles.xxsmallBox;
			}
			break;

		case Sizing.xsmall:
			if (Sizing.xsmall in this.styles) {
				return this.styles.xsmallBox;
			}
			break;

		case Sizing.small:
			if (Sizing.small in this.styles) {
				return this.styles.smallBox;
			}
			break;

		case Sizing.large:
			if (Sizing.large in this.styles) {
				return this.styles.largeBox;
			}
			break;

		case Sizing.xlarge:
			if (Sizing.xlarge in this.styles) {
				return this.styles.xlargeBox;
			}
			break;

		case Sizing.xxlarge:
			if (Sizing.xxlarge in this.styles) {
				return this.styles.xxlargeBox;
			}
			break;

		case Sizing.normal:
		case Sizing.medium:
		default:
			if (Sizing.medium in this.styles) {
				return this.styles.mediumBox;
			}
		}

		return '';
	}
}
