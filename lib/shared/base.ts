/**
 * The base class for all components in the library.  This enables each module
 * to guarantee certain variable will be present through inheritance.  These
 * variables include:
 *
 * - classes - an array of CSS classnames that will be used on the root element
 * of the control
 * - inlineStyles - an object that holds user defined style overrides
 * - styles - an object that represent the styles in the CSS module associated
 * to this control.
 *
 * #### Examples:
 *
 * ```javascript
 * import {BaseComponent} from '../shared';
 * ...
 * export class XYZ extends BaseComponent<Props, State> {
 *    ...
 * }
 * ```
 *
 * @module BaseComponent
 */

'use strict';

import * as React from 'react';
import {Location, Size} from './index';

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

	private _classes: string[] = [];
	private _inlineStyle: any = {};    // inline style overrides
	private _styles: any = {};         // css modules styles
	private _sizeStyle: string = '';
	private _boxSizeStyle: string = '';
	private _locationStyle: string = '';

	constructor(props: P, pstyles: any = {}) {
		super(props);
		this._styles = pstyles;

		if ('size' in props) {
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
	 * is used to generate those basic, shared styles in all components.
	 */
	protected buildStyles(props: P, style: any = {}, opts?: BaseOptions): void {
		this._classes = [];
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
	 * location style for that lcoation.  This maps CSS module generated strings
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

		switch (this.props['size']) {
		case Size.xxsmall:
			if (Size.xxsmall in this.styles) {
				return this.styles.xxsmall;
			}
			break;

		case Size.xsmall:
			if (Size.xsmall in this.styles) {
				return this.styles.xsmall;
			}
			break;

		case Size.small:
			if (Size.small in this.styles) {
				return this.styles.small;
			}
			break;

		case Size.large:
			if (Size.large in this.styles) {
				return this.styles.large;
			}
			break;

		case Size.xlarge:
			if (Size.xlarge in this.styles) {
				return this.styles.xlarge;
			}
			break;

		case Size.xxlarge:
			if (Size.xxlarge in this.styles) {
				return this.styles.xxlarge;
			}
			break;

		case Size.normal:
		case Size.medium:
		default:
			if (Size.medium in this.styles) {
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

		switch (this.props['size']) {
		case Size.xxsmall:
			if (Size.xxsmall in this.styles) {
				return this.styles.xxsmallBox;
			}
			break;

		case Size.xsmall:
			if (Size.xsmall in this.styles) {
				return this.styles.xsmallBox;
			}
			break;

		case Size.small:
			if (Size.small in this.styles) {
				return this.styles.smallBox;
			}
			break;

		case Size.large:
			if (Size.large in this.styles) {
				return this.styles.largeBox;
			}
			break;

		case Size.xlarge:
			if (Size.xlarge in this.styles) {
				return this.styles.xlargeBox;
			}
			break;

		case Size.xxlarge:
			if (Size.xxlarge in this.styles) {
				return this.styles.xxlargeBox;
			}
			break;

		case Size.normal:
		case Size.medium:
		default:
			if (Size.medium in this.styles) {
				return this.styles.mediumBox;
			}
		}

		return '';
	}
}
