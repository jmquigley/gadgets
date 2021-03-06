<a name="module_Switch"></a>

## Switch
A button control that works like a toggle.  Pressing the button will turn it
on or off.  The color of the slider shows the state.  The default color for
the button when off is red, and when it is on it's green.  There are two
types of buttons: *inny* and *outy*.  The *inny* places the button within
the slider.  The *outy* makes an oversized button outside of the slider.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/switch.png" width="40%" />

## Examples:

```javascript
import {Switch, SwitchType} from 'gadgets';
<Switch
    initialToggle={true}
    onClick={(toggle: boolean) => {
        console.log(`clicked: ${toggle}`);
    }}
    switchType={SwitchType.inny}
/>
```

## API
#### Events
- `onClick(toggle: boolean)` - invoked when the circular toggle button is
clicked.  The callback is given a boolean parameter.  When true, the button
is *on*.  When it is false it is *off*.

#### Styles
- `ui-switch` - style applied to the root container for the component
- `ui-switch-slider` - style applied to the backgrond oval behind the button.
This changes color when the state is updated (turned on/off)
- `ui-switch-button` - applied to the circular slider button
- `ui-slider-on` - style applied when the state is *on* (true)
- `ui-slider-off` - style applied when the state is *off* (false)

#### Properties
- `initialToggle: {boolean} (false)` - The initial on/off state for the
toggle.
- `innyScale=0.6 {number}` - the percent sizing of the circle button
font size when using the Inny type.
- `noripple=false {boolean}` - Turns off the ripple effect that occurs
when the circular button is pressed.
- `outyScale=1.25 {number}` - the percent sizing of the circle button
font size when using the Outy type.
- `sliderScale=1.25 {number}` - the percent sizing of the slider portion
of the control as a percent of the font sizing.
- `switchType=SwitchType.outy {SwitchType}` - Sets the visual form for
control.  There are two types: `inny` and `outy`.

