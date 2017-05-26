//
// Generates elements that will be contained within a List.  This resolved
// to the `<li>` tag.
//

'use strict';

import * as React from 'react';
import {nil} from 'util.toolbox';
import {BaseProps} from '../../lib/props';

const styles = require('./styles.css');

export interface ListItemProps extends BaseProps {
	hiddenLeftButton?: boolean;
	hiddenRightButton?: boolean;
	leftButton?: any;
	leftTitle: string;
	rightButton?: any;
	rightTitle?: string;
	selected?: boolean;
	selectHandler?: any;
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
		<li className={`ui ui-listitem ${props.classes.join(' ')}`}>
			{leftButton}

			<div className={`ui-title ripple ${styles.title}`} onClick={props.onClick}>
				<span className={`ui-leftTitle ${styles.leftTitle}`}>{props.leftTitle}</span>
				<span className={`ui-rightTitle ${styles.rightTitle}`}>{props.rightTitle}</span>
			</div>

			{rightButton}
		</li>
	);
};

export class ListItem extends React.Component<ListItemProps, ListItemState> {

	public static defaultProps: ListItemProps = {
		classes: [],
		enabled: true,
		hiddenLeftButton: false,
		hiddenRightButton: false,
		leftButton: null,
		leftTitle: '',
		onClick: nil,
		rightButton: null,
		rightTitle: '',
		selected: false,
		selectHandler: nil,
		visible: true
	}

	constructor(props: ListItemProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);
		l.push(styles.listItem);

		if (!this.props.enabled) {
			l.push(styles.listItemDisabled);
		}

		if (this.props.selected) {
			l.push(styles.selected);
		}

		if (!this.props.visible) {
			l.push(styles.listItemInvisible);
			l.push(styles.listItemDisabled);
		}

		return l;
	}

	private handleClick = () => {
		this.props.selectHandler(this);
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
