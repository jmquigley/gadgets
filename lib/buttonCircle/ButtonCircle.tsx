'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Button, ButtonProps, getDefaultButtonProps} from '../button';
import {baseClasses} from '../shared';

// const styles = require('./styles.css');

export interface ButtonCircleProps extends ButtonProps {
}

export function getDefaultButtonCircleProps(): ButtonProps {
	return cloneDeep(Object.assign(
		getDefaultButtonProps(), {
	}));
}

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
export class ButtonCircle extends React.Component<ButtonCircleProps, undefined> {

    public static defaultProps: ButtonCircleProps = getDefaultButtonCircleProps();

    constructor(props: ButtonCircleProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = baseClasses(this.props);

		l.push('ui-button-circle');

		return l;
	}

	render() {
		return (
			<div className={this.buildClasses().join(' ')}>
				<Button
					iconName={this.props.iconName}
					onClick={this.props.onClick}
				/>
			</div>
		);
	}
}
