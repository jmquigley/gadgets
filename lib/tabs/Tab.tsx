// TODO: add Tab documentation
// TODO: add Tab implementation

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

		this.componentWillUpdate(props);
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

	public componentWillUpdate(nextProps: TabProps) {
		this._rootStyles.onIf(nextProps.selected)(
			'ui-selected'
		);

		this._rootStyles.onIf(this.props.href.orientation === Location.top)(this.styles.tabBorderTop);
		this._rootStyles.onIf(this.props.href.orientation === Location.bottom)(this.styles.tabBorderBottom);
		this._rootStyles.onIf(this.props.href.orientation === Location.left)(this.styles.tabBorderLeft);
		this._rootStyles.onIf(this.props.href.orientation === Location.right)(this.styles.tabBorderRight);

		super.componentWillUpdate(nextProps);
	}

	public render() {
		return (
			<div
				className={this._rootStyles.classnames}
				style={{minWidth: '75px', width: this.props.width}}
			>
				<Title
					{...this.props}
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
