<a name="module_Toast"></a>

## Toast
A popup that contains a message on the top or bottom of that container.
The message will disapper after N seconds.  Contains an X button to remove
sooner if the user desires.  A toast can also be persistent and then it
will only disappear when the user clicks the close button.

It contains four basic modes:

- info
- warning
- error
- custom

For this to work properly the container holding this control must have a
position of "relative".  The control relies on absolute positioning so the
parent needs to be relative for it to work.

Note that the "visible" property is handled internally.  The *show* property
is used to display the message within the `Toast`.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/toast.png" width="50%" />

## Examples:

```javascript
import {Toast, ToastLevel} from 'gadgets';

<Toast
    decay={true}
    level={ToastLevel.info}
    onClose={() => console.log('closed toast message')}
    show={true}
>
    This is a sample info message
</Toast>
```

```javascript
import {Toast, ToastLevel} from 'gadgets';

<Toast
    decay={false}
    level={ToastLevel.custom}
    show={true}
    style={{
        backgroundColor="#7fbf3f"
        borderColor="#3fbfbf"
        color="magenta"
    }}
>
    This is a sample custom message
</Toast>
```

## API
#### Events
- `onClick()` - If the user clicks the close button this event is invoked.
- `onClose()` - when the message is closed or disappers this callback is
invoked.  It takes no parameters.

#### Styles
- `ui-toast` - second level style placed on the content `<div>`.

#### Properties
- `usebottom=false {boolean}` - If this is true, then the message will be
drawn at the bottom of the container where the message generated,
otherwise the message is written to the top of the container.
- `decay=true {boolean}` - There are two types of Toast messages: decay and
persistent.  The decay type, when this property is true, will automatically
disapper after *duration*  seconds.  The persistent type will stay within
the container until the user presses the close button (X).
- `duration=3 {number}` - The number of seconds the message will appear when
using a message type of *decay* (see type below). e.g. "5" = five seconds.
- `level=ToastLevel.info {ToastLevel}` - The logging level of message that
will be printed.  This works like log4js levels and contains four basic
types: info, warning, error, and custom.  Each type has a special color scheme
associated with it (info is blue, warning is yellow, error is red).  An enumeration
named `ToastLevel` holds the value for each type (ToastLevel.info,
ToastLevel.warning, ToastLevel.error, ToastLevel.custom).
- `show=false {boolean}` - when set to true, the toast message is shown within
the container for the duration of its delay.  When false it is not shown.

