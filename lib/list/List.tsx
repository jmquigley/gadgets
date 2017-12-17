// TODO: add List documentation

//
// This is a container element that holds the contents of a list.  It creates
// the `<ul>` tag that will hold all of the `<li>` tags.
//

'use strict';

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Keys} from 'util.keys';
import {nilEvent} from 'util.toolbox';
import {BaseComponent, BaseProps, getDefaultBaseProps, getTheme} from '../shared';
import styled, {ThemeProvider} from '../shared/themed-components';
import {ListItem} from './index';

export interface ListProps extends BaseProps {
	alternating?: boolean;
	children?: React.ReactNode;
	noselect?: boolean;
	onAdd?: any;
}

export function getDefaultListProps(): ListProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			alternating: false,
			children: null,
			noselect: false,
			obj: 'List',
			onAdd: nilEvent
		})
	);
}

export interface ListState {
	selectedItem: ListItem;
}

export const ListView: any = styled.ul`
	border: solid 1px ${props => props.theme.borderColor};
	list-style: none;

	${(props: ListProps) => props.alternating &&
		'> li:nth-child(2n) {background: #e6e6e6;}'
	}
`;

export class List extends BaseComponent<ListProps, ListState> {

	private _children: any;
	private _keys: Keys;

	public static defaultProps: ListProps = getDefaultListProps();

	constructor(props: ListProps) {
		super(props, List.defaultProps.style);

		this._keys = new Keys({testing: this.props.testing});
		this._classes.add('ui-list');
		this._children = this.props.children;

		this.state = {
			selectedItem: null
		};

		this.componentWillReceiveProps(this.props);
		this.componentWillUpdate(this.props);
	}

	@autobind
	private selectHandler(item: ListItem) {
		if (this.state.selectedItem != null
			&& item.props.id === this.state.selectedItem.props.id) {
			item = null;
		}

		this.setState({
			selectedItem: item
		});
	}

	public componentWillReceiveProps(nextProps: ListProps) {
		if (nextProps.children) {
			this._children = React.Children.map(nextProps.children, (child: any, idx: number) => (
				React.cloneElement(child, {
					// only generate an id/key if one is not given with the props
					id: child['props']['id'] || this._keys.at(idx),
					key: child['key'] || this._keys.at(idx),
					sizing: nextProps.sizing
				})
			));
		}
	}

	public render() {
		const selectedKey = (this.state.selectedItem && this.state.selectedItem.props.id) || null;
		const children = this._children.map(child => {
			const selected = child['props'].id === selectedKey;
			return React.cloneElement(child as any, {
				selected: !this.props.noselect && selected,
				href: {
					selectHandler: this.selectHandler,
					sizing: this.props.sizing
				}
			});
		});

		return (
			<ThemeProvider theme={getTheme()}>
				<ListView
					alternating={this.props.alternating}
					className={this.classes}
					style={this.inlineStyles}
				>
					{children}
				</ListView>
			</ThemeProvider>
		);
	}
}
