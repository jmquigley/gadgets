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

// const debug = require('debug')('Accordion');

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {
	BaseComponent,
	BaseProps,
	fontStyle,
	getDefaultBaseProps,
	Wrapper
} from '../shared';
import styled, {withProps} from '../shared/themed-components';

export type AccordionProps = BaseProps;

export function getDefaultAccordionProps(): AccordionProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			obj: 'Accordion'
		}
	));
}

export const AccordionView: any =  withProps<AccordionProps, HTMLUListElement>(styled.ul)`
	cursor: default;
	list-style: none;

	&:last-child {
		border-bottom: 0;
	}

	${props => props.sizing && fontStyle[props.sizing]};
`;

export class Accordion extends BaseComponent<AccordionProps, undefined> {

	public static readonly defaultProps: AccordionProps = getDefaultAccordionProps();
	private _children: any;

	constructor(props: AccordionProps) {
		super(props, Accordion.defaultProps.style);

		this._classes.add('ui-accordion');
		this._children = this.props.children;

		this.componentWillUpdate(props);
	}

	public componentWillUpdate(nextProps: AccordionProps) {
		this._children = React.Children.map(nextProps.children, (child: any) => {
			return React.cloneElement(child, {
				sizing: nextProps.sizing,
				disabled: nextProps.disabled
			});
		});
	}

	public render() {
		return (
			<Wrapper {...this.props} >
				<AccordionView
					className={this.classes}
					sizing={this.props.sizing}
					style={this.inlineStyles}
				>
					{this._children}
				</AccordionView>
			</Wrapper>
		);
	}
}
