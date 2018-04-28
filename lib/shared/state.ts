'use strict';

import {cloneDeep} from 'lodash';
import {ClassNames} from 'util.classnames';

export interface BaseState {
	children?: any;
	classes?: ClassNames;
	style?: any;
}

const defaultBaseState: BaseState = {
	children: null,
	classes: new ClassNames(),
	style: {}
};

export function getDefaultBaseState(): BaseState {
	return cloneDeep(defaultBaseState);
}
