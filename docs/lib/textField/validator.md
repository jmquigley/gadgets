<a name="Validator"></a>

## Validator
A container class used to hold validation code.  Creating an instance
of this class guarantees that the validation function, success, and failure
information is available in the instance.  The validator is then used
by a TextField control to call the validation routine within the class.

#### Examples:

```javascript
import {Validator} from 'gadgets';

const x = new Validator(
    (value: string) => {
        return true;
    },
    'failure',
    'success'
);
```

The function passed to the `Validator` class returns a boolean value.
If true is returned, then the validation call is successful, otherwise
validation has failed.  The success/failure messages are associated
with this validation routine and can be used to prompt with validation
info for this object.

These instances are passed to the `validators` array list property on the
`TextField` control.  The `TextField` calls the `validate()`, with
the input data to determine if the current state of that data is
valid.  This validators array can hold multiple instances of these
validation classes (generally different validations).  The validation
routine in the `TextField` will iterate through this array and use
the function and success/failure to perform this validation.

**Kind**: global class  
