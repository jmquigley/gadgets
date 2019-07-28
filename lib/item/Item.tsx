/**
 * A wrapper for the li component.  An item can have three parts:
 *
 * - Title block
 *   - Title String
 *   - Optional Widget
 * - Left Button
 * - Right Button
 *
 * This serves as a reusable component for List, Accordion, and DynamicList
 *
 * ## Screen:
 * See the List, Accordion, or DynamicList
 *
 * ## Examples:
 *
 * ```javascript
 *
 *
 * ```
 *
 * ## API
 * #### Events
 * -
 *
 * #### Styles
 * - `ui-item` - A global style placed on the `<li>` element.
 *
 * #### Properties
 * - `hiddenLeftButton=false {boolean}` - The state of the left button is set
 * to hidden and shown when hovering over the `li`.
 *
 * @module Item
 *
 */

// TODO: add Item documentation

import * as React from "react";
import styled, {css} from "styled-components";
import {sp} from "util.constants";
import {nilEvent} from "util.toolbox";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	defaultBaseProps,
	fontStyle,
	Sizing,
	Wrapper
} from "../shared";
import {Title, TitleLayout, TitleProps} from "../title/Title";

export interface ItemProps extends BaseProps, TitleProps {
	hiddenLeftButton?: boolean;
	hiddenRightButton?: boolean;
	leftButton?: any;
	layout?: TitleLayout;
	onBlur?: (e: React.FocusEvent<HTMLLIElement>) => void;
	onChange?: (...args) => void;
	onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
	onDoubleClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLLIElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLLIElement>) => void;
	onKeyPress?: (e: React.KeyboardEvent<HTMLLIElement>) => void;
	onMouseOut?: (e: React.MouseEvent<HTMLLIElement>) => void;
	onUpdate?: (...args) => void;
	rightButton?: any;
	stacked?: boolean;
	title?: string;
	useedit?: boolean;
}

export type ItemState = BaseState;

const HiddenButton: any = css`
	display: none;
	opacity: 0;
	animation: fadeIn ${(props: ItemProps) => props.theme.transitionDelay};
`;

const ItemView: any = styled.li`
	background-color: ${(props: ItemProps) =>
		props.selected
			? props.theme.selectedBackgroundColor + " !important"
			: props.theme.backgroundColor};
	color: ${(props: ItemProps) =>
		props.selected
			? props.theme.selectedForegroundColor
			: props.theme.color};
	cursor: default;
	display: flex;

	${(props: ItemProps) =>
		!props.nohover &&
		"&:hover {background-color: " + props.theme.itemHoverColor + ";}"}

	&:hover .ui-item-button {
		display: inline-flex;
		opacity: 1;
	}
`;

const ItemViewButton: any = styled.div`
	display: inline-flex;
	position: relative;
	width: ${(props: ItemProps) => {
		switch (props.sizing) {
			case Sizing.xxsmall:
				return "1.0em";
			case Sizing.xsmall:
				return "1.25em";
			case Sizing.small:
				return "2.0em";
			case Sizing.large:
				return "3.0em";
			case Sizing.xlarge:
				return "3.5em";
			case Sizing.xxlarge:
				return "4.5em";

			case Sizing.normal:
			default:
				return "2.25em";
		}
	}};

	${(props: ItemProps) => props.sizing && fontStyle[props.sizing]};
	${(props: ItemProps) =>
		(props.hiddenRightButton || props.hiddenLeftButton) && HiddenButton}

	> i, > .ui-button-circle, > .ui-option {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	> .ui-option {
		display: inline-flex;
		flex: 1;
	}
`;

export class Item extends BaseComponent<ItemProps, ItemState> {
	public static readonly defaultProps: ItemProps = {
		...defaultBaseProps,
		hiddenLeftButton: false,
		hiddenRightButton: false,
		layout: TitleLayout.dominant,
		leftButton: null,
		onBlur: nilEvent,
		onChange: nilEvent,
		onClick: nilEvent,
		onDoubleClick: nilEvent,
		onFocus: nilEvent,
		onKeyDown: nilEvent,
		onKeyPress: nilEvent,
		onMouseOut: nilEvent,
		onUpdate: nilEvent,
		rightButton: null,
		selected: false,
		stacked: false,
		title: sp,
		useedit: false,
		widget: null
	};

	constructor(props: ItemProps) {
		super("ui-item", Item, props);
	}

	public render() {
		super.render();

		let leftButton: any = null;
		let rightButton: any = null;

		if (this.props.leftButton != null && !this.props.disabled) {
			leftButton = (
				<ItemViewButton
					className='ui-item-button'
					hiddenLeftButton={this.props.hiddenLeftButton}
				>
					{React.cloneElement(this.props.leftButton, {
						sizing: this.props.sizing
					})}
				</ItemViewButton>
			);
		}

		if (this.props.rightButton != null && !this.props.disabled) {
			rightButton = (
				<ItemViewButton
					className='ui-item-button'
					hiddenRightButton={this.props.hiddenRightButton}
				>
					{React.cloneElement(this.props.rightButton, {
						sizing: this.props.sizing
					})}
				</ItemViewButton>
			);
		}

		return (
			<Wrapper {...this.props} name={this.name}>
				<ItemView
					id={this.props.id}
					className={this.className}
					nohover={this.props.nohover}
					onBlur={this.props.onBlur}
					onDoubleClick={this.props.onDoubleClick}
					onKeyDown={this.props.onKeyDown}
					onKeyPress={this.props.onKeyPress}
					onMouseOut={this.props.onMouseOut}
					selected={this.props.selected}
					sizing={this.props.sizing}
					style={this.state.style}
				>
					{leftButton}
					<Title
						{...this.props}
						layout={
							this.props.stacked
								? TitleLayout.stacked
								: this.props.layout
						}
					/>
					{rightButton}
				</ItemView>
			</Wrapper>
		);
	}
}

export default Item;
