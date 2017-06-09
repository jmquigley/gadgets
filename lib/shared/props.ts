'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nil} from 'util.toolbox';

export interface BaseProps {
	backgroundColor?: string;
	borderColor?: string;
	children?: React.ReactNode;
	className?: string;
	classes?: string[];
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
		classes: [],
		color: 'inherit',
		contentEditable: false,
		disabled: false,
		id: '',
		noedit: false,
		noripple: false,
		onBlur: nil,
		onChange: nil,
		onClick: nil,
		onClose: nil,
		onDoubleClick: nil,
		onKeyPress: nil,
		onKeyDown: nil,
		onMouseOut: nil,
		selected: false,
		style: {},
		visible: true
	});
}
