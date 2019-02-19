<a name="module_TreeData"></a>

## TreeData
The treeData is an array of `TreeItem` nodes.  A `TreeItem` node is a
dictionary that contains the following properties:

- `id {string}` - a unique id/key value for the node
- `parent {TreeItem}` - reference to the parent node, where the id of the
   parent is `parent.id`
- `data {any}` - a variable to hold any data associated with the node
   (can hold any type of data)
- `title {string}` - a string that represents the title displayed on the
   Treeview component
- `subtitle {string}` - sub string below the main title.
- `expanded {boolean}` - a boolean flag that determines if the children of
   this node are displayed
- `children {TreeItem[]}` - an array of `TreeItem` nodes attached to this
 node.

An example of this data structure is:

    [
        {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]},
        {title: "string", subtitle: "string", expanded: "boolean", children: [
            {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]},
            {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]}
        ]}
        ...
    ]

This is the structure of a [general tree](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_1.htm),
where each node can have an arbitrary number of *children*.

# Usage

Create an instance of the `TreeData` class, where the constructor is an array
of `TreeItem` nodes (shown above).  The resulting instance is then used to
 interact with the data.  To create a simple instance:

```javascript
import {TreeData, TreeItem} from "util.treeitem";

const data: TreeItem[] = [
    {id: 0, title: "1.0", children: [{id: 3, title: "1.1", children[]}]}
    {id: 1, title: "2.0", children: []}
    {id: 2, title: "3.0", children: []}
];

const td = new TreeData(data);
```

Once the instance is created the tree can be searched by `id` values using
the `find` function:

```javascript
let it: TreeItem = td.find(1);

// it -> {id: 1, title: "2.0", children: []}
```

The tree can also be traversed in order with the `walk` function:

```javascript
td.walk((node: TreeItem) => {
    log.info('node: %O', node);
});
```

The `walk` function will visit each node in the tree in order invoking a
callback function as each node is encountered.  The callback receives a
reference to each node.  If the `useindex` property is set when the class
is created, which it is by default, then an id-to-node index is created.
The `treeIndex` property can be used to quickly find a node by its index:

```javascript
let it: TreeItem = td.treeIndex[2];

// it -> {id: 2, title: "3.0", children: []}
```

# API
### properties
- `defaultTitle {string} ('default')` - the default string loaded into the
  TreeItem.title field when a new node is created or sanitized (when the
  title is empty).
- `sequence {number} (0)` - the starting sequence number in key generation
  when the class is under test
- `testing {boolean} (false)` - set to true when this class is under test.
  This is needed to generate predicatble keys instead of UUID values.
- `treeData {TreeItem[]}` - the data that represents the current general tree
- `treeIndex {TreeIndex}` - a key/node value pair used to quickly look up a
  node by its unique id value.
- `useindex {boolean} (true)` - turns on node indexing when walking the tree
  or finding nodes
- `usesanitize {boolean} (true)` - if true, then run sanitization on nodes
  when walking the tree.  This ensures that all of the parent/child key
  relationships are in place and that all valid TreeItem fields are in the
  objects (with default values if they are missing).

### class & methods


