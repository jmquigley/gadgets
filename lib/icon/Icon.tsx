/**
 * Displays a graphical icon within the current container.  The control
 * uses [Font Awesome](http://fontawesome.io/) for the icons.  It can
 * also accept an image file.  It uses seve sizings for the icons: xxsmall,
 * xsmall, small, medium/normal, large, xlarge, and xxlarge.  These are
 * exposed through an enumeration named `Sizing` defined in the global
 * shared props.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Icon, Sizing} from 'gadgets';
 * <Icon sizing={Sizing.small} iconName="cab" />
 * <Icon sizing={Sizing.normal} iconName="paper-plane-o" />
 * <Icon imageFile="./image.png" />
 * <Icon iconName="cab" color="red" backgroundColor="gray" />
 * ```
 *
 * #### Events
 * None
 *
 * #### Styles
 * - `ui-icon` - applied to the top level container for the icon.
 *
 * #### Properties
 * - `backgroundColor: string (inherit)` - Sets the background color of
 * the icon when `iconName` is used.
 * - `color: string (inherit)` - Sets the icon color when `iconName` is used.
 *  The default is *black*.
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
	getDefaultBaseProps,
	Sizing
} from '../shared';

export interface IconProps extends BaseProps {
	iconName?: string;
	imageFile?: string;
}

export function getDefaultIconProps(): IconProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			backgroundColor: 'inherit',
			color: 'inherit',
			iconName: 'bomb',
			imageFile: '',
			sizing: Sizing.normal
	}));
}

export class Icon extends BaseComponent<IconProps, undefined> {

	public static defaultProps: IconProps = getDefaultIconProps();

	constructor(props: IconProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	public shouldComponentUpdate(nextProps: IconProps): boolean {
		super.resetStyles(nextProps);

		this.classes.push('ui-icon');
		this.classes.push(this.styles.icon);
		this.classes.push(this.locationStyle);

		if (nextProps.imageFile === '') {
			this.classes.push('fa');
			this.classes.push(`fa-${nextProps.iconName}`);
			this.classes.push(this.styling.fontStyle);
		} else {
			this.classes.push(this.styling.boxStyle);
		}

		this.inlineStyle = {
			color: (nextProps.color),
			backgroundColor: (nextProps.backgroundColor)
		};

		super.buildStyles(nextProps);

		return true;
	}

	public render() {
		if (this.props.imageFile !== '') {
			return (
				<img
					className={this.classes.join(' ')}
					src={this.props.imageFile}
					style={this.inlineStyle}
				/>
			);
		} else {
			return (
				<i
					className={this.classes.join(' ')}
					style={this.inlineStyle}
				/>
			);
		}
	}
}
