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
 * - TitleLayout.third
 * - TitleLayout.stacked
 * - TitleLayout.dominant
 * - TitleLayout.none
 *
 * In `quarter` the title takes up 25% and the widget takes up 75%
 * In `even` the title and widget take up 50%
 * In `threequarter` the title takes up 75% and the widget takes up 25%
 * In `third` the titel takes up 33% of the space
 * In `stacked` the title is placed above the widget
 * In `dominant` the title takes up 83% of the width (5/6)
 * In `none` the title takes up 100% of the width
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
import {ClassNames} from 'util.classnames';
import {nilEvent} from 'util.toolbox';
import {Label} from '../label';
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';

const styles = require('./styles.css');

export enum TitleLayout {
	quarter,
	even,
	threequarter,
	third,
	stacked,
	dominant,
	none
}

export interface TitleProps extends BaseProps {
	layout?: TitleLayout;
	onClick?: any;
	title?: any;
	widget?: any;
}

export function getDefaultTitleProps(): TitleProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			layout: TitleLayout.dominant,
			onClick: nilEvent,
			widget: null
		})
	);
}

export class Title extends BaseComponent<TitleProps, undefined> {

	public static defaultProps: TitleProps = getDefaultTitleProps();

	private static readonly _resetTitleClasses = [
		styles.titleQuarter,
		styles.titleEven,
		styles.titleThreeQuarter,
		styles.titleThird,
		styles.titleStacked,
		styles.titleDominant
	];

	private static readonly _resetWidgetClasses = [
		styles.widgetQuarter,
		styles.widgetEven,
		styles.widgetThreeQuarter,
		styles.widgetThird,
		styles.widgetStacked,
		styles.widgetDominant
	];

	private _titleClasses: ClassNames = new ClassNames();
	private _widgetClasses: ClassNames = new ClassNames();

	constructor(props: TitleProps) {
		super(props, styles);

		this._rootStyles.add('ui-title-bar');

		this._titleClasses.add([
			'ui-title',
			this.styles.title
		]);

		this._widgetClasses.add([
			'ui-title-widget',
			this.styles.widget
		]);

		this.componentWillUpdate(props);
	}

	public componentWillUpdate(nextProps: TitleProps) {

		if (nextProps.layout !== this.props.layout) {
			this._titleClasses.reset(Title._resetTitleClasses);
			this._widgetClasses.reset(Title._resetWidgetClasses);
		}

		switch (nextProps.layout) {
			case TitleLayout.quarter:
				this._titleClasses.on(this.styles.titleQuarter);
				this._widgetClasses.on(this.styles.widgetQuarter);
				break;

			case TitleLayout.even:
			case TitleLayout.none:
				this._titleClasses.on(this.styles.titleEven);
				this._widgetClasses.on(this.styles.widgetEven);
				break;

			case TitleLayout.threequarter:
				this._titleClasses.on(this.styles.titleThreeQuarter);
				this._widgetClasses.on(this.styles.widgetThreeQuarter);
				break;

			case TitleLayout.third:
				this._titleClasses.on(this.styles.titleThird);
				this._widgetClasses.on(this.styles.widgetThird);
				break;

			case TitleLayout.stacked:
				this._titleClasses.on(this.styles.titleStacked);
				this._widgetClasses.on(this.styles.widgetStacked);
				break;

			case TitleLayout.dominant:
			default:
				this._titleClasses.on(this.styles.titleDominant);
				this._widgetClasses.on(this.styles.widgetDominant);
		}

		this._rootStyles.onIfElse(nextProps.layout === TitleLayout.stacked)
		(
			this.styles.titleBarStacked
		)(
			this.styles.titleBar
		);

		this._rootStyles.onIf(!nextProps.noripple && !nextProps.disabled)(
			'ripple'
		);

		this.updateFontStyle(this._widgetClasses, nextProps, this.props);

		super.componentWillUpdate(nextProps);
	}

	public render() {
		let title: any = null;
		if (typeof this.props.title === 'string') {
			title = (
				<Label
					{...this.props}
					className={this._titleClasses.classnames}
					text={this.props.title}
				/>
			);
		} else {
			title = (
				<div
					className={this._titleClasses.classnames}
				>
					{this.props.title}
				</div>
			);
		}

		let widget: any = null;
		if (this.props.layout !== TitleLayout.none && this.props.widget != null) {
			widget = (
				<div className={this._widgetClasses.classnames}>
					{this.props.widget}
				</div>
			);
		}

		return (
			<div
				className={this._rootStyles.classnames}
				style={{...this.inlineStyle}}
			>
				{title}
				{widget}
			</div>
		);
	}
}
