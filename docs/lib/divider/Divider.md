<a name="module_Divider"></a>

## Divider
The `Divider` component is used to put a space between elements in a`Toolbar` control.#### Examples:```javascriptimport {Button, Divider, Sizing, Toolbar} from 'gadgets';<Toolbar sizing={Sizing.small}>    <Button />    <Divider />    <Button /></Toolbar>```#### EventsNone#### Styles- `ui-divider` - global style placed on the `<div>` element.  The divis the only element in the component.#### Properties- `sizing {Sizing} (Sizing.normal)` - Sets the actual box size of theelement.  When used with a `Toolbar` this property is not needed asthe toolbar handled the sizing.

