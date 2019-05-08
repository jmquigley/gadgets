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
 *      onSelect={(tab: any, previous: any) => {
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
 * ## API
 * #### Events
 * - `onRemove(tab)` - When a tab is removed this event is invoked.  The
 * callback will receive the tab instance that was removed.
 * - `onSelect(tab, previousTab)` - When a `Tab` is selected this event is
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
 * - `children: {any} (null)` - the objects within the `TabContainer`.  This
 * control will only use `Tab` components and ignore all others.
 * - `maxTabs: {number} (5)` - the maximum number of tabs that will be shown
 * within the container.  This respects the order in which they are given
 * to the control.
 * - `noclose: {boolean} (false)` - if true, then the close buttons on each
 * tab are suppressed, otherwise they are shown.
 * - `nonavigation: {boolean} (false)` - if true, then the navigation
 * chevron buttons are suppressed within the tab bar, otherwise they are shown
 * - `tabWidth: {number} (75)` - the number of pixels for each `Tab`
 * component within the container.
 *
 * @module TabContainer
 */

// const debug = require("debug")("gadgets.TabContainer");

import autobind from "autobind-decorator";
import _ from "lodash";
import * as React from "react";
import {unitToNumber} from "util.calc";
import {Keys} from "util.keys";
import {nilEvent} from "util.toolbox";
import {Button} from "../button";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	getDefaultBaseProps,
	getDefaultBaseState,
	Location,
	Wrapper
} from "../shared";
import styled, {css} from "../shared/themed-components";
import {Tab} from "./Tab";

export interface TabContainerProps extends BaseProps {
	children?: React.ReactNode;
	maxTabs?: number;
	noclose?: boolean;
	nonavigation?: boolean;
	onRemove?: (tab: Tab) => void;
	onSelect?: (tab: Tab, previousTab: Tab) => void;
	tabWidth?: number;
}

export function getDefaultTabContainerProps(): TabContainerProps {
	return _.omitBy(
		{
			...getDefaultBaseProps(),
			location: Location.top,
			maxTabs: 5,
			noborder: false,
			noclose: false,
			nonavigation: false,
			obj: "TabContainer",
			onRemove: nilEvent,
			onSelect: nilEvent,
			tabWidth: 100,
			minHeight: "100px",
			minWidth: "350px"
		},
		_.isNil
	);
}

export interface TabContainerState extends BaseState {
	selectedTab?: string;
}

export function getDefaultTabContainerState(): TabContainerState {
	return {
		...getDefaultBaseState(),
		selectedTab: ""
	};
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
	private _keys: Keys;
	private _tabContent: any = null;
	private _tabs: any = [];
	private _removedTabs: any = [];

	public static defaultProps: TabContainerProps = getDefaultTabContainerProps();

	constructor(props: TabContainerProps) {
		super(props, "ui-tab-container", TabContainer.defaultProps.style);

		this._keys = new Keys({testing: this.props.testing});

		// Initialize all of the tabs given to the container.  This will assign
		// the id/key and remove any child that is not a Tab.
		if (props.children) {
			this._tabs = this.updateChildren(this.props);
		}

		this.state = {
			...getDefaultTabContainerState(),
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
			const previous = this._getTab(this.state.selectedTab)[0];

			this.selectedTab = tab.props["id"];
			this.props.onSelect(tab, previous ? previous : tab);
		}
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

	/**
	 * The child elements under the container must be modified to add a select
	 * handler and unique id values.  The id value for the tab is stable based
	 * on the Keys class.
	 * @param props {TabContainerProps} - the properties passed to the tab
	 * container.
	 * @return an array of Tabs components
	 */
	private updateChildren(props: TabContainerProps) {
		let children = React.Children.map(
			props.children,
			(child: any, pos: number) => {
				const id = this._keys.at(pos);
				const selected =
					id &&
					this.state &&
					"selectedTab" in this.state &&
					this.state.selectedTab === id;

				if (selected && !props.disabled) {
					this._tabContent = child["props"].children;
				}

				const newChild = React.cloneElement(child, {
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
					selected: selected,
					width: `${props.tabWidth}px`
				});

				return newChild;
			}
		).filter((child) => !this._removedTabs.includes(child.props.id));

		if (props.maxTabs > 0) {
			children = children.slice(0, this.props.maxTabs);
		}

		return children;
	}

	public render() {
		this.updateClassName();

		let body = null;
		const style = {};

		// Removes non standard property to remove jest warning in test
		const {onRemove, ...props} = this.props;

		if (this._tabs.length > 0) {
			this._tabs = this.updateChildren(props);
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

		const tabContent = (
			<TabContentView
				className='ui-tab-content'
				location={props.location}
				noborder={props.noborder}
			>
				{this._tabContent}
			</TabContentView>
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
					{tabContent}
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
					{tabContent}
					{tabBar}
				</TabContainerView>
			);
		}

		return <Wrapper {...props}>{body}</Wrapper>;
	}
}

export default TabContainer;
