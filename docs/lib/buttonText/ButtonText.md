<a name="module_ButtonText"></a>

## ButtonText
A typical button control widget that uses an icon and text.  The
text for the button is given as a property.  It can be left, right,
or center justified using the Justify enumeration.

#### Examples:

```javascript
import {ButtonText} from 'gadgets';
<ButtonText
    text="some text"
    iconName="cab"
    justify={Justify.left}
    onClick={someFunction}
/>
```

#### Events
- `onClick()` - This callback is invoked when the control is clicked by the
user

#### Style
- `ui-button` - A top level style placed on the control that constructs the
button.
- `ui-buttontext` - A top level style used to differentiate this from
generic buttons.

#### Properties
- `iconName="bomb" {string}` - The name of the font awesome icon used with
this button.
- `justify=Justify.right {Justify}` - Determines if the button will be on the
left, center, right.
- `kbActivate="" {string}` - Invokes the keyboard handler for the button for
the given sequence.
- `noicon=false {boolean}` - Turns off the icon and only shows the text in
the center of the button.
- `text="" {string}` - The text string used by the button

