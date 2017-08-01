/**
 * Generates elements that will be contained within the Accordion.  This
 * will resolve to an `<li>` tag.  It represents each individual item
 * within the accordion.  It is the container for the content.  It can
 * also be thought of as a container for content.
 *
 * The `AccordionItem` represet a clickable header within this control.
 * It is derived from the ListItem/Item control, so it can have
 * buttons on the left/right side of title text.
 *
 * #### Examples:
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
 * - `onClick(toggleState)` - This callback is invoked when the header
 * portion of the AccordionItem is clicked.  It is given the current
 * state of the toggle (true if visible, otherwise false)
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

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {getDefaultItemProps, Item, ItemProps} from '../item';
import {BaseComponent} from '../shared';

export interface AccordionItemProps extends ItemProps {
	initialToggle?: boolean;
	leftButton?: any;
	nocollapse?: boolean;
	onClick?: any;
	rightButton?: any;
}

export function getDefaultAccordionItemProps(): AccordionItemProps {
	return cloneDeep(Object.assign(
		getDefaultItemProps(), {
			initialToggle: false,
			leftButton: null,
			nocollapse: false,
			onClick: nilEvent,
			rightButton: null
		})
	);
}

export interface AccordionItemState {
	toggle: boolean;
}

export class AccordionItem extends BaseComponent<AccordionItemProps, AccordionItemState> {

	public static defaultProps: AccordionItemProps = getDefaultAccordionItemProps();

	constructor(props: AccordionItemProps) {
		super(props, require('./styles.css'));
		this.state = {
			toggle: (props.nocollapse) ? true : props.initialToggle
		};

		this.bindCallbacks('handleClick');
		this.shouldComponentUpdate(props);
	}

	private handleClick() {
		if (!this.props.nocollapse) {
			this.setState({
				toggle: !this.state.toggle
			}, () => {
				this.props.onClick(this.state.toggle);
			});
		}
	}

	public shouldComponentUpdate(nextProps: AccordionItemProps): boolean {
		this.resetStyles(nextProps);
		this.classes.push('ui-accordionitem');
		this.classes.push(this.styles.accordionItem);
		this.buildStyles(nextProps);
		return true;
	}

	public componentWillReceiveProps(nextProps: AccordionItemProps) {
		if (nextProps.initialToggle !== this.state.toggle) {
			this.setState({toggle: nextProps.initialToggle});
		}
	}

	public render() {
		let content = null;
		if ((this.props.children != null) && (this.state.toggle)) {
			content = (
				<div className={`ui-accordion-content ${this.styles.content}`}>
					{this.props.children}
				</div>
			);
		}

		return (
			<ul
				className={this.classes.join(' ')}
				style={this.inlineStyle}
			>
				<Item
					{...this.props}
					onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nilEvent}
				/>
				{content}
			</ul>
		);
	}
}
