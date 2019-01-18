<a name="module_Tooltip"></a>

## Tooltip
A tooltip is a text popup element associated with a control.  It
is used to give help or feedback to the user on the use of that
control.  This `Tooltip` component is embedded within another
widget.  The *parent* widget contains an id.  The `Tooltip` is
given the same id as the *parent* prop.  When the *mouseenter* event
is invoked on the parent component the tooltip is displayed.  When
the *mouseleave* event occurs the tooltip is hidden.

Note that the tooltip is set by position *absolute*.  The container
that will hold the `Tooltip` component must be position *relative*
or the  component will be placed as absolute from the beginning of the
document.

#### Examples:

```javascript
import {Tooltip} from 'gadgets';

<div id="uniqueId">
    ...
    <Tooltip location={Location.topRight} parent="uniqueId">tooltip string</Tooltip>
</div>
```

#### Events
None

#### Styles
- `ui-tooltip` - Applied to the top level `<div>` in the control
- `ui-tooltip-content` - Applied to the container around the content
(text) of the tooltip.

#### Properties
- `color: string ('white')` - the color of the tooltip text
- `backgroundColor: string ('gray')` - the color of the containing
box
- `location: Location (Location.middleRight)` - when the tooltip is
displayed this is the side of the parent control where it will be
displayed.
- `parent: {string} ('')` - The id of the component where this tooltip
will be applied.

<a name="module_Tooltip..tooltip"></a>

### Tooltip~tooltip(props) ⇒ <code>Tooltip</code>
Creates a tooltip object for use within a control.  It will check the given
props for a tooltip string.  If it has one, it will create the object and
return it.  If it doesn't have it, then NULL is returned.

**Kind**: inner method of [<code>Tooltip</code>](#module_Tooltip)  
**Returns**: <code>Tooltip</code> - a new Tooltip reference if there is a given tooltip string
otherwise null is returned.  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>any</code> | and object representing the props used to generate the tooltip. |

