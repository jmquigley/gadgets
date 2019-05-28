"use strict";

import * as React from "react";
import styled from "styled-components";
import {Keys} from "util.keys";
import {Button, Container, ListItem} from "../../";

export const StyledContainer: any = styled(Container)`
	display: flex;
	flex-direction: column;
	margin: 30px 0 10px 0;
	min-width: 500px;

	> h1 {
		background-color: #bedb39;
		font-size: 1.75em;
		padding: 10px 5px;
	}

	> h1:first-child {
		margin: 0 0 10px 0;
	}
`;

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
