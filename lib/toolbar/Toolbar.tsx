/**
 * A typical toolbar control.  It takes a set of buttons and controls and
 * displays the on a horizontal control.  It will only accept a specific
 * set of controls (from the Gadgets library)
 *
 * - Button
 * - ButtonCircle
 * - ButtonDialog
 * - ButtonText
 * - ButtonToggle
 * - Divider
 * - Dropdown
 * - Label
 * - Option
 * - Switch
 * - TextField
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/toolbar.png" width="60%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Button, Sizing, Toolbar} from 'gadgets';
 *
 * <Toolbar justify={Justify.left} sizing={Sizing.small}>
 *     <Button iconName="cab" onClick={someFunction} />
 *     <Divider />
 *     <Option />
 *     ...
 * </Toolbar>
 * ```
 *
 * ## API
 * #### Events
 * None
 *
 * #### Styles
 * - `ui-toolbar` - global style placed on the root `<div>` component of the
 * toolbar.
 * - `ui-toolbar-group` - The components are all placed within a grouping
 * div to set its left/right/center justification.  This global style is
 * placed on this div.
 *
 * #### Properties
 * - `justify=Justify.left {Justify}` - The toolbar can be placed to the left
 * (default), center, or right within its container.  The property sets that
 * location.
 *
 * @module Toolbar
 */

import * as React from "react";
import styled from "styled-components";
import {BinaryTree} from "util.ds";
import {Keys} from "util.keys";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	getDefaultBaseProps,
	getDefaultBaseState,
	Justify,
	Wrapper
} from "../shared";

export interface ToolbarProps extends BaseProps {
	justify?: Justify;
}

export function getDefaultToolbarProps(): ToolbarProps {
	return {
		...getDefaultBaseProps(),
		justify: Justify.left
	};
}

export type ToolbarState = BaseState;

export function getDefaultToolbarState(): ToolbarState {
	return {...getDefaultBaseState()};
}

const ToolbarView: any = styled.div`
	background-color: ${(props: ToolbarProps) => props.theme.backgroundColor};
	border: solid 1px silver;
	box-sizing: border-box;
	display: flex;
	padding: 3px 2px;
`;

const ToolbarGroupView: any = styled.div`
	align-items: center;
	display: flex;
	padding: 2px 0 1px 0;

	${(props: ToolbarProps) => {
		switch (props.justify) {
			case Justify.center:
				return "margin: auto;";
			case Justify.right:
				return "margin-left: auto;";
			default:
				return "";
		}
	}}
`;

const ToolbarElementView: any = styled.div`
	box-sizing: border-box;

	.ui-textfield {
		padding: 0;
	}

	.ui-textfield input {
		padding: 0 4px;
	}
`;

export class Toolbar extends BaseComponent<ToolbarProps, ToolbarState> {
	public static readonly defaultProps: ToolbarProps = getDefaultToolbarProps();

	private _keys: Keys;
	private static readonly _whitelist = new BinaryTree([
		"Button",
		"ButtonCircle",
		"ButtonDialog",
		"ButtonText",
		"ButtonToggle",
		"Container",
		"Divider",
		"Dropdown",
		"Label",
		"Option",
		"StyledComponent",
		"Switch",
		"TextField",
		"Toolbar"
	]);

	constructor(props: ToolbarProps) {
		super("ui-toolbar", Toolbar, props, getDefaultToolbarState());
		this._keys = new Keys({testing: this.props.testing});
	}

	public render() {
		super.render();

		const components: React.ReactElement[] = [];

		React.Children.forEach(
			this.props.children,
			(child: any, idx: number) => {
				const componentName = child["type"].name;
				this.debug("child component: %s (%O)", componentName, child);

				if (
					componentName &&
					Toolbar._whitelist.contains(componentName)
				) {
					const style = Object.assign({}, child["props"].style, {
						color: this.theme.buttonColor,
						display: "flex",
						height: BaseComponent.fontSizePX(
							this.props.sizing,
							1.5
						),
						margin: "0 2px"
					});

					switch (componentName) {
						case "Button":
						case "ButtonDialog":
						case "ButtonToggle":
							style["width"] = BaseComponent.fontSizePX(
								this.props.sizing,
								1.5
							);

						case "ButtonText":
							(style[
								"border"
							] = `solid 1px ${this.theme.borderColor}`),
								delete style["width"];
							break;

						case "ButtonCircle":
							style["borderColor"] = this.theme.buttonColor;
							style["width"] = BaseComponent.fontSizePX(
								this.props.sizing,
								1.5
							);
							break;

						case "Switch":
							style["paddingTop"] = "0.1em";
							style["margin"] = "0 6px";
							break;

						case "Label":
						case "Container":
						case "TextField":
						case "Toolbar":
						case "StyledComponent":
							delete style["height"];
							break;
					}

					if (componentName === "ButtonCircle") {
						delete style["border"];
					}

					const newChild = React.cloneElement(child as any, {
						className: "ui-toolbar-element",
						disabled: this.props.disabled,
						sizing: this.props.sizing,
						visible: this.props.visible
					});

					components.push(
						<ToolbarElementView
							key={this._keys.at(idx)}
							style={style}
						>
							{newChild}
						</ToolbarElementView>
					);
				}
			}
		);

		return (
			<Wrapper {...this.props} name={this.name}>
				<ToolbarView className={this.className}>
					<ToolbarGroupView
						className='ui-toolbar-group'
						justify={this.props.justify}
					>
						{components}
					</ToolbarGroupView>
				</ToolbarView>
			</Wrapper>
		);
	}
}

export default Toolbar;
