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
 * #### Examples:
 *
 * ```javascript
 * import {Option, OptionType} from 'gadgets';
 * <Option
 *     onClick={someFunction}
 *     selected
 *     text="lorem ipsum"
 *     type={OptionType.square}
 * />
 * ```
 *
 * #### Events
 * - `onClick(toggle: boolean)` - When the option is clicked, then the button
 * display is chagned (toggled).  The callback returns the current state of
 * the toggle.  When the button is "clear", it is off and "false" is sent to
 * the callback.  When the button is "checked", it is on and true is sent to
 * the callback.
 *
 * #### Styles
 * - `ui-option` - Style applied to the root `<div>` of the control.
 *
 * #### Properties
 * - `selected: {boolean} (false)` - determines the initial state of the
 * control.  If true, then the control is "checked", otherwise it is "off"
 * - `text: {string} ('')` - text string to the right of the control
 * - `type: {OptionType} (OptionType.square)` - An enumerated type that will
 * determine what icons will be displayed.  They are listed above.
 *
 * @module Option
 */

'use strict';
import {cloneDeep} from 'lodash';
import {nilEvent} from 'util.toolbox';
import {ButtonToggle} from '../buttonToggle';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps
} from '../shared';

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
	selected?: boolean;
	text?: string;
	type?: OptionType;
}

export function getDefaultOptionProps(): OptionProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			onClick: nilEvent,
			selected: false,
			style: {
				backgroundColor: 'inherit',
				color: 'inherit'
			},
			text: '',
			type: OptionType.square
		})
	);
}

export class Option extends BaseComponent<OptionProps, undefined> {

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

	private _btn: ButtonToggle;
	public static readonly defaultProps: OptionProps = getDefaultOptionProps();

	constructor(props: OptionProps) {
		super(props, require('./styles.css'));

		this._rootStyles.add([
			'ui-option',
			this.styles.option
		]);

		this.bindCallbacks('handleClick');
		this.componentWillUpdate(this.props);
	}

	private handleClick() {
		if (this._btn) {
			this._btn.handleClick();
		}
	}

	public render() {
		return(
			<div
				className={this._rootStyles.classnames}
				onClick={this.handleClick}
				style={this.inlineStyles}
			>
				<ButtonToggle
					bgColorOff={this.inlineStyles['backgroundColor']}
					bgColorOn={this.inlineStyles['backgroundColor']}
					className={this.styles.optionButton}
					fgColorOff={this.inlineStyles['color']}
					fgColorOn={this.inlineStyles['color']}
					iconNameOn={this.icons[this.props.type].on}
					iconNameOff={this.icons[this.props.type].off}
					initialToggle={this.props.selected}
					nohover
					onClick={this.props.onClick}
					ref={(btn: ButtonToggle) => {
						this._btn = btn;
					}}
					sizing={this.props.sizing}
				/>
				{(this.props.text) ? <span>{this.props.text}</span> : null}
			</div>
		);
	}
}
