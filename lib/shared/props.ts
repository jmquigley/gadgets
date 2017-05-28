import * as React from 'react';

export interface BaseProps {
	backgroundColor?: string;
	children?: React.ReactNode;
	className?: string;
	classes?: string[];
	color?: string;
	disabled?: boolean;
	id?: string;
	key?: string;
	onClick?: any;
	style?: any;
	visible?: boolean;
}
