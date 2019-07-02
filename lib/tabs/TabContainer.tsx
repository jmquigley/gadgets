/**
 * A typical tab control container.  This manages `Tab` elements within it.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/tabs.png" width="70%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Tab, TabContainer} from 'gadgets';
 *
 * const debug = require('debug')('App')
 *
 * <TabContainer
 *      maxTabs={3}
 *      location={Location.bottom}
 *      nonavigation
 *      onRemove={(tab: any) => {
 *          debug(removing %o (id=${tab.props['id']})`, tab.props["title"]);
 *      }}
 *      onSelection={(tab: any, previous: any) => {
 *          debug(
 *              `selected: %o (id=${tab.props["id"]}), previous: %o (id=${
 *                  previous.props["id"]
 *              })`,
 *              tab.props["title"],
 *              previous.props["title"]
 *          );
 *      }}
 * >
 *     <Tab title="tab #1">#1<br/><br/>{randomText}</Tab>
 *     <Tab title="tab #2">#2<br/><br/>{randomText}</Tab>
 *     <Tab title="tab #3">#3<br/><br/>{randomText}</Tab>
 *     <Tab title="tab #4">#4<br/><br/>{randomText}</Tab>
 * </TabContainer>
 * ```
 *
 * This example will create a tab container with four tabs drawn on the
 * bottom of the control.  It will suppress the navigation buttons.
 * This example sets the max number of tabs to 3, so the fourth would
 * be suppressed.
 *
 * The title value for a Tab component is unique within the container.  If
 * the same title is given, then the last one is used.
 *
 * ## API
 * #### Events
 * - `onRemove(tab)` - When a tab is removed this event is invoked.  The
 * callback will receive the tab instance that was removed.
 * - `onSelection(tab, previousTab)` - When a `Tab` is selected this event is
 * invoked.  The callback will receive a reference to the selected tab and the
 * previous tab.  If there is no previous tab, then the selected and
 * previous values are the same.
 *
 * #### Styles
 * - `ui-tab-container` - Global style applied to the root `<div>` element of
 * the `TabContainer` component.
 * - `ui-tab-bar` - Global style that is applied to each of the tab elements
 * within the container.
 * - `ui-tab-content` - Global style applied to the content that will be
 * displayed by a selected tab.
 * - `ui-tab-navigation` - style applied to the div surrounding the navigation
 * buttons within the tab bar.
 *
 * #### Properties
 * - `location=Location.top {Location}` - The position of the Tabs within the
 * container (.top, .bottom, .left, .right)
 * - `maxTabs=5 {number}` - the maximum number of tabs that will be shown
 * within the container.  This respects the order in which they are given
 * to the control.  If set to 0, then no maximum value is checked.
 * - `noborder=false {boolean}` - If true, then the border is disabled around
 * the content window, otherwise it is shown.
 * - `noclose=false {boolean}` - if true, then the close buttons on each
 * tab are suppressed, otherwise they are shown.
 * - `nonavigation=false {boolean}` - if true, then the navigation chevron
 * buttons are suppressed within the tab bar, otherwise they are shown
 * - `tabWidth=75 {number}` - the number of pixels for each `Tab` component
 * within the container.
 *
 * @module TabContainer
 */

import autobind from "autobind-decorator";
import {OrderedMap} from "immutable";
import * as React from "react";
import styled, {css} from "styled-components";
import {unitToNumber} from "util.calc";
import {nilEvent} from "util.toolbox";
import {Button} from "../button/Button";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	defaultBaseProps,
	Location,
	Wrapper
} from "../shared";
import {Tab} from "./Tab";

export interface TabContainerProps extends BaseProps {
	children?: React.ReactNode;
	maxTabs?: number;
	noclose?: boolean;
	nonavigation?: boolean;
	onRemove?: (tab: Tab) => void;
	onSelection?: (tab: Tab, previousTab: Tab) => void;
	tabWidth?: number;
}

export interface TabContainerState extends BaseState {
	selectedTab?: string;
}

