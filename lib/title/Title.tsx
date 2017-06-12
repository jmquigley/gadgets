'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Label} from '../label';
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';

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

export class Title extends BaseComponent<TitleProps, undefined> {

	public static defaultProps: TitleProps = getDefaultTitleProps();

	constructor(props: TitleProps) {
		super(props);
	}

	protected buildStyles() {
		super.buildStyles(this.props);

		this._classes += " ui-title-bar";

		if (this.props.stacked) {
			this._classes += ` ${styles.titleBarStacked}`;
		} else {
			this._classes += ` ${styles.titleBar}`;
		}

		if (!this.props.noripple && !this.props.disabled) {
			this._classes += " ripple";
		}
	}

	render() {
		this.buildStyles();

		let title: string = '';
		React.Children.forEach(this.props.children, child => {
			title += String(child);
		});

		return (
			<div
				className={this._classes}
				style={this._style}
				onClick={this.props.onClick} onDoubleClick={this.props.onDoubleClick}>
				<Label
				className={`ui-title ${this.props.stacked ? styles.titleStacked : styles.title}`}
				noedit={this.props.noedit}
				text={title}
				/>
				<div className={`ui-widget ${this.props.stacked ? styles.widgetStacked : styles.widget}`}>
					{this.props.widget}
				</div>
			</div>
		);
	}
}
