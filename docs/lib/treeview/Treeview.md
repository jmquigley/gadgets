<a name="module_Treeview"></a>

## Treeview
This component represents data in a hierarchical parent/child view.  The
underlying code is a wrapper around the [react-sortable-tree](https://www.npmjs.com/package/react-sortable-tree)
component written by Chris Fritz.  The [README](https://github.com/fritz-c/react-sortable-tree/blob/master/README.md) for The
project shows examples and properties for the component.

The two required properties are `treeData` and `onChange`.  The control relies
on feeding data back in to the control as props (via treeData state) to control
the contents; the calling app is repsonsible for the data.  The `treeData` uses
the following array of node structures (TreeviewItem), where a node is defined as:

    [
      {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]},
      {title: "string", subtitle: "string", expanded: "boolean", children: [
          {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]},
          {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]}
      ]}
      ...
    ]

Where `title` and `subtitle` are shown on the node.  The `expanded` boolean
will show objects under the parent (if they exist) based on the `children`
prop.  The `children` prop is an array on the parent node of the child nodes.
Each of these nodes are also potential parent, etc.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/treeview.png" width="40%" />

## Examples:

```javascript
import {Treeview, TreeviewItem} from 'gadgets';

...

this.state = {
    treeData: [
    {title: '1.0', expanded: true, children: [
        {title: '1.1'},
        {title: '1.2'},
        {title: '1.3'}
    ]},
    {title: '2.0', expanded: true, children: [
        {title: '2.1'},
        {title: '2.2'},
        {title: '2.3'}
    ]},
    {title: '3.0', expanded: true, children: [
        {title: '3.1'},
        {title: '3.2'},
        {title: '3.3'}
    ]}
];

...

<Treeview
    onChange={(treeData: TreeviewItem[]) => this.setState({treeData})}
    treeData={this.state.treeData}
/>
```

## API
#### Events
- `onChange(treeData: {TreeviewItem[]}) ([])` - The array of TreeItem nodes
used to represent the current state of the tree.

#### Styles
- `ui-treeview` - applied to the SortableTree component on the top `div`
- `ui-treeview-container` - applied to a div that surrounds the tree control.
this is where the height of the control is handled.

#### Properties
- `treeData: {TreeviewItem[]}) ([])` - The data structure that describes the
tree hierarchy (see example above).
