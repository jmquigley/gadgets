"use strict";

const debug = require("debug")("DemoDatagrid");

// import autobind from "autobind-decorator";
import * as React from "react";
import {Datagrid, DatagridColumn, DatagridRow} from "../../dist/bundle";
import {StyledContainer} from "../app";

export interface DemoDatagridState {
	columns: DatagridColumn[];
	rows: DatagridRow[];
}

export default class DemoDatagrid extends React.Component<
	any,
	DemoDatagridState
> {
	constructor(props: any) {
		super(props);
		debug("creating");

		this.state = {
			columns: [
				{key: "id", name: "ID", sortable: true},
				{key: "title", name: "Title"},
				{key: "count", name: "Count"}
			],
			rows: [
				{id: 0, title: "row1", count: 20},
				{id: 1, title: "row2", count: 234},
				{id: 2, title: "row3", count: 2255},
				{id: 3, title: "row4", count: 8345}
			]
		};
	}

	public render() {
		return (
			<StyledContainer id='datagridExample' title='Datagrid'>
				<Datagrid
					columns={this.state.columns}
					rows={this.state.rows}
					disabled={this.props["disabled"]}
					sizing={this.props["sizing"]}
				/>
			</StyledContainer>
		);
	}
}
