//
// Generates elements that will be contained within the Accordion.  This
// will resolve to an `<li>` tag.
//

'use strict';

import * as React from 'react';
import {nil} from 'util.toolbox';
import {getDefaultItemProps, ItemComponent, ItemProps} from '../shared/item';

const styles = require('./styles.css');

export interface AccordionItemProps extends ItemProps {
	initialToggle?: boolean;
}

export interface AccordionItemState {
	toggle: boolean;
}

export class AccordionItem extends React.Component<AccordionItemProps, AccordionItemState> {

	public static defaultProps: AccordionItemProps = Object.assign(
		getDefaultItemProps(), {
			initialToggle: false
		});

	constructor(props: AccordionItemProps) {
		super(props);
		this.state = {
			toggle: props.initialToggle
		}
	}

	private handleClick = () => {
		this.setState({
			toggle: !this.state.toggle
		});

		this.props.onClick(this.state.toggle);
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);

		if (this.props.className !== '') {
			l.push(this.props.className);
		}
		l.push(styles.accordionItem);
		l.push('ui-accordionitem');

		return l;
	}

	render() {
		return (
			<ItemComponent
				{...this.props}
				classes={this.buildClasses()}
				onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nil}
				showContent={this.state.toggle}
			/>
		);
	}
}