interface TabContent {
	component?: any;
	content?: any;
}

interface Tabs {
	[key: string]: TabContent;
}

const TabBarHorizontal: any = css`
	display: flex;
`;

const TabBarVertical: any = css`
	display: inline-flex;
	flex-direction: column;
`;

const TabBarView: any = styled.div`
	${(props: TabContainerProps) => {
		if (
			props.location === Location.top ||
			props.location === Location.bottom
		) {
			return TabBarHorizontal;
		} else {
			return TabBarVertical;
		}
	}}
`;

const TabContainerView: any = styled.div`
	display: flex;
	height: 100%;
	min-height: ${(props: TabContainerProps) => props.minHeight};
	min-width: ${(props: TabContainerProps) => props.minWidth};
	width: 100%;

	${(props: TabContainerProps) =>
		props.location === Location.top || props.location === Location.bottom
			? "flex-direction: column;"
			: "flex-wrap: nowrap;"}
`;

const TabContentHorizontal: any = css`
	display: flex;

	${(props: TabContainerProps) => {
		if (props.location === Location.top) {
			return "border-top: solid 1px " + props.theme.borderColor + ";";
		} else if (props.location === Location.bottom) {
			return "border-bottom: solid 1px " + props.theme.borderColor + ";";
		} else {
			return "";
		}
	}}
`;

const TabContentVertical: any = css`
	display: inline-flex;
	flex-grow: 1;

	${(props: TabContainerProps) => {
		if (props.location === Location.left) {
			return "border-left: solid 1px " + props.theme.borderColor + ";";
		} else if (props.location === Location.right) {
			return "border-right: solid 1px " + props.theme.borderColor + ";";
		} else {
			return "";
		}
	}}
`;

const TabContentView: any = styled.div`
	${(props: TabContainerProps) => {
		if (!props.noborder) {
			return "border: solid 1px " + props.theme.borderColor + ";";
		} else {
			return "";
		}
	}}

	box-sizing: border-box;
	flex: 1;

	${(props: TabContainerProps) => {
		if (
			props.location === Location.top ||
			props.location === Location.bottom
		) {
			return TabContentHorizontal;
		} else {
			return TabContentVertical;
		}
	}}
`;

const TabNavigationTop: any = css`
	margin-left: auto;
`;

const TabNavigationView: any = styled.div`
	align-self: center;
	display: flex;
	float: right;

	${(props: TabContainerProps) => {
		switch (props.location) {
			case Location.top:
			case Location.bottom:
				return TabNavigationTop;
		}
	}}

	> .ui-button {
		display: inline-block;
		flex: unset;
	}
`;

export class TabContainer extends BaseComponent<
	TabContainerProps,
	TabContainerState
