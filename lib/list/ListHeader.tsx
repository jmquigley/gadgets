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
 * @module ListHeader
 */

//
// Generates a single header element that will be contained within a
// List.  This resolved to the `<li>` tag with special CSS selectors
// for a header.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {getDefaultItemProps, Item, ItemProps} from '../item';
import {BaseComponent} from '../shared';

export interface ListHeaderProps extends ItemProps {
}

export function getDefaultListHeaderProps(): ListHeaderProps {
	return cloneDeep(Object.assign(
		getDefaultItemProps(), {
		}));
}

export interface ListHeaderState {
}

export class ListHeader extends BaseComponent<ListHeaderProps, ListHeaderState> {

	public static defaultProps: ListHeaderProps = getDefaultListHeaderProps();

	constructor(props: ListHeaderProps) {
		super(props, require("./styles.css"));
	}

	protected buildStyles() {
		super.buildStyles(this.props);
		this.classes.push("ui-list-header");
		this.classes.push(this.styles.listHeader);
	}

	render() {
		this.buildStyles();

		return (
			<Item
				{...this.props}
				className={this.classes.join(" ")}
				style={this.inlineStyle}
				/>
		);
	}
}
