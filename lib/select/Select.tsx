/**
 * This is a thin wrapper around the [react-select](https://www.npmjs.com/package/react-select)
 * library.  This is used to ensure that base CSS classes are placed
 * on this instance.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/select.png" width="50%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Select} from 'gadgets';
 *
 * const selectOptions = [
 *     { value: 'one', label: 'One' },
 *     { value: 'two', label: 'Two' },
 *     { value: 'three', label: 'Three' },
 *     { value: 'four', label: 'Four' },
 *     { value: 'five', label: 'Five' }
 * ];
 *
 * <Select
 *     name="form-field-name"
 *     value={this.state.selectOption}
 *     options={selectOptions}
 *     onChange={(val: any) => {
 *         if (val != null) {
 *             console.log(`Select click handler: ${JSON.stringify(val)}`);
 *             this.setState({selectOption: val.value});
 *         }
 *     }}
 *     />
 * ```
 *
 * ## API
 * #### Events & Properites
 * See the [online documentation](https://github.com/JedWatson/react-select/blob/master/README.md)
 * for this library for related events and properites.
 *
 * #### Styles
 * - `ui-select` - Placed at the root of the class
 *
 * @module Select
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import ReactSelect, {ReactSelectProps} from 'react-select';
import {
	BaseComponent,
	BaseState,
	fontStyle,
	getDefaultBaseState,
	Sizing,
	Wrapper
} from '../shared';
import styled from '../shared/themed-components';

export const ReactSelectView: any = styled(ReactSelect)`
	${props => props['sizing'] && fontStyle[props['sizing']]}
`;

export interface SelectProps extends ReactSelectProps {
	disabled?: boolean;
	err?: any;
	errorMessage?: string;
	obj?: string;
	sizing?: Sizing;
	style?: any;
	testing?: boolean;
	visible?: boolean;
}

export function getDefaultSelectProps(self: any = {}): SelectProps {
	return cloneDeep(Object.assign({}, self.defaultProps, {
			disabled: false,
			err: null,
			errorMessage: '',
			obj: 'Select',
			sizing: Sizing.normal,
			style: {},
			testing: false,
			visible: true
		})
	);
}

export type SelectState = BaseState;

export function getDefaultSelectState(): SelectState {
	return cloneDeep({...getDefaultBaseState('ui-select')});
}

export class Select extends BaseComponent<any, SelectState> {

	public static defaultProps: SelectProps = getDefaultSelectProps(Select);
	public state: SelectState = getDefaultBaseState();

	constructor(props: any) {
		super(props, Select.defaultProps.style as any);
	}

	public render() {
		return (
			<Wrapper {...this.props} >
				<ReactSelectView
					{...this.props}
					className={this.state.classes.classnames}
					style={this.state.style}
				/>
			</Wrapper>
		);
	}
}
