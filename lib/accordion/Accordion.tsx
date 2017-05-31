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

export const AccordionComponent = (props: AccordionProps) => (
	<ul
		className={props.classes.join(' ')}>
		{props.children}
	</ul>
);

export class Accordion extends React.Component<AccordionProps, AccordionState> {

	public static defaultProps: AccordionProps = getDefaultAccordionProps();

	constructor(props: AccordionProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = baseClasses(this.props);

		l.push(styles.accordion);
		l.push('ui-accordion');

		return l;
	}

	render() {
		return (
			<AccordionComponent
				{...this.props}
				classes={this.buildClasses()}
			/>
		);
	}
}
