/**
 * {description}
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/dropdown.png" width="60%" />
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
 * @module Dropdown
 */

// TODO: add Dropdown documentation

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {calc} from 'util.calc';
import {Keys} from 'util.keys';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps
} from '../shared';

export interface DropdownOption {
	val: string;
	label: string;
}

export interface DropdownProps extends BaseProps {
	defaultVal?: string;
	items?: DropdownOption[];
	onSelect?: any;
}

export function getDefaultDropdownProps(): DropdownProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			initialItem: '',
			items: [],
			onSelect: nilEvent
		})
	);
}

export interface DropdownState {
	currentValue: string;
}

export class Dropdown extends BaseComponent<DropdownProps, DropdownState> {

	private _keys: Keys;
	private _options: any[] = [];

	public static readonly defaultProps: DropdownProps = getDefaultDropdownProps();

	constructor(props: DropdownProps) {
		super(props, require('./styles.css'), Dropdown.defaultProps.style);

		this.state = {
			currentValue: this.props.defaultVal
		};

		this._keys = new Keys({testing: this.props.testing});

		this._rootStyles.add([
			'ui-dropdown',
			this.styles.dropdown
		]);

		this.bindCallbacks(
			'handleChange'
		);

		this.componentWillReceiveProps(this.props);
		this.componentWillUpdate(this.props, this.state);
	}

	public componentWillReceiveProps(nextProps: DropdownProps) {

		const size: string = this.fontSizePX();
		const chevron: string = `url("data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='${size}' height='${size}' viewBox='0 0 24 24'><path fill='#444' d='M7.406 7.828l4.594 4.594 4.594-4.594 1.406 1.406-6 6-6-6z'></path></svg>")`;

		this.inlineStyles = {
			backgroundImage: chevron,
			paddingRight: size,
			paddingLeft: calc(size, '* 0.2')
		};

		this._options = nextProps.items.map(({val, label}, idx) => (
			<option key={this._keys.at(idx)} value={val}>
			{label}
			</option>
		));
	}

	private handleChange(e: React.FormEvent<HTMLSelectElement>) {
		const val: string = e.currentTarget.value;
		this.setState({
			currentValue: val
		}, () => {
			this.props.onSelect(val);
		});
	}

	public render() {
		return(
			<select
				className={this._rootStyles.classnames}
				value={this.state.currentValue}
				disabled={this.props.disabled}
				onChange={this.props.disabled ? nilEvent : this.handleChange}
				style={this.inlineStyles}
			>
				{this._options}
			</select>
		);
	}
}
