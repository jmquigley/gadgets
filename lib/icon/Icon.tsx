'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {baseClasses, getDefaultBaseProps, BaseProps} from '../shared';

const styles = require('./styles.css');

export enum IconSize {
	small,
	medium,
	normal,
	large,
	xlarge,
}

export interface IconProps extends BaseProps {
	iconName?: string;
	imageFile?: string;
	size?: IconSize
}

export function getDefaultIconProps(): IconProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			backgroundColor: "inherit",
			color: "inherit",
			iconName: "bomb",
			imageFile: '',
			size: IconSize.normal
	}));
}

/**
 * Displays a graphical icon within the current container.  The control uses
 * [Font Awesome](http://fontawesome.io/) for the icons.  It can also
 * accept an image file.  It uses four sizings for the icons: small
 * medium/normal, large, and xlarge.  These are exposed through an
 * enumeration named `IconSize`.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Icon, IconSize} from 'gadgets';
 * <Icon size={IconSize.small} iconName="cab" />
 * <Icon size={IconSize.normal} iconName="paper-plane-o" />
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
 * - `backgroundColor: string` - Sets the background color of the icon when
 * `iconName` is used.
 * - `color: string` - Sets the icon color when `iconName` is used.  The
 * default is *black*.
 * - `iconName: string` - The name of the font awesome icon that will be
 * used in this icon.  This option is mutually exclusive to imageFile
 * - `imageFile: string` - The path to an image file that will be used in
 * this icon.  This option is mutually excludive to iconName.
 * - `size: IconSize` - There are four icon sizes that can be used:
 * IconSize.small (16px), IconSize.medium (36px), IconSize.large (48px),
 * IconSize.xlarge (64px).
 *
 */
export class Icon extends React.Component<IconProps, undefined> {

    public static defaultProps: IconProps = getDefaultIconProps();

	private _classes: string = '';
	private _size: string = styles.normal;
	private _style: any = {};

    constructor(props: IconProps) {
		super(props);

		this._style = {
			color: (props.color || 'black'),
			backgroundColor: (props.backgroundColor || 'white')
		}

		switch (props.size) {
			case IconSize.small:
				this._size = styles.small;
				break;

			case IconSize.large:
				this._size = styles.large;
				break;

			case IconSize.xlarge:
				this._size = styles.xlarge;
				break;

			case IconSize.normal:
			case IconSize.medium:
			default:
				this._size = styles.medium;
		}
	}

	componentWillMount() {
		let l: string[] = baseClasses(this.props);

		l.push('ui-icon');
		this._classes = l.join(' ');
	}

	render() {
		let s: string = `${styles.icon} ${this._size} ${this._classes}`;
		if (this.props.imageFile !== '') {
			return (
				<img src={this.props.imageFile} className={s} />
			);
		} else {
			return (
				<i className={`fa fa-${this.props.iconName} ${s}`} style={this._style} />
			);
		}
	}
}
