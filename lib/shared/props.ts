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
	disabled?: boolean;
	id?: string;
	noripple?: boolean;
	onClick?: any;
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
		disabled: false,
		id: '',
		noripple: false,
		onClick: nil,
		selected: false,
		style: {},
		visible: true
	});
}
