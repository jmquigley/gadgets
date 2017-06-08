import * as loremIpsum from 'lorem-ipsum';
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
const Badge = bundle.Badge;
const BadgePosition = bundle.BadgePosition;
const Button = bundle.Button;
const ButtonDialog = bundle.ButtonDialog;
const ButtonToggle = bundle.ButtonToggle;
const Container = bundle.Container;
const Label = bundle.Label;
const List = bundle.List;
const ListHeader = bundle.ListHeader;
const ListItem = bundle.ListItem;
const Toast = bundle.Toast
const ToastLevel = bundle.ToastLevel;
const ToastType = bundle.ToastType;

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

const items = createItems();
const randomText = loremIpsum({units: 'paragraphs', random: null});

interface AppProps {
}

interface AppState {
	counter1?: number;
	counter2?: number;
	counter3?: number;
	counter4?: number;
	toastVisible1: boolean;
	toastVisible2: boolean;
	toastVisible3: boolean;
	toastVisible4: boolean;
}

class App extends React.Component<AppProps, AppState> {

	constructor(props: AppProps) {
		super(props);
		this.state = {
			counter1: 0,
			counter2: 1,
			counter3: 99,
			counter4: 1,
			toastVisible1: true,
			toastVisible2: true,
			toastVisible3: true,
			toastVisible4: true
		};

		(window as any).state = this.state;
	}

	render() {
		return (
			<div id="app">
				<h1>Accordion</h1>
				<Container id="accordionExample">
					<Accordion>
						<AccordionItem title="Accordion #1 (click to expand)">
							<List alternating>
								{items}
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

				<h1>Badges</h1>
				click on the buttons to increment the badges
				<Container id="badgeExample">

					<div id="simple-buttons">
						<div className="box">
							top right<br/>
							<Badge counter={this.state.counter1}>
								<Button onClick={() => {
									this.setState({
										counter1: this.state.counter1 + 1
									});
								}}/>
							</Badge>
						</div>

						<div className="box">
							top left<br/>
							<Badge counter={this.state.counter2} position={BadgePosition.topLeft}>
								<Button onClick={() => {
									this.setState({
										counter2: this.state.counter2 + 1
									});
								}}/>
							</Badge>
						</div>

						<div className="box">
							bottom right<br/>
							<Badge
								counter={this.state.counter3}
								position={BadgePosition.bottomRight}
								color="green">
								<Button onClick={() => {
									this.setState({
										counter3: this.state.counter3 + 1
									});
								}}/>
							</Badge>
						</div>

						<div className="box">
							bottom left<br/>
							<Badge
								counter={this.state.counter4}
								position={BadgePosition.bottomLeft}
								color="magenta">
								<Button onClick={() => {
									this.setState({
										counter4: this.state.counter4 + 1
									});
								}}/>
							</Badge>
						</div>

					</div>

				</Container>

				<h1>Buttons</h1>
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

				<h1>Labels</h1>
				<Container id="labelExample">
					<div id="simple-labels">
						<p><Label text="Test Label #1 (double click to edit)" /></p>
						<p><Label disabled text="Test Label #2 (diabled)" /></p>
						<p><Label className="demoLabel" text="Test Label #3 Styled" /></p>
						<p><Label text="Text Label #4 (no edit)" noedit /></p>
					</div>
				</Container>

				<h1>List/ListItem (with header)</h1>
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

				<h1>List/ListItem (without header)</h1>
				<Container id="listExample2">
					<List alternating>
						{items}
					</List>
				</Container>

				<h1>Toast</h1>
				<h3>Info message with Decay</h3>
				<Container id="toastExample">
					<div className="toastInfo">
						<p>
						{randomText}
						</p>

						<Button iconName="power-off" onClick={() => this.setState({toastVisible1: true})} />
						Reset the Toast widget (show)
						<Toast
							level={ToastLevel.info}
							visible={this.state.toastVisible1}
							onClose={() => this.setState({toastVisible1: false})}>
							This is a sample info message
						</Toast>
					</div>

					<h3>Warning message with Decay</h3>
					<div className="toastInfo">
						<p>
						{randomText}
						</p>

						<Button iconName="power-off" onClick={() => this.setState({toastVisible2: true})} />
						Reset the Toast widget (show)

						<Toast
							level={ToastLevel.warning}
							visible={this.state.toastVisible2}
							onClose={() => this.setState({toastVisible2: false})}>
							This is a sample warning message
						</Toast>
					</div>

					<h3>Error message with Decay</h3>
					<div className="toastInfo">
						<p>
						{randomText}
						</p>

						<Button iconName="power-off" onClick={() => this.setState({toastVisible3: true})} />
						Reset the Toast widget (show)

						<Toast
							level={ToastLevel.error}
							visible={this.state.toastVisible3}
							onClose={() => this.setState({toastVisible3: false})}>
							This is a sample error message
						</Toast>
					</div>

					<h3>Info message with Persistence</h3>
					<div className="toastInfo">
						<p>
						{randomText}
						</p>

						<Button iconName="power-off" onClick={() => this.setState({toastVisible4: true})} />
						Reset the Toast widget (show)

						<Toast
							level={ToastLevel.info}
							type={ToastType.persistent}
							visible={this.state.toastVisible4}
							onClose={() => this.setState({toastVisible4: false})}>
							This is a sample info message
						</Toast>
					</div>


				</Container>
			</div>
		);
	}
}

render(
	<App />,
	document.getElementById('root')
);
