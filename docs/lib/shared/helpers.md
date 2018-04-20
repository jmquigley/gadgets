## Functions

<dl>
<dt><a href="#globalize">globalize(name, pkg, replace)</a> ⇒ <code>object</code></dt>
<dd><p>Takes a variable name and an object and places that name and associated
object into the global node space.  If the object is alread in the
global space, then that reference is used and returned.  The replace
flag is used to override the current global reference.</p>
</dd>
<dt><a href="#tooltip">tooltip(props)</a> ⇒ <code>Tooltip</code></dt>
<dd><p>Creates a tooltip object for use within a control.  It will check the given
props for a tooltip string.  If it has one, it will create the object and
return it.  If it doesn&#39;t have it, then NULL is returned.</p>
</dd>
</dl>

<a name="globalize"></a>

## globalize(name, pkg, replace) ⇒ <code>object</code>
Takes a variable name and an object and places that name and associated
object into the global node space.  If the object is alread in the
global space, then that reference is used and returned.  The replace
flag is used to override the current global reference.

**Kind**: global function  
**Returns**: <code>object</code> - the global instance reference  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the variable to store globally |
| pkg | <code>object</code> | the object associated with the variable name |
| replace | <code>boolean</code> | if true, then it will always overwrite the current global (if it exists) |

<a name="tooltip"></a>

## tooltip(props) ⇒ <code>Tooltip</code>
Creates a tooltip object for use within a control.  It will check the given
props for a tooltip string.  If it has one, it will create the object and
return it.  If it doesn't have it, then NULL is returned.

**Kind**: global function  
**Returns**: <code>Tooltip</code> - a new Tooltip reference if there is a given tooltip string
otherwise null is returned.  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>any</code> | and object representing the props used to generate the tooltip. |

