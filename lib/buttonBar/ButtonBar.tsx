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
 * <ButtonBar justify={Justify.right}>
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
import {ClassNames} from 'util.classnames';
import {Keys} from 'util.keys';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Justify
} from '../shared';

const styles = require('./styles.css');

export interface ButtonBarProps extends BaseProps {
	justify?: Justify;
}

export function getDefaultButtonBarProps(): ButtonBarProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			justify: Justify.left
		})
	);
}

export class ButtonBar extends BaseComponent<ButtonBarProps, undefined> {

	public static readonly defaultProps: ButtonBarProps = getDefaultButtonBarProps();

	private static readonly _resetJustify = [
		styles.right,
		styles.center,
		styles.left
	];

	private _groupStyles: ClassNames = new ClassNames();
	private _keys: Keys;

	constructor(props: ButtonBarProps) {
		super(props, styles);

		this._keys = new Keys({testing: this.props.testing});

		this._groupStyles.add([
			'ui-button-bar-group',
			this.styles.buttonBarGroup
		]);

		this._rootStyles.add([
			'ui-button-bar',
			this.styles.buttonBar
		]);

		this.componentWillUpdate(props);
	}

	public componentWillUpdate(nextProps: ButtonBarProps) {

		if (nextProps.justify !== this.props.justify) {
			this._groupStyles.reset(ButtonBar._resetJustify);
		}

		switch (nextProps.justify) {
			case Justify.right:
				this._groupStyles.on(this.styles.right);
				break;

			case Justify.center:
				this._groupStyles.on(this.styles.center);
				break;

			case Justify.left:
			default:
				this._groupStyles.on(this.styles.left);
				break;
		}

		super.componentWillUpdate(nextProps);
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
					className={this.styles.buttonBarBox}
					key={this._keys.at(idx)}
					style={{
						width: this.fontSizePX(this.props.sizing, 1.5),
						height: this.fontSizePX(this.props.sizing, 1.5)
					}}
				>
					{newChild}
				</div>
			);
		});

		return(
			<div className={this._rootStyles.classnames}>
				<div className={this._groupStyles.classnames}>
					{buttons}
				</div>
			</div>
		);
	}
}
