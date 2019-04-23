/**
 * Generates elements that will be contained within the `Accordion`.  This
 * will resolve to an `<li>` tag.  It represents each individual item
 * within the accordion.  It is the container for the content.  It can
 * also be thought of as a container for content.
 *
 * The `AccordionItem` represents a clickable header within this control.
 * It is derived from the ListItem/Item control, so it can have
 * buttons on the left/right side of title text.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/accordion.png" width="60%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Accordion, AccordionItem} from 'gadgets';
 * <Accordion>
 *     <AccordionItem
 *         initialToggle={true}
 *         rightButton={<Button iconName="car" />}
 *         title="Accordion Item #1"
 *     >
 *     ...
 *     </AccordionItem>
 *     <AccordionItem title="Accordion Item #2">...</AccordionItem>
 * </Accordion>
 * ```
 *
 * This example would create an accordion control with two items.  The first
 * item would be expanded by default and contain a right button control.
 *
 * #### Events
 * - `onClick(e)` - Invoked when the AccordionItem is clicked.
 * - `onUpdate(toggleState: boolean)` - This callback is invoked when the header
 * portion of the AccordionItem is clicked.  It is given the current state of
 * the toggle (true if visible, otherwise false)
 *
 * #### Styles
 * - `ui-accordionitem` - The top level style for the Item on the outer `<div>`
 * - `ui-accordion-content` - Style applied to the content under the
 * AccordionItem. This exists around the inner `<div>`
 *
 * #### Properties
 * - `initialToggle: boolean` - The initial state of the content.  If true, then
 * the content is shown, otherwise it is hidden.  Set initially to false.
 * - `leftButton: Button (null)` - An instance of a button control placed to the
 * left of the title.
 * - `nocollapse: boolean (false)` - When this is set to true, then this
 * Accordion item will not expand/contract when the title bar is clicked.  This
 * is false by default.
 * - `rightButton: Button (null)` - An instance of a button control placed to
 * the right of the title.
 *
 * @module AccordionItem
 */

// const debug = require('debug')('AccordionItem');

import autobind from "autobind-decorator";
import * as React from "react";
import {nilEvent} from "util.toolbox";
import {getDefaultItemProps, Item, ItemProps} from "../item";
import {
	BaseComponent,
	BaseState,
	Color,
	fontStyle,
	getDefaultBaseState,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";

export interface AccordionItemProps extends ItemProps {
	initialToggle?: boolean;
	leftButton?: any;
	nocollapse?: boolean;
	onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
	onUpdate?: (toggle: boolean) => void;
	rightButton?: any;
}

export function getDefaultAccordionItemProps(): AccordionItemProps {
	return {
		...getDefaultItemProps(),
		initialToggle: false,
		leftButton: null,
		nocollapse: false,
		obj: "AccordionItem",
		onClick: nilEvent,
		onUpdate: nilEvent,
		rightButton: null
	};
}

export interface AccordionItemState extends BaseState {
	toggle: boolean;
}

export function getDefaultAccordionItemState(): AccordionItemState {
	return {
		...getDefaultBaseState("ui-accordionitem"),
		toggle: false
	};
}

const AccordionItemView: any = styled.ul`
	> .ui-item,
	> .ui-item-button {
		color: ${(props: AccordionItemProps) =>
			props.theme.headerForegroundColor || Color.white} !important;
		background-color: ${(props: AccordionItemProps) =>
			props.theme.headerBackgroundColor || Color.black} !important;
	}

	> .ui-item:hover {
		color: ${(props: AccordionItemProps) =>
			props.theme.headerHoverColor || Color.silver};
		background-color: ${(props: AccordionItemProps) =>
			props.theme.headerBackgroundColor || Color.black} !important;
	}
`;

const AccordionContentView: any = styled.div`
	${(props: AccordionItemProps) => props.sizing && fontStyle[props.sizing]};
`;

export class AccordionItem extends BaseComponent<
	AccordionItemProps,
	AccordionItemState
> {
	public static defaultProps: AccordionItemProps = getDefaultAccordionItemProps();

	constructor(props: AccordionItemProps) {
		super(props);
		this.state = {
			...getDefaultAccordionItemState(),
			toggle: this.props.initialToggle
		};
	}

	@autobind
	private handleClick(e: React.MouseEvent<HTMLLIElement>) {
		if (
			!this.props.nocollapse &&
			!this.props.disabled &&
			this.props.visible
		) {
			this.setState(
				{
					toggle: !this.state.toggle
				},
				() => {
					this.props.onClick(e);
					this.props.onUpdate(this.state.toggle);
				}
			);
		}
	}

	public render() {
		let content = null;

		if (this.props.children != null && this.state.toggle) {
			content = (
				<AccordionContentView
					className='ui-accordion-content'
					sizing={this.props.sizing}
				>
					{this.props.children}
				</AccordionContentView>
			);
		}

		return (
			<Wrapper {...this.props}>
				<AccordionItemView
					className={this.state.classes.classnames}
					style={this.state.style}
				>
					<Item {...this.props} onClick={this.handleClick} />
					{content}
				</AccordionItemView>
			</Wrapper>
		);
	}
}

export default AccordionItem;
