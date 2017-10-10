/**
 * The `Divider` component is used to put a space between elements in a
 * `Toolbar` control.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button, Divider, Sizing, Toolbar} from 'gadgets';
 *
 * <Toolbar sizing={Sizing.small}>
 *     <Button />
 *     <Divider />
 *     <Button />
 * </Toolbar>
 * ```
 *
 * #### Events
 * None
 *
 * #### Styles
 * - `ui-divider` - global style placed on the `<div>` element.  The div
 * is the only element in the component.
 *
 * #### Properties
 * - `sizing {Sizing} (Sizing.normal)` - Sets the actual box size of the
 * element.  When used with a `Toolbar` this property is not needed as
 * the toolbar handled the sizing.
 *
 * @module Divider
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps
} from '../shared';

export type DividerProps = BaseProps;

export function getDefaultDividerProps(): DividerProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps())
	);
}

export class Divider extends BaseComponent<DividerProps, undefined> {

	public static readonly defaultProps: DividerProps = getDefaultDividerProps();

	constructor(props: DividerProps) {
		super(props, require('./styles.css'));

		this._rootStyles.add([
			'ui-divider',
			this.styles.divider
		]);

		this.componentWillUpdate(this.props);
		this.componentWillReceiveProps(this.props);
	}

	public componentWillReceiveProps(nextProps: DividerProps) {
		this.inlineStyles = {
			width: this.fontSizePX(nextProps.sizing, 0.5),
			height: this.fontSizePX(nextProps.sizing, 0.5)
		};
	}

	public render() {
		return(
			<div
				className={this._rootStyles.classnames}
				style={this.inlineStyles}
			/>
		);
	}
}
