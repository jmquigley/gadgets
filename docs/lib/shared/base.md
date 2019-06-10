<a name="module_BaseComponent"></a>

## BaseComponent
The base class for all components in the library.  This enables each module
to guarantee certain variables will be present through inheritance.

The values of these variables are computed automatically for any component
that inherits from BaseComponent (controlled by props).  This class inherits
from `React.PureComponent` to take advantage of `shouldComponentUpdate`
shallow object comparison when computing styles based on props/state.

#### Examples:

```javascript
import {BaseComponent} from '../shared';
...
export class XYZ extends BaseComponent<Props, State> {
   ...
}

...

<XYZ sizing={Sizing.xxsmall} location={Location.topRight} />
```

In the example above the `sizing` and `location` would be computed
automatically for the given values.  These values are then available to the
child class to use in building the component using these styles.

