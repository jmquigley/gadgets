//
// Generates elements that will be contained within a List.  This resolved
// to the `<li>` tag.
//

'use strict';

import * as React from 'react';
import {nil} from 'util.toolbox';
import {BaseProps} from '../shared/props';
import {Label} from '../label';

const sharedStyles = require('../shared/styles.css');
const styles = require('./styles.css');

export interface ListItemProps extends BaseProps {
	hiddenLeftButton?: boolean;
	hiddenRightButton?: boolean;
	href?: any;  // holds a function injected by the parent for selection
	leftButton?: any;
	leftTitle: string;
	rightButton?: any;
	rightTitle?: string;
	selected?: boolean;
}

export interface ListItemState {
}

export const ListItemComponent = (props: ListItemProps) => {

	let leftButton = null;
	if (props.leftButton != null) {
		leftButton = (
			<div className={`${styles.itemButton} ${(props.hiddenLeftButton) ? styles.hiddenButton : ''}`}>
				{props.leftButton != null ? props.leftButton : null}
			</div>
		);
	}

	let rightButton = null;
	if (props.rightButton != null) {
		rightButton = (
			<div className={`${styles.itemButton} ${(props.hiddenRightButton) ? styles.hiddenButton : ''}`}>
				{props.rightButton != null ? props.rightButton : null}
			</div>
		);
	}

	return (
		<li className={props.classes.join(' ')}>
			{leftButton}

			<div className={`ui-title ripple ${styles.title}`} onClick={props.onClick}>
				<Label className={`ui-leftTitle ${styles.leftTitle}`}>{props.leftTitle}</Label>
				<Label className={`ui-rightTitle ${styles.rightTitle}`}>{props.rightTitle}</Label>
			</div>

			{rightButton}
		</li>
	);
};

export class ListItem extends React.Component<ListItemProps, ListItemState> {

	public static defaultProps: ListItemProps = {
		classes: [],
		className: '',
		disabled: false,
		hiddenLeftButton: false,
		hiddenRightButton: false,
		href: nil,
		leftButton: null,
		leftTitle: '',
		onClick: nil,
		rightButton: null,
		rightTitle: '',
		selected: false,
		visible: true
	}

	constructor(props: ListItemProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);

		if (this.props.className !== '') {
			l.push(this.props.className);
		}
		l.push(styles.listItem);
		l.push('ui-listitem');

		if (this.props.selected) {
			l.push(styles.selected);
		}

		if (!this.props.visible) {
			l.push(sharedStyles.invisible);
		}

		if (this.props.disabled) {
			l.push(sharedStyles.disabled);
		}

		return l;
	}

	private handleClick = () => {
		this.props.href(this);
		this.props.onClick();
	}

	render() {
		return (
			<ListItemComponent
				{...this.props}
				classes={this.buildClasses()}
				onClick={this.handleClick}
			/>
		);
	}
}
