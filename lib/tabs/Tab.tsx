/**
 * Represents a single `Tab` entry within a `TabContainer`.  This component
 * would generally be used only with the `TabContainer`.  The tab acts
 * as a wrapper for some other content (the children within the control can
 * be any other object).
 *
 * #### Examples:
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
import {nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Location,
	Sizing
} from '../shared';
import {Title} from '../title';

const styles = require('./styles.css');

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

export class Tab extends BaseComponent<TabProps, TabState> {

	public static defaultProps: TabProps = getDefaultTabProps();

	constructor(props: TabProps) {
		super(props, styles);

		this._rootStyles.add([
			'ui-tab',
			this.styles.tab
		]);

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
		this.props.href.selectHandler(this);
		this.props.onClick();
	}

	private handleClose() {
		this.setState({hidden: true}, () => {
			this.props.href.hiddenTabHandler(this);
			this.props.onClose(this);
		});
	}

	public componentWillUpdate(nextProps: TabProps, nextState: TabState) {
		const style = {};

		this._rootStyles.onIf(nextProps.selected)(
			'ui-selected'
		);

		this._rootStyles.onIf(this.props.href.orientation === Location.top)(this.styles.tabBorderTop);
		this._rootStyles.onIf(this.props.href.orientation === Location.bottom)(this.styles.tabBorderBottom);
		this._rootStyles.onIf(this.props.href.orientation === Location.left)(this.styles.tabBorderLeft);
		this._rootStyles.onIf(this.props.href.orientation === Location.right)(this.styles.tabBorderRight);

		if (nextState.hidden) {
			style['display'] = 'none';
			style['minWidth'] = '';
			style['width'] = '';
		} else {
			style['minWidth'] = '75px';
			style['width'] = nextProps.width;
		}

		this.buildInlineStyles(nextProps, style);
		super.componentWillUpdate(nextProps, nextState);
	}

	public render() {
		return (
			<div
				className={this._rootStyles.classnames}
				style={this.inlineStyle}
			>
				<Title
					{...this.props}
					noedit
					noripple
					onClick={!this.props.disabled && this.props.visible ? this.handleClick : nilEvent}
					title={this.props.title}
					widget={<Button iconName="times" onClick={this.handleClose} />}
					visible={!this.state.hidden}
				/>
			</div>
		);
	}
}
