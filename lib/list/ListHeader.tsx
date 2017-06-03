//
// Generates a single header element that will be contained within a
// List.  This resolved to the `<li>` tag with special CSS selectors
// for a header.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {baseClasses, getDefaultItemProps, ItemComponent, ItemProps} from '../shared';

const styles = require('./styles.css');

export interface ListHeaderProps extends ItemProps {
}

export function getDefaultListHeaderProps(): ListHeaderProps {
	return cloneDeep(Object.assign(
		getDefaultItemProps(), {
		}));
}

export interface ListHeaderState {
}

export class ListHeader extends React.Component<ListHeaderProps, ListHeaderState> {

	public static defaultProps: ListHeaderProps = getDefaultListHeaderProps();

	constructor(props: ListHeaderProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = baseClasses(this.props);

		l.push(styles.listHeader);
		l.push('ui-list-header');

		return l;
	}

	render() {
		return (
			<ItemComponent
				{...this.props}
				classes={this.buildClasses()}
			/>
		);
	}
}
