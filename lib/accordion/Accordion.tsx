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
 * - `children=null {React.ReactNode}` - the children nodes contained within
 * this container.	Generally this will be `AccordionItem` controls.
 *
 * @module Accordion
 */

import * as React from "react";
import styled from "styled-components";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	defaultBaseProps,
	fontStyle,
	Wrapper
} from "../shared";

export type AccordionProps = BaseProps;
export type AccordionState = BaseState;

const AccordionView: any = styled.ul`
	cursor: default;
	list-style: none;

	&:last-child {
		border-bottom: 0;
	}

	${(props: AccordionProps) => props.sizing && fontStyle[props.sizing]};
`;

export class Accordion extends BaseComponent<AccordionProps, AccordionState> {
	public static readonly defaultProps: AccordionProps = {
		...defaultBaseProps
	};

	constructor(props: AccordionProps) {
		super("ui-accordion", Accordion, props);
	}

	public render() {
		super.render();

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
			<Wrapper {...this.props} name={this.name}>
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
