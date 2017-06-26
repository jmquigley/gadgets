<a name="module_ButtonDialog"></a>

## ButtonDialog
A button control that opens up a local dialog box when clicked.
The dialog box content is the child content of the control.  When the
button is clicked the hidden dialog window is shown.  See the `Button` control
for additional events and properties.

#### Examples:

```javascript
import {ButtonDialog} from 'gadgets';
<ButtonDialog iconName="bars" sizing={Sizing.normal} onClick={someFunction}>
   ... dialog popup content
</ButtonDialog>
```

#### Events
- `onClick()` - This callback is invoked when the control is clicked by the user

#### Styles
- `ui-button-dialog` - A top level style placed on the `<div>` element that contains
the button and the hidden dialogue window.
- `ui-dialog-popup` - Exists on the hidden dialog window.

#### Properties
- `dialogClasses: string[] ([])` - An array of CSS class strings that will be
applied to the dialog window.
- `location: Location (Location.bottom)` - Determines if the popup will be shown
above or below the button.  Only uses `Location.top` or `Location.bottom`.

