<a name="module_BaseComponent"></a>

## BaseComponent
The base class for all components in the library.  This enables each module
to guarantee certain variable will be present through inheritance.  These
variables include:

- `boxSizeStyle` -  Each `Icon` control exists within a box/square.  The
`sizing` parameter determines which CSS class will be used for this box size.
- `classes` - an array of CSS classnames that will be used on the root element
of the control
- `inlineStyles` - an object that holds user defined style overrides
- `locationStyle` - There are 9 locations within a region: topLeft, top,
topRight, middleLeft, middle, middleRight, bottomLeft, bottom, bottomRight. The
location prop is used to specify the CSS used to calculte this position in a
control using transform and relative coordinates.
- `sizeStyles` - The BaseProps used by most controls contains a field named
`sizing`.  When this prop is set, then this variable will contain the name
of the CSS class for that sizing type for fonts.
- `styles` - an object that represent the styles in the CSS module associated
to this control.

The values of these variables are computed automatically for any component
that inhertis from BaseComponent (controlled by props).

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
In the example above the `sizeStyle` and `locationStyle` would be computed
automatically for the given values.  These values are then available to the
child class to use in building the component using these styles.

