## Functions

<dl>
<dt><a href="#debug">debug(context, ...args)</a></dt>
<dd><p>A wrapper for the debug function.  It uses the package.json to enable or
disable debugging information in the library.  It also turns off
coverage checks for this function.</p>
</dd>
<dt><a href="#globalize">globalize(name, pkg, replace)</a> ⇒ <code>object</code></dt>
<dd><p>Takes a variable name and an object and places that name and associated
object into the global node space.  If the object is alread in the
global space, then that reference is used and returned.  The replace
flag is used to override the current global reference.</p>
</dd>
</dl>

<a name="debug"></a>

## debug(context, ...args)
A wrapper for the debug function.  It uses the package.json to enable or
disable debugging information in the library.  It also turns off
coverage checks for this function.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>string</code> | the name of the module where this debug request is made. |
| ...args | <code>Array.&lt;object&gt;</code> | the list of arguments passed to the the debug function. |

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

