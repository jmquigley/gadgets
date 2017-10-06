/**
 * A modal, dialog box popup window for yes/no user decisions.
 * It presents a message, an icon, and two buttons.  One for
 * yes (true) or no (false).  A callback is invoked when the
 * user makes a choice to communicate that choice.  Making a
 * choice closes the window.
 *
 * It contains five types of windows:
 *
 * - error (red x icon) - `DialogType.error`
 * - warning (yellow exclamation icon) `DialogType.warning`
 * - success (green check icon) `DialogType.success`
 * - info (blue i icon) `DialogType.info`
 * - custom (user selected from font awesome) `DialogType.custom`
 *
 * #### Examples:
 *
 * ```javascript
 * import {DialogBox} from 'gadgets';
 *
 * <DialogBox
 *     color="magenta"
 *     dialogType={DialogBoxType.custom}
 *     iconName="car"
 *     message="custom popup message"
 *     onSelection={(flag: boolean) => {
 *         console.log(`Dialog selection: ${flag}`);
 *     }}
 *     show
 *  />
 * ```
 *
 * #### Events
 * - `onClose` - invoked when the dialog box is closed.
 * - `onOpen` - invoked when the dialot box is opened.
 * - `onSelection(boolean)` - When the choice is made this
 * callback is invoked with the choice.  If "yes" then true.
 * If "no" then false.
 *
 * #### Styles
 * - `ui-dialogbox` - Placed on the `<div>` that surrounds the
 * popup message box.
 *
 * #### Properties
 * - `dialogType: DialogType (DialogType.info)` - The type of icon
 * and color scheme for the popup.
 * - `iconName: string (bomb)` - used with the custom type to set
 * a font awesome icon for this popup.
 * - `message: string ('')` - the user defined message used by the
 * popup window.  If the string contains newlines it will be
 * broken up into `<p>` blocks for each line.
 * - `show: boolean (false)` - When this value is true, then the
 * popup is displayed.
 *
 * @module DialogBox
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import ReactModal from 'react-modal';
import {nilEvent} from 'util.toolbox';
import {ButtonText} from '../buttonText';
import {Icon} from '../icon';
import {
	BaseComponent,
	BaseProps,
	Color,
	getDefaultBaseProps,
	Justify,
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
	onOpen?: any;
	onSelection?: any;
	show?: boolean;
}

export function getDefaultDialogBoxProps(): DialogBoxProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			dialogType: DialogBoxType.info,
			iconName: 'bomb',
			message: '',
			onClose: nilEvent,
			onOpen: nilEvent,
			onSelection: nilEvent,
			show: false
		})
	);
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

		this._rootStyles.add([
			'ui-dialogbox',
			this.styles.dialogBox
		]);

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
					style={this.props.style}
				/>
			)
		};

		this.componentWillUpdate(props);
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

	public render() {
		return (
			<ReactModal
				contentLabel="DialogBox"
				isOpen={this.state.showModal}
				onAfterOpen={this.handleOpen}
				onRequestClose={this.handleClose}
				shouldCloseOnOverlayClick={false}
				style={this._customStyle}
			>
				<div className={this._rootStyles.classnames}>

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
								justify={Justify.center}
								noicon
								onClick={this.handleYes}
								sizing={this.props.sizing}
								text="Yes"
							/>
							<div className={this.styles.spacer} />
							<ButtonText
								className={this.styles.dialogBoxButton}
								justify={Justify.center}
								noicon
								onClick={this.handleNo}
								sizing={this.props.sizing}
								text="No"
							/>
						</div>
					</div>
				</div>

			</ReactModal>
		);
	}
}
