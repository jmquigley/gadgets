import * as loremIpsum from 'lorem-ipsum';
import * as React from 'react';
import {render} from 'react-dom';
import {getUUID} from 'util.toolbox';

(window as any).$ = (window as any).jQuery = require('jquery');

//
// This is not how the components would typically be included within an
// electron app.  This is kind of a "hack" to allow the demo app and the
// library code to coexist.  Typically they would be imported using
// CommonJS import.
//

const {
	Accordion,
	AccordionItem,
	Badge,
	Button,
	ButtonCircle,
	ButtonDialog,
	ButtonText,
	ButtonToggle,
	Container,
	Icon,
	Label,
	List,
	ListHeader,
	ListItem,
	Location,
	Select,
	Size,
	Toast,
	ToastLevel,
	ToastType
} = require('../dist/bundle');

// Build global testing data for List Item controls
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

// Build global test data for Select control
const selectOptions = [
	{ value: 'one', label: 'One' },
	{ value: 'two', label: 'Two' },
	{ value: 'three', label: 'Three' },
	{ value: 'four', label: 'Four' },
	{ value: 'five', label: 'Five' }
];

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
	selectOption: string;
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
			toastVisible6: true,
			selectOption: selectOptions[0].value
		};

		(window as any).state = this.state;
	}

	private buildAccordion = () => (
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
	);

	private buildBadges = () => (
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
					<Badge
						counter={this.state.counter2}
						location={Location.topLeft}>
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
						location={Location.bottomRight}
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
						location={Location.bottomLeft}
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
	);

	private buildButtons = () => (
		<Container>
			<table id="buttonTable">
				<thead>
					<tr>
						<th></th>
						<th>xxsmall</th>
						<th>xsmall</th>
						<th>small</th>
						<th>normal<br/>medium</th>
						<th>large</th>
						<th>xlarge</th>
						<th>xxlarge</th>
						<th>disabled</th>
						<th>colored</th>
					</tr>
				</thead>
				<tbody>
					<tr className="tblIcons">
						<th>Icon</th>
						<td><Icon iconName="handshake-o" size={Size.xxsmall}/></td>
						<td><Icon iconName="handshake-o" size={Size.xsmall}/></td>
						<td><Icon iconName="handshake-o" size={Size.small}/></td>
						<td><Icon iconName="handshake-o" size={Size.normal}/></td>
						<td><Icon iconName="handshake-o" size={Size.large}/></td>
						<td><Icon iconName="handshake-o" size={Size.xlarge}/></td>
						<td><Icon iconName="handshake-o" size={Size.xxlarge}/></td>
						<td><Icon iconName="handshake-o" size={Size.normal} disabled={true}/></td>
						<td><Icon iconName="handshake-o" size={Size.normal} color="red" backgroundColor="blue"/></td>
					</tr><tr className="tblIcons">
						<th>Icon Images</th>
						<td><Icon imageFile="./test-icon-image.png" size={Size.xxsmall}/></td>
						<td><Icon imageFile="./test-icon-image.png" size={Size.xsmall}/></td>
						<td><Icon imageFile="./test-icon-image.png" size={Size.small}/></td>
						<td><Icon imageFile="./test-icon-image.png" size={Size.normal}/></td>
						<td><Icon imageFile="./test-icon-image.png" size={Size.large}/></td>
						<td><Icon imageFile="./test-icon-image.png" size={Size.xlarge}/></td>
						<td><Icon imageFile="./test-icon-image.png" size={Size.xxlarge}/></td>
						<td><Icon imageFile="./test-icon-image.png" size={Size.normal} disabled={true}/></td>
						<td><span>N/A</span></td>
					</tr><tr>
						<th>Button</th>
						<td><Button iconName="motorcycle" size={Size.xxsmall}/></td>
						<td><Button iconName="motorcycle" size={Size.xsmall}/></td>
						<td><Button iconName="motorcycle" size={Size.small}/></td>
						<td><Button iconName="motorcycle" size={Size.normal}/></td>
						<td><Button iconName="motorcycle" size={Size.large}/></td>
						<td><Button iconName="motorcycle" size={Size.xlarge}/></td>
						<td><Button iconName="motorcycle" size={Size.xxlarge}/></td>
						<td><Button iconName="motorcycle" size={Size.normal} disabled={true}/></td>
						<td><Button iconName="motorcycle" size={Size.normal} color="yellow" backgroundColor="green"/></td>
					</tr><tr>
						<th>ButtonCircle</th>
						<td><ButtonCircle iconName="times" size={Size.xxsmall}/></td>
						<td><ButtonCircle iconName="times" size={Size.xsmall}/></td>
						<td><ButtonCircle iconName="times" size={Size.small}/></td>
						<td><ButtonCircle iconName="times" size={Size.normal}/></td>
						<td><ButtonCircle iconName="times" size={Size.large}/></td>
						<td><ButtonCircle iconName="times" size={Size.xlarge}/></td>
						<td><ButtonCircle iconName="times" size={Size.xxlarge}/></td>
						<td><ButtonCircle iconName="times" size={Size.normal} disabled={true}/></td>
						<td><ButtonCircle iconName="times" size={Size.normal} color="white" backgroundColor="orange"/></td>
					</tr><tr>
						<th>ButtonDialog</th>
						<td><ButtonDialog iconName="bars" size={Size.xxsmall}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" size={Size.xsmall}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" size={Size.small}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" size={Size.normal}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" size={Size.large}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" size={Size.xlarge}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" size={Size.xxlarge}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" size={Size.normal} disabled={true}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" size={Size.normal} color="white" backgroundColor="teal">dialog</ButtonDialog></td>
					</tr><tr>
						<th>ButtonToggle</th>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							size={Size.xxsmall}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							size={Size.xsmall}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							size={Size.small}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							size={Size.normal}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							size={Size.large}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							size={Size.xlarge}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							size={Size.xxlarge}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							size={Size.normal}
							disabled={true}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o"
							fgColorOn="red" fgColorOff="black"
							bgColorOn="black" bgColorOff="red"
							size={Size.normal}
							/>
						</td>
					</tr><tr>
						<th>ButtonText<br/>(Right)</th>
						<td><ButtonText text="Text" iconName="paper-plane" size={Size.xxsmall}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" size={Size.xsmall}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" size={Size.small}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" size={Size.normal}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" size={Size.large}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" size={Size.xlarge}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" size={Size.xxlarge}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" size={Size.normal} disabled={true}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" size={Size.normal} color="white" backgroundColor="blue"/></td>
					</tr><tr>
						<th>ButtonText<br/>(Left)</th>
						<td><ButtonText text="Text" justify={ButtonText.LEFT} iconName="paper-plane" size={Size.xxsmall}/></td>
						<td><ButtonText text="Text" justify={ButtonText.LEFT} iconName="paper-plane" size={Size.xsmall}/></td>
						<td><ButtonText text="Text" justify={ButtonText.LEFT} iconName="paper-plane" size={Size.small}/></td>
						<td><ButtonText text="Text" justify={ButtonText.LEFT} iconName="paper-plane" size={Size.normal}/></td>
						<td><ButtonText text="Text" justify={ButtonText.LEFT} iconName="paper-plane" size={Size.large}/></td>
						<td><ButtonText text="Text" justify={ButtonText.LEFT} iconName="paper-plane" size={Size.xlarge}/></td>
						<td><ButtonText text="Text" justify={ButtonText.LEFT} iconName="paper-plane" size={Size.xxlarge}/></td>
						<td><ButtonText text="Text" justify={ButtonText.LEFT} iconName="paper-plane" size={Size.normal} disabled={true}/></td>
						<td><ButtonText text="Text" justify={ButtonText.LEFT} iconName="paper-plane" size={Size.normal} color="white" backgroundColor="red"/></td>
					</tr>
				</tbody>
			</table>
		</Container>
	);

	private buildLabels = () => (
		<Container id="labelExample">
			<div id="simple-labels">
				<p><Label text="Test Label #1 (double click to edit)" /></p>
				<p><Label disabled text="Test Label #2 (disabled)" /></p>
				<p><Label className="demoLabel" text="Test Label #3 Styled" /></p>
				<p><Label text="Text Label #4 (no edit)" noedit /></p>
				<p><Label
					   text="Text Label #5 (inline style)"
					   color="white"
					   backgroundColor="blue" />
				</p>
			</div>
		</Container>
	);

	private buildListItemWithHeader = () => (
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
					<ButtonCircle iconName="times" color="red" />
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
				hiddenRightButton
				rightButton={
					<Button iconName="times" color="red" />
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
	);

	private buildListItemWithoutHeader = () => (
		<Container id="listExample2">
			<List alternating>
				{items}
			</List>
		</Container>
	);

	private buildSelect = () => (
		<Container id="selectExample">
			<Select
			name="form-field-name"
			value={this.state.selectOption}
			options={selectOptions}
			onChange={(val: any) => {
					if (val != null) {
						console.log(`Select click handler: ${JSON.stringify(val)}`);
						this.setState({selectOption: val.value});
					}
			}}
			/>
		</Container>
	);

	private buildToast = () => (
		<Container id="toastExample">
			<h3>Info message with decay</h3>
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
	);

	render() {
		return (
			<div id="app">

				<h1>Accordion</h1>
				{this.buildAccordion()}

				<h1>Badges</h1>
				click on the buttons to increment the badges
				{this.buildBadges()}

				<h1>Buttons & Icons</h1>
				{this.buildButtons()}

				<h1>Labels</h1>
				{this.buildLabels()}

				<h1>List/ListItem (with header)</h1>
				{this.buildListItemWithHeader()}

				<h1>List/ListItem (without header)</h1>
				{this.buildListItemWithoutHeader()}

				<h1>Select</h1>
				{this.buildSelect()}

				<h1>Toast</h1>
				{this.buildToast()}

			</div>
		);
	}
}

render(
	<App />,
	document.getElementById('root')
);
