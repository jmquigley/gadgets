<a name="module_Wrapper"></a>

## Wrapper
This component surrounds (wraps) all other components in the library.  It
is used to catch potential errors within the control.  These are
[error boundaries](https://reactjs.org/docs/error-boundaries.html)
that are new to React 16.  It also wraps the
[ThemeProvider](https://www.styled-components.com/docs/api#themeprovider)
used by the [styled-components](https://reactjs.org/docs/error-boundaries.html).

## Screen:
#### Before
<img src="https://github.com/jmquigley/gadgets/blob/master/images/wrapper-before.png" width="50%" />

#### After
<img src="https://github.com/jmquigley/gadgets/blob/master/images/wrapper-after.png" width="50%" />

## Examples:

```javascript
import {Wrapper} from 'gadgets';
<Wrapper
    className="test-class"
    onError={(error, errorInfo) => {
        console.log(error, errorInfo);
    }
    reset
>
    <BuggyComponent />
</Wrapper>
```

In this example if the `<BuggyComponent>` throws an error, then this Wrapper
will catch the error and present a fallback component that prevents React
from crashing the rest of the app/components.

## API
#### Events
- `onError(error: any, errorInfo: any)` - When an error is captured by the
React `componentDidCatch` method and handled, this callback is also invoked
so that the user can respond outside of this control.

#### Styles
- `ui-error` - The top level `<div>` control around the error block.
- `ui-error-message` - A `<span>` around the error message from the Error
thrown from the component.
- `ui-error-stack` -  A `<details>` block that contains the stack trace of
the thrown Error.

#### Properties
- `children=null {React.ReactNode}` - The underlying components that are
surrounded by this wrapper.
- `err=null {any}` - A custom react component that can be used as the
error output.  This is used to override the default error output.
- `name="Unknown" {string}` - the name of the component where this Wrapper
object is used.
- `reset=false {boolean}` - After a component is wrapped, and an error is
thrown, the state of *error* will be permanent within the component.  Passing
reset as a prop to the wrapper allows the Error condition to be reset.  This
would be used if there is a facility in place within the component to
react/retry conditions that lead to fixed component.  Without this reset it
would be impossible to reset the internal state of the wrapper on retry.

