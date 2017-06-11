<a name="module_Button"></a>

## Button
A typical button control widget.  This control only uses an icon and no text
to represent the button.  The icons are [Font Awesome](http://fontawesome.io/)
strings.  That library is built into this module, so any font available in
the current release of that library is available.

#### Examples:

```javascript
import {Button} from 'gadgets';
<Button iconName="cab" onClick={someFunction} />
```

#### Events
- `onClick()` - when the button control is clicked by the user

#### Styles
- `ui-button` - top level style placed on `<i>` control that constructs the
button.

#### Properties
- `iconName: string` - the name of the font awesome icon used with this button
- `iconSize: number` - Allows one to change the size of the icon within the button.
the sizes are: IconSize.small, IconSize.medium, IconSize.large, IconSize.xlarge

