// TODO: add Tab documentation
// TODO: add Tab implementation

'use strict';

import {cloneDeep} from 'lodash';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps
} from '../shared';

const styles = require('./styles.css');

export interface TabProps extends BaseProps {
	onClose?: any;
}

export function getDefaultTabProps(): TabProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			onClose: nilEvent
		})
	);
}

export class Tab extends BaseComponent<TabProps, undefined> {

	public static defaultProps: TabProps = getDefaultTabProps();

	constructor(props: TabProps) {
		super(props, styles);
	}

	public render() {
		return (
			<div />
		);
	}
}
