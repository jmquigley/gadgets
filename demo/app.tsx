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
const ListItem = bundle.ListItem;

render(
	<div id="app">

		<h3>Accordion Example</h3>
		<Container id="accordionExample">
			<Accordion>
				<AccordionItem
					leftTitle="Accordion #1"
					rightButton={<Button iconName="plus" />}>
					<List alternating>
						<ListItem id={getUUID()}
							leftTitle="Accordion List Item 1" rightTitle="12"
							rightButton={<Button iconName="paper-plane-o"/>}
						/>
						<ListItem id={getUUID()}
							leftTitle="Accordion List Item 2" rightTitle="12"
							rightButton={<Button iconName="paper-plane-o"/>}
						/>
						<ListItem id={getUUID()}
							leftTitle="Accordion List Item 3" rightTitle="12"
							rightButton={<Button iconName="paper-plane-o"/>}
						/>
						<ListItem id={getUUID()}
							leftTitle="Accordion List Item 4" rightTitle="12"
							rightButton={<Button iconName="paper-plane-o"/>}
						/>
					</List>
				</AccordionItem>

				<AccordionItem
					leftTitle="Accordion #2"
					rightButton={<Button iconName="plus" />}>
					Accordion Items #2
				</AccordionItem>

				<AccordionItem
					leftTitle="Accordion #3"
					rightButton={<Button iconName="plus" />}>
					Accordion Items #3
				</AccordionItem>
			</Accordion>
		</Container>

		<h3>Button Examples</h3>
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

		<h3>Label Examples</h3>
		<Container id="labelExample">
			<div id="simple-labels">
				<p><Label>Test Label #1</Label></p>
				<p><Label disabled>Test Label #2 (diabled)</Label></p>
				<p><Label className="demoLabel">Test Label #3 Styled</Label></p>
			</div>
		</Container>

		<h3>List/ListItem Example</h3>
		<Container id="listExample">

			<List alternating>
				<ListItem
					id={getUUID()}
					leftTitle="List Item 1" rightTitle="12"
					leftButton={<Button iconName="podcast"/>}
					rightButton={<Button iconName="paper-plane-o"/>}
				/>
				<ListItem id={getUUID()} leftTitle="List Item 2" rightTitle="13" rightButton={<Button />}/>
				<ListItem id={getUUID()} leftTitle="List Item 3" rightTitle="14" />
				<ListItem
					id={getUUID()}
					leftTitle="List Item 4a (hide/show)" rightTitle="15"
					leftButton={<Button />}
					hiddenLeftButton
					rightButton={
						<ButtonDialog iconName="times">Test Dialog Button</ButtonDialog>
					}
					hiddenRightButton
				/>
				<ListItem
					id={getUUID()}
					leftTitle="List Item 4b (hide/show)" rightTitle="15"
					hiddenLeftButton
					leftButton={
						<ButtonDialog iconName="wrench">Test Dialog Button</ButtonDialog>
					}
				/>
				<ListItem id={getUUID()} leftTitle="List Item 5" />
				<ListItem
					id={getUUID()}
					leftTitle="List Item 6 (Toggle)" rightTitle="15"
					rightButton={
						<ButtonToggle iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358" />
					}
/>
				<ListItem id={getUUID()} leftTitle="List Item 7 (disabled)" disabled />
				<ListItem
					id={getUUID()} leftTitle="List Item 8 (disabled w/ buttons)"
					disabled
					rightButton={
						<Button />
					}
				/>
			</List>
		</Container>
	</div>,
	document.getElementById('root')
);
