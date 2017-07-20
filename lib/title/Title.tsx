/**
 * A reusable title block used to format two items: a title and
 * a widget.  The title is generally a text string and the widget
 * can be a text string or another control.  The control takes these
 * two items and presents them in one of four layouts controled by
 * the enum `TitleLayout`:
 *
 * - TitleLayout.quarter
 * - TitleLayout.even
 * - TitleLayout.threequarter
 * - TitleLayout.stacked
 * - TitleLayout.dominant
 *
 * In `quarter` the title takes up 25% and the widget takes up 75%
 * In `even` the title and widget take up 50%
 * In `threequarter` the title takes up 75% and the widget takes up 25%
 * In `stacked` the title is placed above the widget
 * In `dominant` the title takes up 83% of the width (5/6)
 *
 * #### Examples:
 *
 * ```javascript
 * import {Sizing, Title, TitleLayout} from 'gadgets';
 * <Title
 *     widget="widget"
 *     layout={TitleLayout.stacked}
 *     sizing={Sizing.small}>
 *     title string
 * </Title>
 * ```
 *
 * #### Events
 * N/A
 *
 * #### Styles
 * - `ui-title-bar` - Placed on the top level `<div>` for the whole control
 * - `ui-title` - Placed on the title label text within the title bar.
 * - `ui-title-widget` - Placed on the widget control within the title block.
 *  This is the `<div>` around the given widget.
 *
 * #### Properties
 * - `layout: {TitleLayout} (TitleLayout.dominant)` - The structure of the
 * title/widget within the component.
 * - `widget: {any} (null)` - The given user defined widget control that is
 * injected into the title.
 *
 * @module Title
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Label} from '../label';
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';

export enum TitleLayout {
	quarter,
	even,
	threequarter,
	third,
	stacked,
	dominant
}

export interface TitleProps extends BaseProps {
	layout?: TitleLayout;
	title?: any;
	widget?: any;
}

export function getDefaultTitleProps(): TitleProps {
	return cloneDeep(Object.assign(getDefaultBaseProps(), {
		layout: TitleLayout.dominant,
		widget: null
	}));
}

export class Title extends BaseComponent<TitleProps, undefined> {

	public static defaultProps: TitleProps = getDefaultTitleProps();

	private _titleClasses: string[] = [];
	private _widgetClasses: string[] = [];

	constructor(props: TitleProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	public shouldComponentUpdate(nextProps: TitleProps): boolean {
		super.resetStyles(nextProps);

		this.classes.push('ui-title-bar');

		if (nextProps.layout === TitleLayout.stacked) {
			this.classes.push(this.styles.titleBarStacked);
		} else {
			this.classes.push(this.styles.titleBar);
		}

		if (!nextProps.noripple && !nextProps.disabled) {
			this.classes.push('ripple');
		}

		this._titleClasses = [];
		this._widgetClasses = [this.styling.fontStyle];

		this._titleClasses.push('ui-title');
		this._widgetClasses.push('ui-title-widget');

		switch (nextProps.layout) {
			case TitleLayout.quarter:
				this._titleClasses.push(this.styles.titleQuarter);
				this._widgetClasses.push(this.styles.widgetQuarter);
				break;

			case TitleLayout.even:
				this._titleClasses.push(this.styles.titleEven);
				this._widgetClasses.push(this.styles.widgetEven);
				break;

			case TitleLayout.threequarter:
				this._titleClasses.push(this.styles.titleThreeQuarter);
				this._widgetClasses.push(this.styles.widgetThreeQuarter);
				break;

			case TitleLayout.third:
				this._titleClasses.push(this.styles.titleThird);
				this._widgetClasses.push(this.styles.widgetThird);
				break;

			case TitleLayout.stacked:
				this._titleClasses.push(this.styles.titleStacked);
				this._widgetClasses.push(this.styles.widgetStacked);
				break;

			case TitleLayout.dominant:
			default:
				this._titleClasses.push(this.styles.titleDominant);
				this._widgetClasses.push(this.styles.widgetDominant);
		}

		super.buildStyles(nextProps);
		return true;
	}

	public render() {
		let title: any = null;
		if (typeof this.props.title === 'string') {
			title = (
				<Label
					{...this.props}
					className={this._titleClasses.join(' ')}
					text={this.props.title}
				/>
			);
		} else {
			title = (
				<div
					className={this._titleClasses.join(' ')}
				>
					{this.props.title}
				</div>
			);
		}

		return (
			<div
				className={this.classes.join(' ')}
				style={{...this.inlineStyle}}
			>
				{title}
				<div className={this._widgetClasses.join(' ')}>
					{this.props.widget}
				</div>
			</div>
		);
	}
}
