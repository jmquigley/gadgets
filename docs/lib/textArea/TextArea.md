<a name="module_TextArea"></a>

## TextArea
A multiline text editing component.  It is a a contenteditable div.  As text
is added to the component the onUpdate callback is executed to pass the
contents that have chnaged.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/textarea.png" width="60%" />

## Examples:

```javascript
import {TextAra} from "gadgets";

<TextArea
    maxRows={10}
    onUpdate={callback}
    value={initial text}
/>
```

## API
#### Events
- `onUpdate(text: string)` - Invoked when the text within the component is changed.
The current text in the component is passed to the callback.

#### Styles
- `ui-textarea` - Placed on the `<div>` component that wraps the text component.

#### Properties
- `rows=5 {number}` - The number of lines displayed within the component.
- `updateDelay=150 {number}` - The onUpdate function is called when the text is
updated.  This is a debounce delay to rate limit how often this function is
called when input into the control is fast.  The number is milliseconds.
- `value=null {string}` - a string value that will overwrite the contents of
the current component.

