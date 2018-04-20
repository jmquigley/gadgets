<a name="module_Button"></a>

## Button
A typical button control widget.  This control only uses an icon and no text
to represent the button.  The icons are [Font Awesome](http://fontawesome.io/)
strings.  That library is built into this module, so any font available in
the current release of that library is available.  The buttons fill the size
of their parent container.

#### Examples:

```javascript
import {Button} from 'gadgets';
<Button iconName="cab" onClick={someFunction} />
```

#### Events
- `onClick()` - This callback is invoked when the control is clicked by the
user

#### Styles
- `ui-button` - A top level style placed on `<i>` control that constructs the
button.

#### Properties
- `iconName: string ('bomb')` - the name of the font awesome icon used with
this button
- `iconStyle: string ('')` - a CSS style class name that will be added to the
icon within the button.
- `sizing: Sizing` - Allows one to change the size of the icon within the
button.
See the shared props object for the `Sizing` enumeration.

