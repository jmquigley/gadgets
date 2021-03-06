/**
 * The following properties are shared by all components in the library
 *
 * ## API
 * #### Properties
 * The following are the properties on the BaseProps object used by most
 * components.
 *
 * - `className: {string} ('')` - the global classname string that will be applied
 * to the given component
 * - `contentEditable: {boolean} (false)` - this will make the control editable.  This
 * is used in controls like the Label to allow changing the string contents.
 * - `controlled: {boolean} (true)` - A controlled component is one where the component
 * manages the internal state.  When this is false, then the state is managed via props
 * to the control (e.g. selected on Option or ButtonToggle).
 * - `direction`
 * - `disabled: {boolean} (false)` - if true then then the control is disabled.
 * - `errorMessage {string} ('')` - An error message that is passed into the
 * component.
 * - `focus {boolean} (false)` - if true, the component has the focus.  This is
 * not used on all components.
 * - `id: {string} ('')` - the CSS id field.  This is used to uniquely identify a
 * component (for CSS)
 * - `location: {Location} (Location.none)` - Sets the positional location style for a
 * control (see the Location enumeration below).
 * - `noedit: {boolean} (false)` - When this is set the contents of the control can't be
 * changed.
 * - `nohover: {boolean} (false)` - Controls that use a hover can use the nohover to
 * turn off that function.
 * - `noripple: {boolean} (false)` - turns off the ripple effect for a button.
 * - `notheme: {boolean} (false)` - suppress the theme provider if set to true.
 * - `obj {string} ('Unknown')` - a string that names a component.  We can't use the
 * class name to represent the name of a component because it is lost when the app
 * is minified.  This is used to preserve the name of the component in props.
 * - `selected: {boolean} (false)` - if true, then this component was selected via a
 * mouse click (such as the ListItem).  If false, then it was not clicked.
 * - `sizing: {Sizing} (Sizing.normal)` - The component sizing for the control.  It is
 * set to `Sizing.normal` by default which represents 1.0em.
 * - `style: {object} ({})` - an object of key value/pairs that represent CSS style
 * settings
 * - `testing {boolean} (false)` - if set to true, then the component is being used
 * under test.  Some components will generate unique UUID values that will differ
 * on each execution of the program.  This can be used in cases where a stable, deterministic
 * id is needed.
 * - `visible: {boolean} (true)` - turns the display of this control on or off.  If true,
 * then the component can be seen.
 *
 * ### Enumerations
 *
 * ##### Direction
 * - up
 * - down
 * - left
 * - right
 *
 * ##### Location
 * - none
 * - topLeft
 * - top
 * - topRight
 * - middleLeft
 * - middle
 * - middleRight
 * - bottomLeft
 * - bottom
 * - bottomRight
 *
 * @module BaseProps
 */

import {css, DefaultTheme} from "styled-components";
import {Sizing} from "./sizing";
import {getTheme} from "./themes";

export enum Direction {
	up = "up",
	top = "top",
	down = "down",
	bottom = "bottom",
	left = "left",
	right = "right"
}

export enum Justify {
	left,
	right,
	center
}

export enum Location {
	none = "none",
	topLeft = "topLeft",
	top = "top",
	topRight = "topRight",
	middleLeft = "middleLeft",
	middle = "middle",
	middleRight = "middleRight",
	bottomLeft = "bottomLeft",
	bottom = "bottom",
	bottomRight = "bottomRight",
	left = "left",
	right = "right"
}

export enum SortOrder {
	ascending,
	descending
}

export interface Styles {
	[key: string]: string;
}

