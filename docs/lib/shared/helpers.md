## Functions

<dl>
<dt><a href="#globalize">globalize(name, pkg, replace)</a> ⇒ <code>object</code></dt>
<dd><p>Takes a variable name and an object and places that name and associated
object into the global node space.  If the object is already in the
global space, then that reference is used and returned.  The replace
flag is used to override the current global reference.</p>
</dd>
<dt><a href="#isDebug">isDebug()</a> ⇒</dt>
<dd><p>Checks the environment for the debug flag environment variable.  If it is
defined, then it will resolve to true.  If it doesn&#39;t, exists, then the
package.json debug flag is checked.  If it exists it is returned as the
debug flag.  If it doesn&#39;t exist, then false is returned and debugging
is turned off.</p>
<p>The name of the environment variable for debugging is DEBUG_GADGETS if
in a node environment.</p>
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

<a name="isDebug"></a>

## isDebug() ⇒
Checks the environment for the debug flag environment variable.  If it is
defined, then it will resolve to true.  If it doesn't, exists, then the
package.json debug flag is checked.  If it exists it is returned as the
debug flag.  If it doesn't exist, then false is returned and debugging
is turned off.

The name of the environment variable for debugging is DEBUG_GADGETS if
in a node environment.

**Kind**: global function  
**Returns**: true if debugging is turned on, otherwise false.  
