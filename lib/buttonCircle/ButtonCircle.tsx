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
import {Button, ButtonProps, getDefaultButtonProps} from '../button';
import {BaseComponent, Size} from '../shared';

const styles = require('./styles.css');

export interface ButtonCircleProps extends ButtonProps {
}

export function getDefaultButtonCircleProps(): ButtonProps {
	return cloneDeep(Object.assign(
		getDefaultButtonProps(), {
			borderColor: "black",
			size: Size.normal,
			color: "black"
	}));
}

export class ButtonCircle extends BaseComponent<ButtonCircleProps, undefined> {

    public static defaultProps: ButtonCircleProps = getDefaultButtonCircleProps();

	private _circleSize: string = styles.medium;

    constructor(props: ButtonCircleProps) {
		super(props);
	}

	protected buildStyles() {

		this._style["border"] = "solid 2px";

		super.buildStyles(this.props);

		this._classes += " ui-button-circle";
		this._classes += ` ${styles.buttonCircle}`;

		switch (this.props.size) {
			case Size.xxsmall:
				this._circleSize = ` ${styles.xxsmall}`;
				break;

			case Size.xsmall:
				this._circleSize = ` ${styles.xsmall}`;
				break;

			case Size.small:
				this._circleSize = ` ${styles.small}`;
				break;

			case Size.large:
				this._circleSize = ` ${styles.large}`;
				break;

			case Size.xlarge:
				this._circleSize = ` ${styles.xlarge}`;
				break;

			case Size.xxlarge:
				this._circleSize = ` ${styles.xxlarge}`;
				break;

			case Size.normal:
			case Size.medium:
			default:
				this._circleSize = ` ${styles.medium}`;
		}
	}

	render() {
		this.buildStyles();

		return (
			<div className={this._classes}>
				<div className={`${styles.buttonCircleContainer} ${this._circleSize}`}>
					<Button
					className={styles.buttonCircleIcon}
					style={this._style}
					disabled={this.props.disabled}
					color={this.props.color}
					backgroundColor={this.props.backgroundColor}
					borderColor={this.props.color}
					iconName={this.props.iconName}
					onClick={this.props.onClick}
					size={this.props.size}
					/>
				</div>
			</div>
		);
	}
}
