/**
 * The base class for all components in the library.  This enables each module
 * to guarantee certain variables will be present through inheritance.  These
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

"use strict";

// const debug = require("debug")("base");

import {isEqual} from "lodash";
import * as React from "react";
import {calc} from "util.calc";
import {ClassNames} from "util.classnames";
import {getUUID} from "util.toolbox";
import {BaseProps, Styles} from "./props";
import {FontStyle, Sizes, Sizing, Styling} from "./sizing";
import {getTheme, ThemeProps} from "./themes";

require("./styles.css");

export const baseZIndex: number = 9999;
export const defaultSize: number = 16;
export let sizes: Sizes = Sizes.instance(defaultSize);

export abstract class BaseComponent<
	P extends BaseProps,
	S
> extends React.PureComponent<P, S> {
	public static defaultStyles: any = {};

	private _className: ClassNames = new ClassNames();
	private _defaultClassName: string;
	private _id: string;
	private _theme: ThemeProps = null;

	constructor(
		props: P,
		defaultClassName: string,
		defaultStyles: Styles = {}
	) {
		super(props);

		this._defaultClassName = defaultClassName;
		this._className = new ClassNames(defaultClassName);

		// If an id value is not given as a prop, then generate a unique id.  If the
		// component is under test, then 0 is used for the UUID value (to make it
		// predictable
		if (this.props.id) {
			this._id = this.props.id;
		} else {
			this._id =
				this.constructor.name +
				"-" +
				(this.props.testing ? "0" : getUUID());
		}

		if (this.props.theme != null) {
			this._theme = this.props.theme;
		} else {
			this._theme = getTheme();
		}

		BaseComponent.defaultStyles = defaultStyles;
	}

	get className(): string {
		return this._className.value;
	}

	get defaultClassName(): string {
		return this._defaultClassName;
	}

	get defaultSize(): number {
		return defaultSize;
	}

	/**
	 * @return {string} the unique id value that was generated for this component
	 */
	get id(): string {
		return this._id;
	}

	get theme(): ThemeProps {
		return this._theme;
	}

	public static font(sizing: Sizing = Sizing.normal): FontStyle {
		return sizes[sizing].font;
	}

	public static fontSize(sizing: Sizing = Sizing.normal): number {
		return sizes[sizing].font.size;
	}

	public static fontSizePX(
		sizing: Sizing = Sizing.normal,
		scale: number = 1.0
	): string {
		return calc(sizes[sizing].font.sizepx, `* ${scale}`);
	}

	public static fontSizeREM(
		sizing: Sizing = Sizing.normal,
		scale: number = 1.0
	): string {
		return calc(sizes[sizing].font.sizerem, `* ${scale}`);
	}

	public static lineHeightPX(sizing: Sizing = Sizing.normal): string {
		return sizes[sizing].font.lineHeight;
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
	public static next(sizing: Sizing = Sizing.normal): Styling {
		switch (sizing) {
			case Sizing.xxsmall:
				return sizes[Sizing.xsmall];
			case Sizing.xsmall:
				return sizes[Sizing.small];
			case Sizing.small:
				return sizes[Sizing.normal];
			case Sizing.large:
				return sizes[Sizing.xlarge];
			case Sizing.xlarge:
				return sizes[Sizing.xxlarge];
			case Sizing.xxlarge:
				return sizes[Sizing.xxlarge];

			case Sizing.normal:
			case Sizing.medium:
				return sizes[Sizing.large];

			default:
				return sizes[Sizing.normal];
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
	public static prev(sizing: Sizing = Sizing.normal): Styling {
		switch (sizing) {
			case Sizing.xxsmall:
				return sizes[Sizing.xxsmall];
			case Sizing.xsmall:
				return sizes[Sizing.xxsmall];
			case Sizing.small:
				return sizes[Sizing.xsmall];
			case Sizing.large:
				return sizes[Sizing.normal];
			case Sizing.xlarge:
				return sizes[Sizing.large];
			case Sizing.xxlarge:
				return sizes[Sizing.xlarge];

			case Sizing.normal:
			case Sizing.medium:
				return sizes[Sizing.small];

			default:
				return sizes[Sizing.normal];
		}
	}

	public static styling(sizing: Sizing = Sizing.normal): Styling {
		return sizes[sizing];
	}

	/**
	 * Returns the Sizing enum value associated with the given sizing.
	 * @param sizing {Sizing} an optional parameter that allows for overriding
	 * the default sizing when the class is created.
	 * @returns a refernce to a Sizing enum value.
	 */
	public static type(sizing: Sizing = Sizing.normal): Sizing {
		return sizes[sizing].type;
	}

	/**
	 * Checks the previous and incoming props for sizing changes.  If the control
	 * has children, then they are each updated with the sizing change.
	 * @param props {P} the previous properties on the component
	 * @param nextPrpos {P} the new properties for the component
	 * @return {any} a new set of children if the size has changed.  If the props
	 * do not have chilren, then NULL is returned.
	 */
	protected resizeChildren(props: P, nextProps: P): any {
		if (props.children && nextProps.children) {
			if (props.sizing !== nextProps.sizing) {
				// debug('Children prop sizing change');
				return React.Children.map(nextProps.children, (child: any) => {
					if (child.props && "sizing" in child.props) {
						return React.cloneElement(child, {
							sizing: nextProps.sizing
						});
					} else {
						return child;
					}
				});
			}
		}

		// debug('no children props to resize: props: %O, nextProps: %O', props, nextProps);
		return nextProps.children;
	}

	/**
	 * Each component has a getDerivedStateFromProps call.  This method is used
	 * by that call to set state properties that are common to all components.  It
	 * is checked for changes before the update will go through (so updates can be
	 * avoided when not needed).  The method contains a 3rd parameter flag to
	 * force this to return a new object instead of null.
	 * @param props {P} - the set of props that will be updated
	 * @param state {S} - the current state object when called
	 * @param forceUpdate=false {boolean} - force the state to return an object for
	 * update
	 * @return {S} a new, mutated state that will be merged into the current state
	 */
	public static getDerivedStateFromProps(
		props: any,
		state: any,
		forceUpdate: boolean = false
	): any {
		let newState: any = null;
		let dirty: boolean = forceUpdate;

		if (state && props) {
			newState = {...state};

			if ("style" in newState) {
				newState.style = {
					...BaseComponent.defaultStyles,
					...newState.style,
					...props.style
				};

				if (!isEqual(newState.style, state.style)) {
					dirty = true;
				}

				if (props.color) {
					newState.style["color"] = props.color;
					dirty = true;
				}

				if (props.backgroundColor) {
					newState.style["backgroundColor"] = props.backgroundColor;
					dirty = true;
				}

				if (props.borderColor) {
					newState.style["borderColor"] = props.borderColor;
					dirty = true;
				}
			}

			if ("sizing" in newState && props.sizing !== newState.sizing) {
				newState.sizing = props.sizing;
				dirty = true;
			}
		}

		if (dirty) {
			return newState;
		} else {
			return null;
		}
	}

	/**
	 * Used in each render() call for a component to properly setup up the
	 * className property used in that component
	 * @param classNames=null {string|string[]} - Allows the render method
	 * to add additional classes when building the default className
	 * @return a string that represents the current className string for
	 * a component.
	 */
	protected updateClassName(classNames: string | string[] = null): string {
		this._className.clear();
		this._className.add(this._defaultClassName);
		this._className.add(classNames);

		if (
			this.props.className &&
			!this._className.contains(this.props.className)
		) {
			this._className.add(this.props.className);
		}

		this._className.onIf(this.props.ripple && !this.props.disabled)(
			"ripple"
		);
		this._className.onIf(this.props.disabled)("nohover");

		if ("selected" in this.props) {
			this._className.onIf(this.props.selected)("ui-selected");
		}

		return this._className.value;
	}
}
