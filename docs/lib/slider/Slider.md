<a name="module_Slider"></a>

## Slider
The Slider control creates a horizontal line overlapped by a chevron that can
be moved  along this horizontal line.  The line represents a min/max range.
The Slider value increases when the chevron is moved to the right and
decreases when moved to the left.  When the chevron is released the current
position is given via an onSelection callback.

The min/max values must be >= 0.  The control width is represented by this
positive range.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/slider.png" width="50%" />

## Examples:

#### Simple slider, range 0 - 100, with tick marks at 0, 25, 50, 75, 100 with snap
```javascript
import {Slider} from 'gadgets';

<Slider
    max={100}
    min={0}
    onSelection={(val: number) => debug('slider select: %o', val)}
    scale={2}
    snap
    ticks={5}
/>
```

## API
#### Events
- `onSelection(val: number)` - When the user releases the slider chevron this
callback is invoked and given the index where the chevron "landed"

#### Styles
- `ui-slider` - The `div` around the whole control (the root)
- `ui-slider-bar` - The `div` that makes up the central bar that the chevron
will slide over.
- `ui-slider-element` - the `div` that represents the draggable chevron
- `ui-slider-tick` - when tick marks are displayed on the control, this class
is attached to each.  The ticks are a `div` container

#### Properties
- `max: {number} (100)` - The maximum size of the range, counting by 1's
- `min: {number} (0)` - The starting point for the range
- `scale: {number} (1)` - A sizing (width) multiplier for the range.  It doens't
change the counting range, but just the drawing size.  A scale of 2 with the
default min/max would yield a width of 200px, but the range would still be 0-100
- `snap: {boolean} (false)` - When the ticks option is used this will determine
if the chevron slider will be forced to fall on one of the tick marks.
- `startPosition: {number} (0)` - the range start position between min/max
- ticks: {number} (0)` - A visual number of "stopping" points along the slider
These are divided evenly into the range of the slider.  e.g. a setting of 5
would show 5 tick marks along the slider.  These positions are also used as a
landing point when snap is set to true.

