<a name="module_Option"></a>

## Option
A checkbox/radio button control.  This is a specialized wrapper of the
ButtonToggle control.  It contains an enum named OptionType used to
determine what visual type the control will take on.  The options are:

- square
- squareFilled
- squareReverse
- circle
- circleFilled
- circleReverse
- times
- timesReverse
- dot
- star

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/option.png" width="50%" />

## Examples:

```javascript
import {Option, OptionType} from 'gadgets';
<Option
    onClick={(val: boolean, text: string) => debug('val: %o, text: %o', val, text)}
    optionType={OptionType.square}
    selected
    text="lorem ipsum"
/>
```

## API
#### Events
- `onSelection(toggle: boolean, text: string)` - When the option is clicked, then
the button display is changed (toggled).  The callback returns the current state of
the toggle and the text label associated with the option.  When the button is "clear",
it is off and "false" is sent to the callback.  When the button is "checked", it is
on and true is sent to the callback.

#### Styles
- `ui-option` - Style applied to the root `<div>` of the control.

#### Properties
- `initialToggle: {boolean} (false)` - the initial state of the button
This is different than selected, as it is only used when the button
is created.  It is ignored after creation (where selected is not)
- `optionType: {OptionType} (OptionType.square)` - An enumerated type that will
determine what icons will be displayed.  They are listed above.
- `selected: {boolean} (false)` - determines the initial state of the
control.  If true, then the control is "checked", otherwise it is "off"
- `text: {string} ('')` - text string to the right of the control

