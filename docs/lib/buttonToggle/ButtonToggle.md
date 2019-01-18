<a name="module_ButtonToggle"></a>

## ButtonToggle
A button control that switches between the given icons when clicked.
There are two forms for this component: controlled and uncontrolled.
The default process is controlled.  This means that the component will
maintain the internal toggled state of the command.  When the property
controlled is set to false, then the toggle state is managed by the
given *selected* property.  This property is ignored when the
component is controlled.

On each click the `onClick` callback is invoked and given the current
state.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/buttons-icons.png" width="70%" />

## Examples:

#### Controlled (default)
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

#### Uncontrolled
```javascript
import {ButtonToggle} from 'gadgets';
<ButtonToggle
    controlled={false}
    iconNameOn="star"
    iconNameOff="star-o"
    fgColorOn="red"
    fgColorOff="blue"
    selected={true}
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
- `bgColorOff: {string} ('inherit')` - The background color when the
button is in the off position.
- `bgColorOn: {string} ('inherit')` - The background color when the
button is in the on position
- `fgColorOff: {string} ('gray')` - The foreground color when the
button is in the off position
- `fgColorOn: {string} ('black')` - the foreground color when the
button is in the on position
- `iconNameOff: {string} ('bomb')` - the name of the font awesome icon
associated with the button when it is off.
- `iconNameOn: {string} ('bomb')` - the name of the font awesome icon
associated with the button when it is on.
- `initialToggle: {boolean} (false)` - the initial state of the button
This is different than selected, as it is only used when the button
is created.  It is ignored after creation (where selected is not)
- `selected: boolean (false)` - Sets the state of the button to
on (true) or off (false).

