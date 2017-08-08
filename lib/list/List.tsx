// TODO: add List documentation

//
// This is a container element that holds the contents of a list.  It creates
// the `<ul>` tag that will hold all of the `<li>` tags.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {toggleOnIf} from 'util.toggle';
import {join, nilEvent} from 'util.toolbox';
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';
import {ListItem} from './index';

export interface ListProps extends BaseProps {
	alternating?: boolean;
	onAdd?: any;
	unselect?: boolean;
}

export function getDefaultListProps(): ListProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			alternating: false,
			onAdd: nilEvent,
			unselect: false
		})
	);
}

export interface ListState {
	selectedItem: ListItem;
}

export class List extends BaseComponent<ListProps, ListState> {

	public static defaultProps: ListProps = getDefaultListProps();

	private _rootClasses: Set<string>;

	constructor(props: ListProps) {
		super(props, require('./styles.css'));

		this._rootClasses = new Set<string>([
			'ui-list',
			this.styles.list

		]);

		this.state = {
			selectedItem: null
		};

		this.bindCallbacks('selectHandler');
		this.componentWillUpdate(props);
	}

	private selectHandler(item: ListItem) {
		if (this.state.selectedItem != null
			&& item.props.id === this.state.selectedItem.props.id) {
			item = null;
		}

		this.setState({
			selectedItem: item
		});
	}

	public componentWillUpdate(nextProps: ListProps) {
		toggleOnIf(this._rootClasses, nextProps.alternating)(
			this.styles.listAlternating
		);

		this.buildCommonStyles(this._rootClasses, nextProps);
	}

	public render() {
		const selectedKey = (this.state.selectedItem && this.state.selectedItem.props.id) || null;
		const children = React.Children.map(this.props.children, child => {
			const selected = child['props'].id === selectedKey;
			return React.cloneElement(child as any, {
				href: {
					selectHandler: this.selectHandler,
					sizing: this.props.sizing
				},
				selected: (this.props.unselect) ? false : selected
			});
		});

		return (
			<div
				className={join(this._rootClasses, ' ')}
				id={this.props.id}
				style={this.inlineStyle}
			>
				<ul>
					{children}
				</ul>
			</div>
		);
	}
}
