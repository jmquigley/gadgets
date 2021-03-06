<a name="module_Tag"></a>

## Tag
A wrapper for a single string value that will appear within a `TagList`.
A tag can be static or contain a delete button within it.  This control
would generally just be used within the `TagList`.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/tagList.png" width="40%" />

## Examples:

```javascript
import {Tag} from 'gadgets';
<Tag usedelete>strvalue</Tag>
```

## API
#### Events
- `onClick` - invoked when the user clicks on the delete button within the
control.  This is only visible when `usedelete` is specified.
- `onDelete(tag: string)` - invoked when the delete button is pressed.  The
value of the tag is given to the callback as a parameter.
- `onMouseOut` - invoked when the mouse leaves the control
- `onMouseOver` - invoked when the mouse moves over the control.

#### Styles
- `ui-tag` - placed on the root `<div>` of the control.

#### Properties
- `usedelete=false {boolean}`- if true then the delete button will be
shown when the mouse enters the tag, otherwise this is suppressed.

