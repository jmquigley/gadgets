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
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Button, ButtonProps, getDefaultButtonProps} from '../button';
import {BaseComponent} from '../shared';

// const styles = require('./styles.css');

export interface ButtonTextProps extends ButtonProps {
	text?: string;
}

export function getDefaultButtonTextProps(): ButtonTextProps {
	return cloneDeep(Object.assign(
		getDefaultButtonProps(), {
			text: ''
		}));
}

export class ButtonText extends BaseComponent<ButtonTextProps, undefined> {

    public static defaultProps: ButtonTextProps = getDefaultButtonTextProps();

    constructor(props: ButtonTextProps) {
		super(props);
	}

	protected buildStyles() {
		super.buildStyles(this.props, {
			color: (this.props.color || 'black'),
			backgroundColor: (this.props.backgroundColor || 'white')
		});

		this._classes += ' ui-buttontext';
	}

	render() {
		this.buildStyles();

		return (
			<div>
				<Button />
			</div>
		);
	}
}
