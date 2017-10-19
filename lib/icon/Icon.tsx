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
 * #### Examples:
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
import styled from 'styled-components';
import {
	BaseComponent,
	BaseProps,
	boxStyle,
	fontStyle,
	getDefaultBaseProps,
	Sizing
} from '../shared';

export interface IconProps extends BaseProps {
	iconName?: string;
	imageFile?: string;
}

export function getDefaultIconProps(): IconProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			iconName: 'bomb',
			imageFile: '',
			sizing: Sizing.normal
		})
	);
}

export const FontAwesome: any = styled.i`
	text-align: center;
	${(props: IconProps) => props.sizing && fontStyle[props.sizing]}
`;

export const Image: any = styled.img`
	${(props: IconProps) => props.sizing && boxStyle[props.sizing]}
`;

export class Icon extends BaseComponent<IconProps, undefined> {

	public static readonly defaultProps: IconProps = getDefaultIconProps();

	constructor(props: IconProps) {
		super(props);

		this._classes.add([
			'ui-icon',
			this.locationStyle,
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
		if (this.props.imageFile !== '') {
			return (
				<Image
					className={this.classes}
					sizing={this.props.sizing}
					src={this.props.imageFile}
					style={this.inlineStyles}
				/>
			);
		} else {
			return (
				<FontAwesome
					className={this.classes}
					sizing={this.props.sizing}
					style={this.inlineStyles}
				/>
			);
		}
	}
}
