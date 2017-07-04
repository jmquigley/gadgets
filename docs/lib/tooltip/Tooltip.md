<a name="module_Tooltip"></a>

## Tooltip
A tooltip is a text popup window associated with a control.  It
is used to give help or feedback to the user on the use of that
control.  This `Tooltip` component is embedded within another
widget.  Generally that parent widget would control whether the
tooltip is displayed.  There are two ways to show the widget:

1. In the parent control use the `show` parameter as part of the
control's state to activate/deactive it.  Just maintain the state
within the parent using it.
2. Manipulate the tooltip directly through styles.  The demo
application uses this approach.  The tooltip is initially set
to an opacity of 0.  The app can use ":hover" on that element
to set the opacity to 1.0.

The preferred method is #1.  The second method works, but would
be considered fragile as it relies on internal knowledge of the
component, so it could change.

#### Examples:

```javascript
import {Tooltip} from 'gadgets';

<div>
    ...
    <Tooltip location={Location.topRight} show={this.state.show} />
</div>
```

#### Events
None

#### Styles
- `ui-tooltip` - Applied to the top level `<div>` in the control
- `ui-tooltip-content` - Applied to the container around the content
(text) of the tooltip.

#### Properties
- `color: string ('white')` - the color of the tooltip text
- `backgroundColor: string ('gray')` - the color of the containing
box
- `location: Location (Location.middleRight)` - when the tooltip is
displayed this is the side of the parent control where it will be
displayed.
- `show: boolean (false)` - if this is set to true, then the component
is displayed (opacity set to 1.0).  When set to false then the
opacity is set to 0.

