// TODO: add TabContainer documentation
// TODO: add TabContainer implementation

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {ClassNames} from 'util.classnames';
import {Keys} from 'util.keys';
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
}

export function getDefaultTabContainerProps(): TabContainerProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			children: null,
			location: Location.top,
			maxTabs: 5,
			noclose: false
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

		this._tabContentStyles.add([
			'ui-tab-content',
			this.styles.tabContent
		]);

		this._tabNavStyles.add([
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

	public buildTabs(props: TabContainerProps) {
		let children = React.Children.toArray(props.children);

		if (children) {
			if (props.maxTabs > 0) {
				children = children.slice(0, this.props.maxTabs);
			}

			for (let idx = 0; idx < children.length; idx++) {
				const selected = this.state.selectedTab === this._keys.at(idx);

				if (selected) {
					debug(`child: %O`, children[idx]);
					this._tabContent = children[idx]['props'].children;
				}

				this._tabs[idx] = React.cloneElement(children[idx] as any, {
					href: {
						orientation: this.props.location,
						selectHandler: this.selectHandler,
						sizing: this.props.sizing
					},
					id: this._keys.at(idx),
					selected: selected
				});
			}
		}
	}

	private selectHandler(tab: Tab) {
		debug(`selected tab: ${tab.props['id']}, tab: %O`, tab);
		this.setState({selectedTab: tab.props['id']});
	}

	public componentWillUpdate(nextProps: TabContainerProps) {
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
				<div className={this._tabNavStyles.classnames}>
					<Button iconName="chevron-left" />
					<Button iconName="chevron-right" />
				</div>
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
