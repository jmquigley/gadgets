"use strict";

import {Sizing} from "./sizing";

export interface BaseState {
	children?: any;
	sizing?: Sizing;
	style?: any;
}

export function getDefaultBaseState(): BaseState {
	return {
		children: null,
		sizing: Sizing.normal,
		style: {}
	};
}
