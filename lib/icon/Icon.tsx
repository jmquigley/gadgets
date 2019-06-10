/**
 * Displays a graphical icon within the current container.  The control
 * uses [Font Awesome](http://fontawesome.io/) for the icons.  It can
 * also accept an image file.  It uses several sizings for the icons:
 *
 * - xxsmall
 * - xsmall
 * - small
 * - medium/normal
 * - large
 * - xlarge
 * - xxlarge.
 *
 * These are exposed through an enumeration named `Sizing` defined in the
 * global shared props.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/buttons-icons.png" width="70%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Icon, Sizing} from 'gadgets';
 *
 * <Icon sizing={Sizing.small} iconName="cab" />
 * <Icon sizing={Sizing.normal} iconName="paper-plane-o" />
 * <Icon imageFile="./image.png" sizing={Sizing.small} />
 * <Icon iconName="cab" color="red" backgroundColor="gray" />
 * ```
 *
 * ## API
 * #### Events
 * None
 *
 * #### Styles
 * - `ui-icon` - applied to the top level container for the icon or image.
 *
 * #### Properties
 * - `iconName="bomb" {string}` - The name of the font awesome icon that
 * will be used in this icon.  This option is mutually exclusive to imageFile
 * - `imageFile="" {string}` - The path to an image file that will be used
 * in this icon.  This option is mutually exclusive to iconName.
 * - `sizing=Sizing.normal {Sizing}` - There are seven icon sizes that can
 * be used. See the shared props documentation for the enumerations used for
 * each sizing.
 *
 * @module Icon
 */

import * as React from "react";
import styled from "styled-components";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	boxStyle,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	locationStyle,
	Sizing,
	Wrapper
} from "../shared";

export interface IconProps extends BaseProps {
	iconName?: string;
	imageFile?: string;
}

export function getDefaultIconProps(): IconProps {
	return {
		...getDefaultBaseProps(),
		iconName: "bomb",
		imageFile: "",
		sizing: Sizing.normal
	};
}

export type IconState = BaseState;

export function getDefaultIconState(): IconState {
	return {...getDefaultBaseState()};
}

const FontAwesome: any = styled.i`
	text-align: center;
	${(props: IconProps) => props.location && locationStyle[props.location]}
	${(props: IconProps) => props.sizing && fontStyle[props.sizing]}
	${(props: IconProps) => disabled(props)}
	${(props: IconProps) => invisible(props)}
`;

const Image: any = styled.img`
	${(props: IconProps) => props.location && locationStyle[props.location]}
	${(props: IconProps) => props.sizing && boxStyle[props.sizing]}
	${(props: IconProps) => disabled(props)}
	${(props: IconProps) => invisible(props)}
`;

export class Icon extends BaseComponent<IconProps, IconState> {
	public static readonly defaultProps: IconProps = getDefaultIconProps();

	constructor(props: IconProps) {
		super("ui-icon", Icon, props, getDefaultIconState());
	}

	public render() {
		super.render({noclassnameupdate: true});

		let faClassList: string[] = null;
		if (!this.props.imageFile) {
			faClassList = [
				"ui-icon",
				"fa",
				"fa-fw",
				`fa-${this.props.iconName}`
			];
		} else {
			faClassList = ["ui-image"];
		}

		this.updateClassName(faClassList);

		let icon: any = null;

		if (this.props.imageFile !== "") {
			icon = (
				<Image
					{...this.props}
					className={this.className}
					src={this.props.imageFile}
					style={this.state.style}
				/>
			);
		} else {
			icon = (
				<FontAwesome
					{...this.props}
					className={this.className}
					style={this.state.style}
				/>
			);
		}

		return <Wrapper {...this.props}>{icon}</Wrapper>;
	}
}

export default Icon;
