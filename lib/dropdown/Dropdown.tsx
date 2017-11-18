/**
 * A dropdown list using the HTML select/option elements.  An initial list of
 * values and their associated labels are given to the control.
 *
 * This is a static dropdown.  Use the `Select` dropdown for a dynamic
 * version.
 *
 * Items are placed into an array of structures of type `DropdownOption`.
 * Each option contains a value (the id)  and the dispay label.  This strucure
 * is used to build the `<option>` list under the `<select>`.  The user then
 * selects an option from this list.  The selection invoks an `onSelect`
 * callback.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/dropdown.png" width="20%" height="20%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Dropdown, DropdownOption} from 'gadgets';
 *
 * let options: DropdownOption[] = [
 *     {val: 'val1', label: 'label1'},
 *     {val: 'val2', label: 'label2'},
 *     {val: 'val3', label: 'label3'}
 * ];
 *
 * <Dropdown iconName="cab" onClick={someFunction}
 *     defaultVal='val1'
 *     items={options}
 *     onSelect{(val: string) => {// process value}}
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onSelect(val: any)` - The value (id) of the item that was selected
 * from the list.
 *
 * #### Styles
 * - `ui-dropdown` - A global style placed on the `<select>` element.
 *
 * #### Properties
 * - `initialItem: {string} ('')` - The initial id value from the list of
 * provided items.
 * - `items: {DropdownOption[]} ([])` - An array of items used to build
 * the list (see example above for construction).
 *
 * @module Dropdown
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {calc} from 'util.calc';
import {Keys} from 'util.keys';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	fontStyle,
	getDefaultBaseProps,
	getTheme
} from '../shared';
import {tooltip} from '../shared/helpers';
import styled, {ThemeProvider, withProps} from '../shared/themed-components';

export interface DropdownOption {
	value: string;
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
			obj: 'Dropdown',
			onSelect: nilEvent
		})
	);
}

export interface DropdownState {
	currentValue: string;
}

export const DropdownContainerView: any = withProps<DropdownProps, HTMLDivElement>(styled.div)`
	position: relative;
	${props => props.sizing && fontStyle[props.sizing]};
`;

export const DropdownView: any = styled.select`
	-webkit-appearance: none;
	-webkit-border-radius: 0px;
	background-position: 100% 50%;
	background-repeat: no-repeat;
	font-size: inherit;
	height: 100%;
`;

export class Dropdown extends BaseComponent<DropdownProps, DropdownState> {

	private _keys: Keys;
	private _options: any[] = [];

	public static readonly defaultProps: DropdownProps = getDefaultDropdownProps();

	constructor(props: DropdownProps) {
		super(props, Dropdown.defaultProps.style);

		this.state = {
			currentValue: this.props.defaultVal
		};

		this._keys = new Keys({testing: this.props.testing});
		this._classes.add(['ui-dropdown']);

		this.bindCallbacks(
			'handleChange'
		);

		this.componentWillReceiveProps(this.props);
		this.componentWillUpdate(this.props, this.state);
	}

	private handleChange(e: React.FormEvent<HTMLSelectElement>) {
		const val: any = e.currentTarget.value;
		this.setState({
			currentValue: String(val)
		}, () => {
			this.props.onSelect(val);
		});
	}

	public componentWillReceiveProps(nextProps: DropdownProps) {

		const size: string = this.fontSizePX();
		const chevron: string = `url("data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='${size}' height='${size}' viewBox='0 0 24 24'><path fill='#444' d='M7.406 7.828l4.594 4.594 4.594-4.594 1.406 1.406-6 6-6-6z'></path></svg>")`;

		this.inlineStyles = {
			backgroundImage: chevron,
			paddingRight: size,
			paddingLeft: calc(size, '* 0.2')
		};

		this._options = nextProps.items.map(({value, label}, idx) => (
			<option key={this._keys.at(idx)} value={value}>
			{label}
			</option>
		));
	}

	public render() {
		return(
			<ThemeProvider theme={getTheme()} >
				<DropdownContainerView
					className="ui-dropdown-container"
					sizing={this.props.sizing}
				>
					<DropdownView
						className={this.classes}
						disabled={this.props.disabled}
						id={this.id}
						onChange={this.props.disabled ? nilEvent : this.handleChange}
						style={this.inlineStyles}
						value={this.state.currentValue}
					>
						{this._options}
					</DropdownView>
					{tooltip(this.id, this.props)}
				</DropdownContainerView>
			</ThemeProvider>
		);
	}
}
