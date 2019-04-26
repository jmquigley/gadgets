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
 * - `onClick` - invoked when a tab is selected from the Container
 * - `onClose` - invoked when the close button is selected on the tab.  A
 * reference to the closed tab is passed to the callback.
 *
 * #### Styles
 * - `ui-tab` - The global CSS class applied to the top level `div` of the
 * `Tab` component.
 *
 * #### Properties
 * - `href: {any}` - This is a general object used to pass references from
 * the parent to the child.  It includes the following attributes:
 *   - `selectHandler` - a function reference back to the container that is
 *     invoked to tell the container that this tab was selected.
 * - `orientation` - the location in the container component where the
 * tab will be drawn (top, bottom, left, right)
 * - `selected: {boolean} (false)` - if this is set to true, then the tab
 * will show as selected.
 * - `title: {string} ('')` - the text that will be shown on the tab.
 *
 * @module Tab
 */

import autobind from "autobind-decorator";
import * as React from "react";
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
import styled, {css} from "../shared/themed-components";

export interface TabProps extends BaseProps {
	href?: any;
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
		obj: "Tab",
		onClick: nilEvent,
		onClose: nilEvent,
		orientation: Location.top,
		selected: false,
		title: ""
	};
}

export interface TabState extends BaseState {
	hidden: boolean;
}

export function getDefaultTabState(): TabState {
	return {...getDefaultBaseState(), hidden: false};
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

const TabView: any = styled.div`
	cursor: default;
	display: inline-block;
	flex-grow: unset;

	${(props: TabProps) => (props.xcss ? props.xcss : "")}

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
		super(props, "ui-tab", Tab.defaultProps.style);
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
		this.setState({hidden: true}, () => {
			this.props.href.hiddenTabHandler(this);
			this.props.onClose(this);
		});
	}

	public static getDerivedStateFromProps(props: TabProps, state: TabState) {
		const newState: TabState = {...state};

		if (newState.hidden) {
			newState.style = {
				display: "none",
				minWidth: "",
				width: ""
			};
		} else {
			newState.style = {
				minWidth: "120px",
				width: props.width
			};
		}

		return super.getDerivedStateFromProps(props, newState, true);
	}

	public render() {
		this.updateClassName();

		let xcss: any = "";
		switch (this.props.orientation) {
			case Location.top:
				xcss = TabBorderTop;
				break;
			case Location.bottom:
				xcss = TabBorderBottom;
				break;
			case Location.left:
				xcss = TabBorderLeft;
				break;
			case Location.right:
				xcss = TabBorderRight;
				break;
		}

		return (
			<Wrapper {...this.props}>
				<TabView
					disabled={this.props.disabled}
					className={this.className}
					selected={this.props.selected}
					sizing={this.props.sizing}
					style={this.state.style}
					visible={this.props.visible}
					xcss={xcss}
				>
					<Item
						{...this.props}
						hiddenRightButton={true}
						onClick={this.handleClick}
						rightButton={
							<Button
								{...this.props}
								iconName='times'
								onClick={this.handleClose}
							/>
						}
						title={this.props.title}
						useedit={false}
						visible={!this.state.hidden}
					/>
				</TabView>
			</Wrapper>
		);
	}
}

export default Tab;
