<a name="module_Divider"></a>

## Divider
The `Divider` component is used to put a space between elements in a
`Toolbar` control.  An enumeration named `DividerType` will be used
to determine a division character within the divider.  It can be one
of three types:

- horizontal (-)
- vertical (|)
- none

#### Examples:

```javascript
import {Button, Divider, DividerType, Sizing, Toolbar} from 'gadgets';

<Toolbar sizing={Sizing.small}>
    <Button />
    <Divider dividerType={Divider.vertical}/>
    <Button />
</Toolbar>
```

#### Events
None

#### Styles
- `ui-divider` - global style placed on the `<div>` element.  The div
is the only element in the component.

#### Properties
- `dividerType=Divider.none {DividerType}` - determines if a divide
character will be placed within the control.
- `sizing=Sizing.normal {Sizing}` - Sets the actual box size of the
element.  When used with a `Toolbar` this property is not needed as
the toolbar handled the sizing.

