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
 * - `dividerType=Divider.none {DividerType}` - determines if a divide
 * character will be placed within the control.
 * - `sizing=Sizing.normal {Sizing}` - Sets the actual box size of the
 * element.  When used with a `Toolbar` this property is not needed as
 * the toolbar handled the sizing.
 *
 * @module Divider
 */

import * as React from "react";
import styled from "styled-components";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	defaultBaseProps,
	Wrapper
} from "../shared";

export enum DividerType {
	horizontal = "-",
	vertical = "|",
	none = " "
}

export interface DividerProps extends BaseProps {
	dividerType?: DividerType;
}

export type DividerState = BaseState;

const DividerView: any = styled.div`
	align-items: center;
	color: ${(props: DividerProps) => props.theme.borderColor || Color.silver};
	display: inline-flex;
	justify-content: center;
	opacity: 0.5;
	width: ${(props: DividerProps) => props.width || "1.0em"};
`;

export class Divider extends BaseComponent<DividerProps, DividerState> {
	public static readonly defaultProps: DividerProps = {
		...defaultBaseProps,
		dividerType: DividerType.none
	};

	constructor(props: DividerProps) {
		super("ui-divider", Divider, props);
	}

	public render() {
		super.render();

		return (
			<Wrapper {...this.props} name={this.name}>
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
