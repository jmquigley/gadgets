/**
 * A checkbox/radio button control.  This is a specialized wrapper of the
 * ButtonToggle control.  It contains an enum named OptionType used to
 * determine what visual type the control will take on.  The options are:
 *
 * - square
 * - squareFilled
 * - squareReverse
 * - circle
 * - circleFilled
 * - circleReverse
 * - times
 * - timesReverse
 * - dot
 * - star
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/option.png" width="50%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Option, OptionType} from 'gadgets';
 * <Option
 *     onClick={(val: boolean, text: string) => debug('val: %o, text: %o', val, text)}
 *     optionType={OptionType.square}
 *     selected
 *     text="lorem ipsum"
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onClick(toggle: boolean, text: string)` - When the option is clicked, then
 * the button display is changed (toggled).  The callback returns the current state of
 * the toggle and the text label associated with the option.  When the button is "clear",
 * it is off and "false" is sent to the callback.  When the button is "checked", it is
 * on and true is sent to the callback.
 *
 * #### Styles
 * - `ui-option` - Style applied to the root `<div>` of the control.
 *
 * #### Properties
 * - `optionType: {OptionType} (OptionType.square)` - An enumerated type that will
 * determine what icons will be displayed.  They are listed above.
 * - `selected: {boolean} (false)` - determines the initial state of the
 * control.  If true, then the control is "checked", otherwise it is "off"
 * - `text: {string} ('')` - text string to the right of the control
 *
 * @module Option
 */

'use strict';

// const debug = require('debug')('Option');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {ButtonToggle} from '../buttonToggle';
import {
	BaseComponent,
	BaseProps,
	Color,
	disabled,
	getDefaultBaseProps,
	getTheme,
	invisible
} from '../shared';
import styled, {ThemeProvider, withProps} from '../shared/themed-components';
import {Title, TitleLayout} from '../title';

export enum OptionType {
	square,
	squareFilled,
	squareReverse,
	circle,
	circleFilled,
	circleReverse,
	times,
	timesReverse,
	dot,
	star
}

export interface OptionProps extends BaseProps {
	onClick?: any;
	optionType?: OptionType;
	selected?: boolean;
	text?: string;
}

export function getDefaultOptionProps(): OptionProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			obj: 'Option',
			onClick: nilEvent,
			optionType: OptionType.square,
			selected: false,
			style: {
				backgroundColor: 'inherit',
				color: 'inherit'
			},
			text: ''
		})
	);
}

export interface OptionState {
	selected?: boolean;
}

export const OptionView: any = withProps<OptionProps, HTMLDivElement>(styled.div)`
	align-items: center;
	cursor: default;
	display: inline-flex;

	> span {
		padding: 0 0.2rem;
	}

	> span:hover {
		background-color: ${props => props.disabled ? 'unset' : props.theme.hoverColor || Color.silver};
	}

	${props => disabled(props)}
	${props => invisible(props)}
`;

export const StyledButtonToggle: any = styled(ButtonToggle)`
	display: inline;
	flex: unset;
	width: unset;
`;

export const StyledTitle: any = styled(Title)``;

export class Option extends BaseComponent<OptionProps, OptionState> {

	private readonly icons: any = {
		[OptionType.square]: {
			off: 'square-o',
			on: 'check-square-o'
		},
		[OptionType.squareFilled]: {
			off: 'square-o',
			on: 'square'
		},
		[OptionType.squareReverse]: {
			off: 'square-o',
			on: 'check-square'
		},
		[OptionType.circle]: {
			off: 'circle-o',
			on: 'check-circle-o'
		},
		[OptionType.circleFilled]: {
			off: 'circle-o',
			on: 'circle'
		},
		[OptionType.circleReverse]: {
			off: 'circle-o',
			on: 'check-circle'
		},
		[OptionType.times]: {
			off: 'circle-o',
			on: 'times-circle-o'
		},
		[OptionType.timesReverse]: {
			off: 'circle-o',
			on: 'times-circle'
		},
		[OptionType.dot]: {
			off: 'circle-o',
			on: 'dot-circle-o'
		},
		[OptionType.star]: {
			off: 'star-o',
			on: 'star'
		}
	};

	public static readonly defaultProps: OptionProps = getDefaultOptionProps();
	private _btn: ButtonToggle;

	constructor(props: OptionProps) {
		super(props, Option.defaultProps.style);

		this._classes.add('ui-option');

		this.state = {
			selected: (typeof this.props.selected !== 'undefined') ? this.props.selected : false
		};

		this.componentWillUpdate(this.props);
	}

	@autobind
	private handleClick() {
		if (this._btn) {
			this._btn.handleClick();
		}
	}

	@autobind
	private handleToggleClick(toggle: boolean) {
		this.props.onClick(toggle, this.props.text);
	}

	@autobind
	private handleRef(btn: ButtonToggle) {
		this._btn = btn;
	}

	public componentWillReceiveProps(nextProps: OptionProps) {
		if (this.props.selected !== nextProps.selected && this.state.selected !== nextProps.selected) {
			this.setState({
				selected: nextProps.selected
			});
		}
	}

	public render() {
		let title: any = null;
		if (this.props.text) {
			title = (
				<StyledTitle
					layout={TitleLayout.none}
					sizing={this.props.sizing}
					title={this.props.text}
				/>
			);
		}

		return(
			<ThemeProvider theme={getTheme()} >
				<OptionView
					disabled={this.props.disabled}
					className={this.classes}
					onClick={this.handleClick}
					style={this.inlineStyles}
					visible={this.props.visible}
				>
					<StyledButtonToggle
						{...this.props}
						bgColorOff={this.inlineStyles['backgroundColor']}
						bgColorOn={this.inlineStyles['backgroundColor']}
						fgColorOff={this.inlineStyles['color']}
						fgColorOn={this.inlineStyles['color']}
						iconNameOn={this.icons[this.props.optionType].on}
						iconNameOff={this.icons[this.props.optionType].off}
						initialToggle={this.props.selected}
						innerRef={this.handleRef}
						onClick={this.handleToggleClick}
						selected={this.state.selected}
					/>
					{title}
				</OptionView>
			</ThemeProvider>
		);
	}
}
