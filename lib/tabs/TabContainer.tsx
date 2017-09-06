// TODO: add TabContainer documentation
// TODO: add TabContainer implementation

'use strict';

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

const debug = require('debug')('TabContainer');
const styles = require('./styles.css');

export interface TabContainerProps extends BaseProps {
	children?: any;
	maxTabs?: number;
	noclose?: boolean;
	nonavigation?: boolean;
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
			onSelect: nilEvent,
			tabWidth: 75
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
		<TabNavigation
			{...props}
			className={props.navClassName}
			nonavigation={props.nonavigation}
		/>
	</div>
);

export const TabContent = (props: any) => (
	<div className={props.className} style={props.style}>
		{props.content}
	</div>
);

export const TabNavigation = (props: any) => (
	!props.nonavigation && (
		<div className={props.className}>
			<Button iconName="chevron-left" />
			<Button iconName="chevron-right" />
		</div>
	)
);

export class TabContainer extends BaseComponent<TabContainerProps, TabContainerState> {

	private _containerWidth: number = 0;
	private _keys: Keys = new Keys();
	private _tabBarStyles: ClassNames = new ClassNames();
	private _tabContent: any = null;
	private _tabContentStyles: ClassNames = new ClassNames();
	private _tabNavStyles: ClassNames = new ClassNames();
	private _tabs: any[] = [];

	public static defaultProps: TabContainerProps = getDefaultTabContainerProps();

	constructor(props: TabContainerProps) {
		super(props, styles);

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
				if (child['type'] === Tab && child['props']['visible']) {
					this._tabs[pos] = React.cloneElement(child as any, {
						id: this._keys.at(pos),
						key: this._keys.at(pos)
					});

					pos++;
				}
			}

			if (props.maxTabs > 0) {
				this._tabs = this._tabs.slice(0, this.props.maxTabs);
			}
		}

		this.state = {
			selectedTab: this._tabs[0].props['id']
		};

		this.bindCallbacks(
			'selectHandler',
			'hiddenTabHandler'
		);

		this.componentWillUpdate(this.props, this.state);
	}

	/**
	 * Searches the current tab list and finds the tab object associated with
	 * the given id.
	 * @param id {string} the id value associated with a Tag to find
	 * @return {tuple} a tuple reference to the Tag object associated with this
	 * id and its index position within the child array.  It returns null if
	 * the tag is not found.
	 */
	private getTab(id: string): any {
		for (const [idx, tab] of this._tabs.entries()) {
			if (tab.props['id'] === id) {
				return [this._tabs[idx], idx];
			}
		}

		return null;
	}

	/**
	 * Searches the current tab list and finds the tab index associated with
	 * the given id.
	 * @param id {string} the id value associated with a Tag to find
	 * @return {number} the number index of this id with the tabs array.  If
	 * the value is not found it returns -1.
	 */
	private getTabId(id: string): number {
		for (const [idx, tab] of this._tabs.entries()) {
			if (tab.props['id'] === id) {
				return idx;
			}
		}

		return -1;
	}

	private hiddenTabHandler(tab: Tab) {
		debug(`hiding tab: ${tab.props['id']}`);

		// Get the id of the tab that was removed.
		// try to get the one to the left first.  If that doesn't exist
		// the get the one to the right.  If that doesn't exist (it was
		// the last tab), then set to null
		const idx: number = this.getTabId(tab.props['id']);
		let id: string = null;

		if (idx - 1 >= 0) {
			id = this._tabs[idx - 1].props['id'];
			debug(`selected left id: ${id}`);
		} else if (idx + 1 <= this._tabs.length - 1) {
			id = this._tabs[idx + 1].props['id'];
			debug(`selected right id: ${id}`);
		}

		this._tabs.splice(idx, 1);
		this.setState({selectedTab: id});
	}

	private selectHandler(tab: Tab) {
		const [previous, idx] = this.getTab(this.state.selectedTab);
		this.setState({selectedTab: tab.props['id']}, () => {
			debug(`selected tab: ${tab.props['id']}, tab: %O, previous @ ${idx}: %O`, tab, previous);
			this.props.onSelect(tab, previous ? previous : tab);
		});
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

		if (this._tabs.length > 0) {

			// Add select and delete handlers to each of the tabs in the current
			// tab array.

			for (const [idx, child] of this._tabs.entries()) {
				const selected = nextState.selectedTab === child.props['id'];

				if (selected) {
					this._tabContent = child['props'].children;
				}

				this._tabs[idx] = React.cloneElement(child as any, {
						href: {
							hiddenTabHandler: this.hiddenTabHandler,
							orientation: nextProps.location,
							selectHandler: this.selectHandler,
							sizing: nextProps.sizing
						},
						selected: selected,
						width: `${nextProps.tabWidth}px`
					});
			}

			if (nextProps.location === Location.top || nextProps.location === Location.bottom) {
				this._containerWidth = (this._tabs.length + 1) * nextProps.tabWidth;
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
		let style = {};

		if (this.props.location === Location.right || this.props.location === Location.left) {
			style['width'] = `${this.props.tabWidth}px`
		}

		const tabBar = (
			<TabBar
				{...this.props}
				className={this._tabBarStyles.classnames}
				navClassName={this._tabNavStyles.classnames}
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
					{this._tabs.length > 0 && tabBar}
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
					{this._tabs.length > 0 && tabBar}
				</div>
			);
		}

		return body;
	}
}
