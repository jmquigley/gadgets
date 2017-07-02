/**
 * This is a container element that holds the contents of the accordion
 * control.  It creates a `<ul>` tag (Accordion) that will hold N number
 * of `<li>` tags (AccordionItem).
 *
 * An accordion control contains N number of AccordionItems.  These items
 * will display/hide the contents of that item when the header of that
 * item is clicked.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Accordion} from 'gadgets';
 * <Accordion>
 *     <AccordionItem ... />
 *     ...
 * </Accordion>
 * ```
 *
 * #### Events
 * None
 *
 * #### Styles
 * - `ui-accordion` - Applied to the `<ul>` tag for the list.  This is the top
 * level of the control.
 *
 * #### Properties
 * None
 *
 * @module Accordion
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';

export interface AccordionProps extends BaseProps {
}

export function getDefaultAccordionProps(): AccordionProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
		}));
}

export interface AccordionState {
}

export class Accordion extends BaseComponent<AccordionProps, AccordionState> {

	public static defaultProps: AccordionProps = getDefaultAccordionProps();

	constructor(props: AccordionProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	shouldComponentUpdate(nextProps: AccordionProps): boolean {
		super.resetStyles(nextProps);
		this.classes.push('ui-accordion');
		this.classes.push(this.styles.accordion);
		super.buildStyles(nextProps);
		return true;
	}

	render() {
		return (
			<ul className={this.classes.join(' ')} style={this.inlineStyle}>
				{this.props.children}
			</ul>
		);
	}
}
