'use strict';

import * as React from 'react';
import {Keys} from 'util.keys';
import {
	Button,
	ListItem
} from '../../';

/**
 * Creates N random list items and returns them in an array.  Used to
 * generate data for testing.
 *
 * @param maxItems {number} the number of ListItems to create
 * @return {ListItem[]} an array of randomly generated ListItems
 */
export function createItems(maxItems: number) {
	const listItems = [];
	for (let i = 0; i < maxItems; i++) {
		listItems.push(`Accordion List Item ${i}`);
	}
	const keys = new Keys();

	return listItems.map((item, idx) => {
		return (
			<ListItem
				key={keys.at(idx)}
				id={keys.at(idx)}
				title={item}
				widget={idx}
				leftButton={<Button />}
				rightButton={<Button />}
			/>
		);
	});
}
