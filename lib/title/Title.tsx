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

// const debug = require('debug')('Title');

import * as React from "react";
import {nilEvent} from "util.toolbox";
import {Label} from "../label";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Sizing,
	Wrapper
} from "../shared";
import styled, {css} from "../shared/themed-components";

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
	onClick?: (e: React.MouseEvent<any>) => void;
	onUpdate?: (previous: string, val: string) => void;
	title?: any;
	widget?: any;
	useedit?: boolean;
}

export function getDefaultTitleProps(): TitleProps {
	return {
		...getDefaultBaseProps(),
		layout: TitleLayout.dominant,
		obj: "Title",
		onClick: nilEvent,
		onUpdate: nilEvent,
		ripple: true,
		widget: null,
		useedit: false
	};
}

export type TitleState = BaseState;

export function getDefaultTitleState(): TitleState {
	return {...getDefaultBaseState()};
}

export const TitleView: any = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: ${(props: TitleProps) =>
		props.layout === TitleLayout.stacked ? "column" : "row"};
	flex-grow: 1;

	${(props: TitleProps) => disabled(props)}
	${(props: TitleProps) => invisible(props)}
`;

const TitleQuarterView: any = css`
	text-align: left;
	flex: 1;
`;

const WidgetQuarterView: any = css`
	text-align: right;
	flex: 3;
`;

const TitleEvenView: any = css`
	text-align: left;
	flex: 1;
`;

const WidgetEvenView: any = css`
	text-align: right;
	flex: 1;
`;

const TitleThreeQuarterView: any = css`
	text-align: left;
	flex: 3;
`;

const WidgetThreeQuarterView: any = css`
	text-align: right;
	flex: 1;
`;

const TitleThirdView: any = css`
	text-align: left;
	flex: 1;
`;

const WidgetThirdView: any = css`
	text-align: right;
	flex: 2;
`;

const TitleStackedView: any = css`
	display: block;
`;

const WidgetStackedView: any = css`
	display: block;
`;

const TitleDominantView: any = css`
	text-align: left;
	flex: 5;
`;

const WidgetDominantView: any = css`
	text-align: right;
	flex: 1;
`;

const LabelPadding: any = css`
	padding: ${(props: TitleProps) => {
		switch (props.sizing) {
			case Sizing.xxsmall:
				return "1px 2px";
			case Sizing.xsmall:
				return "1px 2px";
			case Sizing.small:
				return "2px 4px";
			case Sizing.large:
				return "4px 8px";
			case Sizing.xlarge:
				return "4px 8px";
			case Sizing.xxlarge:
				return "4px 8px";

			case Sizing.normal:
			default:
				return "2px 4px";
		}
	}};

	${(props: TitleProps) => props.xcss && props.xcss}
`;

const StyledWidget: any = styled.div`
	align-items: center;
	display: block;

	${(props: TitleProps) => props.sizing && fontStyle[props.sizing]}
	${LabelPadding}
`;

const StyledLabel: any = styled(Label)`
	${LabelPadding}
`;

export class Title extends BaseComponent<TitleProps, TitleState> {
	public static defaultProps: TitleProps = getDefaultTitleProps();
	public state: TitleState = getDefaultTitleState();

	constructor(props: TitleProps) {
		super(props, "ui-title-bar", Title.defaultProps.style);
	}

	public render() {
		this.updateClassName();

		let title: any = null;
		let titleView: any = null;
		let widget: any = null;
		let widgetView: any = null;

		// Remove the onUpdate handler from the main props.  This is only passed
		// down when the title is resolved to a label.  When it's a string the onUpdate
		// prop should not be attached.
		const {onUpdate, ripple, ...props} = this.props;

		switch (props.layout) {
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

		if (typeof props.title === "string") {
			title = (
				<StyledLabel
					{...props}
					className='ui-title'
					onUpdate={this.props.onUpdate}
					text={this.props.title}
					useedit={this.props.useedit}
					xcss={titleView}
				/>
			);
		} else {
			title = (
				<StyledWidget {...props} className='ui-title' xcss={titleView}>
					{this.props.title}
				</StyledWidget>
			);
		}

		if (this.props.widget) {
			widget = (
				<StyledWidget
					{...props}
					className='ui-title-widget'
					xcss={widgetView}
				>
					{this.props.widget}
				</StyledWidget>
			);
		}

		return (
			<Wrapper {...this.props}>
				<TitleView
					className={this.className}
					disabled={this.props.disabled}
					layout={this.props.layout}
					ripple={this.props.ripple}
					sizing={this.props.sizing}
					style={this.state.style}
					visible={this.props.visible}
				>
					{title}
					{widget}
				</TitleView>
			</Wrapper>
		);
	}
}

export default Title;
