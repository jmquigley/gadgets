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
	leftTitle: string;
	rightTitle?: string;
	leftButton?: any;
	rightButton?: any;
}

export interface ListItemState {
}

export const ListItemComponent = (props: ListItemProps) => (
	<li className={`ui ui-listitem ${props.classes.join(' ')}`}>

		{props.leftButton != null ? props.leftButton : null}

		<div className={`ui-title ${styles.title}`} onClick={props.onClick}>
			<span className={`ui-leftTitle ${styles.leftTitle}`}>{props.leftTitle}</span>
			<span className={`ui-rightTitle ${styles.rightTitle}`}>{props.rightTitle}</span>
		</div>

		{props.rightButton != null ? props.rightButton : null}

	</li>
);

export class ListItem extends React.Component<ListItemProps, ListItemState> {

	public static defaultProps: ListItemProps = {
		classes: [],
		enabled: true,
		leftTitle: '',
		rightTitle: '',
		onClick: nil,
		leftButton: null,
		rightButton: null,
		visible: true
	}

	constructor(props: ListItemProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);
		l.push(styles.listItem);

		if (!this.props.visible) {
			l.push(styles.listItemInvisible);
			l.push(styles.listItemDisabled);
		}

		if (!this.props.enabled) {
			l.push(styles.listItemDisabled);
		}

		return l;
	}

	render() {
		return (
			<ListItemComponent
				{...this.props}
				classes={this.buildClasses()}
			/>
		);
	}
}
