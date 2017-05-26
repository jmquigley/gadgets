import * as React from 'react';

export interface BaseProps {
	backgroundColor?: string;
	children?: React.ReactNode;
	classes?: string[];
	color?: string;
	enabled?: boolean;
	id?: string;
	key?: string;
	onClick?: any;
	style?: any;
	visible?: boolean;
}
