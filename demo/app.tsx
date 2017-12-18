import autobind from 'autobind-decorator';
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
import DemoTabs from './src/DemoTabs';
import DemoTagList from './src/DemoTagList';
import DemoTextField from './src/DemoTextField';
import DemoTitle from './src/DemoTitle';
import DemoToast from './src/DemoToast';
import DemoToolbar from './src/DemoToolbar';
import DemoTooltip from './src/DemoTooltip';
import DemoTriangle from './src/DemoTriangle';

const debug = require('debug')('app');

//
// This is not how the components would typically be included within an
// electron app.  This is kind of a "hack" to allow the demo app and the
// library code to coexist.  Typically they would be imported using
// CommonJS import.
//

const {
	Dropdown,
	Sizing
} = require('../dist/bundle');

interface AppState {
	sizing: any;
}

class App extends React.Component<any, AppState> {

	constructor(props: any) {
		super(props);
		this.state = {
			sizing: Sizing.normal
		};

		/* (window as any).state = this.state;*/
	}

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

				<DemoAccordion sizing={this.state.sizing} />
				<DemoBadge sizing={this.state.sizing} />
				<DemoBrowser />
				<DemoButtons sizing={this.state.sizing} />
				<DemoDialogBox sizing={this.state.sizing} />
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
				<DemoTabs sizing={this.state.sizing} />
				<DemoTagList sizing={this.state.sizing} />
				<DemoTextField sizing={this.state.sizing} />
				<DemoTitle sizing={this.state.sizing} />
				<DemoToast sizing={this.state.sizing} />
				<DemoToolbar sizing={this.state.sizing} />
				<DemoTooltip sizing={this.state.sizing} />
				<DemoTriangle sizing={this.state.sizing} />

			</div>
		);
	}
}

render(
	<App />,
	document.getElementById('root')
);
