/**
 * The `Divider` component is used to put a space between elements in a
 * `Toolbar` control.  An enumeration named `DividerType` will be used
 * to determine a division character within the divider.  It can be one
 * of three types:
 *
 * - horizontal (-)
 * - vertical (|)
 * - none
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button, Divider, DividerType, Sizing, Toolbar} from 'gadgets';
 *
 * <Toolbar sizing={Sizing.small}>
 *     <Button />
 *     <Divider dividerType={Divider.vertical}/>
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
 * - `dividerType {DividerType} (Divider.none)` - determines if a divide
 * character will be placed within the control.
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

export enum DividerType {
	horizontal = '-',
	vertical = '|',
	none = ' '
}

export interface DividerProps extends BaseProps {
	dividerType?: DividerType;
}

export function getDefaultDividerProps(): DividerProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			dividerType: DividerType.none
		})
	);
}

export class Divider extends BaseComponent<DividerProps, undefined> {

	public static readonly defaultProps: DividerProps = getDefaultDividerProps();

	constructor(props: DividerProps) {
		super(props, require('./styles.css'), Divider.defaultProps.style);

		this._rootStyles.add([
			'ui-divider',
			this.styles.divider
		]);

		this.componentWillUpdate(this.props);
	}

	public render() {
		this.inlineStyles = {
			width: this.fontSizePX(this.props.sizing, 0.5)
		};

		return(
			<div
				className={this._rootStyles.classnames}
				style={this.inlineStyles}
			>
			{this.props.dividerType}
			</div>
		);
	}
}
