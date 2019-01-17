/**
 * A typical tab control container.  This manages `Tab` elements within it.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/tabs.png" width="50%" />
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
 *          debug(removing %o (id=${tab.props['id']})`, tab);
 *      }}
 *      onSelect={(tab: any, previous: any) => {
 *          debug(`new: %o (id=${tab.props['id']}),
 *              old: %o (id=${previous.props['id']})`, tab, previous);
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

'use strict';

const debug = require('debug')('TabContainer');

import autobind from 'autobind-decorator';
import {List} from 'immutable';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Keys} from 'util.keys';
import {nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {
	BaseComponent,
	BaseProps,
	BaseState,
	getDefaultBaseProps,
	getDefaultBaseState,
	Location,
	Wrapper
} from '../shared';
import styled, {css} from '../shared/themed-components';
import {Tab} from './Tab';

export interface TabContainerProps extends BaseProps {
	children?: React.ReactNode;
	maxTabs?: number;
	noclose?: boolean;
	nonavigation?: boolean;
	onRemove?: any;
	onSelect?: any;
	tabWidth?: number;
}

export function getDefaultTabContainerProps(): TabContainerProps {
	return cloneDeep({...getDefaultBaseProps(),
		location: Location.top,
		maxTabs: 5,
		noclose: false,
		nonavigation: false,
		obj: 'TabContainer',
		onRemove: nilEvent,
		onSelect: nilEvent,
		tabWidth: 120
	});
}

export interface TabContainerState extends BaseState {
	selectedTab?: string;
}

export function getDefaultTabContainerState(): TabContainerState {
	return cloneDeep({...getDefaultBaseState('ui-tab-container'),
		selectedTab: ''
	});
}

export const TabBarHorizontal: any = css`
	display: block;
`;

export const TabBarVertical: any = css`
	display: inline-flex;
	flex-direction: column;
`;

export const TabBarView: any = styled.div`
	display: flex;
	${(props: TabContainerProps) => props.xcss}
`;

export const TabContainerView: any = styled.div`
	${(props: TabContainerProps) => ((props.location === Location.top || props.location === Location.bottom) ?
		'' : 'display: flex; flex-wrap: nowrap;'
	)}
`;

export const TabContentHorizontal: any = css`
	border: solid 1px ${(props: TabContainerProps) => props.theme.borderColor};
	box-sizing: border-box;
	min-height: 8em;
	padding: 0 3px;
`;

export const TabContentVertical: any = css`
	border: solid 1px ${(props: TabContainerProps) => props.theme.borderColor};
	box-sizing: border-box;
	display: inline-flex;
	min-height: 8em;
	padding: 0 3px;
	flex-grow: 1;
`;

export const TabContentView: any = styled.div`
	${(props: TabContainerProps) => props.xcss || ''}
`;

export const TabNavigationView: any = styled.div`
	align-self: center;
	display: flex;
	float: right;

	> .ui-button {
		display: inline-block;
		flex: unset;
	}
`;

export const TabBar = (props: any) => (
	<TabBarView
		className="ui-tab-bar"
		style={props.style}
		xcss={
			props.location === Location.top || props.location === Location.bottom ?
			TabBarHorizontal : TabBarVertical
		}
	>
		{props.tabs}
		{props.navigation}
	</TabBarView>
);

export const TabContent = (props: any) => (
	<TabContentView
		className="ui-tab-content"
		style={props.style}
		xcss={
			props.location === Location.top || props.location === Location.bottom ?
			TabContentHorizontal : TabContentVertical
		}
	>
		{props.content}
	</TabContentView>
);

export const TabNavigation = (props: any) => (
	!props.nonavigation && !props.disabled && (
		<TabNavigationView className="ui-tab-navigation">
			<Button iconName="chevron-left" onClick={props.handleLeftClick}/>
			<Button iconName="chevron-right" onClick={props.handleRightClick}/>
		</TabNavigationView>
	)
);

export class TabContainer extends BaseComponent<TabContainerProps, TabContainerState> {

	private _containerWidth: number = 0;
	private _keys: Keys;
	private _tabContent: any = null;
	private _tabs: any = List();

	public static defaultProps: TabContainerProps = getDefaultTabContainerProps();

	constructor(props: TabContainerProps) {
		super(props, TabContainer.defaultProps.style);

		this._keys = new Keys({testing: this.props.testing});

		// Initialize all of the tabs given to the container.  This will assign
		// the id/key and remove any child that is not a Tab.
		if (props.children) {
			const children = React.Children.toArray(this.props.children);
			let pos: number = 0;

			for (const child of children) {

				if (child['type'] === Tab && (child['props']['visible'] && !child['props']['disabled'])) {
					this._tabs = this._tabs.set(pos, React.cloneElement(child as any, {
						href: {
							hiddenTabHandler: this.hiddenTabHandler,
							selectHandler: this.selectHandler
						},
						id: this._keys.at(pos),
						key: this._keys.at(pos)
					}));

					pos++;
				}
			}

			if (props.maxTabs > 0) {
				this._tabs = this._tabs.slice(0, this.props.maxTabs);
			}
		}

		this.state = {...getDefaultTabContainerState(),
			selectedTab: this._tabs.size > 0 ? this._tabs.get(0).props['id'] : null
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

		if (this._tabs.size && idx - 1 >= 0) {
			this.selectHandler(this._tabs.get(idx - 1));
		}
	}

	@autobind
	private handleNextTab() {
		const idx: number = this.currentIdx;

		if (this._tabs.size && idx + 1 <= this._tabs.size - 1) {
			this.selectHandler(this._tabs.get(idx + 1));
		}
	}

	@autobind
	private hiddenTabHandler(tab: Tab) {
		// Get the id of the tab that was removed.
		// try to get the one to the left first.  If that doesn't exist
		// the get the one to the right.  If that doesn't exist (it was
		// the last tab), then set to null
		const idx: number = this._getTabIdx(tab.props['id']);
		let id: string = null;

		if (idx - 1 >= 0) {
			id = this._tabs.get(idx - 1).props['id'];
		} else if (idx + 1 <= this._tabs.size - 1) {
			id = this._tabs.get(idx + 1).props['id'];
		}

		this._tabs = this._tabs.splice(idx, 1);
		this.selectedTab = id;
		this.props.onRemove(tab);
	}

	@autobind
	private selectHandler(tab: Tab) {
		const [previous, idx] = this._getTab(this.state.selectedTab);

		this.selectedTab = tab.props['id'];
		this.props.onSelect(tab, previous ? previous : tab);
		debug(`selected tab: ${tab.props['id']}, tab: %O, previous @ ${idx}: %O`, tab, previous);
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
				if (tab.props['id'] === id) {
					return [this._tabs.get(idx), idx];
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
				if (tab.props['id'] === id) {
					return idx;
				}
			}
		}

		return -1;
	}

	public render() {
		let body = null;
		const style = {};

		// Removes non standard property to remove jest warning in test
		const {
			onRemove,
			...props
		} = this.props;

		if (this._tabs.size > 0) {

			for (const [idx, child] of this._tabs.entries()) {
				const selected = this.state.selectedTab === child.props['id'];

				if (selected && !props.disabled) {
					this._tabContent = child['props'].children;
				}

				this._tabs = this._tabs.set(idx, React.cloneElement(child as any, {
					disabled: props.disabled,
					orientation: props.location,
					sizing: props.sizing,
					selected: selected,
					width: `${props.tabWidth}px`
				}));
			}

			// Sets the default width of the content container for the component
			// It uses the number of tabs and the current tab width to compute
			// a reasonable size.

			if (props.location === Location.top || props.location === Location.bottom) {
				this._containerWidth = (this._tabs.size + 1) * props.tabWidth;
			} else {
				this._containerWidth = 5 * props.tabWidth;
			}
		} else {
			// No more tabs, suppress content
			this._tabContent = null;
		}

		if (props.location === Location.right || props.location === Location.left) {
			style['width'] = `${props.tabWidth}px`;
		}

		const tabNavigation = (
			<TabNavigation
				{...props}
				handleLeftClick={this.handlePreviousTab}
				handleRightClick={this.handleNextTab}
				nonavigation={props.nonavigation}
			/>
		);

		const tabBar = (
			<TabBar
				{...props}
				navigation={tabNavigation}
				style={style}
				tabs={this._tabs}
			/>
		);

		const tabContent = (
			<TabContent
				{...props}
				content={this._tabContent}
			/>
		);

		if (props.location === Location.top || props.location === Location.left) {
			body = (
				<TabContainerView
					{...props}
					className={this.state.classes.classnames}
					style={{minWidth: `${this._containerWidth}px`}}
				>
					{this._tabs.size > 0 && tabBar}
					{tabContent}
				</TabContainerView>
			);
		} else {
			body = (
				<TabContainerView
					{...props}
					className={this.state.classes.classnames}
					style={{minWidth: `${this._containerWidth}px`}}
				>
					{tabContent}
					{this._tabs.size > 0 && tabBar}
				</TabContainerView>
			);
		}

		return (
			<Wrapper {...props} >
				{body}
			</Wrapper>
		);
	}
}
