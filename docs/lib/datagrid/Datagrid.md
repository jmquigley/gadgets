<a name="module_Datagrid"></a>

## Datagrid
A component that represents data in a 2D table format like excel.  The
underlying code is a wrapper around the [react-data-grid](https://www.npmjs.com/package/react-data-grid)
component.  The wrapper provides themeing and interop with the rest of the component library.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/datagrid.png" width="60%" />

#### Examples:

```javascript
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

...

<Datagrid
    columns={this.state.columns}
    rows={this.state.rows}
    disabled={this.props["disabled"]}
    sizing={this.props["sizing"]}
/>
```

## API
For a list of events and atributes for the component see the
[react-data-grid](http://adazzle.github.io/react-data-grid/docs/ReactDataGrid)
component online help.  This component passes through attributes to the
underlying control.

#### Styles
- `ui-datagrid` - Root style applied to the wrapper around the data grid control

#### Properties
- `columns=[] {DatagridColumn[]}` - the column descriptor array.  There is
on entry in the array per column.
- `rows=[] {DatagridRow[]}` - the rows that will be displayed.  Each array
entry is an object that maps 1 for 1 to the keys names in the columns
descriptor array.

