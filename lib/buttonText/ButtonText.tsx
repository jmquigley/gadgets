/**
 * A typical button control widget that uses an icon and text.  The
 * text for the button is given as a property.  It can be left, right,
 * or center justified using the Justify enumeration.
 *
 * #### Examples:
 *
 * ```javascript
 * import {ButtonText} from 'gadgets';
 * <ButtonText
 *     text="some text"
 *     iconName="cab"
 *     justify={Justify.left}
 *     onClick={someFunction}
 * />
 * ```
 *
 * #### Events
 * - `onClick()` - This callback is invoked when the control is clicked by the
 * user
 *
 * #### Style
 * - `ui-button` - A top level style placed on the control that constructs the
 * button.
 * - `ui-buttontext` - A top level style used to differentiate this from generic
 * buttons.
 *
 * #### Properties
 * - `iconName: {string} ('bomb')` - The name of the font awesome icon used with this
 * button
 * - `justify: {Justify} (Justify.right)` - Determines if the button will be on the
 * left, center, right.
 * - `noicon: {boolean} (false)` - Turns off the icon and only shows the text in the
 * center of the button.
 * - `sizing: {Sizing} (Sizing.normal)` - The size of this control set by the Sizing
 * class
 * - `text: {string} ('')` - The text string used by the button
 *
 * @module ButtonText
 */

'use strict';

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {BaseButtonView} from '../button';
import {getDefaultIconProps, Icon, IconProps} from '../icon';
import {
	BaseComponent,
	BaseState,
	DisabledCSS,
	fontStyle,
	getDefaultBaseState,
	InvisibleCSS,
	Justify,
	Wrapper
} from '../shared';
import styled from '../shared/themed-components';

export interface ButtonTextProps extends IconProps {
	justify?: Justify;
	noicon?: boolean;
	onClick?: any;
	text?: string;
}

export function getDefaultButtonTextProps(): ButtonTextProps {
	return cloneDeep(Object.assign({},
		getDefaultIconProps(), {
			justify: Justify.right,
			noicon: false,
			obj: 'ButtonText',
			onClick: nilEvent,
			text: ''
		})
	);
}

export type ButtonTextState = BaseState;
export const getDefaultButtonTextState = getDefaultBaseState;

export const ButtonTextContent: any = styled.div`
	flex: 1;
	padding: 0 0.2em;
	text-align: ${(props: ButtonTextProps) => {
		if (props.justify === Justify.center || props.noicon) {
			return('center');
		} else if (props.justify === Justify.left) {
			return('right');
		} else {
			return('left');
		}
	}};
	${(props: ButtonTextProps) => props.sizing && fontStyle[props.sizing]};

	span {
		margin: 0 auto;
		user-select: none;
	}
`;

export const ButtonTextView: any = styled.div`
	${BaseButtonView}

	&:not(.nohover):hover {
		background-color: ${(props: ButtonTextProps) => props.theme.hoverColor} ${props => props.style.backgroundColor && '!important'};
	}

	${(props: ButtonTextProps) => props.disabled && DisabledCSS}
	${(props: ButtonTextProps) => !props.visible && InvisibleCSS}
`;

export class ButtonText extends BaseComponent<ButtonTextProps, ButtonTextState> {

	public static readonly defaultProps: ButtonTextProps = getDefaultButtonTextProps();
	public state: ButtonTextState = getDefaultButtonTextState();

	constructor(props: ButtonTextProps) {
		super(props, ButtonText.defaultProps.style);
	}

	@autobind
	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (!this.props.disabled && this.props.visible && this.props.onClick != null) {
			this.props.onClick(this.props.text);
		}
		e.stopPropagation();
	}

	public static getDerivedStateFromProps(props: ButtonTextProps, state: ButtonTextState) {
		state.classes.clear();
		state.classes.add('ui-button-text');
		state.classes.onIfElse(!props.noripple && !props.disabled)(
			'ripple'
		)(
			'nohover'
		);

		return super.getDerivedStateFromProps(props, state);
	}

	public render() {
		let leftButton = null;
		let rightButton = null;

		const content = (
			<ButtonTextContent
				justify={this.props.justify}
				sizing={this.props.sizing}
			>
				{this.props.text}
			</ButtonTextContent>
		);

		if (this.props.justify === Justify.right) {
			rightButton = content;
		} else {
			leftButton = content;
		}

		let icon = null;
		if (!this.props.noicon && this.props.justify !== Justify.center) {
			icon = (
				<Icon
					iconName={this.props.iconName}
					sizing={this.props.sizing}
				/>
			);
		}

		return (
			<Wrapper {...this.props} >
				<ButtonTextView
					disabled={this.props.disabled}
					className={this.state.classes.classnames}
					style={this.state.style}
					onClick={this.handleClick}
					visible={this.props.visible}
				>
					{leftButton}
					{icon}
					{rightButton}
				</ButtonTextView>
			</Wrapper>
		);
	}
}
