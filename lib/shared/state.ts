'use strict';

import {cloneDeep} from 'lodash';
import {ClassNames} from 'util.classnames';

export interface BaseState {
	children?: any;
	classes?: ClassNames;
	style?: any;
}

// TODO: make classes null after converting constructors
export function getDefaultBaseState(className: string = 'ui-default'): BaseState {
	return cloneDeep({
		children: null,
		classes: new ClassNames(className),
		style: {}
	});
}
