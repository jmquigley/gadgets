// TODO: add Tab documentation
// TODO: add Tab implementation

'use strict';

import {cloneDeep} from 'lodash';
import {nilEvent} from 'util.toolbox';
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

export class Tab extends BaseComponent<TabProps, undefined> {

	public static defaultProps: TabProps = getDefaultTabProps();

	constructor(props: TabProps) {
		super(props, styles);

		this._rootStyles.add([
			'ui-tab',
			this.styles.tab
		]);

		this.bindCallbacks(
			'handleClick'
		);

		this.componentWillUpdate(props);
	}

	private handleClick() {
		this.props.href.selectHandler(this);
		this.props.onClick();
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
			<Title
				{...this.props}
				className={this._rootStyles.classnames}
				noripple
				onClick={!this.props.disabled && this.props.visible ? this.handleClick : nilEvent}
				title={this.props.title}
			/>
		);
	}
}
