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

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {Icon} from '../icon';
import {
	BaseComponent,
	BaseProps,
	disabled,
	getDefaultBaseProps,
	getTheme,
	invisible,
	Sizing
} from '../shared';
import {tooltip} from '../shared/helpers';
import styled, {css, ThemeProvider, withProps} from '../shared/themed-components';

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
			sizing: Sizing.normal
		})
	);
}

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
`;

export const ButtonView: any = withProps<ButtonProps, HTMLDivElement>(styled.div)`
	${BaseButtonView}

	flex: 1;

	&:not(.nohover):hover {
		background-color: ${props => props.theme.hoverColor} ${props => props.style.backgroundColor && '!important'};
	}

	${props => disabled(props)}
	${props => invisible(props)}
`;

export class Button extends BaseComponent<ButtonProps, undefined> {

	public static readonly defaultProps: ButtonProps = getDefaultButtonProps();

	constructor(props: ButtonProps) {
		super(props, {}, Button.defaultProps.style);

		this._classes.add(['ui-button']);
		this.bindCallbacks('handleClick');
		this.componentWillUpdate(this.props);
	}

	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (!this.props.disabled
			&& this.props.visible
			&& this.props.onClick != null) {
			this.props.onClick(e);
		}
		e.stopPropagation();
	}

	public componentWillUpdate(nextProps: ButtonProps) {
		this._classes.onIfElse(!nextProps.noripple && !nextProps.disabled)(
			'ripple'
		)(
			'nohover'
		);

		super.componentWillUpdate(nextProps);
	}

	public render() {
		return (
			<ThemeProvider theme={getTheme()}>
				<ButtonView
					className={this.classes}
					disabled={this.props.disabled}
					id={this.props.id}
					onClick={this.handleClick}
					style={this.inlineStyles}
					visible={this.props.visible}
				>
					<Icon
						className={this.props.iconStyle}
						iconName={this.props.iconName}
						sizing={this.props.sizing}
					/>
					{tooltip(this.props)}
				</ButtonView>
			</ThemeProvider>
		);
	}
}
