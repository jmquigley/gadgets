import * as loremIpsum from 'lorem-ipsum';
import * as React from 'react';
import {render} from 'react-dom';
import {sprintf} from 'sprintf-js';
import {getUUID} from 'util.toolbox';

const debug = require('debug')('app');

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
	DialogBox,
	DialogBoxType,
	Direction,
	Divider,
	DynamicList,
	Editor,
	Icon,
	Justify,
	Label,
	List,
	ListDivider,
	ListHeader,
	ListItem,
	Location,
	Option,
	OptionType,
	Pager,
	Select,
	Sizing,
	SortOrder,
	Switch,
	SwitchType,
	Tab,
	TabContainer,
	TagList,
	TextField,
	Title,
	TitleLayout,
	Toast,
	ToastLevel,
	ToastType,
	Toolbar,
	Tooltip,
	Triangle,
	Validator
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

let dynamicItems = {};
for (let i = 1; i <= 2000; i++) {
	dynamicItems[`item ${sprintf('%04d', i)}`] = `w${i}`;
}

// Build global test data for Select control
const selectOptions = [
	{ value: 'one', label: 'One' },
	{ value: 'two', label: 'Two' },
	{ value: 'three', label: 'Three' },
	{ value: 'four', label: 'Four' },
	{ value: 'five', label: 'Five' }
];

const sizingOptions = [
	{ value: Sizing.xxsmall, label: 'xxsmall' },
	{ value: Sizing.xsmall, label: 'xsmall' },
	{ value: Sizing.small, label: 'small' },
	{ value: Sizing.normal, label: 'normal' },
	{ value: Sizing.large, label: 'large' },
	{ value: Sizing.xlarge, label: 'xlarge' },
	{ value: Sizing.xxlarge, label: 'xxlarge' }
];

interface AppProps {
}

interface AppState {
	counter1?: number;
	counter2?: number;
	counter3?: number;
	counter4?: number;
	counter5?: number;
	dialogError: boolean;
	dialogWarning: boolean;
	dialogSuccess: boolean;
	dialogInfo: boolean;
	dialogCustom: boolean;
	toastVisible1: boolean;
	toastVisible2: boolean;
	toastVisible3: boolean;
	toastVisible4: boolean;
	toastVisible5: boolean;
	toastVisible6: boolean;
	selectOption: string;
	sizingOption: string;
}

class App extends React.Component<AppProps, AppState> {

	constructor(props: AppProps) {
		super(props);
		this.state = {
			counter1: 0,
			counter2: 1,
			counter3: 99,
			counter4: 1,
			counter5: -5,
			dialogError: false,
			dialogWarning: false,
			dialogSuccess: false,
			dialogInfo: false,
			dialogCustom: false,
			toastVisible1: true,
			toastVisible2: true,
			toastVisible3: true,
			toastVisible4: true,
			toastVisible5: true,
			toastVisible6: true,
			selectOption: selectOptions[0].value,
			sizingOption: sizingOptions[3].value
		};

		/* (window as any).state = this.state;*/
	}

