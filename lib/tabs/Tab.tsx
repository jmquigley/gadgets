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
 *   - `sizing` - the size of the parent
 *   - `orientation` - the location in the container component where the
 *     tab will be drawn (top, bottom, left, right)
 * - `selected: {boolean} (false)` - if this is set to true, then the tab
 * will show as selected.
 * - `title: {string} ('')` - the text that will be shown on the tab.
 *
 * @module Tab
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {
	BaseComponent,
	BaseProps,
	Color,
	ColorScheme,
	disabled,
	getDefaultBaseProps,
	getTheme,
	invisible,
	Location,
	Sizing
} from '../shared';
import styled, {css, ThemeProvider, withProps} from '../shared/themed-components';
import {Title} from '../title';

export interface TabProps extends BaseProps {
	href?: any;
	onClick?: any;
	onClose?: any;
	selected?: boolean;
	title?: string;
}

export function getDefaultTabProps(): TabProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			href: {
				selectHandler: nilEvent,
				sizing: Sizing.normal,
				orientation: Location.top
			},
			obj: 'Tab',
			onClick: nilEvent,
			onClose: nilEvent,
			selected: false,
			title: ''
		})
	);
}

export interface TabState {
	hidden: boolean;
}

export const TabBorderTop: any = css`
	border-right: solid 1px ${props => props.theme.borderColor || ColorScheme.c1};
	border-top: solid 1px ${props => props.theme.borderColor || ColorScheme.c1};

	&:first-child {
		border-left: solid 1px ${props => props.theme.borderColor || ColorScheme.c1};
	}
`;

export const TabBorderBottom: any = css`
	border-right: solid 1px ${props => props.theme.borderColor || ColorScheme.c1};
	border-bottom: solid 1px ${props => props.theme.borderColor || ColorScheme.c1};

	&:first-child {
		border-left: solid 1px ${props => props.theme.borderColor || ColorScheme.c1};
	}
`;

export const TabBorderLeft: any = css`
	border-left: solid 1px ${props => props.theme.borderColor || ColorScheme.c1};
	border-bottom: solid 1px ${props => props.theme.borderColor || ColorScheme.c1};

	&:first-child {
		border-top: solid 1px ${props => props.theme.borderColor || ColorScheme.c1};
	}
`;

export const TabBorderRight: any = css`
	border-right: solid 1px ${props => props.theme.borderColor || ColorScheme.c1};
	border-bottom: solid 1px ${props => props.theme.borderColor || ColorScheme.c1};

	&:first-child {
		border-top: solid 1px ${props => props.theme.borderColor || ColorScheme.c1};
	}
`;

export const TabView: any = withProps<TabProps, HTMLDivElement>(styled.div)`
	background-color: ${props => props.selected ? props.theme.selectedBackgroundColor : props.theme.backgroundColor};
	color: ${props => props.selected ? props.theme.selectedForegroundColor : props.theme.color};
	cursor: default;
	display: inline-block;
	flex-grow: unset;

	${props => props.xcss ? props.xcss : ''}

	&:hover .ui-button {
		color: ${props => props.theme.backgroundColor};
		background-color: ${props => props.theme.hoverColor};
		display: flex;
		opacity: 1.0;
	}

	.ui-label {
		padding-left: 4px;
	}

	.ui-label:hover {
		color: ${props => !props.disabled ? props.theme.headerHoverColor : 'unset'} !important;
		background-color: ${props => !props.disabled ? props.theme.headerBackgroundColor : 'unset'} !important;
	}

	.ui-button:hover {
		background-color: ${Color.error} !important;
	}

	.ui-button {
		display: none;
		opacity: 0;
		animation: fadeIn ${props => props.theme.transitionDelay};
	}

	${props => disabled(props)}
	${props => invisible(props)}
`;

export class Tab extends BaseComponent<TabProps, TabState> {

	public static readonly defaultProps: TabProps = getDefaultTabProps();

	constructor(props: TabProps) {
		super(props, Tab.defaultProps.style);

		this._classes.add(['ui-tab']);

		this.bindCallbacks(
			'handleClick',
			'handleClose'
		);

		this.state = {
			hidden: false
		};

		this.componentWillUpdate(this.props, this.state);
	}

	private handleClick() {
		if (!this.props.disabled && this.props.visible) {
			this.props.href.selectHandler(this);
			this.props.onClick();
		}
	}

	private handleClose() {
		this.setState({hidden: true}, () => {
			this.props.href.hiddenTabHandler(this);
			this.props.onClose(this);
		});
	}

	public componentWillUpdate(nextProps: TabProps, nextState: TabState) {

		this._classes.onIf(nextProps.selected)(
			'ui-selected'
		);

		if (nextState.hidden) {
			this.inlineStyles = {
				display: 'none',
				minWidth: '',
				width: ''
			};
		} else {
			this.inlineStyles = {
				minWidth: '80px',
				width: nextProps.width
			};
		}

		super.componentWillUpdate(nextProps, nextState);
	}

	public render() {
		let xcss: any = '';
		switch (this.props.href.orientation) {
			case Location.top: xcss = TabBorderTop; break;
			case Location.bottom: xcss = TabBorderBottom; break;
			case Location.left: xcss = TabBorderLeft; break;
			case Location.right: xcss = TabBorderRight; break;
		}

		return (
			<ThemeProvider theme={getTheme()} >
				<TabView
					disabled={this.props.disabled}
					className={this.classes}
					selected={this.props.selected}
					style={this.inlineStyles}
					visible={this.props.visible}
					xcss={xcss}
				>
					<Title
						{...this.props}
						noedit
						noripple
						onClick={this.handleClick}
						title={this.props.title}
						widget={
							!this.props.disabled &&
							<Button
								{...this.props}
								iconName="times"
								onClick={this.handleClose}
							/>
						}
						visible={!this.state.hidden}
					/>
				</TabView>
			</ThemeProvider>
		);
	}
}
