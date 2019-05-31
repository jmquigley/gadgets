<a name="module_List"></a>

## List
This is a container element that holds the contents of a list.  It creates
the `<ul>` tag that will hold all of the `<li>` tags.  The user can
then select an item from the list and it will remain highlighted.  Each
item within the list has a title block and a possible left and right
widget control (for buttons, icons, etc).

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/list.png" width="40%" />

## Examples:

```javascript
import {Button, Icon, List, ListItem, ListHeader} from 'gadgets';

...
<List alternating sizing={this.props['sizing']}>
    <ListHeader
        leftButton={<Button iconName="plus" />}
        noedit
        rightButton={<Button iconName="plus" />}
        title={`Demo List Header (${this.props['sizing']})`}
    />
    <ListItem
        leftButton={<Button iconName="podcast"/>}
        rightButton={<Button iconName="paper-plane-o"/>}
        title="List Item 1"
        widget="12"
    />
    <ListItem
        leftButton={<Icon iconName="bolt" />}
        rightButton={<Button />}
        title="List Item 2 (with icon)"
        widget="13"
    />
</List>
```

#### Events
- `onSelection(title: string)` - When the user selects an item from the list
this callback is invoked.  It is given the string title associated with
the item.

#### Styles
- `ui-list` - A class selector placed on the `<ul>` tag wrapper around the
list.

#### Properties
- `alternating: {boolean} (false)` - Makes every other `<li>` entry within the
list grey to make viewing the list easier.  This is off by default.
- `noselect: {boolean} (false)` - If set to true then the item that has been
selected within the list will not be highlighted.  it's a way to turn of list
selection.

