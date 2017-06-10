/**
 * The following properties are shared by all components in the library
 *
 * #### Events
 *
 * #### Styles
 *
 * #### Properties
 * - `classes: string[]` - an array of strings that represent custom CSS class
 * names that will be applied to the component.
 * - `disabled: boolean` - if true then then the control is disabled.  Defaults
 * to false.
 * - `noripple: boolean` - turns off the ripple effect for a button.  On by
 * default.
 * - `style: object` - an object of key value/pairs that represent CSS style
 * settings
 * - `visible: boolean` - turns the display of this control on or off.  If true,
 * then the component can be seen.  The default is true.
 *
 * @module BaseProps
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';

export interface BaseProps {
	backgroundColor?: string;
	borderColor?: string;
	children?: React.ReactNode;
	className?: string;
	color?: string;
	contentEditable?: boolean;
	disabled?: boolean;
	id?: string;
	noedit?: boolean;
	noripple?: boolean;
	onBlur?: any;
	onChange?: any;
	onClick?: any;
	onClose?: any;
	onDoubleClick?: any;
	onKeyDown?: any;
	onKeyPress?: any;
	onMouseOut?: any;
	selected?: boolean;
	style?: any;
	visible?: boolean;
}

export function getDefaultBaseProps(): BaseProps {
	return cloneDeep({
		backgroundColor: 'inherit',
		borderColor: 'inherit',
		children: null,
		className: '',
		color: 'inherit',
		contentEditable: false,
		disabled: false,
		id: '',
		noedit: false,
		noripple: false,
		onBlur: nilEvent,
		onChange: nilEvent,
		onClick: nilEvent,
		onClose: nilEvent,
		onDoubleClick: nilEvent,
		onKeyPress: nilEvent,
		onKeyDown: nilEvent,
		onMouseOut: nilEvent,
		selected: false,
		style: {},
		visible: true
	});
}
