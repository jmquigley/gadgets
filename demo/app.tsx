import autobind from 'autobind-decorator';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as loremIpsum from 'lorem-ipsum';
import * as React from 'react';
import {render} from 'react-dom';
import {sprintf} from 'sprintf-js';
import {join} from 'util.join';
import {getUUID} from 'util.toolbox';

import DemoAccordion from './src/DemoAccordion';
import DemoBadge from './src/DemoBadge';
import DemoBrowser from './src/DemoBrowser';
import DemoButtons from './src/DemoButtons';
import DemoDialogBox from './src/DemoDialogBox';
import DemoDropdown from './src/DemoDropdown';

const debug = require('debug')('app');

//
// This is not how the components would typically be included within an
// electron app.  This is kind of a "hack" to allow the demo app and the
// library code to coexist.  Typically they would be imported using
// CommonJS import.
//

const {
	Button,
	ButtonCircle,
	ButtonDialog,
	ButtonText,
	ButtonToggle,
	Container,
	Direction,
	Divider,
	DividerType,
	Dropdown,
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
	OptionGroup,
	OptionType,
	Pager,
	Select,
	Sizing,
	Slider,
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
	Toolbar,
	Tooltip,
	Triangle,
	Validator
} = require('../dist/bundle');

debug('cwd: %s', process.cwd());
const markdown: string = fs.readFileSync(join(process.cwd(), 'demo', 'samples', 'markdown.md'), 'utf8');

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
	dynamicItems[`item ${sprintf('%04d', i)}`] = {
		left: <Option optionType={OptionType.star} />,
		right: `w${i}`
	};
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
	sizing: any;

	dynamicListError: string;
	items: any;
	toastVisible1: boolean;
	toastVisible2: boolean;
	toastVisible3: boolean;
	toastVisible4: boolean;
	toastVisible5: boolean;
	toastVisible6: boolean;
	selectOption: string;
	selectToggle: boolean;
	sizingOption: string;
	sliderToggle: boolean;
}

class App extends React.Component<AppProps, AppState> {

	constructor(props: AppProps) {
		super(props);
		this.state = {
			sizing: Sizing.normal,

			dynamicListError: '',
			items: dynamicItems,
			toastVisible1: true,
			toastVisible2: true,
			toastVisible3: true,
			toastVisible4: true,
			toastVisible5: true,
			toastVisible6: true,
			selectOption: selectOptions[0].value,
			selectToggle: false,
			sizingOption: sizingOptions[3].value,
			sliderToggle: false
		};

		/* (window as any).state = this.state;*/
	}

	@autobind
	private buildDynamicListHandleSelection(toggle: boolean, title: string) {
		this.setState({
		   selectToggle: toggle
		}), () => {
			debug('%s to %o, %O', title, toggle, this.state);
		};
	}

	private buildDynamicList = () => (
			<Container id="dynamicListExample">
				<DynamicList
					errorMessage={this.state.dynamicListError}
					items={this.state.items}
					layout={TitleLayout.dominant}
					noselect={this.state.selectToggle}
					onDelete={(title: string) => {
						const items = {...this.state.items};
						delete items[title];
						this.setState({
							items: items
						});
					}}
					onError={() => {
						this.setState({dynamicListError: ''});
					}}
					onNew={(title: string, widget: any) => {
						if (widget == null) {
							widget = {
								left: <Option optionType={OptionType.star} />,
								right: `w0`
							};
						}

						this.setState({
							items: {...this.state.items, [title]: widget}
						});
					}}
					onUpdate={(previous: string, title: string) => {
						const widget = this.state.items[previous];
						this.setState({
							items: _.omit({...this.state.items, [title]: widget}, previous)
						});
					}}
					pageSizes={[10, 20, 30]}
					title="Dynamic List Test"
				/>
				<br />

				<div className="toastBox">
					<Button iconName="bomb"
						onClick={() => {
							this.setState({
								dynamicListError: 'Dynamic List Error Message Test'
							})
						}}
					/>
					<p>Click to show error message test</p>
				</div>

				<div className="toastBox">
					<Button iconName="bomb"
						onClick={() => {
							let dynamicItems = {}

							for (let [title, widget] of Object.entries(this.state.items)) {

								if (widget == null) {
									widget = {
										left: <Option optionType={OptionType.star} />,
										right: 'a0'
									};
								} else {
									widget['right'] = widget['right'].replace('w', 'a');
								}

								dynamicItems[title] = widget;
							}

							this.setState({
								items: dynamicItems
							});
						}}
					/>
					<p>Click to change list of widget items (change w to a)</p>
				</div>
				<Option
					onClick={this.buildDynamicListHandleSelection}
					text="Toggle selection mode (on turns off selection)"
				/>
		</Container>
	);

