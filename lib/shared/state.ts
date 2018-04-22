'use strict';

import {cloneDeep} from 'lodash';
import {ClassNames} from 'util.classnames';

export interface BaseState {
	classes?: ClassNames;
}

const defaultBaseState: BaseState = {
	classes: new ClassNames()
};

export function getDefaultBaseState(): BaseState {
	return cloneDeep(defaultBaseState);
}
