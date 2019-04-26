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

"use strict";

import * as React from "react";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	getDefaultBaseProps,
	getDefaultBaseState,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";

export enum DividerType {
	horizontal = "-",
	vertical = "|",
	none = " "
}

export interface DividerProps extends BaseProps {
	dividerType?: DividerType;
}

export function getDefaultDividerProps(): DividerProps {
	return {
		...getDefaultBaseProps(),
		dividerType: DividerType.none,
		obj: "Divider"
	};
}

export type DividerState = BaseState;

export function getDefaultDividerState(): DividerState {
	return {...getDefaultBaseState()};
}

const DividerView: any = styled.div`
	align-items: center;
	color: ${(props: DividerProps) => props.theme.borderColor || Color.silver};
	display: inline-flex;
	justify-content: center;
	opacity: 0.5;
	width: ${(props: DividerProps) => props.width || "1.0em"};
`;

export class Divider extends BaseComponent<DividerProps, DividerState> {
	public static readonly defaultProps: DividerProps = getDefaultDividerProps();
	public state: DividerState = getDefaultDividerState();

	constructor(props: DividerProps) {
		super(props, "ui-divider", Divider.defaultProps.style);
	}

	public render() {
		return (
			<Wrapper {...this.props}>
				<DividerView
					className={this.className}
					style={this.state.style}
					width={BaseComponent.fontSizePX(this.props.sizing, 0.25)}
				>
					{this.props.dividerType}
				</DividerView>
			</Wrapper>
		);
	}
}

export default Divider;
