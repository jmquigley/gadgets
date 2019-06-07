<a name="module_Breadcrumbs"></a>

## Breadcrumbs
A navigation control used to keep track of previous locations visited.  The
rightmost item is the current location.  This provides a "path" back to the
start of some navigation (i.e. trail of bread crumbs).

This is a traditional widget control, in that it responds to new props and
does not maintain the path of breadcrumbs.  An event is used to inform the
user that one was selected.  Rebuilding the path is up to the application
using the control.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/breadcrumbs.png" width="40%" />

## Examples:

```javascript
import {Breadcrumbs} from 'gadgets';

<Breadcrumbs
    chevron="arrow-right"
    icon="pied-piper"
    items={[
        {name: 'name1', uri: 'http://www.example1.com'},
        {name: 'name2', uri: 'http://www.example2.com'},
        {name: 'name3', uri: 'http://www.example3.com'}]
    }]
    onSelection={(name: string, uri: string) => {
        debug('selected => name: %s, uri: %s', name, uri);
    }}
/>
```

## API
#### Events
- `onSelection(name: string, uri: string)` - When an item is selected this
callback is invoked.

#### Styles
- `ui-breadcrumbs` - Applied to the `<div>` container around the Component
- `ui-breadcrumbs-name` - Each path/name in the component has this selector.
The underlying control is a ButtonText widget.
- `ui-breadcrumbs-chevron` - the path separater is an Icon component between
each path ButtonText.
- `ui-breadcrumbs-icon` - A Icon is placed at the front of the control by
default.  This is used to style that first icon.

#### Properties
- `chevron="chevron-right" {string}` - The font awesome icon used as a
divider between path elements in the component.
- `icon="paperclip" {string}` - The font awesome icon placed at the
front of the component path list.
- `items=[] {Crumbs[]}` - An array of name/uri pairs that represent the
path locations that will be displayed.  They are displayed in the order
of the array.  The data type is a Crumbs interface that contains name (as
as string) and uri (as a string).
- `noicon=false {boolean}` - Suppresses the icon on the front of the
list when true.