	private buildEditor = () => (
		<Container id="editorExample">
			<Editor content={markdown} scheme={{bold: "red"}} />
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

			<Dropdown
				defaultVal="normal"
				items={sizingOptions}
				onSelect={(val: any) => {
					if (val != null) {
						debug('select sizing: %o', val);
						this.setState({sizingOption: val});
					}
				}}
			/>
			<br /><br/>

			<List alternating sizing={this.state.sizingOption}>
				<ListHeader
					leftButton={<ButtonDialog iconName="bars"><div>header dialog</div><br/></ButtonDialog>}
					noedit
					rightButton={<Button iconName="plus" />}
					title={`Demo List Header (${this.state.sizingOption})`}
					/>
				<ListItem
					title="List Item 1" widget="12"
					leftButton={<Button iconName="podcast"/>}
					rightButton={<Button iconName="paper-plane-o"/>}
					/>
				<ListItem
					title="List Item 2 (with icon)"
					widget="13"
					leftButton={<Icon iconName="bolt" />}
					rightButton={<Button />}
					/>
				<ListItem
					title="List Item 3 (with hidden icon)"
					widget="14"
					leftButton={<Icon iconName="car" />}
					hiddenLeftButton
					/>
				<ListDivider />
				<ListItem
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
				<ListItem title="List Item 5" />
				<ListItem
					title="List Item 6 (Toggle)" widget="15"
					rightButton={
						<ButtonToggle iconNameOn="star" iconNameOff="star-o" fgColorOn="#ffe11a" fgColorOff="#004358" />
					}
					/>
				<ListItem title="List Item 7 (disabled)" disabled />
				<ListItem
					title="List Item 8 (disabled w/ buttons)"
					disabled
					rightButton={
						<Button />
					}
					/>
				<ListItem
					title="List Item 9 (stacked)"
					widget="stacked bottom widget"
					stacked
					rightButton={<Button />}
					/>
				<ListItem
					noripple
					title="List Item 10 (noripple edit)"
					/>
				<ListItem
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

	@autobind
	private buildOptionHandleClick(val: boolean, text: string) {
		debug('clicked option, flag: %o, text: %o', val, text);
	}

	private buildOption = () => (
		<Container id="optionExample">
			<Option optionType={OptionType.square} />
			<Option
				onClick={this.buildOptionHandleClick}
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

			<Option disabled text="disabled" optionType={OptionType.square} /><br/>
			<br/>

			<Option text="xxsmall" sizing={Sizing.xxsmall} /><br/>
			<Option text="xsmall" sizing={Sizing.xsmall} /><br/>
			<Option text="small" sizing={Sizing.small} /><br/>
			<Option text="normal" sizing={Sizing.normal} /><br/>
			<Option text="large" sizing={Sizing.large} /><br/>
			<Option text="xlarge" sizing={Sizing.xlarge} /><br/>
			<Option text="xxlarge" sizing={Sizing.xxlarge} /><br/>

		</Container>
	);

	private buildOptionGroup = () => (
		<Container id="optionGroupExample">
			<OptionGroup
 				default="option1"
				onSelect={(text: string, toggle: boolean) => debug('option group item: %o, %o', text, toggle)}
				options={[
					'option1',
					'option2',
					'option3',
					'option4 this is a longer string'
				]}
				title="test options"
			/>
		</Container>
	);

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
		</Container>
	);

	@autobind
	private buildSliderHandleSelection(toggle: boolean, title: string) {
		this.setState({
		   sliderToggle: toggle
		}), () => {
			debug('%s to %o, %O', title, toggle, this.state);
		};
	}

	@autobind
	private handleSliderDebug(val: any) {
		debug('slider select: %o', val);
	}

