/**
 * A container used to group buttons in a horizontal arrangement.  This is a
 * block level control.  The buttons are given a size that is equivalent to
 * both the width/height (to make them square).  The buttons within this control
 * are all uniform in size.  They also have a `Justify`  property that allows
 * them to be left, right, or center justified as a group.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button, ButtonBar, Justify} from 'gadgets';
 *
 * <ButtonBar buttonSize="32px" justify=Justify.right>
 *     <Button />
 *     <Button />
 * </ButtonBar>
 * ```
 *
 * #### Events
 * None
 *
 * #### Styles
 * - `ui-button-bar` - Applied to the top level `<div>` that surrounds the
 * block of buttons.
 * - `ui-button-bar-group` - Applied to the second leve `<div>` that surrounds
 * the buttons.  This grouping makes it possible to justify the buttons within
 * the button bar.
 *
 * #### Properties
 * - `buttonSize: {string} ('24px')` - The width and height of the buttons added
 * to the button bar control.
 * - `justify: {Justify} (Justify.left)` - The location/justification of the
 * button group.  This can be left, right, or center.
 * - `sizing: Sizing (Sizing.normal)` - Allows one to change the size of the
 * icon within the buttons.  See the shared props object for the `Sizing`
 * enumeration.
 *
 * @module ButtonBar
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Keys} from 'util.keys';
import {toggleOnIf} from 'util.toggle';
import {
	BaseComponent,
	BaseProps,
	cls,
	getDefaultBaseProps,
	Justify
} from '../shared';

export interface ButtonBarProps extends BaseProps {
	buttonSize?: string;
	justify?: Justify;
}

export function getDefaultButtonBarProps(): ButtonBarProps {
	return cloneDeep(Object.assign(getDefaultBaseProps(), {
		buttonSize: '24px',
		justify: Justify.left
	}));
}

export class ButtonBar extends BaseComponent<ButtonBarProps, undefined> {

	public static readonly defaultProps: ButtonBarProps = getDefaultButtonBarProps();

	private _groupClasses: Set<string>;
	private _keys: Keys = new Keys();
	private _rootClasses: Set<string>;

	constructor(props: ButtonBarProps) {
		super(props, require('./styles.css'));

		this._groupClasses = new Set<string>([
			'ui-button-bar-group',
			this.styles.buttonBarGroup
		]);

		this._rootClasses = new Set<string>([
			'ui-button-bar',
			this.styles.buttonBar
		]);

		this.componentWillUpdate(props);
	}

	public componentWillUpdate(nextProps: ButtonBarProps) {

		toggleOnIf(this._groupClasses, this.props.justify === Justify.right)(
			this.styles.right
		);

		toggleOnIf(this._groupClasses, this.props.justify === Justify.center)(
			this.styles.center
		);

		toggleOnIf(this._groupClasses, this.props.justify === Justify.left)(
			this.styles.left
		);

		this.buildCommonStyles(this._rootClasses, nextProps);
	}

	public render() {
		const buttons: any = [];
		React.Children.forEach(this.props.children, (child: any, idx: number) => {
			const newChild = React.cloneElement(child as any, {
				disabled: this.props.disabled,
				sizing: this.props.sizing,
				visible: this.props.visible
			});

			buttons.push(
				<div
					id={this._keys.at(idx)}
					key={this._keys.at(idx)}
					style={{
						width: this.props.buttonSize,
						height: this.props.buttonSize
					}}
					className={this.styles.buttonBarBox}
				>
					{newChild}
				</div>
			);
		});

		return(
			<div className={cls(this._rootClasses)}>
				<div className={cls(this._groupClasses)}>
					{buttons}
				</div>
			</div>
		);
	}
}
