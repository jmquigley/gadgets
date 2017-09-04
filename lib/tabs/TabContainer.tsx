// TODO: add TabContainer documentation
// TODO: add TabContainer implementation

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
// import {ClassNames} from 'util.classnames';
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

// const debug = require('debug')('TabContainer');
const styles = require('./styles.css');

export interface TabContainerProps extends BaseProps {
	children?: any;
	maxTabs?: number;
	noclose?: boolean;
	nonavigation?: boolean;
	onSelect?: any;
	tabWidth?: string;
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
			tabWidth: '25%'
		})
	);
}

export interface TabContainerState {
	selectedTab?: string;
}

export const TabBar = (props: any) => (
	<div
		className={props.className}
	>
		{props.tabs}
		<Navigation nonavigation={props.nonavigation} />
	</div>
);

export const Navigation = (props: any) => (
	!props.nonavigation &&
		<div className={styles.navigation}>
			<Button iconName="chevron-left" />
			<Button iconName="chevron-right" />
		</div>
);

export class TabContainer extends BaseComponent<TabContainerProps, TabContainerState> {

	private _keys: Keys = new Keys();
	private _tabContent: any = null;
	private _tabs: any[] = [];

	public static defaultProps: TabContainerProps = getDefaultTabContainerProps();

	constructor(props: TabContainerProps) {
		super(props, styles);

		this._rootStyles.add([
			'ui-tab-container',
			this.styles.tabContainer
		]);

		this.state = {
			selectedTab: this._keys.at(0)
		};

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

				if (child['type'] === Tab && child['props']['visible']) {
					const selected = this.state.selectedTab === this._keys.at(pos);

					if (selected) {
						this._tabContent = child['props'].children;
					}

					this._tabs[pos] = React.cloneElement(child as any, {
						href: {
							orientation: this.props.location,
							sizing: this.props.sizing
						},
						id: this._keys.at(pos),
						key: this._keys.at(pos),
						selected: selected,
						width: this.props.tabWidth
					});

					pos++;
				}
			}

			if (props.maxTabs > 0) {
				this._tabs = this._tabs.slice(0, this.props.maxTabs);
			}
		}
	}

	public render() {
		this.buildTabs(this.props);

		let tabBar = null;
		switch (this.props.location) {
			case Location.top:
			case Location.bottom:
				tabBar = <TabBar tabs={this._tabs} className={styles.tabBarHorizontal} />;
				break;

			case Location.left:
			case Location.right:
				tabBar = <TabBar tabs={this._tabs} className={styles.tabBarVertical} />;
				break;
		}

		return(
			<div className={this._rootStyles.classnames}>
				{tabBar}
			</div>
		);
	}
}
