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
 * font styles for the application.
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
 *
 * In the example above the `sizing` and `location` would be computed
 * automatically for the given values.  These values are then available to the
 * child class to use in building the component using these styles.
 *
 * @module BaseComponent
 */

'use strict';

// const debug = require('debug')('base');

import {Map} from 'immutable';
import {isEmpty} from 'lodash';
import * as React from 'react';
import {calc} from 'util.calc';
import {ClassNames} from 'util.classnames';
import {Styles} from './props';
import {FontStyle, Sizes, Sizing, Styling} from './sizing';

const gstyles = require('./styles.css');

export const defaultSize: number = 16;

export abstract class BaseComponent<P, S> extends React.PureComponent<P, S> {

	// private _className: string = '';
	private _inlineStyles: Map<string, string> = Map({});
	private _locationStyle: string = '';
	private _styles: any  = {};  // css modules styles per module
	private _sizes: Sizes = null;
	private _sizing: Sizing = null;

	// The style object applied (generally) to the root of a component
	protected _rootStyles: ClassNames = new ClassNames();
	protected _classes: ClassNames = new ClassNames();

	constructor(props: P, styles: Styles = {}, defaultInlineStyles: Styles = {}, defaultFontSize: number = defaultSize) {
		super(props);

		this._styles = styles;
		this._sizes = Sizes.instance(defaultFontSize);

		if ('sizing' in this.props) {
			this._sizing = this.props['sizing'];
		} else {
			this._sizing = Sizing.normal;
		}

		if ('location' in this.props) {
			this._locationStyle = this.styles[this.props['location']];
		}

		this.inlineStyles = Object.assign({}, defaultInlineStyles, this.props['style']);
	}

	get classes(): string {
		return this._classes.classnames;
	}

	get inlineStyles(): any {
		return this._inlineStyles.toObject();
	}