> {
	public static defaultProps: TabContainerProps = {
		...defaultBaseProps,
		location: Location.top,
		maxTabs: 5,
		noborder: false,
		noclose: false,
		nonavigation: false,
		onRemove: nilEvent,
		onSelection: nilEvent,
		tabWidth: 100,
		minHeight: "100px",
		minWidth: "350px"
	};

	private _removedTabs: any = [];
	private _tabContent: any = null;
	private _tabMap: OrderedMap<string, Tabs> = OrderedMap();
	private _tabs: any = [];

	constructor(props: TabContainerProps) {
		super("ui-tab-container", TabContainer, props);

		// Initialize all of the tabs given to the container.  This will assign
		// the id/key and remove any child that is not a Tab.
		if (props.children) {
			this.buildTabs(this.props);
		}

		this.state = {
			...this.state,
			selectedTab: this._tabs.length > 0 ? this._tabs[0].props["id"] : ""
		};
	}

	/**
	 * @return {number} the index value location for the currently selected
	 * tab.
	 */
	get currentIdx(): number {
		return this._getTabIdx(this.state.selectedTab);
	}

	/**
	 * Sets the current tab ID/Key value in the state.  This update is NOT
	 * synchronous (like all React setState calls)
	 * @param id {string} the unique tab key value to set in this id.
	 */
	set selectedTab(id: string) {
		this.setState({selectedTab: id});
	}

	/**
	 * @return {any[]} the child tab array used by this control.  This only
	 * useful for testing purposes.
	 */
	get tabs() {
		return this._tabs;
	}

	/**
	 * The child elements under the container must be modified to add a select
	 * handler and unique id values.  The id value for the tab is generated by
	 * the Keys class.  The content for each tab is also saved as a reference
	 * into a Tab map class instance.  When the Tab child component is created
	 * it wraps the content.  The problem with cloning the children to add
	 * properties is that it recreates all of the children under that
	 * component.  It's a problem to keep recreating the underlying children
	 * when this doesn't need to be done each time a tab is changed.  To fix
	 * this the "children" under a Tab are removed when they are cloned and
	 * saved in a TabMap.  The content displayed is handled by the TabContainer
	 * when the switch occurs.  This prevents the recreation of child elements.
	 * @param props {TabContainerProps} - the properties passed to the tab
	 * container.
	 * @return an array of Tabs components
	 */
	private buildTabs(props: TabContainerProps) {
		// the tab content that is currently displayed.  This is reset on
		// each rebuild and is computed below when the tab list is rebuilt
		this._tabContent = null;

		this._tabs = React.Children.map(props.children, (child: any) => {
			const title = child.props["title"];
			const content = child["props"].children;

			// Retrieves the current id or assigns a new one.  This also saves the
			// reference to the content for this tab.  If the reference changes
			// under the tab this will capture it.
			let id: string = "";
			if (title in this._tabMap) {
				id = this._tabMap[title]["component"]["props"]["id"];
				this._tabMap[title]["content"] = content;
			} else {
				id = this.keys.at(title);
				this._tabMap[title] = {content};
			}

			const selected: boolean =
				id &&
				this.state &&
				"selectedTab" in this.state &&
				this.state.selectedTab === id;

			// This sets the currently displayed content within the container
			if (selected && !props.disabled) {
				this._tabContent = (
					<TabContentView
						className='ui-tab-content'
						key={this.keys.at(`content-${title}`)}
						location={props.location}
						noborder={props.noborder}
					>
						{this._tabMap[title]["content"]}
					</TabContentView>
				);

				this.debug("Tab content: %O", this._tabContent);
			}

			// Clone each given Tab child component and add properties
			// for select handling, id, and select coloring.
			const newChild = React.cloneElement(child, {
				children: null,
				disabled: props.disabled,
				href: {
					hiddenTabHandler: this.hiddenTabHandler,
					selectHandler: this.selectHandler
				},
				id,
				key: id,
				noclose: props.noclose,
				orientation: props.location,
				sizing: props.sizing,
				selected,
				width: `${props.tabWidth}px`
			});

			this._tabMap[title]["component"] = newChild;

			return newChild;
		}).filter((child: any) => !this._removedTabs.includes(child.props.id));

		// Only return/display the max number of tabs given in the props if
		// the requested max is greater than 0.
		if (props.maxTabs > 0) {
			this._tabs = this._tabs.slice(0, this.props.maxTabs);
		}

		return this._tabs;
	}

	/**
	 * Searches the current tab list and finds the tab object associated with
	 * the given id.  This method is private by convention.  It is only exposed
	 * for testing purposes.
	 * @param id {string} the id value associated with a Tag to find
	 * @return {tuple} a tuple reference to the Tag object associated with this
	 * id and its index position within the child array.  It returns null if
	 * the tag is not found.
	 */
	public _getTab(id: string): any {
		if (id) {
			for (const [idx, tab] of this._tabs.entries()) {
				if (tab.props["id"] === id) {
					return [this._tabs[idx], idx];
				}
			}
		}

		return [null, -1];
	}

	/**
	 * Searches the current tab list and finds the tab index associated with
	 * the given id.  This method is private by convention.  It is only exposed
	 * for testing purposes.
	 * @param id {string} the id value associated with a Tag to find
	 * @return {number} the number index of this id with the tabs array.  If
	 * the value is not found it returns -1.
	 */
	public _getTabIdx(id: string): number {
		if (id) {
			for (const [idx, tab] of this._tabs.entries()) {
				if (tab.props["id"] === id) {
					return idx;
				}
			}
		}

		return -1;
	}

	@autobind
	private handlePreviousTab() {
		const idx: number = this.currentIdx;

		if (this._tabs.length && idx - 1 >= 0) {
			this.selectHandler(this._tabs[idx - 1]);
		}
	}

	@autobind
	private handleNextTab() {
		const idx: number = this.currentIdx;

		if (this._tabs.length && idx + 1 <= this._tabs.length - 1) {
			this.selectHandler(this._tabs[idx + 1]);
		}
	}

	@autobind
	private hiddenTabHandler(tab: Tab) {
		// Get the id of the tab that was removed.
		// try to get the one to the left first.  If that doesn't exist
		// the get the one to the right.  If that doesn't exist (it was
		// the last tab), then set to null
		const idx: number = this._getTabIdx(tab.props["id"]);
		let id: string = null;

		if (idx - 1 >= 0) {
			id = this._tabs[idx - 1].props["id"];
		} else if (idx + 1 <= this._tabs.length - 1) {
			id = this._tabs[idx + 1].props["id"];
		}

		this.selectedTab = id;
		this._removedTabs.push(tab.props["id"]);
		this.props.onRemove(tab);
	}

	@autobind
	private selectHandler(tab: Tab) {
		if (this.state.selectedTab) {
			this.debug("selectHandler -> tab: %O", tab);
			const previous = this._getTab(this.state.selectedTab)[0];

			this.selectedTab = tab.props["id"];
			this.props.onSelection(tab, previous ? previous : tab);
		}
	}

	public render() {
		super.render();

		let body = null;
		const style = {};

		// Removes non standard property to remove jest warning in test
		const {onRemove, onSelection, ...props} = this.props;

		if (this._tabs.length > 0) {
			this.buildTabs(props);
		} else {
			// No more tabs, suppress content
			this._tabContent = null;
		}

		if (
			props.location === Location.right ||
			props.location === Location.left
		) {
			style["width"] = `${props.tabWidth}px`;
		}

		let tabNavigation: any = null;
		if (!props.nonavigation) {
			tabNavigation = (
				<TabNavigationView {...props} className='ui-tab-navigation'>
					<Button
						color={this.theme.chevronColor}
						iconName='chevron-left'
						onClick={this.handlePreviousTab}
					/>
					<Button
						color={this.theme.chevronColor}
						iconName='chevron-right'
						onClick={this.handleNextTab}
					/>
				</TabNavigationView>
			);
		}

		const tabBar = (
			<TabBarView
				{...props}
				className='ui-tab-bar'
				location={props.location}
			>
				{this._tabs}
				{tabNavigation}
			</TabBarView>
		);

		// The number +2 below represents an extra tab component and the
		// navigation buttons for sizing purposes.
		const sizingFactor = this._tabs.length + 2;
		const minHeight =
			unitToNumber(BaseComponent.lineHeightPX(this.props.sizing)) *
			sizingFactor;
		const minWidth = this.props.tabWidth * sizingFactor;

		if (
			props.location === Location.top ||
			props.location === Location.left
		) {
			body = (
				<TabContainerView
					{...props}
					className={this.className}
					minHeight={`${minHeight}px`}
					minWidth={`${minWidth}px`}
				>
					{tabBar}
					{this._tabContent}
				</TabContainerView>
			);
		} else {
			body = (
				<TabContainerView
					{...props}
					className={this.className}
					minHeight={`${minHeight}px`}
					minWidth={`${minWidth}px`}
				>
					{this._tabContent}
					{tabBar}
				</TabContainerView>
			);
		}

		return (
			<Wrapper {...props} name={this.name}>
				{body}
			</Wrapper>
		);
	}
}

export default TabContainer;
