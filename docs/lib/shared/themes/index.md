<a name="module_themes"></a>

## themes
Handles management of themes within the gadgets library.  It contains two
methods: `setTheme` and `getTheme`.  By default the library is initialized
with the *base* theme.  A theme represents an object with key/value pairs
that can be used within a styled component.  The theme object is passed
to a styled component with the `ThemeProvider` [wrapper](https://www.styled-components.com/docs/advanced#theming)

It contains the following themes:

- base - the basic color scheme for the gadgets library
- custom - a user defined theme.  It is empty unless the user created one
during the `setTheme` call.
- dark
- light

See the './lib/shared/themes/base.json' for the keys that should be used
within a custom object implementation.

#### Examples:

```javascript
import {getTheme, setTheme, Theme} from 'gadgets';

setTheme(Theme.dark);

...

render(
    <ThemeProvider theme={getTheme()}>
        ...
    </ThemeProvider>
);
```


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
themes that are available.  
<a name="module_themes..setTheme"></a>

### themes~setTheme(custom, theme) ⇒ <code>ThemeProps</code>
Sets the current internal theme to the requested name (if it exists)
If the requested theme doesn't exist, then the `base` theme is set.

**Kind**: inner method of [<code>themes</code>](#module_themes)  
**Returns**: <code>ThemeProps</code> - a reference to the current theme object  

| Param | Type | Description |
| --- | --- | --- |
| custom | <code>Object</code> | a custom theme object |
| theme | <code>Theme</code> | a reference to the name of the theme that should be selected and set within this module. |

