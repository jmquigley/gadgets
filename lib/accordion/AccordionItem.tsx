//
// Generates elements that will be contained within the Accordion.  This
// will resolve to an `<li>` tag.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nil} from 'util.toolbox';
import {Button} from '../button';
import {getDefaultItemProps, Item, ItemProps} from '../item';
import {baseClasses} from '../shared';


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

	private _classes: string = '';
	private _style: any = null;

	constructor(props: AccordionItemProps) {
		super(props);
		this.state = {
			toggle: props.initialToggle
		}
	}

	private buildStyles = () => {
		this._style = Object.assign({}, this.props.style);

		this._classes = baseClasses(this.props);
		this._classes += ` ${styles.accordionItem}`;
		this._classes += " ui-accordionitem";
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

	render() {
		this.buildStyles();

		let content = null;
		if ((this.props.children != null) && (this.state.toggle)) {
			content = (
				<div className={`ui-accordion-content ${styles.content}`}>
					{this.props.children}
				</div>
			);
		}

		return (
			<div className={this._classes} style={this._style}>
				<Item
					title={this.props.title}
					onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nil}
					rightButton={<Button iconName="plus" onClick={this.handleNew} />}
				/>
				{content}
			</div>
		);
	}
}
