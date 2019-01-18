<a name="module_DialogWindow"></a>

## DialogWindow
A modal dialog window.  This component uses the [react-modal](https://github.com/reactjs/react-modal)
library.  The component presents a propup window with a title bar and a
close button.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/dialogWindow.png" width="50%" />

## Examples:

```javascript
import {DialogWindow} from 'gadgets';

<DialogWindow
   height="600px"
   icon="plane"
   onClose={this.handleCloseDialog}
   onOpen={this.handleOpenDialog}
   show={true}
   title="Demo Dialog Window"
   width="600px"
>
    <span>Dialog Content</span>
</DialogWindow>
```

## API
#### Events
- `onClose()` - callback invoked when the dialog window is closed.
- `onOpen()` - callback invoked when the dialog window is opened.

#### Styles
- `ui-dialogwindow` - Placed on the main `<div>` component that surrounds
the whole component.
- `ui-dialogwindow-content` - Placed on the `<div>` that surrounds the child
content given to the window.

#### Properties
- `height {string} ('400px')` - the height, in pixels, of the dialog area
- `icon {string} ('window-restore')` - A font awesome icon that will be on
the right side of the title bar
- `show {boolean} (false)` - when set to true the window is shown, otherwise
it is hidden.
- `title {string} ('Dialog Window')` - A text string shown within the title
bar of the dialog window
- `width {string} ('400px')` - the width, in pixels, of the dialog area

