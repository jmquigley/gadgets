import * as React from 'react';
import {render} from 'react-dom';
import {getUUID} from 'util.toolbox';

//
// This is not how the components would typically be included within an
// electron app.  This is kind of a "hack" to allow the demo app and the
// library code to coexist.  Typically they would be imported using
// CommonJS import.
//

const bundle = require('../dist/bundle');

const Accordion = bundle.Accordion;
const AccordionItem = bundle.AccordionItem;
const Button = bundle.Button;
const ButtonDialog = bundle.ButtonDialog;
const ButtonToggle = bundle.ButtonToggle;
const Container = bundle.Container;
const Label = bundle.Label;
const List = bundle.List;
const ListHeader = bundle.ListHeader;
const ListItem = bundle.ListItem;

let listItems: string[] = [];
for (let i=0; i<5; i++) {
	listItems.push(`Accordion List Item ${i}`);
}

function createItems() {
 	return listItems.map(item => {
		let uuid = getUUID();
 		return (
 			<ListItem
				id={uuid}
				key={uuid}
				title={item}
				widget={getUUID(true).substring(0,5)}
				leftButton={<Button />}
				rightButton={<Button iconName="paper-plane-o" />}
			/>
 		);
 	});
}

render(
	<div id="app">

		<h1>Accordion Example</h1>
		<Container id="accordionExample">
			<Accordion>
				<AccordionItem title="Accordion #1 (click to expand)">
					<List alternating>
						{createItems()}
					</List>
				</AccordionItem>

				<AccordionItem title="Accordion #2">
					Accordion Items #2
				</AccordionItem>

				<AccordionItem
					title="Accordion #3">
					Accordion Items #3
				</AccordionItem>

				<AccordionItem title="Accordion #4 (disabled)" disabled>
					Accordion Items #4 (disabled)
				</AccordionItem>
			</Accordion>
		</Container>

		<h1>Button Examples</h1>
		<Container id="buttonExample">
			<div id="simple-buttons">
				<div className="box">
					Simple Button<br/>
					<Button iconName="cab"/>
				</div>

				<div className="box">
					Disabled Button<br/>
					<Button iconName="cab" disabled={true} />
				</div>

				<div className="box">
					Dialog Button<br/>
					<ButtonDialog iconName="bath">Test Dialog Button</ButtonDialog>
				</div>

				<div className="box">
					Toggle Button<br/>
					<ButtonToggle iconNameOn="check-square-o" iconNameOff="square-o" fgColorOff="black" />
				</div>

			</div>
		</Container>

		<h1>Label Examples</h1>
		<Container id="labelExample">
			<div id="simple-labels">
				<p><Label text="Test Label #1 (double click to edit)" /></p>
				<p><Label disabled text="Test Label #2 (diabled)" /></p>
				<p><Label className="demoLabel" text="Test Label #3 Styled" /></p>
				<p><Label text="Text Label #4 (no edit)" noedit /></p>
			</div>
		</Container>

		<h1>List/ListItem Example (with header)</h1>
		<Container id="listExample1">

			<List alternating>
				<ListHeader
					leftButton={<ButtonDialog iconName="bars" />}
					noedit
					rightButton={<Button iconName="plus" />}
					title="Demo List Header"
				/>
				<ListItem
					id={getUUID()}
					title="List Item 1" widget="12"
					leftButton={<Button iconName="podcast"/>}
					rightButton={<Button iconName="paper-plane-o"/>}
				/>
				<ListItem id={getUUID()} title="List Item 2" widget="13" rightButton={<Button />}/>
				<ListItem id={getUUID()} title="List Item 3" widget="14" />
				<ListItem
					id={getUUID()}
					title="List Item 4a (hide/show)" widget="15"
					leftButton={<Button />}
					hiddenLeftButton
					rightButton={
						<ButtonDialog iconName="times">Test Dialog Button</ButtonDialog>
					}
					hiddenRightButton
				/>
				<ListItem
					id={getUUID()}
					title="List Item 4b (hide/show)" widget="15"
					hiddenLeftButton
					leftButton={
						<ButtonDialog iconName="wrench">Test Dialog Button</ButtonDialog>
					}
				/>
				<ListItem id={getUUID()} title="List Item 5" />
				<ListItem
					id={getUUID()}
					title="List Item 6 (Toggle)" widget="15"
					rightButton={
						<ButtonToggle iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358" />
					}
				/>
				<ListItem id={getUUID()} title="List Item 7 (disabled)" disabled />
				<ListItem
					id={getUUID()} title="List Item 8 (disabled w/ buttons)"
					disabled
					rightButton={
						<Button />
					}
				/>
				<ListItem
					id={getUUID()}
					title="List Item 9 (stacked)"
					widget="stacked bottom widget"
					stacked
					rightButton={<Button />}
				/>
				<ListItem
					id={getUUID()}
					noripple
					title="List Item 10 (noripple edit)"
				/>
				<ListItem
					id={getUUID()}
					noripple
					noedit
					title="List Item 11 (noedit)"
				/>
			</List>
		</Container>

		<h1>List/ListItem Example (without header)</h1>
		<Container id="listExample2">

			<List alternating>
				{createItems()}
			</List>
		</Container>
	</div>,
	document.getElementById('root')
);
