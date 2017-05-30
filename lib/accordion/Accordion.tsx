//
// This is a container element that holds the contents of the accordion
// control.  It creates a `<ul>` tag (Accordion) that will hold N number
// of `<li>` tags (AccordionItem).
//

'use strict';

import * as React from 'react';
import {getUUID} from 'util.toolbox';
import {BaseProps} from '../shared/props';
import {AccordionItem} from './index';

// const sharedStyles = require('../shared/styles.css');
const styles = require('./styles.css');

export interface AccordionProps extends BaseProps {
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

	public static defaultProps: AccordionProps = {
		classes: [],
		className: '',
		disabled: false,
		id: getUUID(true),
		visible: true
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);

		if (this.props.className !== '') {
			l.push(this.props.className);
		}
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
