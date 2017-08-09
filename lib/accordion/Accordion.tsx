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
import {ClassNames} from 'util.classnames';
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

	private _rootCN: ClassNames;

	constructor(props: AccordionProps) {
		super(props, require('./styles.css'));

		this._rootCN = new ClassNames([
			'ui-accordion',
			this.styles.accordion
		]);

		this.componentWillUpdate(props);
	}

	public componentWillUpdate(nextProps: AccordionProps) {
		this.buildCommonStyles(this._rootCN, nextProps);
	}

	public render() {
		return (
			<ul className={this._rootCN.classnames} style={this.inlineStyle}>
				{this.props.children}
			</ul>
		);
	}
}
