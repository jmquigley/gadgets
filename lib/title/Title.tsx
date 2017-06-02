'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Label} from '../label';
import {baseClasses, BaseProps} from '../shared';
import {getDefaultBaseProps} from '../shared/props';

const styles = require('./styles.css');

export interface TitleProps extends BaseProps {
	stacked?: boolean;
	widget?: any;
}

export function getDefaultTitleProps(): TitleProps {
	return cloneDeep(Object.assign(getDefaultBaseProps(), {
		stacked: false,
		widget: null
	}));
}

export const TitleComponent = (props: TitleProps) => {
	let title: string = '';
	React.Children.forEach(props.children, child => {
		title += String(child);
	});

	return (
		<div className={`ui-title-bar ${props.stacked ? styles.titleBarStacked : styles.titleBar} ${props.classes.join(' ')} ${(!props.noripple && !props.disabled) ? 'ripple' : ''}`}
			onClick={props.onClick} onDoubleClick={props.onDoubleClick}>
			<Label className={`ui-title ${props.stacked ? styles.titleStacked : styles.title}`} text={title} />
			<div className={`ui-widget ${props.stacked ? styles.widgetStacked : styles.widget}`}>
				{props.widget}
			</div>
		</div>
	);
};

export class Title extends React.Component<TitleProps, undefined> {
	public static defaultProps: TitleProps = getDefaultTitleProps();

	constructor(props: TitleProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = baseClasses(this.props)
		return l;
	}

	render() {
		return (
			<TitleComponent
				{...this.props}
				classes={this.buildClasses()}
			/>
		);
	}
}
