<a name="module_globals"></a>

## globals
Responsible for loading required global objects before all other objects
in the library.  This module is imported once at the beginning of the
index.ts script at the root of the library.  Anything that must be
present in the global environment before the rest of the application
is loaded must be here.

<a name="module_globals.isDebug"></a>

### globals.isDebug() ⇒
Checks the environment for the debug flag environment variable.  If it is
defined, then it will resolve to true.  If it doesn't, exists, then the
package.json debug flag is checked.  If it exists it is returned as the
debug flag.  If it doesn't exist, then false is returned and debugging
is turned off.

The name of the environment variable for debugging is DEBUG_GADGETS if
in a node environment.

**Kind**: static method of [<code>globals</code>](#module_globals)  
**Returns**: true if debugging is turned on, otherwise false.  
