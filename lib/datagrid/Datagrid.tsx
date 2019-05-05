/**
 * A component that represents data in a 2D table format like excel.  The
 * underlying code is a wrapper around the [react-data-grid](https://www.npmjs.com/package/react-data-grid)
 * component.  The wrapper provides themeing and interop with the rest of the component library.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/datagrid.png" width="60%" />
 *
 * #### Examples:
 *
 * ```javascript
 * this.state = {
 *     columns: [
 *         {key: "id", name: "ID", sortable: true},
 *         {key: "title", name: "Title"},
 *         {key: "count", name: "Count"}
 *     ],
 *     rows: [
 *         {id: 0, title: "row1", count: 20},
 *         {id: 1, title: "row2", count: 234},
 *         {id: 2, title: "row3", count: 2255},
 *         {id: 3, title: "row4", count: 8345}
 *     ]
 * };
 *
 * ...
 *
 * <Datagrid
 *     columns={this.state.columns}
 *     rows={this.state.rows}
 *     disabled={this.props["disabled"]}
 *     sizing={this.props["sizing"]}
 * />
 * ```
 *
 * ## API
 * For a list of events and atributes for the component see the
 * [react-data-grid](http://adazzle.github.io/react-data-grid/docs/ReactDataGrid)
 * component online help.  This component passes through attributes to the
 * underlying control.
 *
 * #### Styles
 * - `ui-datagrid` - Root style applied to the wrapper around the data grid control
 *
 * #### Properties
 * - `columns: {DatagridColumn[]} ([])` - the column descriptor array.  There is
 * on entry in the array per column.
 * - `rows: {DatagridRow[]} ([])` - the rows that will be displayed.  Each array
 * entry is an object that maps 1 for 1 to the keys names in the columns
 * descriptor array.
 *
 * @module Datagrid
 */

// const debug = require("debug")("gadgets.Datagrid");

import autobind from "autobind-decorator";
import * as React from "react";
import ReactDataGrid from "react-data-grid";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Sizing,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";

export interface DatagridColumn {
	key: string;
	name: string;
	[key: string]: any;
}

export interface DatagridRow {
	[key: string]: any;
}

export interface DatagridProps extends BaseProps {
	columns: DatagridColumn[];
	rows: DatagridRow[];
	[key: string]: any;
}

export function getDefaultDatagridProps(): DatagridProps {
	return {
		...getDefaultBaseProps(),
		columns: [],
		rows: [],
		obj: "Datagrid"
	};
}

export type DatagridState = BaseState;

export function getDefaultDatagridState(): DatagridState {
	return {...getDefaultBaseState()};
}

const DatagridWrapper: any = styled.div`
	.react-grid-HeaderRow {
		background-color: ${(props: DatagridProps) =>
			props.theme.headerBackgroundColor || Color.black} !important;
		color: ${(props: DatagridProps) =>
			props.theme.headerForegroundColor || Color.white} !important;
		overflow: hidden;
	}

	.react-grid-HeaderCell {
		align-items: center !important;
		background: unset;
		display: inline-flex !important;
		padding: 0 8px;
	}

	${(props: DatagridProps) => fontStyle[props["sizing"]]}
	${(props: DatagridProps) => disabled(props)}
	${(props: DatagridProps) => invisible(props)}
`;

export class Datagrid extends BaseComponent<DatagridProps, DatagridState> {
	public static readonly defaultProps: DatagridProps = getDefaultDatagridProps();
	public state: DatagridState = getDefaultDatagridState();

	constructor(props: DatagridProps) {
		super(props, "ui-datagrid", Datagrid.defaultProps.style);
	}

	/** @return the height of the row in pixels (number) */
	get rowHeight() {
		switch (this.props.sizing) {
			case Sizing.xxsmall:
				return 20;
			case Sizing.xsmall:
				return 25;
			case Sizing.small:
				return 30;
			case Sizing.large:
				return 40;
			case Sizing.xlarge:
				return 45;
			case Sizing.xxlarge:
				return 50;

			case Sizing.normal:
			case Sizing.medium:
			default:
				return 35;
		}
	}

	@autobind
	private rowGetter(rowIdx: number) {
		return this.props.rows[rowIdx];
	}

	public render() {
		const {minHeight, minWidth, ...props} = this.props;

		return (
			<Wrapper {...props}>
				<DatagridWrapper
					{...props}
					className={this.className}
					rowHeight={this.rowHeight}
				>
					<ReactDataGrid
						{...props}
						headerFiltersHeight={this.rowHeight}
						headerRowHeight={this.rowHeight}
						rowGetter={this.rowGetter}
						rowHeight={this.rowHeight}
						rowsCount={props.rows.length}
					/>
				</DatagridWrapper>
			</Wrapper>
		);
	}
}

export default Datagrid;
