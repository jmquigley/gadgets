"use strict";

const debug = require("debug")("DemoAccordion");

import * as React from "react";
import {Accordion, AccordionItem, Button, List} from "../../dist/bundle";
import {createItems, StyledContainer} from "./helpers";

export default class DemoAccordion extends React.Component<any, undefined> {
	private items: any = createItems(5);

	constructor(props: any) {
		super(props);
		debug("creating");
	}

	public render() {
		return (
			<StyledContainer id='accordionExample' title='Accordion'>
				<Accordion
					sizing={this.props["sizing"]}
					disabled={this.props["disabled"]}
				>
					<AccordionItem
						leftButton={<Button iconName='bars' />}
						noedit
						rightButton={<Button iconName='plus' />}
						title='Accordion #1 (click to expand)'
					>
						<List alternating>{this.items}</List>
					</AccordionItem>

					<AccordionItem title='Accordion #2'>
						Accordion Items #2
					</AccordionItem>

					<AccordionItem title='Accordion #3'>
						Accordion Items #3
					</AccordionItem>
				</Accordion>
			</StyledContainer>
		);
	}
}
