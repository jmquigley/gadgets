import autobind from "autobind-decorator";
import * as React from "react";
import {render} from "react-dom";

import {Container, styled} from "../dist/bundle";

import DemoAccordion from "./src/DemoAccordion";
import DemoBadge from "./src/DemoBadge";
import DemoBreadcrumbs from "./src/DemoBreadcrumbs";
import DemoBrowser from "./src/DemoBrowser";
import DemoButtons from "./src/DemoButtons";
import DemoDialogBox from "./src/DemoDialogBox";
import DemoDialogWindow from "./src/DemoDialogWindow";
import DemoDropdown from "./src/DemoDropdown";
import DemoDynamicList from "./src/DemoDynamicList";
import DemoEditor from "./src/DemoEditor";
import DemoErrorHandler from "./src/DemoErrorHandler";
import DemoLabels from "./src/DemoLabels";
import DemoListItem from "./src/DemoListItem";
import DemoOption from "./src/DemoOption";
import DemoOptionGroup from "./src/DemoOptionGroup";
import DemoPager from "./src/DemoPager";
import DemoSlider from "./src/DemoSlider";
import DemoSwitch from "./src/DemoSwitch";
import DemoTabs from "./src/DemoTabs";
import DemoTagList from "./src/DemoTagList";
import DemoTextField from "./src/DemoTextField";
import DemoTitle from "./src/DemoTitle";
import DemoToast from "./src/DemoToast";
import DemoToolbar from "./src/DemoToolbar";
import DemoTooltip from "./src/DemoTooltip";
import DemoTriangle from "./src/DemoTriangle";
import DemoTreeview from "./src/DemoTreeview";

const debug = require("debug")("app");

//
// This is not how the components would typically be included within an
// electron app.  This is kind of a "hack" to allow the demo app and the
// library code to coexist.  Typically they would be imported using
// CommonJS import.
//

const {Dropdown, Option, Sizing} = require("../dist/bundle");

interface AppState {
	disabled: boolean;
	sizing: any;
}

export const StyledContainer: any = styled(Container)`
	margin: 30px 0 10px 0;
`;

class App extends React.Component<any, AppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			disabled: false,
			sizing: Sizing.normal
		};

		/* (window as any).state = this.state;*/
	}

	@autobind
	private handleSizingChange(value: any) {
		debug("Setting app size to: %o", value);
		this.setState({sizing: value});
	}

	@autobind
	private handleToggleDisable(value: boolean) {
		this.setState({disabled: !this.state.disabled}, () => {
			debug("Setting disable flag to %o", value);
		});
	}

	render() {
		return (
			<div id='app'>
				<p>
					Use this dropdown to change the Sizing of the components
					below (if the control supports it). The default sizing for
					the library is "normal".
				</p>

				<Dropdown
					defaultVal='normal'
					items={[
						{value: Sizing.xxsmall, label: "xxsmall"},
						{value: Sizing.xsmall, label: "xsmall"},
						{value: Sizing.small, label: "small"},
						{value: Sizing.normal, label: "normal"},
						{value: Sizing.large, label: "large"},
						{value: Sizing.xlarge, label: "xlarge"},
						{value: Sizing.xxlarge, label: "xxlarge"}
					]}
					onSelect={this.handleSizingChange}
				/>
				<br />

				<p>Use this checkbox to disable all controls</p>

				<Option
					initialToggle={false}
					onClick={this.handleToggleDisable}
					text='disabled'
				/>
				<br />

				<DemoAccordion
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoBadge
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoBreadcrumbs
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoBrowser />
				<DemoButtons
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoDialogBox
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoDialogWindow
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoDropdown
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoDynamicList disabled={this.state.disabled} />
				<DemoEditor disabled={this.state.disabled} />
				<DemoErrorHandler
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoLabels
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoListItem
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoOption
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoOptionGroup
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoPager
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoSlider
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoSwitch
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoTabs
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoTagList
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoTextField
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoTitle
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoToast
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoToolbar
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoTooltip
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoTriangle
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
				<DemoTreeview
					sizing={this.state.sizing}
					disabled={this.state.disabled}
				/>
			</div>
		);
	}
}

render(<App />, document.getElementById("root"));
