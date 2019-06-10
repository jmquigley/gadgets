/**
 * Represents a single `Tab` entry within a `TabContainer`.  This component
 * would generally be used only with the `TabContainer`.  The tab acts
 * as a wrapper for some other content (the children within the control can
 * be any other object).
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/tabs.png" width="50%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Tab, TabContainer} from 'gadgets';
 *
 * <TabContainer maxTabs={3} location={Location.bottom} nonavigation>
 *     <Tab title="tab #1">#1<br/><br/>{randomText}</Tab>
 *     <Tab title="tab #2">#2<br/><br/>{randomText}</Tab>
 *     <Tab title="tab #3">#3<br/><br/>{randomText}</Tab>
 *     <Tab title="tab #4">#4<br/><br/>{randomText}</Tab>
 * </TabContainer>
 * ```
 * This example will create a tab container with four tabs drawn on the
 * bottom of the control.  It will suppress the navigation buttons.
 * This example sets the max number of tabs to 3, so the fourth would
 * be suppressed.
 *
 * The tab contents in this example hold a string, but could hold any other
 * valid HTML objects.
 *
 * ## API
 * #### Events
 * - `onClick` - Invoked when a tab is selected from the Container
 * - `onClose(tab: any)` - Invoked when the close button is selected on the tab.
 * A reference to the closed tab is passed to the callback.
 *
 * #### Styles
 * - `ui-tab` - The global CSS class applied to the top level `div` of the
 * `Tab` component.
 *
 * #### Properties
 * - `href {any}` - This is a general object used to pass references from
 * the parent to the child.  It includes the following attributes:
 *   - `selectHandler` - a function reference back to the container that is
 *     invoked to tell the container that this tab was selected.
 * - `noclose=false {boolean}` - when set to true the close button is
 * disabled and this tab cannot be hidden.  This is generally passed to the
 * component by the TabContainer.
 * - `orientation=Location.top {Location}` - the location in the container
 * component where the tab will be drawn (top, bottom, left, right)
 * - `selected=false {boolean}` - if this is set to true, then the tab
 * will show as selected.
 * - `title='' {string}` - the text that will be shown on the tab.
 *
 * @module Tab
 */

import autobind from "autobind-decorator";
import * as React from "react";
import styled, {css} from "styled-components";
import {nilEvent} from "util.toolbox";
import {Button} from "../button";
import {Item} from "../item";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	ColorScheme,
	disabled,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Location,
	Wrapper
} from "../shared";

export interface TabProps extends BaseProps {
	href?: any;
	noclose?: boolean;
	onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
	onClose?: (tab: any) => void;
	orientation?: Location;
	selected?: boolean;
	title?: string;
}

export function getDefaultTabProps(): TabProps {
	return {
		...getDefaultBaseProps(),
		href: {
			selectHandler: nilEvent
		},
		minWidth: "120px",
		noclose: false,
		onClick: nilEvent,
		onClose: nilEvent,
		orientation: Location.top,
		selected: false,
		title: ""
	};
}

export interface TabState extends BaseState {
	visible: boolean;
}

export function getDefaultTabState(): TabState {
	return {...getDefaultBaseState(), visible: true};
}

const TabBorderTop: any = css`
	border-right: solid 1px
		${(props: TabProps) => props.theme.borderColor || ColorScheme.c1};
	border-top: solid 1px
		${(props: TabProps) => props.theme.borderColor || ColorScheme.c1};

	&:first-child {
		border-left: solid 1px
			${(props: TabProps) => props.theme.borderColor || ColorScheme.c1};
	}
`;

const TabBorderBottom: any = css`
	border-right: solid 1px
		${(props: TabProps) => props.theme.borderColor || ColorScheme.c1};
	border-bottom: solid 1px
		${(props: TabProps) => props.theme.borderColor || ColorScheme.c1};

	&:first-child {
		border-left: solid 1px
			${(props: TabProps) => props.theme.borderColor || ColorScheme.c1};
	}
`;