	private buildSlider = () => (
		<Container id="sliderExample">

			<h3>Normal slider control, range 0 - 100, toggle snap</h3>
			<Slider
				onSelect={this.handleSliderDebug}
				scale={2}
				snap={this.state.sliderToggle}
				ticks={5}
			/>

			<Option
				onClick={this.buildSliderHandleSelection}
				text="Toggle snap mode on/off"
			/>
			<br/><br/>

			<h3>Normal slider, no ticks, range 0 - 100</h3>
			<Slider
				onSelect={this.handleSliderDebug}
				scale={2}
			/>
			<br/>

			<h3>Disabled slider</h3>
			<Slider
				disabled
				onSelect={this.handleSliderDebug}
				scale={2}
				ticks={5}
			/>
			<br/>

			<h3>xxsmall</h3>
			<Slider scale={3} sizing={Sizing.xxsmall} ticks={3} />

			<h3>xsmall</h3>
			<Slider scale={3} sizing={Sizing.xsmall} ticks={3} />

			<h3>small</h3>
			<Slider scale={3} sizing={Sizing.small} ticks={3} />

			<h3>large</h3>
			<Slider scale={3} sizing={Sizing.large} ticks={3} />

			<h3>xlarge</h3>
			<Slider scale={3} sizing={Sizing.xlarge} ticks={3} />

			<h3>xxlarge</h3>
			<Slider scale={3} sizing={Sizing.xxlarge} ticks={3} />

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
			<TagList nosort tags={['aaa', 'ccc', 'bbb']} useinput />
			<br/><br/>

			<h3>Changeable (sorted)</h3>
			<TagList tags={['aaa', 'ccc', 'bbb']} useinput />
			<br/><br/>

			<h3>Disabled</h3>
			<TagList disabled tags={['one', 'two', 'three']} useinput />

		</Container>
	);

	private buildTextField = () => (
		<Container id="textfieldExample">

			<h3>Validation of Max (10) & Min (5) Length</h3>
			<TextField
				id="tf-validation"
				maxLength="10"
				minLength="5"
				placeholder="validation"
				tooltip="Enter text with length greather than 5 and less than 10"
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

			<h3>Search text field</h3>
			<TextField
				placeholder="search"
				style={{
					width: '11em'
				}}
				type="text"
				useclear
			/>

			<h3>Disabled TextField</h3>
			<TextField type="text" placeholder="disabled" disabled /><br />

			<h3>Disabled TextFiled with search</h3>
			<TextField type="text" placeholder="disabled" disabled useclear/><br />

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
					decay={false}
					level={ToastLevel.info}
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
					decay={false}
					level={ToastLevel.error}
					onClose={() => this.setState({toastVisible5: false})}
					show={this.state.toastVisible5}
					usebottom
				>
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
					decay={false}
					level={ToastLevel.custom}
					onClose={() => this.setState({toastVisible6: false})}
					sizing={Sizing.small}
					style={{
						backgroundColor: '#7fbf3f',
						borderColor: '#3fbfbf',
						color: 'magenta'
					}}
					show={this.state.toastVisible6}
				>
					This is a sample custom message
				</Toast>
			</div>
		</Container>
	);

