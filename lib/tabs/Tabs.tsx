// TODO: add Tabs documentation
// TODO: add Tabs implementation

'use strict';

import {cloneDeep} from 'lodash';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Location
} from '../shared';

const styles = require('./styles.css');

export interface TabsProps extends BaseProps {
	maxTabs?: number;
	noclose?: boolean;
}

export function getDefaultTabsProps(): TabsProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			location: Location.top,
			maxTabs: 5,
			noclose: false
		})
	);
}

export class Tabs extends BaseComponent<TabsProps, undefined> {

	public static defaultProps: TabsProps = getDefaultTabsProps();

	constructor(props: TabsProps) {
		super(props, styles);
	}

	public render() {
		return (
			<div />
		);
	}
}
