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
import {BaseComponent, BaseProps, getDefaultBaseProps, getTheme} from '../shared';
import styled, {ThemeProvider, withProps} from '../shared/themed-components';

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

export const AccordionView: any = withProps<AccordionProps, HTMLUListElement>(styled.ul)`
	border: solid 1px;
	border-color: ${props => props.theme.borderColor || 'black'};
	cursor: default;
	list-style: none;
	min-width: 300px;

	&:last-child {
		border-bottom: 0;
	}
`;

export class Accordion extends BaseComponent<AccordionProps, undefined> {

	public static readonly defaultProps: AccordionProps = getDefaultAccordionProps();

	constructor(props: AccordionProps) {
		super(props, {}, Accordion.defaultProps.style);

		this._classes.add(['ui-accordion']);

		this.componentWillUpdate(props);
	}

	public render() {
		return (
			<ThemeProvider theme={getTheme()}>
				<AccordionView
					className={this.classes}
					style={this.inlineStyles}
				>
					{this.props.children}
				</AccordionView>
			</ThemeProvider>
		);
	}
}