	set inlineStyles(obj: any) {
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				this._inlineStyles = this._inlineStyles.set(key, obj[key]);
			}
		}
	}

	get locationStyle() {
		return this._locationStyle;
	}

	get sizes(): Sizes {
		return this._sizes;
	}

	get sizing(): Sizing {
		return this._sizing;
	}

	get styles(): any {
		return this._styles;
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
	 * Retrieves border styles based on the given sizing value in the base
	 * class.
	 * @param sizing {Sizing} an optional parameter that allows for overriding
	 * the default sizing when the class is created.
	 * @returns a string that represents the local CSS module style
	 */
	protected borderStyle(sizing: Sizing = this.sizing) {
		return this.sizes[sizing].borderStyle;
	}

	/**
	 * Retrieves styles that define the width/height of a box base on the
	 * given Sizing.
	 * @param sizing {Sizing} an optional parameter that allows for overriding
	 * the default sizing when the class is created.
	 * @returns a string that represents the local CSS module style
	 */
	protected boxStyle(sizing: Sizing = this.sizing): string {
		return this.sizes[sizing].boxStyle;
	}

	protected font(sizing: Sizing = this.sizing): FontStyle {
		return this.sizes[sizing].font;
	}

	protected fontSize(sizing: Sizing = this.sizing): number {
		return this.sizes[sizing].font.size;
	}

	protected fontSizePX(sizing: Sizing = this.sizing, scale: number = 1.0): string {
		return calc(this.sizes[sizing].font.sizepx, `* ${scale}`);
	}

	protected fontStyle(sizing: Sizing = this.sizing): string {
		return this.sizes[sizing].font.style;
	}

	/**
	 * Takes the given base Sizing and determines what the next size
	 * in the list would be.  e.g. if current size is *normal*, then
	 * the next size would be *large*.
	 * @param sizing {Sizing} an optional parameter that allows for overriding
	 * the default sizing when the class is created.
	 * @returns a reference to a `Styling` object.  This contains
	 * font type/size, box, and border information.
	 */
	protected next(sizing: Sizing = this.sizing): Styling {
		switch (sizing) {
			case Sizing.xxsmall: return this._sizes[Sizing.xsmall];
			case Sizing.xsmall: return this._sizes[Sizing.small];
			case Sizing.small: return this._sizes[Sizing.normal];
			case Sizing.large: return this._sizes[Sizing.xlarge];
			case Sizing.xlarge: return this._sizes[Sizing.xxlarge];
			case Sizing.xxlarge: return this._sizes[Sizing.xxlarge];

			case Sizing.normal:
			case Sizing.medium:
				return this._sizes[Sizing.large];

			default:
				return this._sizes[Sizing.normal];
		}
	}

	/**
	 * Takes the given base Sizing and determines what the previous size
	 * in the list would be.  e.g. if current size is *normal*, then
	 * the previous size would be *small*.
	 * @param sizing {Sizing} an optional parameter that allows for overriding
	 * the default sizing when the class is created.
	 * @returns a reference to a `Styling` object.  This contains font type/size,
	 * box, and border information.
	 */
	protected prev(sizing: Sizing = this.sizing): Styling {
		switch (sizing) {
		case Sizing.xxsmall: return this._sizes[Sizing.xxsmall];
		case Sizing.xsmall: return this._sizes[Sizing.xxsmall];
		case Sizing.small: return this._sizes[Sizing.xsmall];
		case Sizing.large: return this._sizes[Sizing.normal];
		case Sizing.xlarge: return this._sizes[Sizing.large];
		case Sizing.xxlarge: return this._sizes[Sizing.xlarge];

		case Sizing.normal:
		case Sizing.medium:
			return this._sizes[Sizing.small];

		default:
			return this._sizes[Sizing.normal];
		}
	}

	/**
	 * Retrieves styles that define the width/height of a rectangle base on the
	 * given Sizing.
	 * @param sizing {Sizing} an optional parameter that allows for overriding
	 * the default sizing when the class is created.
	 * @returns a string that represents the local CSS module style
	 */
	protected rectStyle(sizing: Sizing = this.sizing): string {
		return this.sizes[sizing].rectStyle;
	}

	protected styling(sizing: Sizing = this.sizing): Styling {
		return this.sizes[sizing];
	}

	/**
	 * Returns the Sizing enum value associated with the given sizing.
	 * @param sizing {Sizing} an optional parameter that allows for overriding
	 * the default sizing when the class is created.
	 * @returns a refernce to a Sizing enum value.
	 */
	protected type(sizing: Sizing = this.sizing): Sizing {
		return this.sizes[sizing].type;
	}

	/**
	 * Compares the sizing parameter between two props objects.  If they differ
	 * then unset the previous version of the boxStyle in props and set it
	 * to the size contained in nextProps.
	 * @param classes {ClassNames} the styles object to toggle
	 * @param nextProps {P} the next set of props that may be changing
	 * @param props {P} a reference to the current (or previous) props
	 * @return {ClassNames} a reference to the original input classes
	 */
	protected updateBoxStyle(classes: ClassNames, nextProps: P, props: P) {
		if (props['sizing'] !== nextProps['sizing']) {
			classes.off(this.boxStyle(this.props['sizing']));
		}
		classes.onIf('sizing' in nextProps)(
			this.boxStyle(nextProps['sizing'])
		);
		return classes;
	}

	/**
	 * Compares the sizing parameter between two props objects.  If they differ
	 * then unset the previous version of the fontStyle in props and set it
	 * to the size contained in nextProps.
	 * @param classes {ClassNames} the styles object to toggle
	 * @param nextProps {P} the next set of props that may be changing
	 * @param props {P} a reference to the current (or previous) props
	 * @return {ClassNames} a reference to the original input classes
	 */
	protected updateFontStyle(classes: ClassNames, nextProps: P, props: P) {
		if (props['sizing'] !== nextProps['sizing']) {
			classes.off(this.fontStyle(this.props['sizing']));
		}
		classes.onIf('sizing' in nextProps)(
			this.fontStyle(nextProps['sizing'])
		);
		return classes;
	}

	/**
	 * Every component has a general set of CSS styles that may be applied each
	 * time the component is rendered (like a style to enable/disable).  This
	 * lifecycle function is used to generate those basic, shared styles in all
	 * components.  It uses a set of common props (className, visible, disable,
	 * etc).
	 *
	 * This version of the funtion is in the BaseComponent inherited by all
	 * components.  If the component doesn't define a version then this is
	 * called on the base class.  When the component defines a version, then
	 * super is used to call this version.
	 *
	 * @param nextProps {P} the next set of props passed to an update
	 * @param nextState {S} the next set of base info passed to an update
	 */
	public componentWillUpdate(nextProps?: P, nextState?: S) {

		nextState = null;

		this.updateFontStyle(this._rootStyles, nextProps, this.props);
		if ('sizing' in nextProps && this._sizing !== nextProps['sizing']) {
			this._sizing = nextProps['sizing'];
		}

		if ('className' in nextProps && this.props['className'] !== nextProps['className']) {
			this._rootStyles.off(this.props['className']);
			this._classes.off(this.props['className']);
		}

		this._rootStyles.onIf('className' in nextProps && nextProps['className'])(
			nextProps['className']
		);

		this._classes.onIf('className' in nextProps && nextProps['className'])(
			nextProps['className']
		);

		this._rootStyles.onIf('visible' in nextProps && !nextProps['visible'])(
			this.styles.invisible
		);

		this._rootStyles.onIf('disabled' in nextProps && nextProps['disabled'])(
			gstyles.disabled,
			'nohover'
		);

		if ('nohover' in nextProps && nextProps['nohover']) {
			this._rootStyles.on('nohover');
		}

		if (!isEmpty(nextProps['style'])) {
			this.inlineStyles = nextProps['style'];
		}
	}
}
