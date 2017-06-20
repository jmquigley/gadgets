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
import * as React from "react";
import {Button, ButtonProps, getDefaultButtonProps} from '../button';
import {BaseComponent, Size} from '../shared';

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

    constructor(props: ButtonCircleProps) {
		super(props, require("./styles.css"));
	}

	protected buildStyles() {
		this.inlineStyle["border"] = "solid 2px";

		super.buildStyles(this.props);

		this.classes.push("ui-button-circle");
		this.classes.push(this.styles.buttonCircle);
	}

	render() {
		this.buildStyles();

		return (
			<div className={this.classes.join(" ")}>
				<div className={`${this.styles.buttonCircleContainer} ${this.boxSizeStyle}`}>
					<Button
						className={this.styles.buttonCircleIcon}
						style={this.inlineStyle}
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
