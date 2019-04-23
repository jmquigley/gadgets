"use strict";

import {ClassNames} from "util.classnames";
import {Sizing} from "./sizing";

export interface BaseState {
	children?: any;
	classes?: ClassNames;
	sizing?: Sizing;
	style?: any;
}

export function getDefaultBaseState(
	className: string = "ui-default"
): BaseState {
	return {
		children: null,
		classes: new ClassNames(className),
		sizing: Sizing.normal,
		style: {}
	};
}
