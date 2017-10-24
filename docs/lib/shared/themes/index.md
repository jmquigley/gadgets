<a name="module_themes"></a>

## themes
Handles management of themes within the gadgets library.  It contains two


* [themes](#module_themes)
    * [~getTheme(theme)](#module_themes..getTheme) ⇒ <code>ThemeProps</code>
    * [~getThemeList()](#module_themes..getThemeList) ⇒ <code>Array.&lt;string&gt;</code>
    * [~setTheme(custom, theme)](#module_themes..setTheme) ⇒ <code>ThemeProps</code>

<a name="module_themes..getTheme"></a>

### themes~getTheme(theme) ⇒ <code>ThemeProps</code>
Retrieves the object representing the requested theme.

**Kind**: inner method of [<code>themes</code>](#module_themes)  
**Returns**: <code>ThemeProps</code> - the key/value object that contains CSS settings  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>Theme</code> | a reference to the name of the theme that should be selected and set within this module. |

<a name="module_themes..getThemeList"></a>

### themes~getThemeList() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: inner method of [<code>themes</code>](#module_themes)  
**Returns**: <code>Array.&lt;string&gt;</code> - an array of strings that represent the names of all
<a name="module_themes..setTheme"></a>

### themes~setTheme(custom, theme) ⇒ <code>ThemeProps</code>
Sets the current internal theme to the requested name (if it exists)

**Kind**: inner method of [<code>themes</code>](#module_themes)  
**Returns**: <code>ThemeProps</code> - a reference to the current theme object  

| Param | Type | Description |
| --- | --- | --- |
| custom | <code>Object</code> | a custom theme object |
| theme | <code>Theme</code> | a reference to the name of the theme that should be selected and set within this module. |