const TabBorderLeft: any = css`
	border-left: solid 1px
		${(props: TabProps) => props.theme.borderColor || ColorScheme.c1};
	border-bottom: solid 1px
		${(props: TabProps) => props.theme.borderColor || ColorScheme.c1};

	&:first-child {
		border-top: solid 1px
			${(props: TabProps) => props.theme.borderColor || ColorScheme.c1};
	}
`;

const TabBorderRight: any = css`
	border-right: solid 1px
		${(props: TabProps) => props.theme.borderColor || ColorScheme.c1};
	border-bottom: solid 1px
		${(props: TabProps) => props.theme.borderColor || ColorScheme.c1};

	&:first-child {
		border-top: solid 1px
			${(props: TabProps) => props.theme.borderColor || ColorScheme.c1};
	}
`;

const TabHidden: any = css`
	display: none;
	min-width: unset;
	width: unset;
`;

const TabVisible: any = css`
	display: inline-block;
	min-width: ${(props: TabProps) => props.minWidth};
	width: ${(props: TabProps) => props.width};
`;

const TabView: any = styled.div`
	cursor: default;
	flex-grow: unset;

	${(props: TabProps) => (props.visible ? TabVisible : TabHidden)}

	${(props: TabProps) => {
		switch (props.orientation) {
			case Location.bottom:
				return TabBorderBottom;
			case Location.left:
				return TabBorderLeft;
			case Location.right:
				return TabBorderRight;
			case Location.top:
			default:
				return TabBorderTop;
		}
	}}

	&:hover .ui-button {
		color: ${(props: TabProps) => props.theme.backgroundColor};
		background-color: ${(props: TabProps) => props.theme.hoverColor};
		display: flex;
		opacity: 1;
	}

	.ui-label {
		padding-left: 4px;
	}

	.ui-button:hover {
		background-color: ${Color.error} !important;
	}

	.ui-button {
		display: none;
		opacity: 0;
		animation: fadeIn ${(props: TabProps) => props.theme.transitionDelay};
	}

	${(props: TabProps) => disabled(props)}
	${(props: TabProps) => invisible(props)}
`;

export class Tab extends BaseComponent<TabProps, TabState> {
	public static readonly defaultProps: TabProps = getDefaultTabProps();

	public state: TabState = getDefaultTabState();

	constructor(props: TabProps) {
		super("ui-tab", Tab, props, {
			...getDefaultTabState(),
			visible: props.visible
		});
	}

	@autobind
	private handleClick(e: React.MouseEvent<HTMLLIElement>) {
		if (!this.props.disabled && this.props.visible) {
			this.props.href.selectHandler(this);
			this.props.onClick(e);
		}
	}

	@autobind
	private handleClose() {
		if (!this.props.noclose) {
			this.setState({visible: false}, () => {
				this.props.href.hiddenTabHandler(this);
				this.props.onClose(this);
			});
		}
	}

	public render() {
		super.render();

		let closeButton: any = null;
		if (!this.props.noclose) {
			closeButton = (
				<Button
					{...this.props}
					iconName='times'
					onClick={this.handleClose}
				/>
			);
		}

		return (
			<Wrapper {...this.props} name={this.name}>
				<TabView
					disabled={this.props.disabled}
					className={this.className}
					minWidth={this.props.minWidth}
					orientation={this.props.orientation}
					selected={this.props.selected}
					sizing={this.props.sizing}
					style={this.state.style}
					visible={this.state.visible}
					width={this.props.width}
				>
					<Item
						{...this.props}
						hiddenRightButton={true}
						noedit
						onClick={this.handleClick}
						rightButton={closeButton}
						title={this.props.title}
						useedit={false}
						visible={this.state.visible}
					/>
				</TabView>
			</Wrapper>
		);
	}
}

export default Tab;
