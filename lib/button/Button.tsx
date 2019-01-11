/**
 * A typical button control widget.  This control only uses an icon and no text
 * to represent the button.  The icons are [Font Awesome](http://fontawesome.io/)
 * strings.  That library is built into this module, so any font available in
 * the current release of that library is available.  The buttons fill the size
 * of their parent container.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button} from 'gadgets';
 * <Button iconName="cab" onClick={someFunction} />
 * ```
 *
 * #### Events
 * - `onClick()` - This callback is invoked when the control is clicked by the
 * user
 *
 * #### Styles
 * - `ui-button` - A top level style placed on `<i>` control that constructs the
 * button.
 *
 * #### Properties
 * - `iconName: string ('bomb')` - the name of the font awesome icon used with
 * this button
 * - `iconStyle: string ('')` - a CSS style class name that will be added to the
 * icon within the button.
 * - `sizing: Sizing` - Allows one to change the size of the icon within the
 * button.
 * See the shared props object for the `Sizing` enumeration.
 *
 * @module Button
 */

'use strict';

// const debug = require('debug')('Button');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {Icon} from '../icon';
import {
	BaseComponent,
	BaseProps,
	BaseState,
	disabled,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Wrapper
} from '../shared';
import styled, {css} from '../shared/themed-components';
import {tooltip} from '../tooltip';

export interface ButtonProps extends BaseProps {
	iconName?: string;      // font awesome string
	iconStyle?: string;
	onClick?: any;
}

export function getDefaultButtonProps(): ButtonProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			iconName: 'bomb',
			iconStyle: '',
			onClick: nilEvent,
			obj: 'Button'
		})
	);
}

export type ButtonState = BaseState;
export const getDefaultButtonState = getDefaultBaseState;

export const BaseButtonView: any = css`
	align-items: center;
	box-sizing: border-box;
	cursor: default;
	display: flex;
	height: 100%;
	justify-content: center;
	line-height: inherit;
	outline: none;
	overflow: visible;
	position: relative;
	user-select: none;
	width: 100%;
`;

export const ButtonView: any = styled.div`
	${BaseButtonView}

	flex: 1;

	&:not(.nohover):hover {
		background-color: ${(props: ButtonProps) => props.theme.hoverColor} ${props => props.style.backgroundColor && '!important'};
	}

	${(props: ButtonProps) => disabled(props)}
	${(props: ButtonProps) => invisible(props)}
`;

export class Button extends BaseComponent<ButtonProps, ButtonState> {

	public static readonly defaultProps: ButtonProps = getDefaultButtonProps();
	public state: ButtonState = getDefaultButtonState();

	constructor(props: ButtonProps) {
		super(props, Button.defaultProps.style);
	}

	@autobind
	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (!this.props.disabled
			&& this.props.visible
			&& this.props.onClick != null) {
			this.props.onClick(e);
		}
		e.stopPropagation();
	}

	public static getDerivedStateFromProps(props: ButtonProps, state: ButtonState) {
		state.classes.clear();
		state.classes.add('ui-button');
		state.classes.onIfElse(!props.noripple && !props.disabled)(
			'ripple'
		)(
			'nohover'
		);

		return super.getDerivedStateFromProps(props, state);
	}

	public render() {
		return (
			<Wrapper {...this.props} >
				<ButtonView
					className={this.state.classes.classnames}
					disabled={this.props.disabled}
					id={this.id}
					onClick={this.handleClick}
					sizing={this.state.sizing}
					style={this.state.style}
					visible={this.props.visible}
				>
					<Icon
						className={this.props.iconStyle}
						iconName={this.props.iconName}
						sizing={this.state.sizing}
					/>
				{tooltip(this.id, this.props)}
				</ButtonView>
			</Wrapper>
		);
	}
}
