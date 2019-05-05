/**
 * This component creates a grouping of Option components.  Within the group
 * only one option can be selected at a time.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/optionGroup.png" width="50%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {OptionGroup} from 'gadgets';
 *
 * <OptionGroup
 *     default="option1"
 *     disabled={this.props['disabled']}
 *     onSelect={this.handleSelect}
 *     options={[
 *         'option1',
 *         'option2',
 *         'option3',
 *         'option4 this is a longer string'
 *     ]}
 *     optionType={OptionType.circle}
 *     sizing={this.props['sizing']}
 *     title="test options"
 * />
 * ```
 *
 * #### Events
 * - `onSelect(text: string)` - When an option is selected in the group this
 * callback is invoked.  The text value of the option is passed to the
 * function.
 *
 * #### Styles
 * - `ui-option-group` - The global style applied to the container `div` around
 * the component.
 * - `ui-option-group-title` - The style applied to the `title` property
 *
 * #### Properties
 * - `default: {string}: ('')` - The default option selected when the control
 * is created.
 * - `optionType: {OptionType} (square)` - The Option component has 10 distinct
 * graphics.  This option sets that choice.
 * - `options: {string[]} []` - an array of of strings that represent the
 * option choices.
 * - `title: {string} ('')` - a string that represents the option group title
 *
 * @module OptionGroup
 */

// const debug = require('debug')('gadgets.OptionGroup');

import autobind from "autobind-decorator";
import {OrderedMap} from "immutable";
import * as React from "react";
import {nilEvent} from "util.toolbox";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Sizing,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";
import {Title, TitleLayout} from "../title";
import {Option, OptionType} from "./Option";

export interface OptionGroupProps extends BaseProps {
	default?: string;
	onSelect?: (text: string) => void;
	optionType?: OptionType;
	options?: string[];
	title?: string;
}

export function getDefaultOptionGroupProps(): OptionGroupProps {
	return {
		...getDefaultBaseProps(),
		obj: "OptionGroup",
		default: "",
		onSelect: nilEvent,
		optionType: OptionType.square,
		options: [],
		title: ""
	};
}

export interface OptionGroupState extends BaseState {
	options?: OrderedMap<string, boolean>;
}

export function getDefaultOptionGroupState(): OptionGroupState {
	return {
		...getDefaultBaseState(),
		options: null
	};
}

const StyledOptionGroup: any = styled.div`
	border: solid 1px ${(props: OptionGroupProps) => props.theme.borderColor};
	display: inline-flex;
	flex-direction: column;
	margin: ${(props: OptionGroupProps) => {
		switch (props.sizing) {
			case Sizing.xxsmall:
				return "0.25rem 0 0 0";
			case Sizing.xsmall:
				return "0.4rem 0 0 0";
			case Sizing.small:
				return "0.6rem 0 0 0";
			case Sizing.large:
				return "1.3rem 0 0 0";
			case Sizing.xlarge:
				return "1.7rem 0 0 0";
			case Sizing.xxlarge:
				return "2.5rem 0 0 0";

			case Sizing.normal:
			default:
				return "0.8rem 0 0 0";
		}
	}};
	padding: 0.6rem;
	position: relative;

	${(props: OptionGroupProps) => props.sizing && fontStyle[props.sizing]}
	${(props: OptionGroupProps) => invisible(props)}
`;

const StyledTitle: any = styled(Title)`
	background-color: ${(props: OptionGroupProps) =>
		props.theme.backgroundColor};
	left: 0.3rem;
	padding: 0 0.33rem;
	position: absolute;
	top: -${(props: OptionGroupProps) => {
			switch (props.sizing) {
				case Sizing.xxsmall:
					return "0.25rem";
				case Sizing.xsmall:
					return "0.4rem";
				case Sizing.small:
					return "0.6rem";
				case Sizing.large:
					return "1.3rem";
				case Sizing.xlarge:
					return "1.7rem";
				case Sizing.xxlarge:
					return "2.5rem";

				case Sizing.normal:
				default:
					return "0.80rem";
			}
		}};
`;

export class OptionGroup extends BaseComponent<
	OptionGroupProps,
	OptionGroupState
> {
	private static readonly defaultProps: OptionGroupProps = getDefaultOptionGroupProps();

	constructor(props: OptionGroupProps) {
		super(props, "ui-option-group", OptionGroup.defaultProps.style);

		this.state = {
			...getDefaultOptionGroupState(),
			options: this.handleOptions(this.props.options, this.props.default)
		};
	}

	private buildOptionList() {
		const options: any = [];

		for (const [text, toggle] of this.state.options.entries()) {
			options.push(
				<Option
					controlled={false}
					disabled={this.props.disabled}
					initialToggle={toggle}
					key={text}
					onSelect={this.handleSelection}
					optionType={this.props.optionType}
					selected={toggle}
					sizing={this.props.sizing}
					text={text}
				/>
			);
		}

		return options;
	}

	@autobind
	private handleOptions(labels: string[], selected: string) {
		let options: OrderedMap<string, boolean> = OrderedMap();
		for (const label of labels) {
			options = options.set(label, label === selected);
		}

		return options;
	}

	@autobind
	private handleSelection(toggle: boolean, text: string) {
		if (!this.props.disabled && this.props.visible) {
			toggle = toggle;
			this.setState(
				{
					options: this.handleOptions(this.props.options, text)
				},
				() => {
					this.props.onSelect(text);
				}
			);
		}
	}

	public render() {
		this.updateClassName();

		return (
			<Wrapper {...this.props}>
				<StyledOptionGroup
					className={this.className}
					sizing={this.props.sizing}
				>
					<StyledTitle
						className='ui-option-group-title'
						layout={TitleLayout.none}
						noedit
						noripple
						sizing={this.props.sizing}
						title={this.props.title}
					/>
					{this.buildOptionList()}
				</StyledOptionGroup>
			</Wrapper>
		);
	}
}

export default OptionGroup;
