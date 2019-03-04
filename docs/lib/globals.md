<a name="module_globals"></a>

## globals
Responsible for loading required global objects before all other objects
in the library.  This module is imported once at the beginning of the
index.ts script at the root of the library.  Anything that must be
present in the global environment before the rest of the application
is loaded must be here.

