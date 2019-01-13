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
 * this container.  Generally this will be `AccordionItem` controls.
 *
 * @module Accordion
 */

'use strict';

const debug = require('debug')('Accordion');

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {
	BaseComponent,
	BaseProps,
	BaseState,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	Wrapper
} from '../shared';
import styled from '../shared/themed-components';

export type AccordionProps = BaseProps;
export type AccordionState = BaseState;

export function getDefaultAccordionProps(): AccordionProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			obj: 'Accordion'
		}
	));
}

export const getDefaultAccordionState = getDefaultBaseState;

export const AccordionView: any = styled.ul`
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

	constructor(props: AccordionProps) {
		super(props, Accordion.defaultProps.style);
	}

	public static getDerivedStateFromProps(props: AccordionProps, state: AccordionState) {
		state.classes.clear();
		state.classes.add('ui-accordion');

		state.children = React.Children.map(props.children, (child: any) => {
			return React.cloneElement(child, {
				sizing: props.sizing,
				disabled: props.disabled
			});
		});

		return super.getDerivedStateFromProps(props, state);
	}

	public render() {
		debug('state: %O, props: %O', this.state, this.props);

		return (
			<Wrapper {...this.props} >
				<AccordionView
					className={this.state.classes.classnames}
					sizing={this.props.sizing}
					style={this.state.style}
				>
					{this.state.children}
				</AccordionView>
			</Wrapper>
		);
	}
}
