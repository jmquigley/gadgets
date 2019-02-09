<a name="module_Label"></a>

## Label
A text label string control that can be edited.  The label can be double
clicked to enter editint mode (similar to a text field).  This behavior can
also be suppressed to make the text static.  The contorl is a `<span>`
element surrounding text.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/label.png" width="30%" />

## Examples:

```javascript
import {Label} from 'gadgets';

<Label
    focus
    text="label text"
/>
```

## API
#### Events
- `onBlur` - Invoked when the focus moves away from the label
- `onChange(val: string)` - Invoked when a label is changed.  This happens
when editing the control and pressing enter or losing focus (blur).
- `onClick` - Invoked when the label is clicked.
- `onDoubleClick` - Invoked when the user double clicks on the control.  This
will cause the control to enter an editing mode.
- `onKeyDown` - Invoked when a key is initially pressed.  This captures the
"escape" key and reverts the text to its previous state if in edit mode.
- `onKeyPress' - Invoked when a key is pressed.  This captures the "Enter"
key to commit a user edit to the text of the control if editing.
- onUpdate(previous: string, text: string)` - Invoked when the label is
changed from one value to another.  The previous text and new text are passed
to the callback.

#### Styles
- `ui-label` - Applied to the surrounding `<span>` element for all labels

#### Properties
- `defaultText: {string} ('default')` - If the text is fully deleted from the
label, then this text is put in as a placeholder.
- `focus: {boolean} (false)` - If true, then this control is given the focus
- `noedit: {boolean} (false)` - If true, then the control can't be edited
- `text: {string} ('')` - the text value associated with the label.
- `useedit: {boolean} (false)` - If true, then the control is initially placed in
edit mode.

