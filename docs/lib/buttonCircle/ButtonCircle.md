<a name="module_ButtonCircle"></a>

## ButtonCircle
Works like a typical button control, but instead of a square button the
clickable surface is within a circle.  This type of button does NOT fill
the parent container.  Its size is determined by the sizing parameter.

#### Examples:

```javascript
import {ButtonCircle} from 'gadgets';

<ButtonCircle
    iconName="times"
    sizing={Sizing.small}
    onClick={someFunction}
    style={{
        color: "green",
        backgroundColor: "orange",
        borderColor: "green"
    }}
/>
```

#### Events
- `onClick()` - This callback is invoked when the control is clicked by the
user

#### Styles
- `ui-button-circle` - A top level style placed on the `<div>` container for
the control.

#### Properties
- `iconName="bomb" {string}` - the name of the font awesome icon used with
this button
- `kbActivate="" {string}` - Invokes the keyboard handler for the button for the
given sequence.
- `sizing: Sizing (Sizing.normal)` - Allows one to change the size of the
icon within the button.  See the shared props object for the `Sizing`
enumeration.
- `style {any}` - custom styles applied to the icon image within the circle
  - `backgroundColor {string}` - The color of the background of the button
  - `borderColor="black" {string}` - The color of the border around the
  circle.
  - `color="black" {string}` - the color of the button icon

