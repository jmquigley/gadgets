'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nil} from 'util.toolbox';

export interface BaseProps {
	backgroundColor?: string;
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
	onClick?: any;
	onChange?: any;
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
		backgroundColor: '',
		children: null,
		className: '',
		classes: [],
		color: '',
		contentEditable: false,
		disabled: false,
		id: '',
		noedit: false,
		noripple: false,
		onBlur: nil,
		onClick: nil,
		onChange: nil,
		onDoubleClick: nil,
		onKeyPress: nil,
		onKeyDown: nil,
		onMouseOut: nil,
		selected: false,
		style: {},
		visible: true
	});
}
