<a name="module_Badge"></a>

## Badge
The Badge widget is used to annotate/overlay another widget with a counter.
This widget surrounds the component it will annotate.  The control receives
a prop named `counter` that sets the actual value.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/badge.png" width="60%" />

## Examples:

```javascript
import {Badge} from 'gadgets';
<Badge
    counter={this.state.count}
    location={Location.topRight}
    >
    <div>...</div>
</Badge>
```

## API
#### Events
- `onClick(event)` - when the counter value is clicked this callback is invoked.
- `onUpdate(counter: number)` - Invoked when the badge count is updated/set.

#### Styles
- `ui-badge` - Top level class on the `<div>` of the badge (not the
container)
- `ui-badge-container` - This class is on the div that surrounds the
badge and the child component that it decorates.

#### Properties
- `counter=0 {number}` - The number value displayed by the badge
- `suppress=false {boolean}` - If this is set to true, then numbers less
than 1 are not shown, otherwise all values are shown.

