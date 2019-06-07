"use strict";

import {cloneDeep} from "lodash";
import {Sizing} from "./sizing";

export interface BaseState {
	children?: any;
	sizing?: Sizing;
	style?: any;
}

export function getDefaultBaseState(): BaseState {
	return cloneDeep({
		children: null,
		sizing: Sizing.normal,
		style: {}
	});
}
