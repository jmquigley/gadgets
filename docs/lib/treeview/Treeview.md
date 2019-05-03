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

Where `title` and `subtitle` are shown on the node as Label.  It is editable
by double clicking the text in the node.  The `expanded` boolean will show objects
under the parent (if they exist) based on the `children` prop.  The
`children` prop is an array on the parent node of the child nodes linked to
this parent.  Each of these nodes are also potential parent, etc (recursive
relationship).  When the tree data is passed to this component via props a UUID is generated
for eacxh node and stored in the *id* key.  Also the children of a parent node are given this
id as the *parentId*.  These values are stored on the TreeItem nodes, so these keys and their
relationships are available to the caller (via callbacks when changes occur).

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
- `onAdd(node: ExtendedNodeData, treeData: TreeItem[])` - Invoked when a new node is
added to the tree via the "+" add button of the parent (when highlighting the parent
 node). The node sent to the callback represents the node added to the tree.
- `onChange(treeData: {TreeItem[]})` - Invoked when something in the tree has
changed.  The callback receives an array of TreeItem nodes used to represent the
current state of the tree.
- `onCollapse(treeData: TreeItem[])` - Invoked when the full tree is collapsed
via the collapse all button.
- `onDelete(node: TreeItem, treeData: TreeItem[]` - Invoked when a node is
removed from the tree.  The node parameter is the node that was deleted.
- `onExpand(treeData: TreeItem[])` - Invoked when the full tree is expanded
via the expand all button.
- `onSearch(node: TreeItem)` - Invoked when a search is performed.  It returns
the current item found in the search.  This callback is also called when moving
to/from previous/next the title.
- `onSelect(node: TreeItem)` - Invoked when a tree item is selected.  The node
selected is passed to the callback.  The node that was selected is also highlighted.
- `onUpdate(currentNode: TreeItem, previousNode: TreeItem, treeData: TreeItem[])` -
Invoked when the contents of a tree node (title) have been changed.  It passes
a reference to the new node (current), the previous node before the change, and the
new treeData array after the change was applied.

#### Styles
- `ui-treeview` - Root style applied to the SortableTree component wrapper.
- `ui-treeview-container` - applied to a div that surrounds the tree control and the
toolbar used to control it..
this is where the height of the control is handled.
- `ui-treeview-toolbar` - applied to the search toollbar

#### Properties
- `addAsFirstChild=true {boolean}` - when set to true new nodes are added at
the front of the parent.  Otherwise they are added to the end.  The default is
to add them to the front.
- `defaultTitle='New Title' {string}` - When a new node is added this title is
used as the placeholder label.
- `direction=Direction.top {Direction}` - Determines the location of the search
toolbar.  If set to Direction.top it is at the top of the component.  If set to
Direction.bottom it is on the bottom.
- `height="15em" {string}` - The height of the treeview container.  This must
be set or the tree will not display anything.
- `nodeWidth="20em" {string}` - the width of the text nodes that are displayed.
- `selectNew=true {boolean}` - When a new node is added it is selected by
default (true).  If this property is false, then the parent remains selected
when a child node is added.
- `treeData=[] {TreeItem[]}` - The data structure that describes the
tree hierarchy (see example above).
- `usehidden=true {boolean}` - by default the add/delete buttons are hidden on
each of the nodes.  They are revealed when hovering over the node.  This behavior
can be turned off by setting this prop to false.

