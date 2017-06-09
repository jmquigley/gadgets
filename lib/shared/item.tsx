'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {BaseProps, getDefaultBaseProps} from './props';
import {Title, TitleProps} from '../title';

const styles = require('./styles.css');

export interface ItemProps extends BaseProps, TitleProps {
	hiddenLeftButton?: boolean;
	hiddenRightButton?: boolean;
	leftButton?: any;
	rightButton?: any;
	selected?: boolean;
	showContent?: boolean;
	title?: string;
}

export function getDefaultItemProps(): ItemProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			hiddenLeftButton: false,
			hiddenRightButton: false,
			leftButton: null,
			rightButton: null,
			selected: false,
			showContent: false,
			stacked: false,
			title: '',
			widget: null
		}));
}

export const ItemComponent = (props: ItemProps) => {

	let leftButton = null;
	if (props.leftButton != null && !props.disabled) {
		leftButton = (
			<div className={`${styles.itemButton} ${(props.hiddenLeftButton) ? styles.hiddenButton : ''}`}>
				{props.leftButton != null ? props.leftButton : null}
			</div>
		);
	}

	let rightButton = null;
	if (props.rightButton != null && !props.disabled) {
		rightButton = (
			<div className={`${styles.itemButton} ${(props.hiddenRightButton) ? styles.hiddenButton : ''}`}>
				{props.rightButton != null ? props.rightButton : null}
			</div>
		);
	}

	let content = null;
	if ((props.children != null) && (props.showContent)) {
		content = (
			<div className={`ui-item-content`} style={{display: "block"}}>
				{props.children}
			</div>
		);
	}

	return (
		<li
			id={props.id}
			onMouseOut={props.onMouseOut}
			onKeyDown={props.onKeyDown}
			onKeyPress={props.onKeyPress}
			className={`ui-item ${styles.item} ${props.classes.join(' ')}`}>
			<div className={`ui-item-bar ${props.selected ? 'ui-selected' : ''} ${styles.itemBar}`}>
				{leftButton}
				<Title {...props} className={styles.itemTitle} classes={[]}>{props.title}</Title>
				{rightButton}
			</div>
			{content}
		</li>
	);
};
