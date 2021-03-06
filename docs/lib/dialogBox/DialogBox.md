<a name="module_DialogBox"></a>

## DialogBox
A modal, dialog box popup window for yes/no user decisions. It presents a
message, an icon, and two buttons.  One for yes (true) or no (false).
A callback is invoked when the user makes a choice to communicate that
choice.  Making a choice closes the window.  This component uses the
[react-modal](https://github.com/reactjs/react-modal) library.

It contains five types of windows:

- error (red x icon) - `DialogType.error`
- warning (yellow exclamation icon) `DialogType.warning`
- success (green check icon) `DialogType.success`
- info (blue i icon) `DialogType.info`
- custom (user selected from font awesome) `DialogType.custom`

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/dialogBox.png" width="50%" />

## Examples:

```javascript
import {DialogBox} from 'gadgets';

<DialogBox
    color="magenta"
    dialogType={DialogBoxType.custom}
    iconName="car"
    message="custom popup message"
    onSelection={(flag: boolean) => {
        console.log(`Dialog selection: ${flag}`);
    }}
    show
 />
```

## API
#### Events
- `onClose` - invoked when the dialog box is closed.
- `onOpen` - invoked when the dialot box is opened.
- `onSelection(boolean)` - When the choice is made this
callback is invoked with the choice.  If "yes" then true.
If "no" then false.

#### Styles
- `ui-dialogbox` - Placed on the `<div>` that surrounds the
popup message box.

#### Properties
- `dialogType=DialogType.info {DialogType}` - The type of icon
and color scheme for the popup.
- `iconName="bomb" {string}` - used with the custom type to set
a font awesome icon for this popup.
- `kbCancel="esc" {string}` - Keyboard combo that invokes the no
button.
- `kbClose="esc" {string}` - Keyboard combo that invokes the no
button.
- `kbOk: "alt+k" {string}` - Keyboard combo that invokes the
ok button
- `message="" {string}` - the user defined message used by the
popup window.  If the string contains newlines it will be
broken up into `<p>` blocks for each line.
- `show=false {boolean}` - When this value is true, then the
popup is displayed.

