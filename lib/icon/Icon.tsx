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
 * - `iconName: string (bomb)` - The name of the font awesome icon that
 * will be used in this icon.  This option is mutually exclusive to imageFile
 * - `imageFile: string ('')` - The path to an image file that will be used
 * in this icon.  This option is mutually exclusive to iconName.
 * - `sizing: Sizing (Sizing.normal)` - There are seven icon sizes that can
 * be used. See the shared props documentation for the enumerations used for
 * each sizing.
 *
 * @module Icon
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {
	BaseComponent,
	BaseProps,
	boxStyle,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	invisible,
	locationStyle,
	Sizing,
	Wrapper
} from '../shared';
import styled, {withProps} from '../shared/themed-components';

export interface IconProps extends BaseProps {
	iconName?: string;
	imageFile?: string;
}

export function getDefaultIconProps(): IconProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			iconName: 'bomb',
			imageFile: '',
			obj: 'Icon',
			sizing: Sizing.normal
		})
	);
}

export const FontAwesome: any = withProps<IconProps, HTMLElement>(styled.i)`
	text-align: center;
	${props => props.location && locationStyle[props.location]}
	${props => props.sizing && fontStyle[props.sizing]}
	${props => disabled(props)}
	${props => invisible(props)}
`;

export const Image: any = withProps<IconProps, HTMLImageElement>(styled.img)`
	${props => props.location && locationStyle[props.location]}
	${props => props.sizing && boxStyle[props.sizing]}
	${props => disabled(props)}
	${props => invisible(props)}
`;

export class Icon extends BaseComponent<IconProps, undefined> {

	public static readonly defaultProps: IconProps = getDefaultIconProps();

	constructor(props: IconProps) {
		super(props);

		this._classes.add([
			'ui-icon',
			(props.imageFile === '') && 'fa',
			(props.imageFile === '') && 'fa-fw',
			(props.imageFile === '') && `fa-${props.iconName}`
		]);

		this.componentWillUpdate(props);
	}

	public componentWillUpdate(nextProps: IconProps) {
		if (this.props.imageFile === '' && this.props.iconName !== nextProps.iconName) {
			this._classes.off(`fa-${this.props.iconName}`);
			this._classes.on(`fa-${nextProps.iconName}`);
		}

		super.componentWillUpdate(nextProps);
	}

	public render() {
		let icon: any = null;

		if (this.props.imageFile !== '') {
			icon = (
				<Image
					{...this.props}
					className={this.classes}
					src={this.props.imageFile}
					style={this.inlineStyles}
				/>
			);
		} else {
			icon = (
				<FontAwesome
					{...this.props}
					className={this.classes}
					style={this.inlineStyles}
				/>
			);
		}

		return (
			<Wrapper {...this.props} >
				{icon}
			</Wrapper>
		);
	}
}
