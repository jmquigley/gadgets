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

import * as React from 'react';
import ReactSelect from 'react-select';
import {BaseComponent, fontStyle, Sizing, Wrapper} from '../shared';
import styled from '../shared/themed-components';

export const StyledReactSelect: any = styled(ReactSelect)`
	${props => props['sizing'] && fontStyle[props['sizing']]}
`;

export class Select extends BaseComponent<any, any> {

	public static defaultProps: any = {
		disabled: false,
		obj: 'Select',
		visible: true,
		sizing: Sizing.normal
	};

	constructor(props: any) {
		super(props, {}, Select.defaultProps.style);
		this._classes.add('ui-select');
		this.componentWillUpdate(this.props);
	}

	public render() {
		return (
			<Wrapper {...this.props} >
				<StyledReactSelect
					{...this.props}
					className={this.classes}
				/>
			</Wrapper>
		);
	}
}
