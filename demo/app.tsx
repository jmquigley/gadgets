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
const ButtonCircle = bundle.ButtonCircle;
const ButtonDialog = bundle.ButtonDialog;
const ButtonText = bundle.ButtonText;
const ButtonToggle = bundle.ButtonToggle;
const Container = bundle.Container;
const Icon = bundle.Icon;
const IconSize = bundle.IconSize;
const Label = bundle.Label;
const List = bundle.List;
const ListHeader = bundle.ListHeader;
const ListItem = bundle.ListItem;
const Toast = bundle.Toast
const ToastLevel = bundle.ToastLevel;
const ToastType = bundle.ToastType;

let maxItems: number = 5;

let listItems: string[] = [];
let uuids: string[] = [];
for (let i=0; i<maxItems; i++) {
	listItems.push(`Accordion List Item ${i}`);
	uuids.push(getUUID());
}

function createItems() {
 	return listItems.map((item, idx) => {
 		return (
 			<ListItem
				id={uuids[idx]}
				key={uuids[idx]}
				title={item}
				widget={getUUID(true).substring(0,5)}
				leftButton={<Button />}
				rightButton={<Button iconName="paper-plane-o" />}
			/>
 		);
 	});
}

const items = createItems();
const randomText = loremIpsum({units: 'sentences', count: 2, random: null});

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
	toastVisible5: boolean;
	toastVisible6: boolean;
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
			toastVisible4: true,
			toastVisible5: true,
			toastVisible6: true
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

						<AccordionItem
							title="Accordion #5 (no button)"
							showButton={false}>
							Accordion Items #5 (no button)
						</AccordionItem>
					</Accordion>
				</Container>

				<h1>Badges</h1>
				click on the buttons to increment the badges
				<Container id="badgeExample">

					<div id="simple-buttons">
						<div className="box">
							<p>top right</p>
							<Badge counter={this.state.counter1}>
								<div className="boxButtons">
								<Button onClick={() => {
									this.setState({
										counter1: this.state.counter1 + 1
									});
								}}/>
								</div>
							</Badge>
						</div>

						<div className="box">
							<p>top left</p>
							<Badge counter={this.state.counter2} position={BadgePosition.topLeft}>
								<div className="boxButtons">
								<Button onClick={() => {
									this.setState({
										counter2: this.state.counter2 + 1
									});
								}}/>
								</div>
							</Badge>
						</div>

						<div className="box">
							<p>bottom right</p>
							<Badge
								counter={this.state.counter3}
								position={BadgePosition.bottomRight}
								color="green">
								<div className="boxButtons">
								<Button onClick={() => {
									this.setState({
										counter3: this.state.counter3 + 1
									});
								}}/>
								</div>
							</Badge>
						</div>

						<div className="box">
							<p>bottom left</p>
							<Badge
								counter={this.state.counter4}
								position={BadgePosition.bottomLeft}
								color="magenta">
								<div className="boxButtons">
								<Button onClick={() => {
									this.setState({
										counter4: this.state.counter4 + 1
									});
								}}/>
								</div>
							</Badge>
						</div>

					</div>

				</Container>

				<h1>Buttons</h1>
				<Container id="buttonExample">
					<div id="simple-buttons">
						<div className="box">
							<p>Simple Button</p>
							<div className="boxButtons">
								<Button iconName="cab"/>
							</div>
						</div>

						<div className="box">
							<p>Disabled Button</p>
							<div className="boxButtons">
								<Button iconName="cab" disabled={true} />
							</div>
						</div>

						<div className="box">
							<p>Colored Button</p>
							<div className="boxButtons">
								<Button iconName="cab" color="blue" backgroundColor="red" />
							</div>
						</div>

						<div className="box">
							<p>Dialog Button</p>
							<div className="boxButtons">
								<ButtonDialog
									backgroundColor="orange"
									color="yellow"
									iconName="bath">
									Test Dialog Button
								</ButtonDialog>
							</div>
						</div>

						<div className="box">
							<p>Toggle Button</p>
							<div className="boxButtons">
								<ButtonToggle iconNameOn="check-square-o" iconNameOff="square-o" fgColorOff="black" />
							</div>
						</div>

						<div className="box">
							<p>Circle Button</p>
							<div className="boxButtons">
								<ButtonCircle iconName="times" />
							</div>
						</div>

						<div className="box">
							<p>Text Button Left</p>
							<div className="boxButtons">
								<ButtonText iconName="arrow-left" text="Left" justify={ButtonText.LEFT} />
							</div>
						</div>

						<div className="box">
							<p>Text Button Right</p>
							<div className="boxButtons">
								<ButtonText iconName="arrow-right" text="Right" justify={ButtonText.RIGHT} color="white" backgroundColor="brown" />
							</div>
						</div>


					</div>
				</Container>

				<h1>Icons</h1>
				<Container id="iconExample">
					<div id="simple-icons">

						<div className="box">
							<p>Small<br/>&nbsp;</p>
							<Icon size={IconSize.small} iconName="handshake-o" />
						</div>

						<div className="box">
							<p>Medium & Normal</p>
							<Icon size={IconSize.medium} iconName="handshake-o" />
						</div>

						<div className="box">
							<p>Large<br/>&nbsp;</p>
							<Icon size={IconSize.large} iconName="handshake-o" />
						</div>

						<div className="box">
							<p>XLarge<br/>&nbsp;</p>
							<Icon size={IconSize.xlarge} iconName="handshake-o" />
						</div>

						<div className="box">
							<p>Normal, Custom</p>
							<Icon
								size={IconSize.normal}
								iconName="handshake-o"
								color="red"
								backgroundColor="blue"
							/>
						</div>

						<div className="box">
							<p>Normal, Image</p>
							<Icon
								size={IconSize.normal}
								imageFile="./test-icon-image.png"
							/>
						</div>

						<div className="box">
							<p>Small, Image</p>
							<Icon
								size={IconSize.small}
								imageFile="./test-icon-image.png"
							/>
						</div>

					</div>
				</Container>

				<h1>Labels</h1>
				<Container id="labelExample">
					<div id="simple-labels">
						<p><Label text="Test Label #1 (double click to edit)" /></p>
						<p><Label disabled text="Test Label #2 (disabled)" /></p>
						<p><Label className="demoLabel" text="Test Label #3 Styled" /></p>
						<p><Label text="Text Label #4 (no edit)" noedit /></p>
						<p><Label
							   text="Text Label #5 (inline style)"
							   color="blue"
							   backgroundColor="white" />
						</p>
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
				<h3>Info message with decay</h3>
				<Container id="toastExample">
					<div className="toastInfo">
						<p>
						{randomText}
						</p>

						<div className="toastBox">
							<Button iconName="power-off" onClick={() => this.setState({toastVisible1: true})} />
							<p>Reset the Toast widget (show)</p>
						</div>

						<Toast
							level={ToastLevel.info}
							visible={this.state.toastVisible1}
							onClose={() => this.setState({toastVisible1: false})}>
							This is a sample info message
						</Toast>
					</div>

					<h3>Warning message with decay</h3>
					<div className="toastInfo">
						<p>
						{randomText}
						</p>

						<div className="toastBox">
							<Button iconName="power-off" onClick={() => this.setState({toastVisible2: true})} />
							<p>Reset the Toast widget (show)</p>
						</div>

						<Toast
							level={ToastLevel.warning}
							visible={this.state.toastVisible2}
							onClose={() => this.setState({toastVisible2: false})}>
							This is a sample warning message
						</Toast>
					</div>

					<h3>Error message with decay</h3>
					<div className="toastInfo">
						<p>
						{randomText}
						</p>

						<div className="toastBox">
							<Button iconName="power-off" onClick={() => this.setState({toastVisible3: true})} />
							<p>Reset the Toast widget (show)</p>
						</div>

						<Toast
							level={ToastLevel.error}
							visible={this.state.toastVisible3}
							onClose={() => this.setState({toastVisible3: false})}>
							This is a sample error message
						</Toast>
					</div>

					<h3>Info message with persistence</h3>
					<div className="toastInfo">
						<p>
						{randomText}
						</p>

						<div className="toastBox">
							<Button iconName="power-off" onClick={() => this.setState({toastVisible4: true})} />
							<p>Reset the Toast widget (show)</p>
						</div>

						<Toast
							level={ToastLevel.info}
							type={ToastType.persistent}
							visible={this.state.toastVisible4}
							onClose={() => this.setState({toastVisible4: false})}>
							This is a sample info message
						</Toast>
					</div>

					<h3>Error message with persistence on the bottom</h3>
					<div className="toastInfo">
						<p>
						{randomText}
						</p>

						<div className="toastBox">
							<Button iconName="power-off" onClick={() => this.setState({toastVisible5: true})} />
							<p>Reset the Toast widget (show)</p>
						</div>

						<Toast
							bottom
							level={ToastLevel.error}
							type={ToastType.persistent}
							visible={this.state.toastVisible5}
							onClose={() => this.setState({toastVisible5: false})}>
							This is a sample error message on the bottom
						</Toast>
					</div>

					<h3>Custom message with persistence</h3>
					<div className="toastInfo">
						<p>
						{randomText}
						</p>

						<div className="toastBox">
 							<Button iconName="power-off" onClick={() => this.setState({toastVisible6: true})} />
							<p>Reset the Toast widget (show)</p>
						</div>

						<Toast
							level={ToastLevel.custom}
							backgroundColor="#7fbf3f"
							color="magenta"
							borderColor="#3fbfbf"
							type={ToastType.persistent}
							visible={this.state.toastVisible6}
							onClose={() => this.setState({toastVisible6: false})}>
							This is a sample custom message
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
