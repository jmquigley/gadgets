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
import {baseClasses} from '../shared';

const styles = require('./styles.css');

export interface ButtonCircleProps extends ButtonProps {
}

export function getDefaultButtonCircleProps(): ButtonProps {
	return cloneDeep(Object.assign(
		getDefaultButtonProps(), {
	}));
}

export class ButtonCircle extends React.Component<ButtonCircleProps, undefined> {

    public static defaultProps: ButtonCircleProps = getDefaultButtonCircleProps();

	private _classes: string = '';
	private _style: any = null;

    constructor(props: ButtonCircleProps) {
		super(props);
	}

	private buildStyles = () => {
		this._style = Object.assign({}, this.props.style);

		this._classes = baseClasses(this.props);
		this._classes += " ui-button-circle";
		this._classes += ` ${styles.buttonCircle}`;
	}

	render() {
		this.buildStyles();

		return (
			<div className={this._classes}>
				<Button
					iconName={this.props.iconName}
					onClick={this.props.onClick}
					style={this._style}
				/>
			</div>
		);
	}
}
