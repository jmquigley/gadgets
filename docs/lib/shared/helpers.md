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

