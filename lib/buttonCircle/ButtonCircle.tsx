/**
 * {description}
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button} from 'gadgets';
 * <Button iconName="cab" onClick={someFunction} />
 * ```
 *
 * #### Events
 * - `{name}` - {description}
 *
 * #### Styles
 * - `` - {description}
 *
 * #### Properties
 * - `{name}: {datatype}` - {description}
 *
 * @module ButtonCircle
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Button, ButtonProps, getDefaultButtonProps, IconSize} from '../button';
import {baseClasses} from '../shared';

const styles = require('./styles.css');

export enum CircleSize {
	small,
	medium,
	normal,
	large,
	xlarge,
}

export interface ButtonCircleProps extends ButtonProps {
	circleSize?: CircleSize;
}

export function getDefaultButtonCircleProps(): ButtonProps {
	return cloneDeep(Object.assign(
		getDefaultButtonProps(), {
			circleSize: CircleSize.normal,
			color: "black"
	}));
}

export class ButtonCircle extends React.Component<ButtonCircleProps, undefined> {

    public static defaultProps: ButtonCircleProps = getDefaultButtonCircleProps();

	private _circleSize: string = styles.medium;
	private _classes: string = '';
	private _iconSize: IconSize = IconSize.normal;
	private _style: any = null;

    constructor(props: ButtonCircleProps) {
		super(props);
	}

	private buildStyles = () => {
		this._style = Object.assign({
			color: this.props.color,
			borderColor: this.props.color
		}, this.props.style);

		this._classes = baseClasses(this.props);
		this._classes += " ui-button-circle";
		this._classes += ` ${styles.buttonCircle}`;

		switch (this.props.circleSize) {
			case CircleSize.small:
				this._circleSize = ` ${styles.small}`;
				this._iconSize = IconSize.small;
				break;

			case CircleSize.large:
				this._circleSize = ` ${styles.large}`;
				this._iconSize = IconSize.large;
				break;

			case CircleSize.xlarge:
				this._circleSize = ` ${styles.xlarge}`;
				this._iconSize = IconSize.xlarge;
				break;

			case CircleSize.normal:
			case CircleSize.medium:
			default:
				this._circleSize = ` ${styles.medium}`;
				this._iconSize = IconSize.medium;
		}
	}

	render() {
		this.buildStyles();

		return (
			<div className={this._classes}>
				<div className={`${styles.buttonCircleContainer} ${this._circleSize}`}>
					<Button
					className={styles.buttonCircleIcon}
					iconName={this.props.iconName}
					iconSize={this._iconSize}
					onClick={this.props.onClick}
					style={this._style}
				/>
				</div>
			</div>
		);
	}
}
