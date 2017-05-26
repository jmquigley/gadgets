//
// This is a container element that holds the contents of a list.  It creates
// the `<ul>` tag that will hold all of the `<li>` tags.
//

'use strict';

import * as React from 'react';
import {getUUID} from 'util.toolbox';
import {BaseProps} from '../../lib/props';
import {ListItem} from './index';

const styles = require('./styles.css');

export interface ListProps extends BaseProps {
	alternating?: boolean;
	unselect?: boolean;
}

export interface ListState {
	selectedItem: ListItem;
}

export const ListComponent = (props: ListProps) => (
    <ul
		disabled={props.enabled ? false : true}
		className={`ui ui-list ${props.classes.join(' ')}`}
		id={props.id}>
		{props.children}
	</ul>
);

export class List extends React.Component<ListProps, ListState> {

	public static defaultProps: ListProps = {
		alternating: false,
		classes: [],
		enabled: true,
		id: getUUID(true),
		unselect: false,
		visible: true
	}

	constructor(props: ListProps) {
		super(props);
		this.state = {
			selectedItem: null
		}
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);
		l.push(styles.list);

		if (this.props.alternating) {
			l.push(styles.listAlternating);
		}

		if (!this.props.visible) {
			l.push(styles.listInvisible);
			l.push(styles.listDisabled);
		}

		if (!this.props.enabled) {
			l.push(styles.listDisabled);
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
				selectHandler: this.selectHandler,
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
