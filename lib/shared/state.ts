'use strict';

import {cloneDeep} from 'lodash';
import {ClassNames} from 'util.classnames';
import {Sizing} from './sizing';

export interface BaseState {
	children?: any;
	classes?: ClassNames;
	sizing?: Sizing;
	style?: any;
}

const defaultBaseState: BaseState = {
	children: null,
	classes: new ClassNames(),
	sizing: Sizing.normal,
	style: null
};

export function getDefaultBaseState(): BaseState {
	return cloneDeep(defaultBaseState);
}
