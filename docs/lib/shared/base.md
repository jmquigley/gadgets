<a name="BaseComponent"></a>

## BaseComponent
A base class between React and all components in the module.

**Kind**: global class  
<a name="BaseComponent+getSizeStyle"></a>

### baseComponent.getSizeStyle() ⇒ <code>string</code>
Takes a sizing parameter and a styles object and searches for the
corresponding style class CSS.  If it is found, then it returns the local
style for that size.

**Kind**: instance method of [<code>BaseComponent</code>](#BaseComponent)  
**Returns**: <code>string</code> - the name of the local style for that size.  If
it is not found, then an empty string is returned.  
