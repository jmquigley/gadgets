<a name="module_TextField"></a>

## TextField
The TextField is a wrapper component for the built in `<input>` tag.  This
control allows the user to add validation routines to the input control
beyond the builtin routines.

Validations are used by creating an instance of the `Validator` class and
implementing a validation funtion, failure message, and success message.

Validation is NOT used by default.  It must be declared with a prop named
`usevalidation.  The control has five built in validation routines (defined
in validator.ts):

- max length (when used with the "max" parameter)
- min length (when used with the "min" parameter)
- email
- url
- regex

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/textField.png" width="60%" />

## Examples:

##### Simple
```javascript
import {TextField} from 'gadgets';

<TextField placeholder="simple" />
```
This will create a standard input text box with no validation.

##### Max/Min validator
```javascript
import {TextField, TextFieldType} from 'gadgets';

<TextField
    initialValue="abcde"
    maxLength="10"
    minLength="5"
    placeholder="min/max validation"
    type={TextFieldType.text}
    usevalidation
/>
```

This will create an input control that uses validation.  It will check the
width of the string to fall within the min/max range.  When the string is
outside of the validation range the red *error* message value will be used
too display a message below the control.  When it is within range a green
*success* message will be printed below.

##### Custom validator
```javascript
import {TextField, TextFieldType, Validator} from 'gadgets';

<TextField
    placeholder="custom"
    type={TextFieldType.text}
    usevalidation
    validators={[
        new Validator(
            (value: string) => {
                return /^[0-9a-zA-Z]+$/.test(value);
            },
            'Not alphanumeric only',
            'Contains only alphanumeric'
        )
    ]}
/>
```
This will create a control with a custom alphanumeric validation routine.

## API
#### Events
- `onBlur` - Invoked when focus on control is lost.
- `onChange` - Invoked each time a key is pressed.  The validation routine is
also called with each key.
- `onClear` - Invoked when the clear button is pressed in a search text control
- `onKeyDown` - Invoked when a key is pressed.  The escape key is checked
and if pressed the input is reverted to its previous setting.
- `onKeyPress` - Invoked when a key pressed.  When the "Enter" key is pressed
validation is performed and the `onValidation` routine is invoked and the
results of the validation are sent to the callback.
- `onValidation(flag: boolean)` - When enter is pressed this routine is
called.  If validation passes, then true is given to the callback.

#### Styles
- `ui-textfield` - Placed on the `<div>` used to wrap the `<input>` field.
- `ui-textfield-validation-message` - Placed on the `<div>` used to wrap the
validation message when the input contains validation code.

#### Properties
- `disabled=false {boolean}` - When true, the control is disabled
- `id='' {string}` - The CSS id for this control
- `initialValue='' {string}` - The first value set within the control.
This is only done one time when the compoment is constructued.
- `max='any' {string}` - the maxium number for a spinner text box.  When
set to "any" there is no size.
- `min='any' {string}` - the minimum  number for a spinner text box.  When
set to "any" there is no size.
- `noborder=false {boolean}` - Turns off the border around the component
- `sizing=Sizing.normal {Sizing}` - The font size for the control (see
the Sizing class in shared).
- `step='any' {string} - the increment number for a spinner text box.
When this is set to "any" the step is 1 by default.
- `type=TextFieldType.text {TextFieldtype}` - The type of input control.
This is the type defined by the [HTML input tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).  The
value is an enum that maps to these valid types.
- `useclear=false {boolean}` - When used it presents a circle "x" button
that will clear the current input from the control and set the focus to
the input.
- `usevalidation=false {boolean}` - If this is true then the validation
routines are exectued.
- `validators=[] {Validator[]}` - A list of Validator classes.  Each of the
classes in this list are used against the input to check if it passes the
rules set in that validator function.
- `value=undefined {any}` - This is will override whatever is currently in
the control.  It should only be used if the parent is going to control the
contents of the control.
- `visible=true {boolean}` - If set to false this control is hidden (set
to a display of none).

