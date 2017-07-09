/**
 * {description}
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button} from 'gadgets';
 * <Button iconName="cab" onClick={someFunction} />
 * ```
 *
 * #### Events
 * - `{name}` - {description}
 *
 * #### Styles
 * - `` - {description}
 *
 * #### Properties
 * - `{name}: {datatype}` - {description}
 *
 * @module List
 */

//
// This is a container element that holds the contents of a list.  It creates
// the `<ul>` tag that will hold all of the `<li>` tags.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
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

	constructor(props: ListProps) {
		super(props, require('./styles.css'));
		this.state = {
			selectedItem: null
		}

		this.selectHandler = this.selectHandler.bind(this);
		this.shouldComponentUpdate(props);
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

	shouldComponentUpdate(nextProps: ListProps): boolean {
		super.resetStyles(nextProps);

		this.classes.push('ui-list');
		this.classes.push(this.styles.list);

		if (nextProps.alternating) {
			this.classes.push(this.styles.listAlternating);
		}

		super.buildStyles(nextProps);
		return true;
	}

	render() {
		let selectedKey = (this.state.selectedItem && this.state.selectedItem.props.id) || null;
		let children = React.Children.map(this.props.children, child => {
			let selected = child['props'].id === selectedKey;
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
				className={this.classes.join(' ')}
				disabled={this.props.disabled}
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
