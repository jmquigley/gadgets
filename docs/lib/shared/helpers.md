## Functions

<dl>
<dt><a href="#globalize">globalize(name, pkg, replace)</a> ⇒ <code>object</code></dt>
<dd><p>Takes a variable name and an object and places that name and associated
object into the global node space.  If the object is already in the
global space, then that reference is used and returned.  The replace
flag is used to override the current global reference.</p>
</dd>
<dt><a href="#sanitizeProps">sanitizeProps(props)</a> ⇒ <code>T</code></dt>
<dd><p>Removes all null props from the given object.  This is used by the
functions that retrieve default props for a component.</p>
</dd>
</dl>

<a name="globalize"></a>

## globalize(name, pkg, replace) ⇒ <code>object</code>
Takes a variable name and an object and places that name and associated
object into the global node space.  If the object is already in the
global space, then that reference is used and returned.  The replace
flag is used to override the current global reference.

**Kind**: global function  
**Returns**: <code>object</code> - the global instance reference  
**Params**

- name <code>string</code> - the name of the variable to store globally
- pkg <code>object</code> - the object associated with the variable name
- replace <code>boolean</code> - if true, then it will always overwrite the
current global (if it exists)

<a name="sanitizeProps"></a>

## sanitizeProps(props) ⇒ <code>T</code>
Removes all null props from the given object.  This is used by the
functions that retrieve default props for a component.

**Kind**: global function  
**Returns**: <code>T</code> - with nil props removed.  
**Params**

- props <code>T</code> - the props object for the given component

