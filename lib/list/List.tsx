//
// This is a container element that holds the contents of a list.  It creates
// the `<ul>` tag that will hold all of the `<li>` tags.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nil} from 'util.toolbox';
import {Button} from '../button';
import {Title} from '../title';
import {BaseProps, getDefaultBaseProps} from '../shared/props';
import {ListItem} from './index';

const styles = require('./styles.css');

export interface ListProps extends BaseProps {
	alternating?: boolean;
	header?: string;
	onAdd?: any;
	unselect?: boolean;
}

export function getDefaultListProps(): ListProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			alternating: false,
			header: '',
			onAdd: nil,
			unselect: false
		})
	);
}

export interface ListState {
	selectedItem: ListItem;
}

export const ListComponent = (props: ListProps) => {

	let header = null;
	if (props.header !== '') {
		header = (
			<div className={`ui-list-header ${styles.listHeader}`}>
			<Title {...props} noripple>{props.header}</Title>
			<Button iconName="plus" onClick={props.onAdd}/>
			</div>
		);
	}

	return (
		<div disabled={props.disabled} className={props.classes.join(' ')} id={props.id}>
		{header}
		<ul>
			{props.children}
		</ul>
		</div>
	);
};

export class List extends React.Component<ListProps, ListState> {

	public static defaultProps: ListProps = getDefaultListProps();

	constructor(props: ListProps) {
		super(props);
		this.state = {
			selectedItem: null
		}
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);

		if (this.props.className !== '') {
			l.push(this.props.className);
		}
		l.push(styles.list);
		l.push('ui-list');

		if (this.props.alternating) {
			l.push(styles.listAlternating);
		}

		if (!this.props.visible) {
			l.push(styles.invisible);
		}

		if (this.props.disabled) {
			l.push(styles.disabled);
		}

		return l;
	}

	private selectHandler = (item: ListItem) => {
		console.log(`Selected: ${item.props.id}`);
		if (this.state.selectedItem != null && item.props.id === this.state.selectedItem.props.id) {
			item = null;
		}

		this.setState({
			selectedItem: item
		});
	}

	render() {
		let selectedKey = (this.state.selectedItem && this.state.selectedItem.props.id) || null;
		let children = React.Children.map(this.props.children, child => {
			let selected = child['props'].id === selectedKey;
			return React.cloneElement(child as any, {
				href: {
					selectHandler: this.selectHandler
				},
				selected: (this.props.unselect) ? false : selected
			});
		});

		return (
			<ListComponent
				{...this.props}
				children={children}
				classes={this.buildClasses()}
			/>
		);
	}
}
