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
 * - `initialToggle {boolean}` - The initial state of the content.  If true, then
 * the content is shown, otherwise it is hidden.  Set initially to false.
 * - `leftButton=null {Button}` - An instance of a button control placed to the
 * left of the title.
 * - `nocollapse=false {boolean}` - When this is set to true, then this
 * Accordion item will not expand/contract when the title bar is clicked.  This
 * is false by default.
 * - `rightButton=null {Button}` - An instance of a button control placed to
 * the right of the title.
 *
 * @module AccordionItem
 */

import autobind from "autobind-decorator";
import * as React from "react";
import styled from "styled-components";
import {nilEvent} from "util.toolbox";
import {Item, ItemProps} from "../item/Item";
import {BaseComponent, BaseState, Color, fontStyle, Wrapper} from "../shared";

export interface AccordionItemProps extends ItemProps {
	initialToggle?: boolean;
	leftButton?: any;
	nocollapse?: boolean;
	onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
	onUpdate?: (toggle: boolean) => void;
	rightButton?: any;
}

export interface AccordionItemState extends BaseState {
	toggle: boolean;
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
	public static readonly defaultProps: AccordionItemProps = {
		...Item.defaultProps,
		initialToggle: false,
		leftButton: null,
		nocollapse: false,
		onClick: nilEvent,
		onUpdate: nilEvent,
		rightButton: null
	};

	constructor(props: AccordionItemProps) {
		super("ui-accordionitem", AccordionItem, props, {
			toggle: props.initialToggle
		});
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
		super.render();

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
			<Wrapper {...this.props} name={this.name}>
				<AccordionItemView
					className={this.className}
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
