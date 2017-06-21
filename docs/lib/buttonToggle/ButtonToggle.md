<a name="module_ButtonToggle"></a>

## ButtonToggle
A button control that switches between the given icons when clicked.
The state of the button is maintained until it is clicked again.  On
each click the `onClick` is invoked and given the current state.

#### Examples:

```javascript
import {ButtonToggle} from 'gadgets';
<ButtonToggle
    iconNameOn="star"
    iconNameOff="star-o"
    fgColorOn="red"
    fgColorOff="blue"
    sizing={Sizing.normal}
    onClick={somefunction}
    />
```

#### Events
- `onclick(toggle: boolean)` - When the button is clicked, then the
button toggle is changed.  This callback returns the current state
of the toggle.  True is on, false is off.

#### Styles
- `ui-button-toggle` - Style applied to the `<i>` button control.

#### Properties
- `bgColorOff: string ('inherit')` - The background color when the
button is in the off position.
- `bgColorOn: string ('inherit')` - The background color when the
button is in the on position
- `fgColorOff: string ('gray')` - The foreground color when the
button is in the off position
- `fgColorOn: string ('black')` - the foreground color when the
button is in the on position
- `initialToggle: boolean (false)` - The initial on (true) or
off (false) state of the button.
- `iconNameOff: string ('bomb')` - the name of the font awesome icon
associated with the button when it is off.
- `iconNameOn: string ('bomb')` - the name of the font awesome icon
associated with the button when it is on.

