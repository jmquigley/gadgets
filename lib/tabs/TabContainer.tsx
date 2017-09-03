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
}

export function getDefaultTabContainerProps(): TabContainerProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			children: null,
			location: Location.top,
			maxTabs: 5,
			noclose: false,
			nonavigation: false,
			onSelect: nilEvent
		})
	);
}

export interface TabContainerState {
	selectedTab?: string;
}

export class TabContainer extends BaseComponent<TabContainerProps, TabContainerState> {

	private _keys: Keys = new Keys();
	private _tabBarStyles: ClassNames = new ClassNames();
	private _tabContentStyles: ClassNames = new ClassNames();
	private _tabNavStyles: ClassNames = new ClassNames();
	private _tabContent: any = null;
	private _tabs: any[] = [];

	public static defaultProps: TabContainerProps = getDefaultTabContainerProps();

	constructor(props: TabContainerProps) {
		super(props, styles);

		this._tabBarStyles.add([
			'ui-tab-bar',
			this.styles.tabBar
		]);

		this._tabContentStyles.add([
			'ui-tab-content',
			this.styles.tabContent
		]);

		this._tabNavStyles.add([
			'ui-tab-navigation',
			this.styles.navigation
		]);

		this._rootStyles.add([
			'ui-tab-container',
			this.styles.tabContainer
		]);

		this.state = {
			selectedTab: this._keys.at(0)
		};

		this.bindCallbacks('selectHandler');
		this.componentWillUpdate(props);
	}

	/**
	 * Searches the current tab list and finds the tab object associated with
	 * the given id.
	 * @param id {string} the id value associated with a Tag
	 * @return {Tag} a reference to the Tag object associated with this id.
	 * returns null if the tag is not found.
	 */
	private getTab(id: string): Tab {
		for (const tab of this._tabs) {
			if (tab.props['id'] === id) {
				return tab;
			}
		}

		return null;
	}

	/**
	 * Iterates through all of the given child Tab instances and passes the
	 * current view orientation and select handler to each child.
	 */
	public buildTabs(props: TabContainerProps) {
		const children = React.Children.toArray(props.children);
		let pos: number = 0;

		if (children) {
			for (const child of children) {

				if (child['type'] === Tab) {
					const selected = this.state.selectedTab === this._keys.at(pos);

					if (selected) {
						this._tabContent = child['props'].children;
					}

					this._tabs[pos] = React.cloneElement(child as any, {
						href: {
							orientation: this.props.location,
							selectHandler: this.selectHandler,
							sizing: this.props.sizing
						},
						id: this._keys.at(pos),
						key: this._keys.at(pos),
						selected: selected
					});

					pos++;
				}
			}

			if (props.maxTabs > 0) {
				this._tabs = this._tabs.slice(0, this.props.maxTabs);
			}
		}
	}

	private selectHandler(tab: Tab) {
		const previous: Tab = this.getTab(this.state.selectedTab);
		this.setState({selectedTab: tab.props['id']}, () => {
			debug(`selected tab: ${tab.props['id']}, tab: %O`, tab);
			this.props.onSelect(tab, previous ? previous : tab);
		});
	}

	public componentWillUpdate(nextProps: TabContainerProps) {

		this._rootStyles.onIfElse(
			this.props.location === Location.top || this.props.location === Location.bottom)
		(
			this.styles.tabContainerHorizontal
		)(
			this.styles.tabContainerVertical
		);

		this._tabBarStyles.onIf(this.props.location === Location.top)(this.styles.tabsTop);
		this._tabBarStyles.onIf(this.props.location === Location.bottom)(this.styles.tabsBottom);
		this._tabBarStyles.onIf(this.props.location === Location.left)(this.styles.tabsLeft);
		this._tabBarStyles.onIf(this.props.location === Location.right)(this.styles.tabsRight);

		this._tabContentStyles.onIfElse(
			this.props.location === Location.top || this.props.location === Location.bottom)
		(
			this.styles.tabBarHorizontal
		)(
			this.styles.tabBarVertical
		);

		this._tabNavStyles.onIfElse(
			this.props.location === Location.top || this.props.location === Location.bottom)
		(
			this.styles.tabNavHorizontal
		)(
			this.styles.tabNavVertical
		);

		super.componentWillUpdate(nextProps);
	}

	public render() {
		this.buildTabs(this.props);

		let tabBar: any = null;
		let content: any = null;

		tabBar = (
			<div className={this._tabBarStyles.classnames}>
				{this._tabs}
				{!this.props.nonavigation &&
				<div className={this._tabNavStyles.classnames}>
					<Button iconName="chevron-left" />
					<Button iconName="chevron-right" />
				</div>
				}
			</div>
		);

		content = (
			<div className={this._tabContentStyles.classnames}>
				{this._tabContent}
			</div>
		);

		let body: any = null;

		if (this.props.location === Location.top || this.props.location === Location.left) {
			body = (
				<div className={this._rootStyles.classnames}>
					{tabBar}
					{content}
				</div>
			);
		} else {
			body = (
				<div className={this._rootStyles.classnames}>
					{content}
					{tabBar}
				</div>
			);
		}

		return body;
	}
}
