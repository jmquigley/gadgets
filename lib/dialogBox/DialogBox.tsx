/**
 * A modal, dialog box popup window for yes/no user decisions. It presents a
 * message, an icon, and two buttons.  One for yes (true) or no (false).
 * A callback is invoked when the user makes a choice to communicate that
 * choice.  Making a choice closes the window.  This component uses the
 * [react-modal](https://github.com/reactjs/react-modal) library.
 *
 * It contains five types of windows:
 *
 * - error (red x icon) - `DialogType.error`
 * - warning (yellow exclamation icon) `DialogType.warning`
 * - success (green check icon) `DialogType.success`
 * - info (blue i icon) `DialogType.info`
 * - custom (user selected from font awesome) `DialogType.custom`
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/dialogBox.png" width="50%" />
 *
 * ## Examples:
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
 * ## API
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
 * - `dialogType=DialogType.info {DialogType}` - The type of icon
 * and color scheme for the popup.
 * - `iconName="bomb" {string}` - used with the custom type to set
 * a font awesome icon for this popup.
 * - `kbCancel="esc" {string}` - Keyboard combo that invokes the no
 * button.
 * - `kbClose="esc" {string}` - Keyboard combo that invokes the no
 * button.
 * - `kbOk: "alt+k" {string}` - Keyboard combo that invokes the
 * ok button
 * - `message="" {string}` - the user defined message used by the
 * popup window.  If the string contains newlines it will be
 * broken up into `<p>` blocks for each line.
 * - `show=false {boolean}` - When this value is true, then the
 * popup is displayed.
 *
 * @module DialogBox
 */

// const debug = require('debug')('gadgets.DialogBox');

const ReactModal = require("react-modal");

import autobind from "autobind-decorator";
import * as React from "react";
import {HotKeys} from "react-hotkeys";
import {nilEvent} from "util.toolbox";
import {ButtonText} from "../buttonText";
import {Icon} from "../icon";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	baseZIndex,
	Color,
	getDefaultBaseProps,
	getDefaultBaseState,
	Justify,
	Sizing,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";

export enum DialogBoxType {
	error = "error",
	warning = "warning",
	success = "success",
	info = "info",
	custom = "custom"
}

export interface DialogBoxProps extends BaseProps {
	dialogType?: DialogBoxType;
	iconName?: string;
	kbCancel?: string;
	kbClose?: string;
	kbOk?: string;
	message?: string;
	onClose?: () => void;
	onOpen?: () => void;
	onSelection?: (choice: boolean) => void;
	show?: boolean;
}

export function getDefaultDialogBoxProps(): DialogBoxProps {
	return {
		...getDefaultBaseProps(),
		dialogType: DialogBoxType.info,
		iconName: "bomb",
		kbCancel: "esc",
		kbClose: "esc",
		kbOk: "alt+k",
		message: "",
		obj: "DialogBox",
		onClose: nilEvent,
		onOpen: nilEvent,
		onSelection: nilEvent,
		show: false
	};
}

export interface DialogBoxState extends BaseState {
	showModal?: boolean;
}

export function getDefaultDialogBoxState(): DialogBoxState {
	return {
		...getDefaultBaseState(),
		showModal: false
	};
}

const ButtonBar: any = styled.div`
	display: flex;
`;

const DialogBoxIconView: any = styled.div`
	flex: none;
`;

const DialogBoxMessageContainerView: any = styled.div`
	flex: 1;
	max-width: 250px;
	padding-left: 15px;
`;

const DialogBoxMessageView: any = styled.div`
	margin-bottom: 1em;

	+ p {
		margin-bottom: 0.5em;
	}
`;

const DialogBoxView: any = styled.div`
	display: flex;
	overflow: hidden;
	z-index: ${baseZIndex + 1};
`;

const Spacer: any = styled.div`
	flex: 1;
`;

const StyledButtonText: any = styled(ButtonText)`
	border: solid 1px gray;
	display: inline-flex;
	flex: none;
	height: 2em;
	width: 5em;
`;

