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
 *     onSelect{(val: DropdownDataType) => {// process value}}
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onSelect(val: string)` - The value (id) of the item that was selected
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

import autobind from "autobind-decorator";
import * as React from "react";
import {sprintf} from "sprintf-js";
import {calc} from "util.calc";
import {Keys} from "util.keys";
import {nilEvent} from "util.toolbox";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Sizing,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";
import {tooltip} from "../tooltip";

export interface DropdownOption {
	value: string;
	label: string;
}

export type DropdownDataType = string | number;

export interface DropdownProps extends BaseProps {
	defaultVal?: string;
	initialItem?: string;
	items?: DropdownOption[];
	onSelect?: (val: DropdownDataType) => void;
}

export function getDefaultDropdownProps(): DropdownProps {
	return {
		...getDefaultBaseProps(),
		initialItem: "",
		items: [],
		obj: "Dropdown",
		onSelect: nilEvent
	};
}

export interface DropdownState extends BaseState {
	currentValue: string;
}

export function getDefaultDropdownState(): DropdownState {
	return {...getDefaultBaseState("ui-dropdown"), currentValue: ""};
}

const DropdownContainerView: any = styled.div`
	position: relative;
	${(props: DropdownProps) => props.sizing && fontStyle[props.sizing]};
`;

const DropdownView: any = styled.select`
	-webkit-appearance: none;
	-webkit-border-radius: 0px;
	background-position: 100% 50%;
	background-repeat: no-repeat;
	font-size: inherit;
	height: 100%;

	${(props: DropdownProps) => disabled(props)}
	${(props: DropdownProps) => invisible(props)}
`;

const chevronImage: string = `url("data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='%s' height='%s' viewBox='0 0 24 24'><path fill='#444' d='M7.406 7.828l4.594 4.594 4.594-4.594 1.406 1.406-6 6-6-6z'></path></svg>")`;

export class Dropdown extends BaseComponent<DropdownProps, DropdownState> {
	private _keys: Keys;

	public static readonly defaultProps: DropdownProps = getDefaultDropdownProps();

	constructor(props: DropdownProps) {
		super(props, Dropdown.defaultProps.style);

		this.state = {
			...getDefaultDropdownState(),
			currentValue: this.props.defaultVal,
			style: this.getChevronStyle(props.sizing)
		};

		this._keys = new Keys({testing: this.props.testing});
	}

	private getChevronStyle(sizing: Sizing) {
		const size = BaseComponent.fontSizePX(sizing);
		const chevron = sprintf(chevronImage, size);

		return {
			backgroundImage: chevron,
			paddingRight: size,
			paddingLeft: calc(size, "* 0.2")
		};
	}

	@autobind
	private handleChange(e: React.FormEvent<HTMLSelectElement>) {
		if (!this.props.disabled && this.props.visible) {
			const val: DropdownDataType = e.currentTarget.value;
			this.setState(
				{
					currentValue: String(val)
				},
				() => {
					this.props.onSelect(val);
				}
			);
		}
	}

	public componentDidUpdate(prevProps: DropdownProps) {
		if (prevProps.sizing !== this.props.sizing) {
			this.setState({
				style: this.getChevronStyle(this.props.sizing)
			});
		}
	}

	public render() {
		const options: any[] = this.props.items.map(({value, label}, idx) => (
			<option key={this._keys.at(idx)} value={value}>
				{label}
			</option>
		));

		return (
			<Wrapper {...this.props}>
				<DropdownContainerView
					className='ui-dropdown-container'
					sizing={this.props.sizing}
				>
					<DropdownView
						className={this.state.classes.classnames}
						disabled={this.props.disabled}
						id={this.id}
						onChange={this.handleChange}
						style={this.state.style}
						value={this.state.currentValue}
					>
						{options}
					</DropdownView>
					{tooltip(this.id, this.props)}
				</DropdownContainerView>
			</Wrapper>
		);
	}
}

export default Dropdown;
