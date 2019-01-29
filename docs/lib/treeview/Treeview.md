<a name="module_Treeview"></a>

## Treeview
This component represents data in a hierarchical parent/child view.  The
underlying code uses the [react-sortable-tree](https://www.npmjs.com/package/react-sortable-tree)
react component written by Chris Fritz.  The [README](https://github.com/fritz-c/react-sortable-tree/blob/master/README.md)
for the project shows examples and properties for the component.

The control relies on feeding data back into the control via props (as
treeData state) to control the contents; the calling app is responsible for
the data.  The `treeData` uses the following array of node structures
(TreeviewItem), where a node is defined as:

    [
      {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]},
      {title: "string", subtitle: "string", expanded: "boolean", children: [
          {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]},
          {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]}
      ]}
      ...
    ]

Where `title` and `subtitle` are shown on the node as text.  The `expanded` boolean
will show objects under the parent (if they exist) based on the `children`
prop.  The `children` prop is an array on the parent node of the child nodes linked
to this parent.  Each of these nodes are also potential parent, etc (recursive relationship).

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/treeview.png" width="60%" />

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
    height="640px"
    onChange={(treeData: TreeviewItem[]) => this.setState({treeData})}
    treeData={this.state.treeData}
/>
```

These are the minimum properties required to display the control.

## API
#### Events
- `onAdd(tvi: TreeviewItem, treeData: TreeviewItem[])` - Invoked when a new node is
added to the tree via the "+" add button of the parent (when highlighting the parent
 node). The tvi sent to th ecallback represents the node added to the tree.
- `onChange(treeData: {TreeviewItem[]})` - Invoked when something in the tree has
changed.  The callback receives an array of TreeItem nodes* used to represent the
current state of the tree.
- `onCollapse(treeData: TreeviewItem[])` - Invoked when the full tree is collapsed
via the collapse all button.
- `onDelete(tvi: TreeviewItem, treeData: TreeviewItem[]` - Invoked when a node is
removed from the tree.  The tvi value is the node that was deleted.
- `onExpand(treeData: TreeviewItem[])` - Invoked when the full tree is expanded
via the expand all button.
- `onSearch(tvi: TreeviewItem)` - Invoked when a search is performed.  It returns
the current item found in the search.  This callback is also called when moving
to/from previous/next the node.
- `onSelect(tvi: TreeviewItem)` - Invoked when a tree item is selected.  The node
selected is passed to the callback.  The node that was selected is also highlighted.
- `onUpdate(current: TreeviewItem, previous: TreeviewItem, treeData: TreeviewItem[])` -
Invoked when the contents of a tree node (title) have been changed.  It passes
a reference to the new node (current), the previous node values before the change,
and the new treeData array after the change was applied.

#### Styles
- `ui-treeview` - Root style applied to the SortableTree component wrapper.
- `ui-treeview-container` - applied to a div that surrounds the tree control and the
toolbar used to control it..
this is where the height of the control is handled.
- `ui-treeview-toolbar` - applied to the search toollbar

#### Properties
- `defaultTitle: {string} ('New Title')` - When a new node is added this title is
used as the placeholder label.
- `height: string ('15em')` - The height of the treeview container.  This must
be set or the tree will not display anything.
- `nodeWidth: string ('20em`)` -the width of the text nodes that are displayed.
- `treeData: {TreeviewItem[]}) ([])` - The data structure that describes the
tree hierarchy (see example above).
- `usehidden: {boolean} (true) - by default the add/delete buttons are hidden on
each of the nodes.  They are revealed when hovering over the node.  This behavior
can be turned off by setting this prop to false.

