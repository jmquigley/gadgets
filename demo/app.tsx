import autobind from 'autobind-decorator';
import * as loremIpsum from 'lorem-ipsum';
import * as React from 'react';
import {render} from 'react-dom';

import DemoAccordion from './src/DemoAccordion';
import DemoBadge from './src/DemoBadge';
import DemoBrowser from './src/DemoBrowser';
import DemoButtons from './src/DemoButtons';
import DemoDialogBox from './src/DemoDialogBox';
import DemoDropdown from './src/DemoDropdown';
import DemoDynamicList from './src/DemoDynamicList';
import DemoEditor from './src/DemoEditor';
import DemoLabels from './src/DemoLabels';
import DemoListItem from './src/DemoListItem';
import DemoOption from './src/DemoOption';
import DemoOptionGroup from './src/DemoOptionGroup';
import DemoPager from './src/DemoPager';
import DemoSelect from './src/DemoSelect';
import DemoSlider from './src/DemoSlider';
import DemoSwitch from './src/DemoSwitch';

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
	Justify,
	Location,
	Option,
	OptionType,
	Sizing,
	Switch,
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

const randomText = loremIpsum({units: 'sentences', count: 2, random: null});

// Build global test data for Select control

interface AppState {
	sizing: any;

	toastVisible1: boolean;
	toastVisible2: boolean;
	toastVisible3: boolean;
	toastVisible4: boolean;
	toastVisible5: boolean;
	toastVisible6: boolean;
}

class App extends React.Component<any, AppState> {

	constructor(props: any) {
		super(props);
		this.state = {
			sizing: Sizing.normal,

			toastVisible1: true,
			toastVisible2: true,
			toastVisible3: true,
			toastVisible4: true,
			toastVisible5: true,
			toastVisible6: true
		};

		/* (window as any).state = this.state;*/
	}

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

				<p>
				Use this dropdown to change the Sizing of the components below (if the control supports it).
				The default sizing for the library is "normal".
				</p>

				<Dropdown
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
				/>

				<DemoAccordion />
				<DemoBadge />
				<DemoBrowser />
				<DemoButtons />
				<DemoDialogBox />
				<DemoDropdown sizing={this.state.sizing} />
				<DemoDynamicList />
				<DemoEditor />
				<DemoLabels sizing={this.state.sizing} />
				<DemoListItem sizing={this.state.sizing} />
				<DemoOption sizing={this.state.sizing} />
				<DemoOptionGroup sizing={this.state.sizing} />
				<DemoPager sizing={this.state.sizing} />
				<DemoSelect sizing={this.state.sizing} />
				<DemoSlider sizing={this.state.sizing} />
				<DemoSwitch sizing={this.state.sizing} />

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
