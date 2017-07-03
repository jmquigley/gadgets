/**
 * {description}
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button} from 'gadgets';
 * <Button iconName="cab" onClick={someFunction} />
 * ```
 *
 * #### Events
 * - `{name}` - {description}
 *
 * #### Styles
 * - `` - {description}
 *
 * #### Properties
 * - `{name}: {datatype}` - {description}
 *
 * @module Title
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Label} from '../label';
import {BaseComponent} from '../shared/base';
import {BaseProps, getDefaultBaseProps} from '../shared';

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

export interface TitleState {}

export class Title extends BaseComponent<TitleProps, TitleState> {

	public static defaultProps: TitleProps = getDefaultTitleProps();

	private _titleClasses: string[] = [];
	private _widgetClasses: string[] = [];

	constructor(props: TitleProps) {
		super(props, require("./styles.css"));
		this.shouldComponentUpdate(props);
	}

	shouldComponentUpdate(nextProps: TitleProps): boolean {
		super.resetStyles(nextProps);

		this.classes.push("ui-title-bar");
		this.classes.push(this.styling.fontStyle);

		if (nextProps.stacked) {
			this.classes.push(this.styles.titleBarStacked);
		} else {
			this.classes.push(this.styles.titleBar);
		}

		if (!nextProps.noripple && !nextProps.disabled) {
			this.classes.push("ripple");
		}

		this._titleClasses = [];
		this._titleClasses.push('ui-title');
		this._titleClasses.push(nextProps.stacked ? this.styles.titleStacked : this.styles.title);

		this._widgetClasses = [];
		this._widgetClasses.push('ui-widget');
		this._widgetClasses.push(nextProps.stacked ? this.styles.widgetStacked : this.styles.widget);

		super.buildStyles(nextProps);
		return true;
	}

	render() {
		let title: string = "";
		React.Children.forEach(this.props.children, child => {
			title += String(child);
		});

		return (
			<div
				className={this.classes.join(' ')}
				style={{...this.inlineStyle}}
				onClick={this.props.onClick} onDoubleClick={this.props.onDoubleClick}
				>
				<Label
					className={this._titleClasses.join(' ')}
					noedit={this.props.noedit}
					text={title}
					/>
				<div className={this._widgetClasses.join(' ')}>
					{this.props.widget}
				</div>
			</div>
		);
	}
}
