//
// Generates elements that will be contained within the Accordion.  This
// will resolve to an `<li>` tag.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nil} from 'util.toolbox';
import {Button} from '../button';
import {baseClasses, getDefaultItemProps, ItemComponent, ItemProps} from '../shared';

const styles = require('./styles.css');

export interface AccordionItemProps extends ItemProps {
	initialToggle?: boolean;
	onNew?: any;
}

export function getDefaultAccordionItemProps(): AccordionItemProps {
	return cloneDeep(Object.assign(
		getDefaultItemProps(), {
			initialToggle: false,
			onNew: nil
		})
	);
}

export interface AccordionItemState {
	toggle: boolean;
}

export class AccordionItem extends React.Component<AccordionItemProps, AccordionItemState> {

	public static defaultProps: AccordionItemProps = getDefaultAccordionItemProps();

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

	private handleNew = () => {
		if (!this.state.toggle) {
			this.setState({
				toggle: true
			});
		}

		this.props.onNew();
	}

	private buildClasses = () => {
		let l: string[] = baseClasses(this.props);

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
				rightButton={<Button iconName="plus" onClick={this.handleNew} />}
				showContent={this.state.toggle}
			/>
		);
	}
}
