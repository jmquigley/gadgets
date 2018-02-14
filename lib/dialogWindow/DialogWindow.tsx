/**
 * {description}
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button} from 'gadgets';
 * <Button iconName="cab" onClick={someFunction} />
 * ```
 *
 * #### Events
 * - `{name}` - {description}
 *
 * #### Styles
 * - `` - {description}
 *
 * #### Properties
 * - `{name}: {datatype}` - {description}
 *
 * @module DialogWindow
 */

'use strict';

const ReactModal = require('react-modal');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Wrapper
} from '../shared';

export interface DialogWindowProps extends BaseProps {
	icon?: string;
	onClose?: any;
	onOpen?: any;
	show?: boolean;
	title?: string;
}

export interface DialogWindowState {
	showModal?: boolean;
}

export function getDefaultDialogWindowProps(): DialogWindowProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			icon: 'bomb',
			obj: 'DialogWindow',
			onClose: nilEvent,
			onOpen: nilEvent,
			show: false,
			title: 'Dialog Window'
		})
	);
}

export class DialogWindow extends BaseComponent<DialogWindowProps, DialogWindowState> {

	public static defaultProps: DialogWindowProps = getDefaultDialogWindowProps();

	private _customStyle: any = {
		content: {
			top: '40%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			padding: '15px'
		}
	};

	constructor(props: DialogWindowProps) {
		super(props, DialogWindow.defaultProps.style);

		this._classes.add('ui-dialogwindow');

		this.state = {
			showModal: this.props.show
		};

		this.componentWillUpdate(this.props);
	}

	@autobind
	private handleClose() {
		this.props.onClose();
	}

	@autobind
	private handleOpen() {
		this.props.onOpen();
	}

	public componentWillReceiveProps(nextProps: DialogWindowProps) {
		if (this.props.show !== nextProps.show) {
			this.setState({showModal: nextProps.show});
		}
	}

	public render() {
		return(
			<Wrapper {...this.props} >
				<ReactModal
					contentLabel={this.props.title}
					isOpen={this.state.showModal}
					onAfterOpen={this.handleOpen}
					onRequestClose={this.handleClose}
					shouldCloseOnOverlayClick={false}
					style={this._customStyle}
				>
					{this.props.children}
				</ReactModal>
			</Wrapper>
		);
	}
}
