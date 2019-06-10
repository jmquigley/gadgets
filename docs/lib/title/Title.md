<a name="module_Title"></a>

## Title
A reusable title block used to format two items: a title and
a widget.  The title is generally a text string and the widget
can be a text string or another control.  The control takes these
two items and presents them in one of four layouts controled by
the enum `TitleLayout`:

- TitleLayout.quarter
- TitleLayout.even
- TitleLayout.threequarter
- TitleLayout.third
- TitleLayout.stacked
- TitleLayout.dominant
- TitleLayout.none

In `quarter` the title takes up 25% and the widget takes up 75%
In `even` the title and widget take up 50%
In `threequarter` the title takes up 75% and the widget takes up 25%
In `third` the titel takes up 33% of the space
In `stacked` the title is placed above the widget
In `dominant` the title takes up 83% of the width (5/6)
In `none` the title takes up 100% of the width

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/title.png" width="60%" />

## Examples:

#### Title as a string
```javascript
import {Sizing, Title, TitleLayout} from 'gadgets';
<Title
    widget="widget"
    layout={TitleLayout.stacked}
    sizing={Sizing.small}>
    title="string"
</Title>
```

#### Title as an object
<Title
    widget="widget"
    layout={TitleLayout.stacked}
    sizing={Sizing.small}>
    title="string"
</Title>

## API
#### Events
N/A

#### Styles
- `ui-title-bar` - Placed on the top level `<div>` for the whole control
- `ui-title` - Placed on the title label text within the title bar.
- `ui-title-widget` - Placed on the widget control within the title block.
 This is the `<div>` around the given widget.

#### Properties
- `layout=TitleLayout.dominant {TitleLayout}` - The structure of the
title/widget within the component.
- `widget=null {any}` - The given user defined widget control that is
injected into the title.

