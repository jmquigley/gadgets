"use strict";

const debug = require("debug")("DemoDynamicList");

import autobind from "autobind-decorator";
import * as _ from "lodash";
import * as React from "react";
import {sprintf} from "sprintf-js";
import {
	Button,
	DynamicList,
	Option,
	OptionType,
	TitleLayout
} from "../../dist/bundle";
import {StyledContainer} from "./helpers";

export interface DemoDynamicListState {
	dynamicListError: string;
	items: any;
	selectToggle: boolean;
}

export default class DemoDynamicList extends React.Component<
	any,
	DemoDynamicListState
> {
	private _dynamicItems: any = {};

	constructor(props: any) {
		super(props);
		debug("creating");

		for (let i = 1; i <= 2000; i++) {
			this._dynamicItems[`item ${sprintf("%04d", i)}`] = {
				left: <Option optionType={OptionType.star} />,
				right: `w${i}`
			};
		}

		this.state = {
			dynamicListError: "",
			items: this._dynamicItems,
			selectToggle: false
		};

		debug("created dynamicList with state: %O", this.state);
	}

	@autobind
	private handleDelete(title: string) {
		debug("handleDelete => title: %s", title);

		const items = {...this.state.items};
		delete items[title];
		this.setState({
			items
		});
	}

	@autobind
	private handleErrorReset() {
		debug("handleErrorReset");
		this.setState({dynamicListError: ""});
	}

	@autobind
	private handleNew(title: string, widget: any) {
		debug("handleNew => title: %s, widget: %O", title, widget);
		if (widget == null) {
			widget = {
				left: <Option optionType={OptionType.star} />,
				right: `w0`
			};
		}

		this.setState({
			items: {...this.state.items, [title]: widget}
		});
	}

	@autobind
	private handleUpdate(previous: string, title: string) {
		debug("handleUpdate => previous: %s, title: %s", previous, title);
		const widget = this.state.items[previous];
		this.setState({
			items: _.omit({...this.state.items, [title]: widget}, previous)
		});
	}

	@autobind
	private showErrorMessage() {
		debug("showErrorMessage");
		this.setState({
			dynamicListError: "Dynamic List Error Message Test"
		});
	}

	@autobind
	private changeListItems() {
		const dynamicItems = {};

		for (let [title, widget] of Object.entries(this.state.items)) {
			if (widget == null) {
				widget = {
					left: <Option optionType={OptionType.star} />,
					right: "a0"
				};
			} else {
				widget["right"] = widget["right"].replace("w", "a");
			}

			dynamicItems[title] = widget;
		}

		this.setState({
			items: dynamicItems
		});
	}

	@autobind
	private handleToggleSelection(toggle: boolean, title: string) {
		debug(
			"handleToggleSelection => %s to %o, %O",
			title,
			toggle,
			this.state
		);
		this.setState({
			selectToggle: toggle
		});
	}

	public render() {
		return (
			<StyledContainer id='dynamicListExample' title='Dynamic List'>
				<DynamicList
					disabled={this.props["disabled"]}
					errorMessage={this.state.dynamicListError}
					items={this.state.items}
					layout={TitleLayout.dominant}
					noselect={this.state.selectToggle}
					onDelete={this.handleDelete}
					onError={this.handleErrorReset}
					onNew={this.handleNew}
					onUpdate={this.handleUpdate}
					pageSizes={[10, 20, 30]}
					title='Dynamic List Test'
				/>
				<br />

				<div className='toastBox'>
					<Button iconName='bomb' onClick={this.showErrorMessage} />
					<p>Click to show error message test</p>
				</div>

				<div className='toastBox'>
					<Button iconName='bomb' onClick={this.changeListItems} />
					<p>Click to change list of widget items (change w to a)</p>
				</div>

				<Option
					onClick={this.handleToggleSelection}
					text='Toggle selection mode (on turns off selection)'
				/>
			</StyledContainer>
		);
	}
}
