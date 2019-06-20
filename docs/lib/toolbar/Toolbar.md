<a name="module_Toolbar"></a>

## Toolbar
A typical toolbar control.  It takes a set of buttons and controls and
displays the on a horizontal control.  It will only accept a specific
set of controls (from the Gadgets library)

- Button
- ButtonCircle
- ButtonDialog
- ButtonText
- ButtonToggle
- Divider
- Dropdown
- Label
- Option
- Switch
- TextField

Note that if a component is wrapped in a styled component and placed in the
toolbar it will NOT work.  The class name is lost when by the styled
component is applied (and becomes display name).  The child components should
not be wrapped.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/toolbar.png" width="60%" />

## Examples:

```javascript
import {Button, Sizing, Toolbar} from 'gadgets';

<Toolbar justify={Justify.left} sizing={Sizing.small}>
    <Button iconName="cab" onClick={someFunction} />
    <Divider />
    <Option />
    ...
</Toolbar>
```

## API
#### Events
None

#### Styles
- `ui-toolbar` - global style placed on the root `<div>` component of the
toolbar.
- `ui-toolbar-group` - The components are all placed within a grouping
div to set its left/right/center justification.  This global style is
placed on this div.

#### Properties
- `justify=Justify.left {Justify}` - The toolbar can be placed to the left
(default), center, or right within its container.  The property sets that
location.

