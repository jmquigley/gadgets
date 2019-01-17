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
 * - `height {string} ('400px')` - the height, in pixels, of the dialog area
 * - `icon {string} ('window-restore')` - A font awesome icon that will be on
 * the right side of the title bar
 * - `show {boolean} (false)` - when set to true the window is shown, otherwise
 * it is hidden.
 * - `title {string} ('Dialog Window')` - A text string shown within the title
 * bar of the dialog window
 * - `width {string} ('400px')` - the width, in pixels, of the dialog area
 *
 * @module DialogWindow
 */

'use strict';

// const debug = require('debug')('DialogWindow');

const ReactModal = require('react-modal');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {Icon} from '../icon';
import {Item} from '../item';
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	getDefaultBaseProps,
	getDefaultBaseState,
	Wrapper
} from '../shared';
import styled from '../shared/themed-components';

export interface DialogWindowProps extends BaseProps {
	icon?: string;
	onClose?: any;
	onOpen?: any;
	show?: boolean;
	title?: string;
}

export function getDefaultDialogWindowProps(): DialogWindowProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			height: '400px',
			icon: 'window-restore',
			obj: 'DialogWindow',
			onClose: nilEvent,
			onOpen: nilEvent,
			show: false,
			title: 'Dialog Window',
			width: '400px'
		})
	);
}

export interface DialogWindowState extends BaseState {
	showModal?: boolean;
	icon?: any;
}

export function getDefaultDialogWindowState(): DialogWindowState {
	return cloneDeep({...getDefaultBaseState('ui-dialogwindow'),
		showModal: false,
		icon: null
	});
}

export const DialogWindowView: any = styled.div`
	overflow: hidden;

	height: ${(props: DialogWindowProps) => props.height};
	width: ${(props: DialogWindowProps) => props.width};
`;

export const DialogWindowContent: any = styled.div`
	padding: 0.25rem;
`;

export const ItemView: any = styled(Item)`
	background-color: ${(props: DialogWindowProps) => props.theme.titleBarBackgroundColor};
	color: ${(props: DialogWindowProps) => props.theme.titleBarForegroundColor};
`;

export const StyledDeleteButton: any = styled(Button)`
	color: white;
	background-color: silver;

	&:not(.nohover):hover {
		background-color: ${Color.error} !important;
	}
`;

export class DialogWindow extends BaseComponent<DialogWindowProps, DialogWindowState> {

	public static defaultProps: DialogWindowProps = getDefaultDialogWindowProps();
	public state: DialogWindowState = getDefaultDialogWindowState();

	private _customStyle: any = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			transform: 'translate(-50%, -50%)',
			padding: '0',
			borderRadius: '0'
		}
	};

	constructor(props: DialogWindowProps) {
		super(props, DialogWindow.defaultProps.style);
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

	public static getDerivedStateFromProps(props: DialogWindowProps, state: DialogWindowState) {
		const newState: DialogWindowState = {...state,
			icon: <Icon iconName={props.icon} />,
			showModal: props.show
		};

		return super.getDerivedStateFromProps(props, newState);
	}

	public render() {
		return(
			<Wrapper {...this.props} >
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
						className={this.state.classes.classnames}
					>
						<ItemView
							{...this.props}
							leftButton={this.state.icon}
							nohover
							noripple
							rightButton={
								<StyledDeleteButton
									iconName="times"
									onClick={this.handleClose}
								/>
							}
							title={this.props.title}
						/>
						<DialogWindowContent
							className="ui-dialogwindow-content"
						>
							{this.props.children}
						</DialogWindowContent>
					</DialogWindowView>
				</ReactModal>
			</Wrapper>
		);
	}
}
