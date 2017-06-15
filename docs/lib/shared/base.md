<a name="module_BaseComponent"></a>

## BaseComponent
The base class for all components in the library.  This enables each module
to guarantee certain variable will be present through inheritance.  These
variables include:

- classes - an array of CSS classnames that will be used on the root element
of the control
- inlineStyles - an object that holds user defined style overrides
- styles - an object that represent the styles in the CSS module associated
to this control.

#### Examples:

```javascript
import {BaseComponent} from '../shared';
...
export class XYZ extends BaseComponent<Props, State> {
   ...
}
```

