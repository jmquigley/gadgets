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
	public state: BaseState = getDefaultBaseState();

	constructor(props: BaseProps) {
		super(props);
	}

	public static getDerivedStateFromProps(props: BaseProps, state: BaseState) {
		state.classes.clear();
		state.classes.add('ui-break');

		return super.getDerivedStateFromProps(props, state);
	}

	public render() {
		return (
			<BreakView
				className={this.classes}
				height={BaseComponent.fontSizeREM(this.state.sizing, 0.5)}
				sizing={this.state.sizing}
				style={this.inlineStyles}
			/>
		);
	}
}
