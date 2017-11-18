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
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/title.png" width="60%" />
 *
 * ## Examples:
 *
 * #### Title as a string
 * ```javascript
 * import {Sizing, Title, TitleLayout} from 'gadgets';
 * <Title
 *     widget="widget"
 *     layout={TitleLayout.stacked}
 *     sizing={Sizing.small}>
 *     title="string"
 * </Title>
 * ```
 *
 * #### Title as an object
 * <Title
 *     widget="widget"
 *     layout={TitleLayout.stacked}
 *     sizing={Sizing.small}>
 *     title="string"
 * </Title>
 *
 * ## API
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
import {nilEvent} from 'util.toolbox';
import {Label} from '../label';
import {
	BaseComponent,
	BaseProps,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getTheme,
	invisible
} from '../shared';
import styled, {css, ThemeProvider, withProps} from '../shared/themed-components';

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
			obj: 'Title',
			onClick: nilEvent,
			widget: null
		})
	);
}

export const TitleView: any = withProps<TitleProps, HTMLDivElement>(styled.div)`
	box-sizing: border-box;
	display: flex;
	flex-direction: ${props => props.layout === TitleLayout.stacked ? 'column' : 'row'};
	flex-grow: 1;

	${props => disabled(props)}
	${props => invisible(props)}
`;

export const TitleQuarterView: any = css`
	text-align: left;
	flex: 1;
`;

export const WidgetQuarterView: any = css`
	text-align: right;
	flex: 3;
`;

export const TitleEvenView: any = css`
	text-align: left;
	flex: 1;
`;

export const WidgetEvenView: any = css`
	text-align: right;
	flex: 1;
`;

export const TitleThreeQuarterView: any = css`
	text-align: left;
	flex: 3;
`;

export const WidgetThreeQuarterView: any = css`
	text-align: right;
	flex: 1;
`;

export const TitleThirdView: any = css`
	text-align: left;
	flex: 1;
`;

export const WidgetThirdView: any = css`
	text-align: right;
	flex: 2;
`;

export const TitleStackedView: any = css`
	display: block;
`;

export const WidgetStackedView: any = css`
	display: block;
`;

export const TitleDominantView: any = css`
	text-align: left;
	flex: 5;
`;

export const WidgetDominantView: any = css`
	text-align: right;
	flex: 1;
`;

const StyledWidget: any = withProps<TitleProps, HTMLDivElement>(styled.div)`
	align-items: center;
	display: block;

	${props => props.xcss && props.xcss}
	${props => props.sizing && fontStyle[props.sizing]}
`;

export const StyledLabel: any = StyledWidget.withComponent(Label);

export class Title extends BaseComponent<TitleProps, undefined> {

	public static defaultProps: TitleProps = getDefaultTitleProps();

	constructor(props: TitleProps) {
		super(props);
		this._classes.add('ui-title-bar');
		this.componentWillUpdate(this.props);
	}

	public componentWillUpdate(nextProps: TitleProps) {
		this._classes.onIf(!nextProps.noripple && !nextProps.disabled)(
			'ripple'
		);

		super.componentWillUpdate(nextProps);
	}

	public render() {
		let title: any = null;
		let titleView: any = null;
		let widget: any = null;
		let widgetView: any = null;

		switch (this.props.layout) {
			case TitleLayout.quarter:
				titleView = TitleQuarterView;
				widgetView = WidgetQuarterView;
				break;

			case TitleLayout.threequarter:
				titleView = TitleThreeQuarterView;
				widgetView = WidgetThreeQuarterView;
				break;

			case TitleLayout.third:
				titleView = TitleThirdView;
				widgetView = WidgetThirdView;
				break;

			case TitleLayout.stacked:
				titleView = TitleStackedView;
				widgetView = WidgetStackedView;
				break;

			case TitleLayout.dominant:
				titleView = TitleDominantView;
				widgetView = WidgetDominantView;
				break;

			case TitleLayout.even:
			default:
				titleView = TitleEvenView;
				widgetView = WidgetEvenView;
				break;
		}

		if (typeof this.props.title === 'string') {
			title = (
				<StyledLabel
					{...this.props}
					className="ui-title"
					text={this.props.title}
					xcss={titleView}
				/>
			);
		} else {
			title = (
				<StyledWidget className="ui-title" xcss={titleView}>
					{this.props.title}
				</StyledWidget>
			);
		}

		if (this.props.layout !== TitleLayout.none && this.props.widget != null) {
			widget = (
				<StyledWidget {...this.props} className="ui-title-widget" xcss={widgetView}>
					{this.props.widget}
				</StyledWidget>
			);
		}

		return (
			<ThemeProvider theme={getTheme()}>
				<TitleView
					className={this.classes}
					disabled={this.props.disabled}
					layout={this.props.layout}
					style={this.inlineStyles}
					visible={this.props.visible}
				>
					{title}
					{widget}
				</TitleView>
			</ThemeProvider>
		);
	}
}
