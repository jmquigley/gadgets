/**
 * A modal dialog window.  This component uses the [react-modal](https://github.com/reactjs/react-modal)
 * library.  The component presents a propup window with a title bar and a
 * close button.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/dialogWindow.png" width="50%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {DialogWindow} from 'gadgets';
 *
 * <DialogWindow
 *    height="600px"
 *    icon="plane"
 *    onClose={this.handleCloseDialog}
 *    onOpen={this.handleOpenDialog}
 *    show={true}
 *    title="Demo Dialog Window"
 *    width="600px"
 * >
 *     <span>Dialog Content</span>
 * </DialogWindow>
 * ```
 *
 * ## API
 * #### Events
 * - `onClose()` - callback invoked when the dialog window is closed.
 * - `onOpen()` - callback invoked when the dialog window is opened.
 *
 * #### Styles
 * - `ui-dialogwindow` - Placed on the main `<div>` component that surrounds
 * the whole component.
 * - `ui-dialogwindow-content` - Placed on the `<div>` that surrounds the child
 * content given to the window.
 *
 * #### Properties
 * - `height="400px" {string}` - the height, in pixels, of the dialog area
 * - `icon="window-restore" {string}` - A font awesome icon that will be on
 * the right side of the title bar
 * - `show=false {boolean}` - when set to true the window is shown, otherwise
 * it is hidden.
 * - `title="Dialog Window" {string}` - A text string shown within the title
 * bar of the dialog window
 * - `width="400px" {string}` - the width, in pixels, of the dialog area
 *
 * @module DialogWindow
 */

const ReactModal = require("react-modal");

import autobind from "autobind-decorator";
import * as React from "react";
import styled from "styled-components";
import {nilEvent} from "util.toolbox";
import {Button} from "../button/Button";
import {Icon} from "../icon/Icon";
import {Item} from "../item/Item";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	defaultBaseProps,
	Wrapper
} from "../shared";

export interface DialogWindowProps extends BaseProps {
	icon?: string;
	onClose?: () => void;
	onOpen?: () => void;
	show?: boolean;
	title?: string;
}

export interface DialogWindowState extends BaseState {
	showModal?: boolean;
	icon?: any;
}

const DialogWindowView: any = styled.div`
	overflow: hidden;

	height: ${(props: DialogWindowProps) => props.height};
	width: ${(props: DialogWindowProps) => props.width};
`;

const DialogWindowContent: any = styled.div`
	padding: 0.25rem;
`;

const ItemView: any = styled(Item)`
	background-color: ${(props: DialogWindowProps) =>
		props.theme.titleBarBackgroundColor};
	color: ${(props: DialogWindowProps) => props.theme.titleBarForegroundColor};
`;

const StyledDeleteButton: any = styled(Button)`
	color: white;
	background-color: silver;

	&:not(.nohover):hover {
		background-color: ${Color.error} !important;
	}
`;

export class DialogWindow extends BaseComponent<
	DialogWindowProps,
	DialogWindowState
> {
	public static readonly defaultProps: DialogWindowProps = {
		...defaultBaseProps,
		height: "400px",
		icon: "window-restore",
		onClose: nilEvent,
		onOpen: nilEvent,
		show: false,
		title: "Dialog Window",
		width: "400px"
	};

	private _customStyle: any = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			transform: "translate(-50%, -50%)",
			padding: "0",
			borderRadius: "0"
		}
	};

	constructor(props: DialogWindowProps) {
		super("ui-dialogwindow", DialogWindow, props, {
			showModal: false,
			icon: null
		});
	}

	@autobind
	private handleClose() {
		this.setState({showModal: false}, () => {
			this.props.onClose();
		});
	}

	@autobind
	private handleOpen() {
		this.props.onOpen();
	}

	public static getDerivedStateFromProps(
		props: DialogWindowProps,
		state: DialogWindowState
	) {
		const newState: DialogWindowState = {
			...state,
			icon: <Icon iconName={props.icon} />,
			showModal: props.show
		};

		return super.getDerivedStateFromProps(props, newState, true);
	}

	public render() {
		super.render();

		return (
			<Wrapper {...this.props} name={this.name}>
				<ReactModal
					ariaHideApp={false}
					contentLabel={this.props.title}
					isOpen={this.state.showModal}
					onAfterOpen={this.handleOpen}
					onRequestClose={this.handleClose}
					shouldCloseOnOverlayClick={false}
					style={this._customStyle}
				>
					<DialogWindowView
						{...this.props}
						className={this.className}
					>
						<ItemView
							{...this.props}
							leftButton={this.state.icon}
							nohover
							noripple
							rightButton={
								<StyledDeleteButton
									iconName='times'
									onClick={this.handleClose}
								/>
							}
							title={this.props.title}
						/>
						<DialogWindowContent className='ui-dialogwindow-content'>
							{this.props.children}
						</DialogWindowContent>
					</DialogWindowView>
				</ReactModal>
			</Wrapper>
		);
	}
}

export default DialogWindow;
