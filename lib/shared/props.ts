/**
 * The following properties are shared by all components in the library
 *
 * #### Properties
 * The following are the properties on the BaseProps object used by most
 * components.
 *
 * - `backgroundColor: string (inherit)` - the CSS background color for the control
 * - `borderColor: string (inherit)` - the CSS border color around the control.
 * - `children: React.ReactNode (null)` - the React child nodes that may exists
 * within this control (not all controls will have children i.e. self closed)
 * - `color: string (inherit)` - the CSS foreground color for the control.
 * - `contentEditable: boolean (false)` - this will make the control editable.  This
 * is used in controls like the Label to allow changing the string contents.
 * - `disabled: boolean (false)` - if true then then the control is disabled.
 * - `id: string ('')` - the CSS id field.  This is used to uniquely identify a
 * component (for CSS)
 * - `location: Location (Location.none)` - Sets the positional location style for a
 * control (see the Location enumeration below).
 * - `noedit: boolean (false)` - When this is set the contents of the control can't be
 * changed.
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
 * The `Location` enumeration contains the following values:
 *
 * - Location.none
 * - Location.topLeft
 * - Location.top
 * - Location.topRight
 * - Location.middleLeft
 * - Location.middle
 * - Location.middleRight
 * - Location.bottomLeft
 * - Location.bottom
 * - Location.bottomRight
 *
 * @module BaseProps
 */

'use strict';

import {cloneDeep} from 'lodash';
import {Sizing} from './sizing';

export enum Direction {
	up = 'up',
	down = 'down',
	left = 'left',
	right = 'right'
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
	bottomRight = 'bottomRight'
}

export interface BaseProps {
	backgroundColor?: string;
	borderColor?: string;
	borderWidth?: string;
	className?: string;
	color?: string;
	contentEditable?: boolean;
	direction?: Direction;
	disabled?: boolean;
	id?: string;
	location?: Location;
	noedit?: boolean;
	noripple?: boolean;
	selected?: boolean;
	sizing?: Sizing;
	style?: any;
	visible?: boolean;
}

export function getDefaultBaseProps(): BaseProps {
	return cloneDeep({
		backgroundColor: 'inherit',
		borderColor: 'inherit',
		borderWidth: 'none',
		className: '',
		color: 'inherit',
		contentEditable: false,
		direction: Direction.right,
		disabled: false,
		id: '',
		location: Location.none,
		noedit: false,
		noripple: false,
		selected: false,
		sizing: Sizing.normal,
		style: {},
		visible: true
	});
}
