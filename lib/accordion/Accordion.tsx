/**
 * This is a container element that holds the contents of the accordion
 * control.  It creates a `<ul>` tag (Accordion) that will hold N number
 * of `<li>` tags (AccordionItem).
 *
 * An accordion control contains N number of AccordionItems.  The\
 * AccordionItem will display/hide their contents when the header of
 * that AccordionItem item is clicked.
 *
 * #### Examples:
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
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';

export interface AccordionProps extends BaseProps {
	children?: React.ReactNode;
}

export function getDefaultAccordionProps(): AccordionProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			children: null
		})
	);
}

export class Accordion extends BaseComponent<AccordionProps, undefined> {

	public static defaultProps: AccordionProps = getDefaultAccordionProps();

	private _rootClasses: Set<string>;

	constructor(props: AccordionProps) {
		super(props, require('./styles.css'));

		this._rootClasses = new Set<string>([
			'ui-accordion',
			this.styles.accordion
		]);

		super.buildCommonStyles(this._rootClasses, props);
	}

	get rootClasses(): string {
		return Array.from(this._rootClasses).join(' ');
	}

	public componentWillUpdate(nextProps: AccordionProps) {
		super.buildCommonStyles(this._rootClasses, nextProps);
	}

	public render() {
		return (
			<ul className={this.rootClasses} style={this.inlineStyle}>
				{this.props.children}
			</ul>
		);
	}
}