* [TreeData](#module_TreeData)
    * [~TreeData](#module_TreeData..TreeData)
        * [new TreeData(treeData, _testing, _sequence, _defaultTitle, _useindex, _usesanitize)](#new_module_TreeData..TreeData_new)
        * [.createNode(parentNode)](#module_TreeData..TreeData+createNode) ⇒ <code>TreeItem</code>
        * [.find(id)](#module_TreeData..TreeData+find) ⇒ <code>TreeItem</code>
        * [.getNewKey()](#module_TreeData..TreeData+getNewKey) ⇒ <code>string</code>
        * [.sanitize(node)](#module_TreeData..TreeData+sanitize) ⇒ <code>TreeItem</code>
        * [.toString()](#module_TreeData..TreeData+toString) ⇒ <code>string</code>
        * [.walk(fn)](#module_TreeData..TreeData+walk) ⇒ <code>Array.&lt;TreeeItem&gt;</code>

<a name="module_TreeData..TreeData"></a>

### TreeData~TreeData
**Kind**: inner class of [<code>TreeData</code>](#module_TreeData)  
**Contructor**:   

* [~TreeData](#module_TreeData..TreeData)
    * [new TreeData(treeData, _testing, _sequence, _defaultTitle, _useindex, _usesanitize)](#new_module_TreeData..TreeData_new)
    * [.createNode(parentNode)](#module_TreeData..TreeData+createNode) ⇒ <code>TreeItem</code>
    * [.find(id)](#module_TreeData..TreeData+find) ⇒ <code>TreeItem</code>
    * [.getNewKey()](#module_TreeData..TreeData+getNewKey) ⇒ <code>string</code>
    * [.sanitize(node)](#module_TreeData..TreeData+sanitize) ⇒ <code>TreeItem</code>
    * [.toString()](#module_TreeData..TreeData+toString) ⇒ <code>string</code>
    * [.walk(fn)](#module_TreeData..TreeData+walk) ⇒ <code>Array.&lt;TreeeItem&gt;</code>

<a name="new_module_TreeData..TreeData_new"></a>

#### new TreeData(treeData, _testing, _sequence, _defaultTitle, _useindex, _usesanitize)
Creates an instance of the TreeData class.  When the data is loaded via
the constructor the full tree is traversed and the nodes are sanitized.
All of the parent/child keys are set if they are not available.

**Params**

- treeData <code>Array.&lt;TreeItem&gt;</code> - the data that represents the current general
tree.  This field is mandatory when instantiating the class.
- _testing <code>boolean</code> <code> = false</code> - set to true when this class is under
test.  This is needed to generate predicatble keys instead of UUID values.
- _sequence <code>number</code> <code> = 0</code> - the starting sequence number in key generation
when the class is under test.
- _defaultTitle <code>string</code> <code> = &quot;default&quot;</code> - the default string loadeed into
the TreeItem.title field when a new node is created or sanitized.
- _useindex <code>boolean</code> <code> = true</code> - turns on a map index of the node values
that are loaded into the tree.  Used for a fast id lookup.
- _usesanitize <code>boolean</code> <code> = true</code> - when new nodes are processed by
the walk function each node is checked by default to ensure parent/child
keys are set and all fields are in the TreeItem.

<a name="module_TreeData..TreeData+createNode"></a>

#### treeData.createNode(parentNode) ⇒ <code>TreeItem</code>
Creates a new node object with default properties.

**Kind**: instance method of [<code>TreeData</code>](#module_TreeData..TreeData)  
**Returns**: <code>TreeItem</code> - a new node instance reference  
**Params**

- parentNode <code>TreeItem</code> <code> = </code> - a parent node associated with this instance

<a name="module_TreeData..TreeData+find"></a>

#### treeData.find(id) ⇒ <code>TreeItem</code>
Performs a breadth search of the tree for a matching id value.

**Kind**: instance method of [<code>TreeData</code>](#module_TreeData..TreeData)  
**Returns**: <code>TreeItem</code> - of the item found otherwise null  
**Params**

- id <code>string</code> - the id value to search for

<a name="module_TreeData..TreeData+getNewKey"></a>

#### treeData.getNewKey() ⇒ <code>string</code>
Generates a new unique key for a node.  When the testing flag is set
to true, then the id is an ordered sequence.  This is done to make
the keys predictable when the code is under test.

**Kind**: instance method of [<code>TreeData</code>](#module_TreeData..TreeData)  
**Returns**: <code>string</code> - the new key value.  
<a name="module_TreeData..TreeData+sanitize"></a>

#### treeData.sanitize(node) ⇒ <code>TreeItem</code>
Takes an input node and ensures that it has all possible fields.	 It
also creates the node key value if one does not exist.

**Kind**: instance method of [<code>TreeData</code>](#module_TreeData..TreeData)  
**Returns**: <code>TreeItem</code> - a referece back of the node that was sanitized  
**Params**

- node <code>TreeItem</code> - the node to fix

<a name="module_TreeData..TreeData+toString"></a>

#### treeData.toString() ⇒ <code>string</code>
Prints the internals of the current tree.  It will print the id, the
parent id, and the title for each node.

**Kind**: instance method of [<code>TreeData</code>](#module_TreeData..TreeData)  
**Returns**: <code>string</code> - a string representing the tree structure.  
<a name="module_TreeData..TreeData+walk"></a>

#### treeData.walk(fn) ⇒ <code>Array.&lt;TreeeItem&gt;</code>
Performs an inorder traversal of the current tree.  At each node
a callback function is executed and the node being processed
is given as a parameter.

**Kind**: instance method of [<code>TreeData</code>](#module_TreeData..TreeData)  
**Returns**: <code>Array.&lt;TreeeItem&gt;</code> - a reference to the tree structure that was
processed.  
**Params**

- fn <code>WalkCallback</code> - a callback function invoked on each
node as it is encountered.

