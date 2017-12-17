'use strict';

const debug = require('debug')('DemoAccordion');

import * as React from 'react';
import {createItems} from './helpers';

const {
	Container,
	Accordion,
	AccordionItem,
	Button,
	List
} = require('../../dist/bundle');

export default class DemoAccordion extends React.Component<any, undefined> {

	private items: any = createItems(5);

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	public render() {
		debug('render: %O', this.props);

		return (
			<Container id="accordionExample" title="Accordion">
				<Accordion sizing={this.props['sizing']}>
					<AccordionItem
						leftButton={<Button iconName="bars" />}
						noedit
						rightButton={<Button iconName="plus" />}
						title="Accordion #1 (click to expand)"
					>
						<List alternating>
							{this.items}
						</List>
					</AccordionItem>

					<AccordionItem title="Accordion #2">
						Accordion Items #2
					</AccordionItem>

					<AccordionItem
						title="Accordion #3"
					>
						Accordion Items #3
					</AccordionItem>

					<AccordionItem title="Accordion #4 (disabled)" disabled>
						Accordion Items #4 (disabled)
					</AccordionItem>

					<AccordionItem
						title="Accordion #5 (no button)"
						showButton={false}
					>
						Accordion Items #5 (no button)
					</AccordionItem>
				</Accordion>
			</Container>
		);
	}
}
