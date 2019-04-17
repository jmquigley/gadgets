<a name="module_Break"></a>

## Break
A wrapper for the <br /> tag.  This respects the sizing base
property setting.

## Examples:

```javascript
import {Break} from 'gadgets';
<Break sizing={Sizing.small} />
```

## API
#### Events
N/A

#### Styles
- `ui-break` - placed on the root `<br>` tag

#### Properties
- `n=1 {number}` - repeat count for the component.  The default is one Break
This is used to create N consecutive breaks.

