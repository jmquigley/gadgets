// TODO: add DialogBox documentation
// TODO: add DialogBox implementation

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import Modal from 'react-modal';
import {nilEvent} from 'util.toolbox';
import {ButtonText} from '../buttonText';
import {Icon} from '../icon';
import {
	BaseComponent,
	BaseProps,
	Color,
	getDefaultBaseProps,
	Sizing
} from '../shared';

export enum DialogBoxType {
	error = 'error',
	warning = 'warning',
	success = 'success',
	info = 'info',
	custom = 'custom'
}

export interface DialogBoxProps extends BaseProps {
	dialogType?: DialogBoxType;
	iconName?: string;
	message?: string;
	onClose?: any;
	onKeyDown?: any;
	onOpen?: any;
	onSelection?: any;
	show?: boolean;
}

export function getDefaultDialogBoxProps(): DialogBoxProps {
	return cloneDeep(Object.assign(getDefaultBaseProps(), {
		dialogType: DialogBoxType.info,
		iconName: 'bomb',
		message: '',
		onClose: nilEvent,
		onKeyDown: nilEvent,
		onOpen: nilEvent,
		onSelection: nilEvent,
		show: false
	}));
}

export interface DialogBoxState {
	showModal?: boolean;
}

export class DialogBox extends BaseComponent<DialogBoxProps, DialogBoxState> {

	public static defaultProps: DialogBoxProps = getDefaultDialogBoxProps();

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

	private _icon: any = {};

	constructor(props: DialogBoxProps) {
		super(props, require('./styles.css'));

		this.state = {
			showModal: props.show
		};

		this.handleClose = this.handleClose.bind(this);
		this.handleNo = this.handleNo.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleYes = this.handleYes.bind(this);

		this._icon = {
			error: (
				<Icon
					className={this.styles.dialogBoxIcon}
					iconName="times-circle"
					sizing={Sizing.xxlarge}
					style={{
						color: Color.error
					}}
				/>
			),
			warning: (
				<Icon
					className={this.styles.dialogBoxIcon}
					iconName="exclamation-circle"
					sizing={Sizing.xxlarge}
					style={{
						color: Color.warning
					}}
				/>
			),
			success: (
				<Icon
					className={this.styles.dialogBoxIcon}
					iconName="check-circle"
					sizing={Sizing.xxlarge}
					style={{
						color: Color.success
					}}
				/>
			),
			info: (
				<Icon
					className={this.styles.dialogBoxIcon}
					iconName="info-circle"
					sizing={Sizing.xxlarge}
					style={{
						color: Color.info
					}}
				/>
			),
			custom: (
				<Icon
					className={this.styles.dialogBoxIcon}
					iconName={this.props.iconName}
					sizing={Sizing.xxlarge}
					style={{
						color: this.props.color
					}}
				/>
			)
		};

		this.shouldComponentUpdate(props);
	}

	get message(): string {
		const message: string[] = [];
		for (const line of this.props.message.split(/\r\n|\n|\r/)) {
			message.push('<p>');
			message.push(line);
			message.push('</p>');
		}

		return message.join('');
	}

	private handleClose() {
		this.handleNo();
		this.props.onClose();
	}

	private handleNo() {
		this.setState({showModal: false});
		this.props.onSelection(false);
	}

	private handleOpen() {
		this.props.onOpen();
	}

	private handleYes() {
		this.setState({showModal: false});
		this.props.onSelection(true);
	}

	public componentWillReceiveProps(nextProps: DialogBoxProps) {
		if (this.props.show !== nextProps.show) {
			this.setState({showModal: nextProps.show});
		}
	}

	public shouldComponentUpdate(nextProps: DialogBoxProps) {
		super.resetStyles(nextProps);

		this.classes.push('ui-dialogbox');
		this.classes.push(this.styles.dialogBox);
		this.classes.push(this.styling.fontStyle);

		super.buildStyles(nextProps);
		return true;
	}

	public render() {
		return (
			<Modal
				contentLabel="DialogBox"
				isOpen={this.state.showModal}
				onAfterOpen={this.handleOpen}
				onRequestClose={this.handleClose}
				shouldCloseOnOverlayClick={false}
				style={this._customStyle}
			>
				<div className={this.classes.join(' ')}>

					<div className={this.styles.dialogBoxIcon}>
						{this._icon[this.props.dialogType]}
					</div>

					<div className={this.styles.dialogBoxMessageContainer}>
						<div
							className={this.styles.dialogBoxMessage}
							dangerouslySetInnerHTML={{__html: this.message}}
						/>
						<div className={this.styles.buttonBar}>
							<ButtonText
								className={this.styles.dialogBoxButton}
								justify={ButtonText.CENTER}
								noicon
								onClick={this.handleYes}
								sizing={this.props.sizing}
								text="Yes"
							/>
							<div className={this.styles.spacer} />
							<ButtonText
								className={this.styles.dialogBoxButton}
								justify={ButtonText.CENTER}
								noicon
								onClick={this.handleNo}
								sizing={this.props.sizing}
								text="No"
							/>
						</div>
					</div>
				</div>

			</Modal>
		);
	}
}
