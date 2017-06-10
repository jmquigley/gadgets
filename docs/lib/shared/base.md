<a name="baseClasses"></a>

## baseClasses(props, opts) ⇒ <code>string</code>
All of the components share a similar way of creating the initial CSS class list
for that module.  This function initializes that common behavior.

**Kind**: global function  
**Returns**: <code>string</code> - a string containing the initial CSS classes that are common
for every component.  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>BaseProps</code> | the base properties for the component |
| opts | <code>BaseOptions</code> | these options allow the user to turn off setting of defaults within this function.  By default they are all on. |

