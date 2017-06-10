//
// This is a container element that holds the contents of the accordion
// control.  It creates a `<ul>` tag (Accordion) that will hold N number
// of `<li>` tags (AccordionItem).
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {baseClasses, BaseProps, getDefaultBaseProps} from '../shared';
import {AccordionItem} from './index';

const styles = require('./styles.css');

export interface AccordionProps extends BaseProps {
}

export function getDefaultAccordionProps(): AccordionProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
		}));
}

export interface AccordionState {
	selectedItem?: AccordionItem;
}

export class Accordion extends React.Component<AccordionProps, AccordionState> {

	public static defaultProps: AccordionProps = getDefaultAccordionProps();

	private _classes: string = '';
	private _style: any = null;

	constructor(props: AccordionProps) {
		super(props);
	}

	private buildStyles = () => {
		this._style = Object.assign({}, this.props.style);

		this._classes = baseClasses(this.props);
		this._classes += ' ui-accordion';
		this._classes += ` ${styles.accordion}`;
	}

	render() {
		this.buildStyles();

		return (
			<ul className={this._classes} style={this._style}>
				{this.props.children}
			</ul>
		);
	}
}
