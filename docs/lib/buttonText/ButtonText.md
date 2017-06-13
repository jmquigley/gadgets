<a name="module_ButtonText"></a>

## ButtonText
A typical button control widget that uses an icon and text.  The
text for the button is given as a property.  It can be left or
right justified using the justify property.

#### Examples:

```javascript
import {ButtonText} from 'gadgets';
<ButtonText
  text="some text"
  iconName="cab"
  justify={ButtonText.LEFT}
  onClick={someFunction}
  />
```

#### Events
- `onClick()` - This callback is invoked when the control is clicked by the user

#### Style
- `ui-button` - A top level style placed on the control that constructs the
button.
- `ui-buttontext` - A top level style used to differentiate this from generic
buttons.

#### Properties
- `iconName: string` - The name of the font awesome icon used with this button
- `justify: number` - Determines if the button will be on the left or the right.
Two constants are available: ButtonText.LEFT & ButtonText.RIGHT.  It uses right
by default.
- `text: string` - The text string used by the button
