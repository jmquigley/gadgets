<a name="TreeData"></a>

## TreeData
**Kind**: global class  
**Contructor**:   

* [TreeData](#TreeData)
    * [new TreeData(treeData, _testing, _sequence, _defaultTitle, _useindex, _usesanitize)](#new_TreeData_new)
    * [.createNode(parentNode)](#TreeData+createNode) ⇒ <code>TreeItem</code>
    * [.find(id)](#TreeData+find) ⇒ <code>TreeItem</code>
    * [.getNewKey()](#TreeData+getNewKey) ⇒ <code>string</code>
    * [.sanitize(node)](#TreeData+sanitize) ⇒ <code>TreeItem</code>
    * [.toString()](#TreeData+toString) ⇒ <code>string</code>
    * [.walk(fn)](#TreeData+walk) ⇒ <code>Array.&lt;TreeeItem&gt;</code>

<a name="new_TreeData_new"></a>

### new TreeData(treeData, _testing, _sequence, _defaultTitle, _useindex, _usesanitize)
Creates an instance of the TreeData class.  When the data is loaded via
the constructor the full tree is traversed and the nodes are sanitized.
All of the parent/child keys are set if they are not available.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| treeData | <code>Array.&lt;TreeItem&gt;</code> |  | the data that represents the current general tree.  This field is mandatory when instantiating the class. |
| _testing | <code>boolean</code> | <code>false</code> | set to true when this class is under test.  This is needed to generate predicatble keys instead of UUID values. |
| _sequence | <code>number</code> | <code>0</code> | the starting sequence number in key generation when the class is under test. |
| _defaultTitle | <code>string</code> | <code>&quot;default&quot;</code> | the default string loadeed into the TreeItem.title field when a new node is created or sanitized. |
| _useindex | <code>boolean</code> | <code>true</code> | turns on a map index of the node values that are loaded into the tree.  Used for a fast id lookup. |
| _usesanitize | <code>boolean</code> | <code>true</code> | when new nodes are processed by the walk function each node is checked by default to ensure parent/child keys are set and all fields are in the TreeItem. |

<a name="TreeData+createNode"></a>

### treeData.createNode(parentNode) ⇒ <code>TreeItem</code>
Creates a new node object with default properties.

**Kind**: instance method of [<code>TreeData</code>](#TreeData)  
**Returns**: <code>TreeItem</code> - a new node instance reference  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parentNode | <code>TreeItem</code> | <code></code> | a parent node associated with this instance |

<a name="TreeData+find"></a>

### treeData.find(id) ⇒ <code>TreeItem</code>
Performs a breadth search of the tree for a matching id value.

**Kind**: instance method of [<code>TreeData</code>](#TreeData)  
**Returns**: <code>TreeItem</code> - of the item found otherwise null  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | the id value to search for |

<a name="TreeData+getNewKey"></a>

### treeData.getNewKey() ⇒ <code>string</code>
Generates a new unique key for a node.  When the testing flag is set
to true, then the id is an ordered sequence.  This is done to make
the keys predictable when the code is under test.

**Kind**: instance method of [<code>TreeData</code>](#TreeData)  
**Returns**: <code>string</code> - the new key value.  
<a name="TreeData+sanitize"></a>

### treeData.sanitize(node) ⇒ <code>TreeItem</code>
Takes an input node and ensures that it has all possible fields.	 It
also creates the node key value if one does not exist.

**Kind**: instance method of [<code>TreeData</code>](#TreeData)  
**Returns**: <code>TreeItem</code> - a referece back of the node that was sanitized  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>TreeItem</code> | the node to fix |

<a name="TreeData+toString"></a>

### treeData.toString() ⇒ <code>string</code>
Prints the internals of the current tree.  It will print the id, the
parent id, and the title for each node.

**Kind**: instance method of [<code>TreeData</code>](#TreeData)  
**Returns**: <code>string</code> - a string representing the tree structure.  
<a name="TreeData+walk"></a>

### treeData.walk(fn) ⇒ <code>Array.&lt;TreeeItem&gt;</code>
Performs an inorder traversal of the current tree.  At each node
a callback function is executed and the node being processed
is given as a parameter.

**Kind**: instance method of [<code>TreeData</code>](#TreeData)  
**Returns**: <code>Array.&lt;TreeeItem&gt;</code> - a reference to the tree structure that was
processed.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>WalkCallback</code> | a callback function invoked on each node as it is encountered. |

