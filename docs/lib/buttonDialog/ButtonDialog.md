<a name="module_ButtonDialog"></a>

## ButtonDialog
A button control that opens up a local dialog box when clicked.
The dialog box content is the child content of the control.  When the
button is clicked the hidden dialog window is shown.  See the `Button` control
for additional events and properties.

#### Examples:

```javascript
import {ButtonDialog} from 'gadgets';
<ButtonDialog
    iconName="bars"
    onClick={someFunction}
    sizing={Sizing.normal}
>
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
- `dialogClasses=[] {string[]}` - An array of CSS class strings that will be
applied to the dialog window.
- `kbActivate="" {string}` - Invokes the keyboard handler for the button for the
given sequence.
- `location=Location.bottom {Location}` - Determines if the popup will be shown
above or below the button.  Only uses `Location.top` or `Location.bottom`.
- `notriangle=false {boolean}` - If true this will suppress the triangle pointer
within the dialog popup.  The default is to show it.
- `triangleClasses=[] {string[]}` - An array of CSS class strings that will be
applied to the dialog box triangle.

