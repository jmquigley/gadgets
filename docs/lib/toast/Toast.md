<a name="Toast"></a>

## Toast
A popup that contains a message on the top or bottom of that container.
The message will disapper after N seconds.  Contains an X button to remove
sooner if the user desires.  It contains four basic modes:

- info
- warning
- error
- custom

For this to work properly the container holding this control must have a
position of "relative".  The control relies on absolute positioning so the
parent needs to be relative for it to work.

#### Examples:

```javascript
import {Toast, ToastLevel, ToastType} from 'gadgets';

<Toast
	level={ToastLevel.info}
	type={ToastType.persistent}>
	This is a sample info message
</Toast>
```

```javascript
import {Toast, ToastLevel, ToastType} from 'gadgets';

<Toast
	level={ToastLevel.custom}
	backgroundColor="#7fbf3f"
	color="magenta"
	borderColor="#3fbfbf"
	type={ToastType.persistent}>
	This is a sample custom message
</Toast>
```

#### Events
- `onClose()` - when the message is cloed or disappers this callback is
invoked.  It takes no parameters.

#### Styles
- `ui-toast` - second level style placed on the content `<div>`.

#### Properties
- `backgroundColor: string` - When using a custom type this will be the CSS
background color for the message.
- `borderColor: string` - When using a custom type this will be the CSS
color of the border around the message.
- `color: string` - When using a custom type this will be the color of the
message text.
- `bottom: boolean` - If this is true, then the message will be drawn at the
bottom of the container where the message generated, otherwise the message
is written to the top of the container.
- `duration: number` - The number of seconds the message will appear when
using a message type of *decay* (see type below). e.g. "5" = five seconds.
- `level: ToastLevel` - The logging level of message that will be printed.
This works like log4js levels and contains four basic types: info, warning,
error, and custom.  Each type has a special color scheme associated with it
(info is blue, warning is yellow, error is red).  An enumeration named
`ToastLevel` holds the value for each type (ToastLevel.info, ToastLevel.warning,
ToastLevel.error, ToastLevel.custom).
- `type: ToastType` - There are two types of Toast messages: decay and
persistent.  The decay type will automatically disapper after *duration*
seconds.  The persistent type will stay within the container until the user
presses the close button (X).  The default type is *decay*.  An enumeration
named `ToastType` holds the value for each type (ToastType.decay,
ToastType.persistent).
- `visible: boolean` - if this is false, then the control is not displayed.
It is true by default.

**Kind**: global class  