const StyledIcon: any = styled(Icon)`
	flex: none;
`;

export class DialogBox extends BaseComponent<DialogBoxProps, DialogBoxState> {
	public static defaultProps: DialogBoxProps = getDefaultDialogBoxProps();
	public state: DialogBoxState = getDefaultDialogBoxState();

	private _customStyle: any = {
		content: {
			top: "40%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			padding: "15px",
			borderRadius: "0"
		}
	};

	private _icon: any = {};

	constructor(props: DialogBoxProps) {
		super(props, "ui-dialogbox", DialogBox.defaultProps.style);

		this.buildKeyMap({
			kbCancel: this.handleNo,
			kbClose: this.handleNo,
			kbOk: this.handleYes
		});

		this._icon = {
			error: (
				<StyledIcon
					iconName='times-circle'
					sizing={Sizing.xxlarge}
					style={{
						color: Color.error
					}}
				/>
			),
			warning: (
				<StyledIcon
					iconName='exclamation-circle'
					sizing={Sizing.xxlarge}
					style={{
						color: Color.warning
					}}
				/>
			),
			success: (
				<StyledIcon
					iconName='check-circle'
					sizing={Sizing.xxlarge}
					style={{
						color: Color.success
					}}
				/>
			),
			info: (
				<StyledIcon
					iconName='info-circle'
					sizing={Sizing.xxlarge}
					style={{
						color: Color.info
					}}
				/>
			),
			custom: (
				<StyledIcon
					iconName={this.props.iconName}
					sizing={Sizing.xxlarge}
					style={this.props.style}
				/>
			)
		};
	}

	get message(): string {
		const message: string[] = [];
		for (const line of this.props.message.splitNL()) {
			message.push("<p>");
			message.push(line);
			message.push("</p>");
		}

		return message.join("");
	}

	@autobind
	private handleClose() {
		this.handleNo();
		this.props.onClose();
	}

	@autobind
	private handleNo() {
		this.setState({showModal: false}, () => {
			this.props.onSelection(false);
		});
	}

	@autobind
	private handleOpen() {
		this.props.onOpen();
	}

	@autobind
	private handleYes() {
		this.setState({showModal: false}, () => {
			this.props.onSelection(true);
		});
	}

	public static getDerivedStateFromProps(
		props: DialogBoxProps,
		state: DialogBoxState
	) {
		if (state.showModal !== props.show) {
			const newState: DialogBoxState = {...state, showModal: props.show};
			return super.getDerivedStateFromProps(props, newState, true);
		}

		return null;
	}

	public render() {
		this.updateClassName();

		return (
			<Wrapper {...this.props}>
				<HotKeys handlers={this.keyHandler} keyMap={this.keyMap}>
					<ReactModal
						ariaHideApp={false}
						contentLabel='DialogBox'
						isOpen={this.state.showModal}
						onAfterOpen={this.handleOpen}
						onRequestClose={this.handleClose}
						shouldCloseOnOverlayClick={false}
						style={this._customStyle}
					>
						<DialogBoxView className={this.className}>
							<DialogBoxIconView>
								{this._icon[this.props.dialogType]}
							</DialogBoxIconView>

							<DialogBoxMessageContainerView>
								<DialogBoxMessageView
									dangerouslySetInnerHTML={{
										__html: this.message
									}}
								/>
								<ButtonBar>
									<StyledButtonText
										justify={Justify.center}
										noicon
										onClick={this.handleYes}
										sizing={this.props.sizing}
										text='Yes'
									/>
									<Spacer />
									<StyledButtonText
										justify={Justify.center}
										noicon
										onClick={this.handleNo}
										sizing={this.props.sizing}
										text='No'
									/>
								</ButtonBar>
							</DialogBoxMessageContainerView>
						</DialogBoxView>
					</ReactModal>
				</HotKeys>
			</Wrapper>
		);
	}
}

export default DialogBox;