	private buildAccordion = () => (
		<Container id="accordionExample">
			<Accordion>
				<AccordionItem
					rightButton={<Button iconName="plus" />}
					leftButton={<Button iconName="bars" />}
					title="Accordion #1 (click to expand)"
				>
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
					<p>top right (suppress)</p>
					<Badge
						counter={this.state.counter1}
						suppress
					>
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
					<p>top left<br/>&nbsp;</p>
					<Badge
						counter={this.state.counter2}
						location={Location.topLeft}
						onClick={(counter: number) => {
								console.log(`Badge counter click: ${counter}`);
						}}>
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
						style={{color: 'green'}}
					>
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
						style={{color: 'magenta'}}
					>
						<div className="boxButtons">
							<Button onClick={() => {
									this.setState({
										counter4: this.state.counter4 + 1
									});
							}}/>
						</div>
					</Badge>
				</div>

				<div className="box">
					<p>bottom (negative)</p>
					<Badge
						counter={this.state.counter5}
						location={Location.bottom}
						style={{color: 'blue'}}
					>
						<div className="boxButtons">
							<Button onClick={() => {
									this.setState({
										counter5: this.state.counter5 + 1
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
						<th>custom</th>
					</tr>
				</thead>
				<tbody>
					<tr className="tblIcons">
						<th>Icon</th>
						<td><Icon iconName="handshake-o" sizing={Sizing.xxsmall}/></td>
						<td><Icon iconName="handshake-o" sizing={Sizing.xsmall}/></td>
						<td><Icon iconName="handshake-o" sizing={Sizing.small}/></td>
						<td><Icon iconName="handshake-o" sizing={Sizing.normal}/></td>
						<td><Icon iconName="handshake-o" sizing={Sizing.large}/></td>
						<td><Icon iconName="handshake-o" sizing={Sizing.xlarge}/></td>
						<td><Icon iconName="handshake-o" sizing={Sizing.xxlarge}/></td>
						<td><Icon iconName="handshake-o" sizing={Sizing.normal} disabled={true}/></td>
						<td><Icon iconName="handshake-o" sizing={Sizing.normal} style={{color: "red", backgroundColor: "blue"}}/></td>
					</tr><tr className="tblIcons">
						<th>Icon Images</th>
						<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.xxsmall}/></td>
						<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.xsmall}/></td>
						<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.small}/></td>
						<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.normal}/></td>
						<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.large}/></td>
						<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.xlarge}/></td>
						<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.xxlarge}/></td>
						<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.normal} disabled={true}/></td>
						<td><span style={{display: "table", margin: "0 auto"}}>N/A</span></td>
					</tr><tr>
						<th>Button</th>
						<td><Button iconName="motorcycle" sizing={Sizing.xxsmall}/></td>
						<td><Button iconName="motorcycle" sizing={Sizing.xsmall}/></td>
						<td><Button iconName="motorcycle" sizing={Sizing.small}/></td>
						<td><Button iconName="motorcycle" sizing={Sizing.normal}/></td>
						<td><Button iconName="motorcycle" sizing={Sizing.large}/></td>
						<td><Button iconName="motorcycle" sizing={Sizing.xlarge}/></td>
						<td><Button iconName="motorcycle" sizing={Sizing.xxlarge}/></td>
						<td><Button iconName="motorcycle" sizing={Sizing.normal} disabled={true}/></td>
						<td><Button iconName="motorcycle" sizing={Sizing.normal} style={{color: "yellow", backgroundColor: "green"}}/></td>
					</tr><tr>
						<th>ButtonCircle</th>
						<td><ButtonCircle iconName="times" sizing={Sizing.xxsmall}/></td>
						<td><ButtonCircle iconName="times" sizing={Sizing.xsmall}/></td>
						<td><ButtonCircle iconName="times" sizing={Sizing.small}/></td>
						<td><ButtonCircle iconName="times" sizing={Sizing.normal}/></td>
						<td><ButtonCircle iconName="times" sizing={Sizing.large}/></td>
						<td><ButtonCircle iconName="times" sizing={Sizing.xlarge}/></td>
						<td><ButtonCircle iconName="times" sizing={Sizing.xxlarge}/></td>
						<td><ButtonCircle iconName="times" sizing={Sizing.normal} disabled={true}/></td>
						<td><ButtonCircle iconName="times" sizing={Sizing.normal} style={{color: "green", backgroundColor: "orange"}}/></td>
					</tr><tr>
						<th>ButtonDialog</th>
						<td><ButtonDialog iconName="bars" sizing={Sizing.xxsmall}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" sizing={Sizing.xsmall}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" sizing={Sizing.small}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" sizing={Sizing.normal}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" sizing={Sizing.large}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" sizing={Sizing.xlarge}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" sizing={Sizing.xxlarge}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" sizing={Sizing.normal} disabled={true}>dialog</ButtonDialog></td>
						<td><ButtonDialog iconName="bars" sizing={Sizing.normal} style={{color: "white", backgroundColor: "teal"}}>dialog</ButtonDialog></td>
					</tr><tr>
						<th>ButtonToggle</th>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							sizing={Sizing.xxsmall}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							sizing={Sizing.xsmall}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							sizing={Sizing.small}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							sizing={Sizing.normal}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							sizing={Sizing.large}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							sizing={Sizing.xlarge}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							sizing={Sizing.xxlarge}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358"
							sizing={Sizing.normal}
							disabled={true}
							/>
						</td>
						<td><ButtonToggle
							iconNameOn="star" iconNameOff="star-o"
							fgColorOn="red" fgColorOff="black"
							bgColorOn="black" bgColorOff="red"
							sizing={Sizing.normal}
							/>
						</td>
					</tr><tr>
						<th>ButtonText<br/>(Right)</th>
						<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.xxsmall}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.xsmall}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.small}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.normal}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.large}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.xlarge}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.xxlarge}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.normal} disabled={true}/></td>
						<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.normal} style={{ color: "white", backgroundColor: "blue"}}/></td>
					</tr><tr>
						<th>ButtonText<br/>(Left)</th>
						<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.xxsmall}/></td>
						<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.xsmall}/></td>
						<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.small}/></td>
						<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.normal}/></td>
						<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.large}/></td>
						<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.xlarge}/></td>
						<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.xxlarge}/></td>
						<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.normal} disabled={true}/></td>
						<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.normal} style={{color: "white", backgroundColor: "red"}}/></td>
					</tr><tr>
						<th>ButtonText<br/>(Center)</th>
						<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.xxsmall}/></td>
						<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.xsmall}/></td>
						<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.small}/></td>
						<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.normal}/></td>
						<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.large}/></td>
						<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.xlarge}/></td>
						<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.xxlarge}/></td>
						<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.normal} disabled={true}/></td>
						<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.normal} style={{color: "white", backgroundColor: "red"}}/></td>
					</tr>
				</tbody>
			</table>
		</Container>
	);

	private buildDialogBox = () => (
		<Container id="dialogBoxExample">

			<div id="simple-buttons">
				<div className="box">
					<ButtonText
						noicon
						onClick={() => this.setState({dialogError: true})}
						style={{
							backgroundColor: "#d9534f"
						}}
						text="Show Error Dialog"
					/>
					<DialogBox
						dialogType={DialogBoxType.error}
						message={"This is a sample error dialog message\n" + randomText}
						onSelection={(flag: boolean) => {
							console.log(`Dialog selection: ${flag}`);
							this.setState({dialogError: false});
						}}
						show={this.state.dialogError}
					/>
				</div>

				<div className="box">
					<ButtonText
						noicon
						onClick={() => this.setState({dialogWarning: true})}
						style={{
							backgroundColor: "#f0ad4e"
						}}
						text="Show Warning Dialog"
					/>
					<DialogBox
						dialogType={DialogBoxType.warning}
						message={"This is a sample warning dialog message\n" + randomText}
						onSelection={(flag: boolean) => {
							console.log(`Dialog selection: ${flag}`);
							this.setState({dialogWarning: false});
						}}
						show={this.state.dialogWarning}
					/>
				</div>

				<div className="box">
					<ButtonText
						noicon
						onClick={() => this.setState({dialogSuccess: true})}
						style={{
							backgroundColor: "#5cb85c"
						}}
						text="Show Success Dialog"
					/>
					<DialogBox
						dialogType={DialogBoxType.success}
						message={"This is a sample success dialog message\n" + randomText}
						onSelection={(flag: boolean) => {
							console.log(`Dialog selection: ${flag}`);
							this.setState({dialogSuccess: false});
						}}
						show={this.state.dialogSuccess}
					/>
				</div>

				<div className="box">
					<ButtonText
						noicon
						onClick={() => this.setState({dialogInfo: true})}
						style={{
							backgroundColor: "#5bc0de"
						}}
						text="Show Info Dialog"
					/>
					<DialogBox
						dialogType={DialogBoxType.info}
						message={"This is a sample info dialog message\n" + randomText}
						onSelection={(flag: boolean) => {
							console.log(`Dialog selection: ${flag}`);
							this.setState({dialogInfo: false});
						}}
						show={this.state.dialogInfo}
					/>
				</div>

				<div className="box">
					<ButtonText
						noicon
						onClick={() => this.setState({dialogCustom: true})}
						style={{
							backgroundColor: "magenta"
						}}
						text="Show Custom Dialog"
					/>
					<DialogBox
						dialogType={DialogBoxType.custom}
						iconName="car"
						message={"This is a sample custom dialog message\n" + randomText}
						onSelection={(flag: boolean) => {
							console.log(`Dialog selection: ${flag}`);
							this.setState({dialogCustom: false});
						}}
						show={this.state.dialogCustom}
						style={{
							color: 'magenta'
						}}
					/>
				</div>

			</div>
		</Container>
	);

	private buildDynamicList = () => {
		return (
			<Container id="dynamicListExample">
				<DynamicList
					items={dynamicItems}
					layout={TitleLayout.dominant}
					onDelete={(title: string) => {
						console.log(`Deleting item from list: ${title}`);
					}}
					onNew={(title: string) => {
						console.log(`Adding new item to list: ${title}`);
					}}
					onSelect={(title: string) => {
						console.log(`Selected item: ${title}`);
					}}
					pageSizes={[10, 20, 30]}
					title="Dynamic List Test"
				/>
			</Container>
		);
	}

	private buildEditor = () => (
		<Container id="editorExample">
			<Editor />
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
						style={{
							color: 'white',
							backgroundColor: 'blue'
						}}
						text="Text Label #5 (inline style)"
					/>
				</p>

				<Label text="xxsmall" sizing={Sizing.xxsmall} /><br/>
				<Label text="xsmall" sizing={Sizing.xsmall} /><br/>
				<Label text="small" sizing={Sizing.small} /><br/>
				<Label text="normal" sizing={Sizing.normal} /><br/>
				<Label text="large" sizing={Sizing.large} /><br/>
				<Label text="xlarge" sizing={Sizing.xlarge} /><br/>
				<Label text="xxlarge" sizing={Sizing.xxlarge} /><br/>

			</div>
		</Container>
	);

	private buildListItemWithHeader = () => (
		<Container id="listExample1">

			<div className="selectBox">
				<Select
					name="size-selection"
					value={this.state.sizingOption}
					options={sizingOptions}
					onChange={(val: any) => {
						if (val != null) {
							this.setState({sizingOption: val.value});
						}
					}}
					sizing={Sizing.small}
					/>
					<br/><br/>
			</div>

			<List alternating sizing={this.state.sizingOption}>
				<ListHeader
					leftButton={<ButtonDialog iconName="bars"><div>header dialog</div><br/></ButtonDialog>}
					noedit
					rightButton={<Button iconName="plus" />}
					title={`Demo List Header (${this.state.sizingOption})`}
					/>
				<ListItem
					id="1"
					title="List Item 1" widget="12"
					leftButton={<Button iconName="podcast"/>}
					rightButton={<Button iconName="paper-plane-o"/>}
					/>
				<ListItem
					id="2"
					title="List Item 2 (with icon)"
					widget="13"
					leftButton={<Icon iconName="bolt" />}
					rightButton={<Button />}
					/>
				<ListItem
					id="3"
					title="List Item 3 (with hidden icon)"
					widget="14"
					leftButton={<Icon iconName="car" />}
					hiddenLeftButton
					/>
				<ListDivider />
				<ListItem
					id="4"
					title="List Item 4a (hide/show)" widget="15"
					leftButton={<Button />}
					hiddenLeftButton
					rightButton={
						<ButtonCircle
							iconName="times"
							style={{
								color: 'red',
								borderColor: 'red'
							}}
						/>
					}
					hiddenRightButton
					/>
				<ListItem
					id="5"
					title="List Item 4b (hide/show)" widget="15"
					hiddenLeftButton
					leftButton={
						<ButtonDialog iconName="wrench">Test Dialog Button</ButtonDialog>
					}
					hiddenRightButton
					rightButton={
						<Button iconName="times" style={{color: 'red'}} />
					}
					/>
				<ListItem id="6" title="List Item 5" />
				<ListItem
					id="7"
					title="List Item 6 (Toggle)" widget="15"
					rightButton={
						<ButtonToggle iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358" />
					}
					/>
				<ListItem id="7" title="List Item 7 (disabled)" disabled />
				<ListItem
					id="8" title="List Item 8 (disabled w/ buttons)"
					disabled
					rightButton={
						<Button />
					}
					/>
				<ListItem
					id="9"
					title="List Item 9 (stacked)"
					widget="stacked bottom widget"
					stacked
					rightButton={<Button />}
					/>
				<ListItem
					id="10"
					noripple
					title="List Item 10 (noripple edit)"
					/>
				<ListItem
					id="11"
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

	private buildOption = () => (
		<Container id="optionExample">
			<Option optionType={OptionType.square} />
			<Option
				onClick={(val: boolean) => {
					debug('clicked option, flag: %o', val);
				}}
				optionType={OptionType.square}
				selected
				text="square"
			/>
			<br/>

			<Option type={OptionType.squareFilled} />
			<Option selected text="squareFilled" optionType={OptionType.squareFilled} />
			<br/>

			<Option type={OptionType.squareReverse} />
			<Option selected text="squareReverse" optionType={OptionType.squareReverse} />
			<br/>

			<Option type={OptionType.circle} />
			<Option selected text="circle" optionType={OptionType.circle} />
			<br/>

			<Option type={OptionType.circleFilled} />
			<Option selected text="circleFilled" optionType={OptionType.circleFilled} />
			<br/>

			<Option type={OptionType.circleReverse} />
			<Option selected text="circleReverse" optionType={OptionType.circleReverse} />
			<br/>

			<Option type={OptionType.times} />
			<Option selected text="times" optionType={OptionType.times} />
			<br/>

			<Option type={OptionType.timesReverse} />
			<Option selected text="timesReverse" optionType={OptionType.timesReverse} />
			<br/>

			<Option type={OptionType.dot} />
			<Option selected text="dot" optionType={OptionType.dot} />
			<br/>

			<Option type={OptionType.star} />
			<Option selected text="star" optionType={OptionType.star} /><br/>
			<br/>

			<Option text="colored" optionType={OptionType.square} style={{color: 'blue'}} /><br/>
			<Option text="colored" optionType={OptionType.square} style={{color: 'yellow', backgroundColor: 'black'}} /><br/>
			<br/>

			<Option text="xxsmall" sizing={Sizing.xxsmall} /><br/>
			<Option text="xsmall" sizing={Sizing.xsmall} /><br/>
			<Option text="small" sizing={Sizing.small} /><br/>
			<Option text="normal" sizing={Sizing.normal} /><br/>
			<Option text="large" sizing={Sizing.large} /><br/>
			<Option text="xlarge" sizing={Sizing.xlarge} /><br/>
			<Option text="xxlarge" sizing={Sizing.xxlarge} /><br/>

		</Container>
	)

	private buildPager = () => (
		<Container id="pagerExample">

			<h3>small</h3>
			<div className="pagerBox">
				<Pager
					initialPage="1"
					totalItems="299"
					sizing={Sizing.small}
					onSelect={
						(page: number) => {
							console.log(`Clicked on page: ${page}`);
						}
					}
				/>
			</div>

			<h3>normal</h3>
			<div className="pagerBox">
				<Pager
					initialPage="1"
					totalItems="299"
					sizing={Sizing.normal}
					onSelect={
						(page: number) => {
							console.log(`Clicked on page: ${page}`);
						}
					}
				/>
			</div>

			<h3>large</h3>
			<div className="pagerBox">
				<Pager
					initialPage="1"
					totalItems="299"
					sizing={Sizing.large}
					onSelect={
						(page: number) => {
							console.log(`Clicked on page: ${page}`);
						}
					}
					useinputs
				/>
			</div>

			<h3>xlarge</h3>
			<div className="pagerBox">
				<Pager
					initialPage="1"
					totalItems="299"
					sizing={Sizing.xlarge}
					onSelect={
						(page: number) => {
							console.log(`Clicked on page: ${page}`);
						}
					}
				/>
			</div>

			<h3>normal, large range, with sort</h3>
			<div className="pagerBox">
				<Pager
					initialPage="1"
					pagesToDisplay="5"
					totalItems="30000"
					pageSizes={[25, 50, 100, 500, 1000]}
					onSelect={
						(page: number) => {
							console.log(`Clicked on page: ${page}`);
						}
					}
					onSort={
						(sortOrder: any) => {
							if (sortOrder === SortOrder.ascending) {
								console.log(`Sorting pager in ascending`);
							} else {
								console.log(`Sorting pager in descending`);
							}
						}
					}
					useinput
				/>
			</div>

			<h3>normal, disabled</h3>
			<div className="pagerBox">
				<Pager
					disabled={true}
					initialPage="1"
					totalItems="299"
					sizing={Sizing.normal}
					onSelect={
						(page: number) => {
							console.log(`Clicked on page: ${page}`);
						}
					}
				/>
			</div>

		</Container>
	);

	private buildSelect = () => (
		<Container id="selectExample">
			<div className="selectBox">
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
					sizing={Sizing.small}
					/>
			</div>

			<div className="selectBox">
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
					sizing={Sizing.normal}
					/>
			</div>
		</Container>
	);

	private buildSwitch = () => (
		<Container id="switchExample">

			<h3>xxsmall</h3>
			<Switch sizing={Sizing.xxsmall}/>
			<Switch initialToggle={true} sizing={Sizing.xxsmall} switchType={SwitchType.inny}/>
			<br />

			<h3>xsmall</h3>
			<Switch sizing={Sizing.xsmall}/>
			<Switch initialToggle={true} sizing={Sizing.xsmall} switchType={SwitchType.inny}/>
			<br />

			<h3>small</h3>
			<Switch sizing={Sizing.small}/>
			<Switch initialToggle={true} sizing={Sizing.small} switchType={SwitchType.inny}/>
			<br />

			<h3>normal</h3>
			<Switch
				onClick={(toggle: boolean) => {
					debug(`Switch toggle (outy): ${toggle ? 'on' : 'off'}`);
				}}
				switchType={SwitchType.outy}
			/>
			<Switch
				initialToggle={true}
				onClick={(toggle: boolean) => {
					debug(`Switch toggle (inny): ${toggle ? 'on' : 'off'}`);
				}}
				switchType={SwitchType.inny}
			/>
			<br />

			<h3>large</h3>
			<Switch sizing={Sizing.large}/>
			<Switch initialToggle={true} sizing={Sizing.large} switchType={SwitchType.inny}/>
			<br />

			<h3>xlarge</h3>
			<Switch sizing={Sizing.xlarge}/>
			<Switch initialToggle={true} sizing={Sizing.xlarge} switchType={SwitchType.inny}/>
			<br />

			<h3>xxlarge</h3>
			<Switch sizing={Sizing.xxlarge}/>
			<Switch initialToggle={true} sizing={Sizing.xxlarge} switchType={SwitchType.inny}/>
			<br />

			<h3>normal, disabled</h3>
			<Switch disabled/>
			<Switch initialToggle={true} disabled switchType={SwitchType.inny}/>
			<br />

		</Container>
	);

	private buildTabs = () => {

		const close = (tab: any) => {
			debug(`closing tab: ${tab.props['id']}`);
		};

		return (
			<Container id="tabControl">
				<h3>Top</h3>
				<TabContainer maxTabs={5}>
					<Tab title="tab #1" onClose={close}>#1<br/><br/>{randomText}</Tab>
					<Tab title="tab #2" onClose={close}>#2<br/><br/>{randomText}</Tab>
					<Tab title="tab #3" onClose={close}>#3<br/><br/>{randomText}</Tab>
					<Tab title="tab #4" onclose={close}>#4<br/><br/>{randomText}</Tab>
					<Tab title="tab #5" onclose={close}>#5<br/><br/>{randomText}</Tab>
					<Tab title="tab #6" onclose={close}>#6<br/><br/>{randomText}</Tab>
				</TabContainer>
				<br/>

				<h3>Left</h3>
				<TabContainer maxTabs={3} location={Location.left}>
					<Tab title="tab #1">#1<br/><br/>{randomText}</Tab>
					<Tab title="tab #2">#2<br/><br/>{randomText}</Tab>
					<Tab title="tab #3">#3<br/><br/>{randomText}</Tab>
					<Tab title="tab #4">#4<br/><br/>{randomText}</Tab>
				</TabContainer>
				<br/>

				<h3>Bottom (no navigation)</h3>
				<TabContainer maxTabs={3} location={Location.bottom} nonavigation>
					<Tab title="tab #1">#1<br/><br/>{randomText}</Tab>
					<Tab title="tab #2">#2<br/><br/>{randomText}</Tab>
					<Tab title="tab #3">#3<br/><br/>{randomText}</Tab>
					<Tab title="tab #4">#4<br/><br/>{randomText}</Tab>
				</TabContainer>
				<br/>

				<h3>Right (no navigation, onSelect)</h3>
				<TabContainer
					maxTabs={3}
					location={Location.right}
					nonavigation
					onRemove={(tab: any) => {
						debug(`removing %o (id=${tab.props['id']})`, tab);
					}}
					onSelect={(tab: any, previous: any) => {
						debug(`new: %o (id=${tab.props['id']}), old: %o (id=${previous.props['id']})`, tab, previous);
					}}
				>
					<p>Bad tab type to be ignored</p>
					<Tab title="tab #1">#1<br/><br/>{randomText}</Tab>
					<Tab title="tab #2">#2<br/><br/>{randomText}</Tab>
					<Tab title="tab #3">#3<br/><br/>{randomText}</Tab>
					<Tab title="tab #4">#4<br/><br/>{randomText}</Tab>
				</TabContainer>
				<br />

				<h3>Disabled Tab within container</h3>
				<TabContainer location={Location.bottom}>
					<Tab title="tab #1" disabled>#1<br/><br/>{randomText}</Tab>
					<Tab title="tab #2">#2<br/><br/>{randomText}</Tab>
					<Tab title="tab #3">#3<br/><br/>{randomText}</Tab>
					<Tab title="tab #4">#4<br/><br/>{randomText}</Tab>
				</TabContainer>
				<br/>

				<h3>Disabled Container</h3>
				<TabContainer disabled location={Location.bottom}>
					<Tab title="tab #1">#1<br/><br/>{randomText}</Tab>
					<Tab title="tab #2">#2<br/><br/>{randomText}</Tab>
					<Tab title="tab #3">#3<br/><br/>{randomText}</Tab>
					<Tab title="tab #4">#4<br/><br/>{randomText}</Tab>
				</TabContainer>
				<br/>

			</Container>
		);
	};

	private buildTagList = () => (
		<Container id="tagListExample">

			<h3>Static</h3>
			<TagList tags={['one', 'two', 'three']} />
			<br/><br/>

			<h3>Changeable (no sorting)</h3>
			<TagList nosort tags={['one', 'two', 'three']} useinput />
			<br/><br/>

			<h3>Changeable (sorted)</h3>
			<TagList tags={['one', 'two', 'three']} useinput />
			<br/><br/>

			<h3>Disabled</h3>
			<TagList disabled tags={['one', 'two', 'three']} useinput />

		</Container>
	);

	private buildTextField = () => (
		<Container id="textfieldExample">

			<h3>Validation of Max (10) & Min (5) Length</h3>
			<TextField
				placeholder="validation"
				minLength="5"
				maxLength="10"
				usevalidation
				/>

			<h3>Validation of Email</h3>
			<TextField
				placeholder="email validation"
				type="email"
				usevalidation
				/>

			<h3>Validation of URL</h3>
			<TextField
				placeholder="url validation"
				type="url"
				usevalidation
				/>

			<h3>Validation with custom alphanumeric</h3>
			<TextField
				placeholder="custom"
				usevalidation
				validators={[
					new Validator(
						(value: string) => {
							return /^[0-9a-zA-Z]+$/.test(value);
						},
						'Not alphanumeric only',
						'Contains only alphanumeric'
					)
				]}
			/>

			<h3>Disabled TextField</h3>
			<TextField type="text" placeholder="disabled" disabled /><br />

			<h3>Sizing</h3>
			<TextField type="text" size="10" sizing={Sizing.xxsmall} placeholder="xxsmall" /><br/><br/>
			<TextField type="text" size="10" sizing={Sizing.xsmall} placeholder="xsmall" /><br/><br/>
			<TextField type="text" size="10" sizing={Sizing.small} placeholder="small" /><br/><br/>
			<TextField type="text" size="10" sizing={Sizing.normal} placeholder="normal" /><br/><br/>
			<TextField type="text" size="10" sizing={Sizing.large} placeholder="large" /><br/><br/>
			<TextField type="text" size="10" sizing={Sizing.xlarge} placeholder="xlarge" /><br/><br/>
			<TextField type="text" size="10" sizing={Sizing.xxlarge} placeholder="xxlarge" /><br/>
		</Container>
	);

	private buildTitle = () => (
		<Container id="titleExample">
			<h3>Layouts</h3>
			<Title widget="widget" layout={TitleLayout.quarter} title="quarter" /><br/>
			<Title widget="widget" layout={TitleLayout.third} title="third" /><br/>
			<Title widget="widget" layout={TitleLayout.even} title="even" /><br/>
			<Title widget="widget" layout={TitleLayout.threequarter} title="three quarter" /><br/>
			<Title widget="widget" layout={TitleLayout.stacked} title="stacked" /><br/>
			<Title widget="widget" layout={TitleLayout.dominant} title="dominant" /><br/>
			<Title layout={TitleLayout.none} title="title only" /><br />
			<Title widget="widget" title="disabled" disabled /><br />
			<br/>

			<h3>Sizes</h3>
			<Title widget="widget" layout={TitleLayout.even} sizing={Sizing.xxsmall} title="xxsmall" /><br/>
			<Title widget="widget" layout={TitleLayout.even} sizing={Sizing.xsmall} title="xsmall" /><br/>
			<Title widget="widget" layout={TitleLayout.even} sizing={Sizing.small} title="small" /><br/>
			<Title widget="widget" layout={TitleLayout.even} sizing={Sizing.normal} title="normal" /><br/>
			<Title widget="widget" layout={TitleLayout.even} sizing={Sizing.large} title="large" /><br/>
			<Title widget="widget" layout={TitleLayout.even} sizing={Sizing.xlarge} title="xlarge" /><br/>
			<Title widget="widget" layout={TitleLayout.even} sizing={Sizing.xxlarge} title="xxlarge" /><br/>
			<br/>

		</Container>
	)

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
					show={this.state.toastVisible1}
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
					show={this.state.toastVisible2}
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
					show={this.state.toastVisible3}
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
					show={this.state.toastVisible4}
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
					show={this.state.toastVisible5}
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
					onClose={() => this.setState({toastVisible6: false})}
					sizing={Sizing.small}
					style={{
						backgroundColor: '#7fbf3f',
						borderColor: '#3fbfbf',
						color: 'magenta'
					}}
					type={ToastType.persistent}
					show={this.state.toastVisible6}
				>
					This is a sample custom message
				</Toast>
			</div>
		</Container>
	);

	private buildToolbar = () => (
		<Container id="toolbarExample">

			<h3>Left Justify</h3>
			<Toolbar justify={Justify.left} >
				<Button iconName="car" />
				<ButtonCircle iconName="times" />
				<ButtonDialog iconName="bars">Test Text</ButtonDialog>
				<Divider />
				<ButtonText text="btext" iconName="fighter-jet" />
				<ButtonToggle iconNameOn="star" iconNameOff="star-o" fgColorOn="red" fgColorOff="green" />
				<Option optionType={OptionType.dot} text="test" />
				<Switch />
				<TextField placeholder='test' size={4} maxLength={4} />
			</Toolbar>
			<br/>

			<h3>Center Justify</h3>
			<Toolbar justify={Justify.center} >
				<Button iconName="car" />
				<ButtonCircle iconName="times" />
				<ButtonDialog iconName="bars">Test Text</ButtonDialog>
				<Divider />
				<ButtonText text="btext" iconName="fighter-jet" />
				<ButtonToggle iconNameOn="star" iconNameOff="star-o" fgColorOn="red" fgColorOff="green" />
				<Option optionType={OptionType.dot} text="test" />
				<Switch />
				<TextField placeholder='test' size={4} maxLength={4} />
			</Toolbar>
			<br/>

			<h3>Right Justify</h3>
			<Toolbar justify={Justify.right} >
				<Button iconName="car" />
				<ButtonCircle iconName="times" />
				<ButtonDialog iconName="bars">Test Text</ButtonDialog>
				<Divider />
				<ButtonText text="btext" iconName="fighter-jet" />
				<ButtonToggle iconNameOn="star" iconNameOff="star-o" fgColorOn="red" fgColorOff="green" />
				<Option optionType={OptionType.dot} text="test" />
				<Switch />
				<TextField placeholder='test' size={4} maxLength={4} />
			</Toolbar>
			<br/>

			<h3>Center Justify Diabled</h3>
			<Toolbar justify={Justify.center} disabled >
				<Button iconName="car" />
				<ButtonCircle iconName="times" />
				<ButtonDialog iconName="bars">Test Text</ButtonDialog>
				<ButtonText text="btext" iconName="fighter-jet" />
				<ButtonToggle iconNameOn="star" iconNameOff="star-o" fgColorOn="red" fgColorOff="green" />
				<Option optionType={OptionType.dot} text="test" />
				<Switch />
				<TextField placeholder='test' size={4} maxLength={4} />
			</Toolbar>
			<br/>

			<h3>Center Justify xsmall</h3>
			<Toolbar justify={Justify.center} sizing={Sizing.small} >
				<Button iconName="car" />
				<ButtonCircle iconName="times" />
				<ButtonDialog iconName="bars">Test Text</ButtonDialog>
				<ButtonText text="btext" iconName="fighter-jet" />
				<ButtonToggle iconNameOn="star" iconNameOff="star-o" fgColorOn="red" fgColorOff="green" />
				<Option optionType={OptionType.dot} text="test" />
				<Switch />
				<TextField placeholder='test' size={4} maxLength={4} />
			</Toolbar>
			<br/>

		</Container>
	);

	private buildTooltip = () => (
		<Container id="tooltipExample">
			<h3>Simple</h3>
			Hover over each square to see the Tooltip.<br/><br/><br/>
			<div id="tooltipContainer">
				<div className="tooltipCell topLeft">
					topLeft
					<Tooltip location={Location.topLeft}>{randomText}</Tooltip>
				</div>

				<div className="tooltipCell top">
					top
					<Tooltip location={Location.top}>{randomText}</Tooltip>
				</div>

				<div className="tooltipCell topRight">
					topRight
					<Tooltip location={Location.topRight}>{randomText}</Tooltip>
				</div>

				<div className="tooltipCell middleLeft">
					middleLeft
					<Tooltip location={Location.middleLeft}>{randomText}</Tooltip>
				</div>

				<div className="tooltipCell middle inactive">N/A</div>

				<div className="tooltipCell middleRight">
					middleRight
					<Tooltip location={Location.middleRight}>{randomText}</Tooltip>
				</div>

				<div className="tooltipCell bottomLeft">
					bottomLeft
					<Tooltip location={Location.bottomLeft}>{randomText}</Tooltip>
				</div>

				<div className="tooltipCell bottom">
					bottom
					<Tooltip location={Location.bottom}>{randomText}</Tooltip>
				</div>

				<div className="tooltipCell bottomRight">
					bottomRight
					<Tooltip location={Location.bottomRight}>{randomText}</Tooltip>
				</div>
			</div>

			<h3>Custom style</h3>
			Hover over the square to see the custom style colors on the tooltip
			<div id="tooltipStyleExample">
				<Tooltip
					location={Location.middleRight}
					style={{
						color: '#fd7400',
						backgroundColor: '#004358'
					}}
				>
					{randomText}
				</Tooltip>
			</div>

		</Container>
	);

	private buildTriangles = () => (
		<Container id="triangleExample">
			<h3>xxsmall</h3>
			<Triangle sizing={Sizing.xxsmall} direction={Direction.up} />
			<Triangle sizing={Sizing.xxsmall} direction={Direction.right} />
			<Triangle sizing={Sizing.xxsmall} direction={Direction.down} />
			<Triangle sizing={Sizing.xxsmall} direction={Direction.left} />

			<h3>xsmall</h3>
			<Triangle sizing={Sizing.xsmall} direction={Direction.up} style={{fill: 'red', stroke: 'red'}} />
			<Triangle sizing={Sizing.xsmall} direction={Direction.right} style={{fill: 'red', stroke: 'red'}} />
			<Triangle sizing={Sizing.xsmall} direction={Direction.down} style={{fill: 'red', stroke: 'red'}} />
			<Triangle sizing={Sizing.xsmall} direction={Direction.left} style={{fill: 'red', stroke: 'red'}} />

			<h3>small</h3>
			<Triangle sizing={Sizing.small} direction={Direction.up} style={{fill: 'black', stroke: 'yellow'}} />
			<Triangle sizing={Sizing.small} direction={Direction.right} style={{fill: 'black', stroke: 'yellow'}} />
			<Triangle sizing={Sizing.small} direction={Direction.down} style={{fill: 'black', stroke: 'yellow'}} />
			<Triangle sizing={Sizing.small} direction={Direction.left} style={{fill: 'black', stroke: 'yellow'}} />

			<h3>normal</h3>
			<Triangle sizing={Sizing.normal} direction={Direction.up} style={{fill: 'blue', stroke: 'green'}} />
			<Triangle sizing={Sizing.normal} direction={Direction.right} style={{fill: 'blue', stroke: 'green'}} />
			<Triangle sizing={Sizing.normal} direction={Direction.down} style={{fill: 'blue', stroke: 'green'}} />
			<Triangle sizing={Sizing.normal} direction={Direction.left} style={{fill: 'blue', stroke: 'green'}} />

			<h3>large</h3>
			<Triangle sizing={Sizing.large} direction={Direction.up} />
			<Triangle sizing={Sizing.large} direction={Direction.right} />
			<Triangle sizing={Sizing.large} direction={Direction.down} />
			<Triangle sizing={Sizing.large} direction={Direction.left} />

			<h3>xlarge</h3>
			<Triangle sizing={Sizing.xlarge} direction={Direction.up} />
			<Triangle sizing={Sizing.xlarge} direction={Direction.right} />
			<Triangle sizing={Sizing.xlarge} direction={Direction.down} />
			<Triangle sizing={Sizing.xlarge} direction={Direction.left} />

			<h3>xxlarge</h3>
			<Triangle sizing={Sizing.xxlarge} direction={Direction.up} />
			<Triangle sizing={Sizing.xxlarge} direction={Direction.right} />
			<Triangle sizing={Sizing.xxlarge} direction={Direction.down} />
			<Triangle sizing={Sizing.xxlarge} direction={Direction.left} />
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

				<h1>Dialog Box</h1>
				{this.buildDialogBox()}

				<h1>Dynamic List</h1>
				{this.buildDynamicList()}

				<h1>Editor</h1>
				{this.buildEditor()}

				<h1>Labels</h1>
				{this.buildLabels()}

				<h1>List/ListItem (with header)</h1>
				{this.buildListItemWithHeader()}

				<h1>List/ListItem (without header)</h1>
				{this.buildListItemWithoutHeader()}

				<h1>Option</h1>
				{this.buildOption()}

				<h1>Pager</h1>
				{this.buildPager()}

				<h1>Select</h1>
				{this.buildSelect()}

				<h1>Switch</h1>
				{this.buildSwitch()}

				<h1>Tabs</h1>
				{this.buildTabs()}

				<h1>TagList</h1>
				{this.buildTagList()}

				<h1>TextField</h1>
				{this.buildTextField()}

				<h1>Title</h1>
				{this.buildTitle()}

				<h1>Toast</h1>
				{this.buildToast()}

				<h1>Toolbar</h1>
				{this.buildToolbar()}

				<h1>Tooltip</h1>
				{this.buildTooltip()}

				<h1>Triangle</h1>
				{this.buildTriangles()}

			</div>
		);
	}
}

render(
	<App />,
	document.getElementById('root')
);
