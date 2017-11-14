// TODO: add documenation for ListHeader

//
// Generates a single header element that will be contained within a
// List.  This resolved to the `<li>` tag with special CSS selectors
// for a header.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {getDefaultItemProps, Item, ItemProps} from '../item';
import {BaseComponent, getTheme, Sizing, ThemeProps} from '../shared';
import {ThemeProvider} from '../shared/themed-components';

export interface ListHeaderProps extends ItemProps {
	href?: any;
}

export function getDefaultListHeaderProps(): ListHeaderProps {
	return cloneDeep(Object.assign({},
		getDefaultItemProps(), {
			href: {
				sizing: Sizing.normal
			},
			nohover: true
		})
	);
}

export class ListHeader extends BaseComponent<ListHeaderProps, undefined> {

	public static defaultProps: ListHeaderProps = getDefaultListHeaderProps();

	constructor(props: ListHeaderProps) {
		super(props, ListHeader.defaultProps.style);

		this._classes.add(['ui-list-header']);
		this.componentWillUpdate(this.props);
	}

	public render() {
		const theme: ThemeProps = getTheme();

		return (
			<ThemeProvider theme={theme}>
				<Item
					{...this.props}
					className={this.classes}
					sizing={this.props.href.sizing}
					style={{...this.inlineStyles,
						color: theme.headerForegroundColor,
						backgroundColor: theme.headerBackgroundColor
					}}
				/>
			</ThemeProvider>
		);
	}
}
