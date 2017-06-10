//
// Generates a single header element that will be contained within a
// List.  This resolved to the `<li>` tag with special CSS selectors
// for a header.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {getDefaultItemProps, Item, ItemProps} from '../item';
import {baseClasses} from '../shared';

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

	private _classes: string = '';
	private _style: any = null;

	constructor(props: ListHeaderProps) {
		super(props);
	}

	private buildStyles = () => {
		this._style = Object.assign({}, this.props.style);

		this._classes = baseClasses(this.props);
		this._classes += " ui-list-header";
		this._classes += ` ${styles.listHeader}`;
	}

	render() {
		this.buildStyles();

		return (
			<Item
				{...this.props}
				className={this._classes}
				style={this._style}
			/>
		);
	}
}