export interface BaseProps {
	backgroundColor?: string;
	border?: string;
	borderColor?: string;
	bottom?: string;
	children?: any;
	className?: string;
	color?: string;
	controlled?: boolean;
	direction?: Direction;
	disabled?: boolean;
	err?: any;
	errorMessage?: string;
	focus?: boolean;
	height?: string;
	hidden?: boolean;
	id?: string;
	left?: string;
	location?: Location;
	maxHeight?: string;
	maxWidth?: string;
	minHeight?: string;
	minWidth?: string;
	noborder?: boolean;
	noedit?: boolean;
	nohover?: boolean;
	nopropagation?: boolean;
	notheme?: boolean;
	notooltip?: boolean;
	obj?: string;
	padding?: string;
	ripple?: boolean;
	selected?: boolean;
	sizing?: Sizing;
	style?: Styles;
	testing?: boolean;
	theme?: DefaultTheme;
	tooltip?: string;
	top?: string;
	visible?: boolean;
	width?: string;
	xcss?: any;
}

export const defaultBaseProps: BaseProps = {
	backgroundColor: null,
	border: null,
	borderColor: null,
	bottom: null,
	children: null,
	className: null,
	color: null,
	controlled: true,
	direction: Direction.right,
	disabled: false,
	err: null,
	errorMessage: null,
	focus: false,
	height: null,
	hidden: false,
	id: null,
	left: null,
	location: Location.none,
	maxHeight: null,
	maxWidth: null,
	minHeight: null,
	minWidth: null,
	noborder: false,
	noedit: false,
	nohover: false,
	nopropagation: false,
	notheme: false,
	notooltip: false,
	padding: null,
	ripple: false,
	selected: false,
	sizing: Sizing.normal,
	style: {},
	testing: process.env.NODE_ENV !== "production",
	theme: getTheme(),
	tooltip: null,
	top: null,
	visible: true,
	width: null,
	xcss: null
};

export const HiddenCSS: any = css`
	display: none !important;
	width: 0 !important;
`;

export function hidden(props: BaseProps) {
	if (props && "hidden" in props && props.hidden) {
		return HiddenCSS;
	}

	return "";
}

export const DisabledCSS: any = css`
	cursor: default;
	opacity: 0.5;
	user-select: none;
`;

export function disabled(props: BaseProps) {
	if (props && props.disabled != null && props.disabled) {
		return DisabledCSS;
	}

	return "";
}

export const InvisibleCSS: any = css`
	display: none !important;
	width: 0 !important;
`;

export function invisible(props: BaseProps) {
	if (props && props.visible != null && !props.visible) {
		return InvisibleCSS;
	}

	return "";
}

export const locationStyle: any = {
	[Location.none]: css``,
	[Location.topLeft]: css`
		top: 0;
		left: 0;
		transform: translateY(-50%);
	`,
	[Location.top]: css`
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
	`,
	[Location.topRight]: css`
		top: 0;
		right: 0;
		transform: translateY(-50%);
	`,
	[Location.middleLeft]: css`
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	`,
	[Location.middle]: css`
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	`,
	[Location.middleRight]: css`
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	`,
	[Location.bottomLeft]: css`
		top: 100%;
		left: 0;
		transform: translateY(-50%);
	`,
	[Location.bottom]: css`
		top: 100%;
		left: 50%;
		transform: translate(-50%, -50%);
	`,
	[Location.bottomRight]: css`
		top: 100%;
		right: 0;
		transform: translateY(-50%);
	`,
	[Location.right]: css`
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	`,
	[Location.left]: css`
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	`
};

export const borderStyle: any = {
	[Sizing.xxsmall]: css`
		border: solid 0.1em;
	`,
	[Sizing.xsmall]: css`
		border: solid 0.1em;
	`,
	[Sizing.small]: css`
		border: solid 0.125em;
	`,
	[Sizing.medium]: css`
		border: solid 0.15em;
	`,
	[Sizing.normal]: css`
		border: solid 0.15em;
	`,
	[Sizing.large]: css`
		border: solid 0.2em;
	`,
	[Sizing.xlarge]: css`
		border: solid 0.25em;
	`,
	[Sizing.xxlarge]: css`
		border: solid 0.3em;
	`,
	[Sizing.inherit]: css`
		border: inherit;
	`
};
