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
import {Label} from '../label';
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';

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

	private _titleClasses: ClassNames = new ClassNames();
	private _widgetClasses: ClassNames = new ClassNames();
	private _resetTitleClasses: any;
	private _resetWidgetClasses: any;

	constructor(props: TitleProps) {
		super(props, require('./styles.css'));

		this._rootStyles.add('ui-title-bar');
		this._titleClasses.add('ui-title');
		this._widgetClasses.add('ui-title-widget');

		this._resetTitleClasses = {
			[this.styles.titleQuarter]: false,
			[this.styles.titleEven]: false,
			[this.styles.titleEven]: false,
			[this.styles.titleThreeQuarter]: false,
			[this.styles.titleThird]: false,
			[this.styles.titleStacked]: false,
			[this.styles.titleDominant]: false
		};

		this._resetWidgetClasses = {
			[this.styles.widgetQuarter]: false,
			[this.styles.widgetEven]: false,
			[this.styles.widgetEven]: false,
			[this.styles.widgetThreeQuarter]: false,
			[this.styles.widgetThird]: false,
			[this.styles.widgetStacked]: false,
			[this.styles.widgetDominant]: false
		};

		this.componentWillUpdate(props);
	}

	public componentWillUpdate(nextProps: TitleProps) {

		if (nextProps.layout !== this.props.layout) {
			// Resets all title/widget styles when a change occurs
			this._titleClasses.add(this._resetTitleClasses);
			this._widgetClasses.add(this._resetWidgetClasses);
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

		if (this.props.sizing !== nextProps['sizing']) {
			this._widgetClasses.off(this.fontStyle(this.props.sizing));
		}
		this._widgetClasses.on(this.fontStyle(nextProps.sizing));

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
