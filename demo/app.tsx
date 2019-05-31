import autobind from "autobind-decorator";
import * as React from "react";
import {render} from "react-dom";

const debug = require("debug")("app");
debug("Starting Demo application");

// (global as any).hljs = require("highlight.js");
// (global as any).Quill = require("quill");

import {Break, Dropdown, Option, Sizing} from "../dist/bundle";

import DemoAccordion from "./src/DemoAccordion";
import DemoBadge from "./src/DemoBadge";
import DemoBreadcrumbs from "./src/DemoBreadcrumbs";
import DemoBrowser from "./src/DemoBrowser";
import DemoButtons from "./src/DemoButtons";
import DemoDatagrid from "./src/DemoDatagrid";
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
import DemoPreview from "./src/DemoPreview";
import DemoSlider from "./src/DemoSlider";
import DemoSwitch from "./src/DemoSwitch";
import DemoTabs from "./src/DemoTabs";
import DemoTagList from "./src/DemoTagList";
import DemoTextArea from "./src/DemoTextArea";
import DemoTextField from "./src/DemoTextField";
import DemoTitle from "./src/DemoTitle";
import DemoToast from "./src/DemoToast";
import DemoToolbar from "./src/DemoToolbar";
import DemoTooltip from "./src/DemoTooltip";
import DemoTreeview from "./src/DemoTreeview";
import DemoTriangle from "./src/DemoTriangle";

interface AppState {
	disabled: boolean;
	sizing: any;
}

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

	public render() {
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
					onSelection={this.handleSizingChange}
				/>
				<Break sizing={this.state.sizing} />

				<p>Use this checkbox to disable all controls</p>

				<Option
					initialToggle={false}
					onSelection={this.handleToggleDisable}
					text='disabled'
				/>
				<Break sizing={this.state.sizing} />

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
				<DemoDatagrid
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
				<DemoPreview
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
				<DemoTextArea
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
