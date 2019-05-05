/**
 * This is a container element that holds the contents of the accordion control
 * It creates a `<ul>` tag (Accordion) that will hold N number of `<li>` tags
 * (AccordionItem).
 *
 * An accordion control contains N number of AccordionItems.  The AccordionItem
 * will display/hide their contents when the header of that AccordionItem item
 * is clicked.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/accordion.png" width="60%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Accordion} from 'gadgets';
 *
 * <Accordion>
 *     <AccordionItem ... />
 *     ...
 * </Accordion>
 * ```
 *
 * ## API
 * #### Events
 * None
 *
 * #### Styles
 * - `ui-accordion` - Applied to the `<ul>` tag for the list.  This is the top
 * level of the control.
 *
 * #### Properties
 * - `children: React.ReactNode (null)` - the children nodes contained within
 * this container.	Generally this will be `AccordionItem` controls.
 *
 * @module Accordion
 */

// const debug = require("debug")("gadgets.Accordion");

import * as React from "react";
import {Keys} from "util.keys";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";

export type AccordionProps = BaseProps;

export function getDefaultAccordionProps(): AccordionProps {
	return {
		...getDefaultBaseProps(),
		obj: "Accordion"
	};
}

export type AccordionState = BaseState;

export function getDefaultAccordionState(): AccordionState {
	return {
		...getDefaultBaseState()
	};
}

const AccordionView: any = styled.ul`
	cursor: default;
	list-style: none;

	&:last-child {
		border-bottom: 0;
	}

	${(props: AccordionProps) => props.sizing && fontStyle[props.sizing]};
`;

export class Accordion extends BaseComponent<AccordionProps, AccordionState> {
	public static readonly defaultProps: AccordionProps = getDefaultAccordionProps();
	public state: AccordionState = getDefaultAccordionState();
	private keys: Keys = null;

	constructor(props: AccordionProps) {
		super(props, "ui-accordion", Accordion.defaultProps.style);
		this.keys = new Keys({testing: this.props.testing});
	}

	public render() {
		this.updateClassName();

		let idx: number = 0;
		const children = React.Children.map(
			this.props.children,
			(child: any) => {
				return React.cloneElement(child, {
					disabled: this.props.disabled,
					key: child["key"] || this.keys.at(idx++),
					sizing: this.props.sizing,
					visible: this.props.visible
				});
			}
		);

		return (
			<Wrapper {...this.props}>
				<AccordionView
					className={this.className}
					sizing={this.props.sizing}
					style={this.state.style}
				>
					{children}
				</AccordionView>
			</Wrapper>
		);
	}
}

export default Accordion;
