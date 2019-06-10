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
 * selects an option from this list.  The selection invokes an `onSelection`
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
 *     initialValue='val1'
 *     items={options}
 *     onSelection{(val: DropdownDataType) => {// process value}}
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onSelection(val: string)` - The value (id) of the item that was selected
 * from the list.
 *
 * #### Styles
 * - `ui-dropdown` - A global style placed on the `<select>` element.
 * - `ui-dropdown-container` - a div container that wraps the dropdown component.
 *
 * #### Properties
 * - `initialValue="" {string}` - The initial id value from the list of
 * provided items.
 * - `items=[] {DropdownOption[]}` - An array of items used to build
 * the list (see example above for construction).
 *
 * @module Dropdown
 */

import autobind from "autobind-decorator";
import * as React from "react";
import {sprintf} from "sprintf-js";
import styled from "styled-components";
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
	getTheme,
	invisible,
	Sizing,
	Wrapper
} from "../shared";
import {tooltip} from "../tooltip";

export interface DropdownOption {
	value: string;
	label: string;
}

export type DropdownDataType = string | number;

export interface DropdownProps extends BaseProps {
	initialValue?: string;
	items?: DropdownOption[];
	onSelection?: (val: DropdownDataType) => void;
}

export function getDefaultDropdownProps(): DropdownProps {
	return {
		...getDefaultBaseProps(),
		initialValue: "",
		items: [],
		onSelection: nilEvent
	};
}

export interface DropdownState extends BaseState {
	currentValue: string;
}

export function getDefaultDropdownState(): DropdownState {
	return {...getDefaultBaseState(), currentValue: ""};
}

const DropdownContainerView: any = styled.div`
	position: relative;
	${(props: DropdownProps) => props.sizing && fontStyle[props.sizing]};
`;

const DropdownView: any = styled.select`
	-webkit-transition: all
		${(props: DropdownProps) => props.theme.transitionDelay} ease-in-out;
	-webkit-appearance: none;
	background-position: right;
	background-repeat: no-repeat;
	font-size: inherit;
	height: 100%;
	outline: none;

	&:focus {
		border: 1px solid ${(props: DropdownProps) => props.theme.outlineColor};
		box-shadow: 0 0 5px
			${(props: DropdownProps) => props.theme.outlineColor};
	}

	${(props: DropdownProps) => disabled(props)}
	${(props: DropdownProps) => invisible(props)}
`;

const chevronSVG: string = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='%s' height='%s' fill='%%23%s'><path d='M7.406 7.828l4.594 4.594 4.594-4.594 1.406 1.406-6 6-6-6z'/></svg>`;

const chevronImage: string = `url("data:image/svg+xml;utf8,${chevronSVG}")`;

function getChevronStyle(sizing: Sizing) {
	const theme = getTheme();
	const color = theme.chevronColor.replace("#", "");
	const height = BaseComponent.fontSizePX(sizing);
	const width = calc(height, "* 1.5");

	const chevron = sprintf(chevronImage, width, height, color);

	return {
		backgroundImage: chevron,
		paddingRight: width,
		paddingLeft: calc(width, "* 0.4")
	};
}

export class Dropdown extends BaseComponent<DropdownProps, DropdownState> {
	public static readonly defaultProps: DropdownProps = getDefaultDropdownProps();

	private _keys: Keys;

	constructor(props: DropdownProps) {
		super("ui-dropdown", Dropdown, props, {
			...getDefaultDropdownState(),
			currentValue: props.initialValue,
			style: getChevronStyle(props.sizing)
		});

		this._keys = new Keys({testing: this.props.testing});
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
					this.props.onSelection(val);
				}
			);
		}
	}

	public componentDidUpdate(prevProps: DropdownProps) {
		if (prevProps.sizing !== this.props.sizing) {
			this.setState({
				style: getChevronStyle(this.props.sizing)
			});
		}
	}

	public render() {
		super.render();

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
						className={this.className}
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
