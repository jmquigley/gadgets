<a name="module_Triangle"></a>

## Triangle
Uses SVG to draw and fill a triangle image.  This triangle can then be used
in other controls as a "pointer" (like the triangle in a tooltip).  It
follows the libraries typical sizing constraints.  It can be drawn in one
of four directions using the direction prop.  It can be thought of as how
the triangle points out its direction.  The direction is based on the
`Direction` enum.  The four directions are:

- Direction.up
- Direction.down
- Direction.left
- Direction.right

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/triangle.png" width="60%" />

## Examples:

```javascript
import {Direction, Sizing, Triangle} from 'gadgets';
<Triangle sizing={Sizing.large} direction={Direction.up} />
```

## API
#### Events
N/A

#### Styles
- `ui-triangle` - global style placed on the `<svg>` root element

#### Properties
- `direction: {Direction} (Direction.up)` - Determines the direction the
triangle will point.
- `nobase: {boolean} (false)` - When set to true, then the side opposite the
"pointer" angle will not have a line drawn.  The typical triangle has a
border on all three sides drawn.  This will exclude this side.  This is
used when overlaying a triangle on the edge of another control.

