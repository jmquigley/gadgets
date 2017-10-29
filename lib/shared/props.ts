/**
 * The following properties are shared by all components in the library
 *
 * #### Properties
 * The following are the properties on the BaseProps object used by most
 * components.
 *
 * - `className: {string} ('')` - the global classname string that will be applied
 * to the given component
 * - `contentEditable: boolean (false)` - this will make the control editable.  This
 * is used in controls like the Label to allow changing the string contents.
 * - `direction`
 * - `disabled: boolean (false)` - if true then then the control is disabled.
 * - `id: string ('')` - the CSS id field.  This is used to uniquely identify a
 * component (for CSS)
 * - `location: Location (Location.none)` - Sets the positional location style for a
 * control (see the Location enumeration below).
 * - `noedit: boolean (false)` - When this is set the contents of the control can't be
 * changed.
 * - `nohover: boolean (false)` - Controls that use a hover can use the nohover to
 * turn off that function.
 * - `noripple: boolean (false)` - turns off the ripple effect for a button.
 * - `selected: boolean (false)` - if true, then this component was selected via a
 * mouse click (such as the ListItem).  If false, then it was not clicked.
 * - `sizing: Sizing (Sizing.normal)` - The component sizing for the control.  It is
 * set to `Sizing.normal` by default which represents 1.0em.
 * - `style: object ({})` - an object of key value/pairs that represent CSS style
 * settings
 * - `visible: boolean (true)` - turns the display of this control on or off.  If true,
 * then the component can be seen.
 *
 *
 * #### Enumerations
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

'use strict';

import {cloneDeep} from 'lodash';
import {isTesting} from 'util.env';
import {Sizing} from './sizing';
import {css} from './themed-components';

export enum Color {
	black = '#000000',
	error = '#d9534f',
	info = '#5bc0de',
	silver = '#c0c0c0',
	success = '#5cb85c',
	warning = '#f0ad4e',
	white = '#ffffff'
}

export enum Direction {
	up = 'up',
	top = 'top',
	down = 'down',
	bottom = 'bottom',
	left = 'left',
	right = 'right'
}

export enum Justify {
	left,
	right,
	center
}

export enum Location {
	none = 'none',
	topLeft = 'topLeft',
	top = 'top',
	topRight = 'topRight',
	middleLeft = 'middleLeft',
	middle = 'middle',
	middleRight = 'middleRight',
	bottomLeft = 'bottomLeft',
	bottom = 'bottom',
	bottomRight = 'bottomRight',
	left = 'left',
	right = 'right'
}

export enum SortOrder {
	ascending,
	descending
}

export interface Styles {
	[key: string]: string;
}

export interface BaseProps {
	className?: string;
	contentEditable?: boolean;
	direction?: Direction;
	disabled?: boolean;
	focus?: boolean;
	height?: string;
	id?: string;
	location?: Location;
	noedit?: boolean;
	nohover?: boolean;
	noripple?: boolean;
	selected?: boolean;
	sizing?: Sizing;
	style?: Styles;
	testing?: boolean;
	theme?: any;
	visible?: boolean;
	width?: string;
	xcss?: any;
}

const defaultBaseProps: BaseProps = {
	className: '',
	contentEditable: false,
	direction: Direction.right,
	disabled: false,
	focus: false,
	height: '',
	id: '',
	location: Location.none,
	noedit: false,
	nohover: false,
	noripple: false,
	selected: false,
	sizing: Sizing.normal,
	style: {},
	testing: isTesting(),
	theme: {},
	visible: true,
	width: '',
	xcss: null
};

export function getDefaultBaseProps(): BaseProps {
	return cloneDeep(defaultBaseProps);
}

export const DisabledCSS: any = css`
	cursor: default;
	opacity: 0.33;
	overflow: hidden;
	user-select: none;
`;

export const InvisibleCSS: any = css`
	display: none !important;
	width: 0 !important;
`;
