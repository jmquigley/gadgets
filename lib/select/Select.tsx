/**
 * This is a thin wrapper around the [react-select](https://www.npmjs.com/package/react-select)
 * library.  This is used to ensure that base CSS classes are placed
 * on this instance.
 *
 * #### Examples:
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

const ReactSelect = require('react-select');

import * as React from 'react';
import {BaseComponent, Sizing} from '../shared';

export class Select extends BaseComponent<any, any> {

	public static defaultProps: any = {
		disabled: false,
		visible: true,
		sizing: Sizing.normal
	};

	constructor(props: any) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	public shouldComponentUpdate(nextProps: any): boolean {
		this.resetStyles(nextProps);
		this.classes.push('ui-select');
		this.classes.push(this.styling.fontStyle);
		this.buildStyles(nextProps);
		return true;
	}

	public render() {
		return (
			<ReactSelect {...this.props} className={this.classes.join(' ')} />
		);
	}
}
