/**
 * A wrapper for the <br /> tag.  This respects the sizing base
 * property setting.
 *
 * ## Examples:
 *
 * ```javascript
 * import {Break} from 'gadgets';
 * <Break sizing={Sizing.small} />
 * ```
 *
 * ## API
 * #### Events
 * N/A
 *
 * #### Styles
 * - `ui-break` - placed on the root `<br>` tag
 *
 * #### Properties
 * N/A
 *
 * @module Break
 */

'use strict';

import * as React from 'react';
import {
	BaseComponent,
	BaseProps,
	BaseState,
	getDefaultBaseProps,
	getDefaultBaseState
} from '../shared';
import styled from '../shared/themed-components';

export const BreakView: any = styled.p`
	content: '';
	display: block;
	margin: 0;
	margin-top: ${(props: BaseProps) => props.height};
`;

export class Break extends BaseComponent<BaseProps, BaseState> {

	public static defaultProps: BaseProps = getDefaultBaseProps();
	public state: BaseState = getDefaultBaseState('ui-break');

	constructor(props: BaseProps) {
		super(props);
	}

	public render() {
		return (
			<BreakView
				className={this.state.classes.classnames}
				height={BaseComponent.fontSizeREM(this.props.sizing, 0.5)}
				sizing={this.props.sizing}
				style={this.state.style}
			/>
		);
	}
}
