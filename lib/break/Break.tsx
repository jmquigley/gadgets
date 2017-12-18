/**
 * A wrapper for the <br /> tag.  This respects the sizing base
 * proprety setting.
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
	getDefaultBaseProps
} from '../shared';
import styled, {withProps} from '../shared/themed-components';

export const BreakView: any = withProps<BaseProps, HTMLElement>(styled.p)`
	content: '';
	display: block;
	margin: 0;
	margin-top: ${props => props.height};
`;

export class Break extends BaseComponent<BaseProps, undefined> {

	public static defaultProps: BaseProps = getDefaultBaseProps();

	constructor(props: BaseProps) {
		super(props);

		this._classes.add('ui-break');
		this.componentWillUpdate(props);
	}

	public render() {
		return (
			<BreakView
				className={this.classes}
				height={this.fontSizeREM(this.props.sizing, 0.5)}
				sizing={this.props.sizing}
				style={this.inlineStyles}
			/>
		);
	}
}