	private buildToolbar = () => (
		<Container id="toolbarExample">

			<h3>Left Justify space divider chevron</h3>
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
				<Dropdown
					defaultVal="idstr1"
					items={[
						{val: 'idstr1', label: 'lstr1'},
						{val: 'idstr2', label: 'lstr2'},
						{val: 'idstr3', label: 'lstr3'}
					]}
				/>
			</Toolbar>
			<br/>

			<h3>Center Justify vertical divider chevron</h3>
			<Toolbar justify={Justify.center} >
				<Button iconName="car" />
				<ButtonCircle iconName="times" />
				<ButtonDialog iconName="bars">Test Text</ButtonDialog>
				<Divider dividerType={DividerType.vertical}/>
				<ButtonText text="btext" iconName="fighter-jet" />
				<ButtonToggle iconNameOn="star" iconNameOff="star-o" fgColorOn="red" fgColorOff="green" />
				<Option optionType={OptionType.dot} text="test" />
				<Switch />
				<TextField placeholder='test' size={4} maxLength={4} />
				<Dropdown
					defaultVal="idstr1"
					items={[
						{val: 'idstr1', label: 'lstr1'},
						{val: 'idstr2', label: 'lstr2'},
						{val: 'idstr3', label: 'lstr3'}
					]}
				/>
			</Toolbar>
			<br/>

			<h3>Right Justify horizontal divider chevron</h3>
			<Toolbar justify={Justify.right} >
				<Button iconName="car" />
				<ButtonCircle iconName="times" />
				<ButtonDialog iconName="bars">Test Text</ButtonDialog>
				<Divider dividerType={DividerType.horizontal}/>
				<ButtonText text="btext" iconName="fighter-jet" />
				<ButtonToggle iconNameOn="star" iconNameOff="star-o" fgColorOn="red" fgColorOff="green" />
				<Option optionType={OptionType.dot} text="test" />
				<Switch />
				<TextField placeholder='test' size={4} maxLength={4} />
				<Dropdown
					defaultVal="idstr1"
					items={[
						{val: 'idstr1', label: 'lstr1'},
						{val: 'idstr2', label: 'lstr2'},
						{val: 'idstr3', label: 'lstr3'}
					]}
				/>
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
				<div id="tt-topLeft" className="tooltipCell topLeft">
					topLeft
					<Tooltip location={Location.topLeft} parent="tt-topLeft">{randomText}</Tooltip>
				</div>

				<div id="tt-top" className="tooltipCell top">
					top
					<Tooltip location={Location.top} parent="tt-top">{randomText}</Tooltip>
				</div>

				<div id="tt-topRight" className="tooltipCell topRight">
					topRight
					<Tooltip location={Location.topRight} parent="tt-topRight">{randomText}</Tooltip>
				</div>

				<div id="tt-middleLeft" className="tooltipCell middleLeft">
					middleLeft
					<Tooltip location={Location.middleLeft} parent="tt-middleLeft">{randomText}</Tooltip>
				</div>

				<div className="tooltipCell middle inactive">N/A</div>

				<div id="tt-middleRight" className="tooltipCell middleRight">
					middleRight
					<Tooltip location={Location.middleRight} parent="tt-middleRight">{randomText}</Tooltip>
				</div>

				<div id="tt-bottomLeft" className="tooltipCell bottomLeft">
					bottomLeft
					<Tooltip location={Location.bottomLeft} parent="tt-bottomLeft">{randomText}</Tooltip>
				</div>

				<div id="tt-bottom" className="tooltipCell bottom">
					bottom
					<Tooltip location={Location.bottom} parent="tt-bottom">{randomText}</Tooltip>
				</div>

				<div id="tt-bottomRight" className="tooltipCell bottomRight">
					bottomRight
					<Tooltip location={Location.bottomRight} parent="tt-bottomRight">{randomText}</Tooltip>
				</div>
			</div>

			<h3>Custom style</h3>
			Hover over the square to see the custom style colors on the tooltip
			<div id="tooltipStyleExample">
				<Tooltip
					location={Location.middleRight}
					parent="tooltipStyleExample"
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
			<Triangle sizing={Sizing.large} direction={Direction.up} style={{fill: 'yellow', stroke: 'magenta'}}/>
			<Triangle sizing={Sizing.large} direction={Direction.right} style={{fill: 'yellow', stroke: 'magenta'}}/>
			<Triangle sizing={Sizing.large} direction={Direction.down} style={{fill: 'yellow', stroke: 'magenta'}}/>
			<Triangle sizing={Sizing.large} direction={Direction.left} style={{fill: 'yellow', stroke: 'magenta'}}/>

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

	@autobind handleSizingChange(value: any) {
		debug('Setting app size to: %o', value);
		this.setState({
			sizing: value
		});
	}

	render() {
		return (
			<div id="app">

				{/* <Dropdown
					defaultVal="normal"
					items={[
					{ value: Sizing.xxsmall, label: 'xxsmall' },
					{ value: Sizing.xsmall, label: 'xsmall' },
					{ value: Sizing.small, label: 'small' },
					{ value: Sizing.normal, label: 'normal' },
					{ value: Sizing.large, label: 'large' },
					{ value: Sizing.xlarge, label: 'xlarge' },
					{ value: Sizing.xxlarge, label: 'xxlarge' }
					]}
					onSelect={this.handleSizingChange}
					/> */}

				<DemoAccordion sizing={this.state.sizing} />
				<DemoBadge />
				<DemoBrowser />
				<DemoButtons />
				<DemoDialogBox />
				<DemoDropdown />

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

				<h1>OptionGroup</h1>
				{this.buildOptionGroup()}

				<h1>Pager</h1>
				{this.buildPager()}

				<h1>Select</h1>
				{this.buildSelect()}

				<h1>Slider</h1>
				{this.buildSlider()}

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
