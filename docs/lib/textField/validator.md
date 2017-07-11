<a name="Validator"></a>

## Validator
A container class used to hold validation code.  Creating an instance
of this class guarantees that the validation function, success, and failure
information is available in the instance.  The valiator is then used
by a TextField control to call the validation routine within the class.

#### Examples:

```javascript
import {Validator} from 'gadgets';

let fn = (value) => {
   return true;
}

let x = new Validator(fn, 'failure', 'success');
```
This instance is passed in the `validators` array list property to the
`TextField` control.  The `TextField` calls the `validate()`, with
the input data, to determine if the current state of that data is
valid.

**Kind**: global class  
