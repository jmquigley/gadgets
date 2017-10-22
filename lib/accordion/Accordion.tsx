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

import {cloneDeep} from 'lodash';
import * as React from 'react';
import styled from 'styled-components';
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';

export interface AccordionProps extends BaseProps {
	children?: React.ReactNode;
}

export function getDefaultAccordionProps(): AccordionProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			children: null
		}
	));
}

export const AccordionView: any = styled.ul`
	border: solid 1px;
	cursor: default;
	list-style: none;
	min-width: 300px;
`;

export class Accordion extends BaseComponent<AccordionProps, undefined> {

	public static readonly defaultProps: AccordionProps = getDefaultAccordionProps();

	constructor(props: AccordionProps) {
		super(props, {}, Accordion.defaultProps.style);

		this._classes.add([
			'ui-accordion'
		]);

		this.componentWillUpdate(props);
	}

	public render() {
		return (
			<AccordionView
				className={this.classes}
				style={this.inlineStyles}
			>
				{this.props.children}
			</AccordionView>
		);
	}
}
