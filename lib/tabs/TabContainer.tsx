/**
 * A typical tab control container.  This manages `Tab` elements within it.
 *
 * #### Examples:
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

import {List} from 'immutable';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {ClassNames} from 'util.classnames';
import {Keys} from 'util.keys';
import {nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Location
} from '../shared';
import {Tab} from './Tab';

const styles = require('./styles.css');

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
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			children: null,
			location: Location.top,
			maxTabs: 5,
			noclose: false,
			nonavigation: false,
			onRemove: nilEvent,
			onSelect: nilEvent,
			tabWidth: 75,
			testing: false
		})
	);
}

export interface TabContainerState {
	selectedTab?: string;
}

export const TabBar = (props: any) => (
	<div
		className={props.className}
		style={props.style}
	>
		{props.tabs}
		{props.navigation}
	</div>
);

export const TabContent = (props: any) => (
	<div className={props.className} style={props.style}>
		{props.content}
	</div>
);

export const TabNavigation = (props: any) => (
	!props.nonavigation && !props.disabled && (
		<div className={props.className}>
			<Button iconName="chevron-left" onClick={props.handleLeftClick}/>
			<Button iconName="chevron-right" onClick={props.handleRightClick}/>
		</div>
	)
);

export class TabContainer extends BaseComponent<TabContainerProps, TabContainerState> {

	private _containerWidth: number = 0;
	private _keys: Keys;
	private _tabBarStyles: ClassNames = new ClassNames();
	private _tabContent: any = null;
	private _tabContentStyles: ClassNames = new ClassNames();
	private _tabNavStyles: ClassNames = new ClassNames();
	private _tabs: any = List();

	public static defaultProps: TabContainerProps = getDefaultTabContainerProps();

	constructor(props: TabContainerProps) {
		super(props, styles);

		this._keys = new Keys({testing: this.props.testing});

		this._rootStyles.add([
			'ui-tab-container'
		]);

		this._tabBarStyles.add([
			'ui-tab-bar'
		]);

		this._tabContentStyles.add([
			'ui-tab-content'
		]);

		this._tabNavStyles.add([
			'ui-tab-navigation',
			this.styles.navigation
		]);

		// Initialize all of the tabs given to the container.  This will assign
		// the id/key and remove any child that is not a Tab.
		if (props.children) {
			const children = React.Children.toArray(this.props.children);
			let pos: number = 0;

			for (const child of children) {

				if (child['type'] === Tab && (child['props']['visible'] && !child['props']['disabled'])) {
					this._tabs = this._tabs.set(pos, React.cloneElement(child as any, {
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

		this.state = {
			selectedTab: this._tabs.size > 0 ? this._tabs.get(0).props['id'] : null
		};

		this.bindCallbacks(
			'handleNextTab',
			'handlePreviousTab',
			'hiddenTabHandler',
			'selectHandler'
		);

		this.componentWillUpdate(this.props, this.state);
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

	private handlePreviousTab() {
		const idx: number = this.currentIdx;

		if (this._tabs.size && idx - 1 >= 0) {
			this.selectHandler(this._tabs.get(idx - 1));
		}
	}

	private handleNextTab() {
		const idx: number = this.currentIdx;

		if (this._tabs.size && idx + 1 <= this._tabs.size - 1) {
			this.selectHandler(this._tabs.get(idx + 1));
		}
	}

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

	public componentWillUpdate(nextProps: TabContainerProps, nextState: TabContainerState) {
		const topbot: boolean = this.props.location === Location.top || this.props.location === Location.bottom;

		this._rootStyles.onIfElse(topbot)(
			this.styles.tabContainerHorizontal
		)(
			this.styles.tabContainerVertical
		);

		this._tabContentStyles.onIfElse(topbot)(
			this.styles.tabContentHorizontal
		)(
			this.styles.tabContentVertical
		);

		this._tabBarStyles.onIfElse(topbot)(
			this.styles.tabBarHorizontal
		)(
			this.styles.tabBarVertical
		);

		if (this._tabs.size > 0) {

			// Add select and delete handlers to each of the tabs in the current
			// tab array.  Also ensure that the correct tab width is set.

			for (const [idx, child] of this._tabs.entries()) {
				const selected = nextState.selectedTab === child.props['id'];

				if (selected && !nextProps.disabled) {
					this._tabContent = child['props'].children;
				}

				this._tabs = this._tabs.set(idx, React.cloneElement(child as any, {
					disabled: this.props.disabled,
					href: {
						hiddenTabHandler: this.hiddenTabHandler,
						orientation: nextProps.location,
						selectHandler: this.selectHandler,
						sizing: nextProps.sizing
					},
					selected: selected,
					width: `${nextProps.tabWidth}px`
				}));
			}

			// Sets the default width of the content container for the component
			// It uses the number of tabs and the current tab width to compute
			// a reasonable size.

			if (nextProps.location === Location.top || nextProps.location === Location.bottom) {
				this._containerWidth = (this._tabs.size + 1) * nextProps.tabWidth;
			} else {
				this._containerWidth = 5 * nextProps.tabWidth;
			}
		} else {
			// No more tabs, suppress content
			this._tabContent = null;
		}

		super.componentWillUpdate(nextProps, nextState);
	}

	public render() {
		let body = null;
		const style = {};

		if (this.props.location === Location.right || this.props.location === Location.left) {
			style['width'] = `${this.props.tabWidth}px`;
		}

		const tabNavigation = (
			<TabNavigation
				{...this.props}
				className={this._tabNavStyles.classnames}
				handleLeftClick={this.handlePreviousTab}
				handleRightClick={this.handleNextTab}
				nonavigation={this.props.nonavigation}
			/>
		);

		const tabBar = (
			<TabBar
				{...this.props}
				className={this._tabBarStyles.classnames}
				navigation={tabNavigation}
				style={style}
				tabs={this._tabs}
			/>
		);

		const tabContent = (
			<TabContent
				className={this._tabContentStyles.classnames}
				content={this._tabContent}
			/>
		);

		if (this.props.location === Location.top || this.props.location === Location.left) {
			body = (
				<div
					className={this._rootStyles.classnames}
					style={{minWidth: `${this._containerWidth}px`}}
				>
					{this._tabs.size > 0 && tabBar}
					{tabContent}
				</div>
			);
		} else {
			body = (
				<div
					className={this._rootStyles.classnames}
					style={{minWidth: `${this._containerWidth}px`}}
				>
					{tabContent}
					{this._tabs.size > 0 && tabBar}
				</div>
			);
		}

		return body;
	}
}
