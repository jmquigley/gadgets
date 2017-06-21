<a name="module_Pager"></a>

## Pager
A pagination control.  This takes an input size `I` and a page size `P`
and breaks it up into N = I/P entries.  The entries are displayed as a
list of pages that can be chosen by the user.  When clicking on the page
entry a selection event is invoked to tell the user what page was selected.
The user is responsible for responding to the event and dealing with the
page switch.

The component contains two buttons on the front of the list and two buttons
at the end of the list to aid in navigation.  The first button moves to the
front of the page list.  The second button moves one page back in the list
If at the front of the list, then no operation is performed.  The last two
buttons are used to move to the end of the list or to move foward one
position.

#### Examples:

```javascript
import {Pager} from 'gadgets';
<Pager
    initialPage="1"
    totalItems="299"
    sizing={Sizing.normal}
    onSelect={
        (page: number) => {
            console.log(`Clicked on page: ${page}`);
        }
    }
    useinput
    />
```

The example above would create a `Pager` control that contains 12 page
entries to choose from.  It would also include a `TextField` control that
allows the user to jump to a page by its number position.

#### Events
- `onSelect(page: number)` - When the control changes to a new page, this
event is invoked.  It will give the new page selection as a parameter.

#### Styles
- `ui-pager` - The top level style for the control on the `<div>` container.

#### Properties
- `initialPage: number (1)` - The page to start with in the list
- `pagesToDisplay: number (3)` - The number of page buttons to show with
the control.
- `pageSize: number (25)` - The number of items per page.  It's the divisor
against the total items to determine the total number of pages in the
control.
- `totalItems: number (0)` - The total number of items represented by the
control.
- `useinput: boolean (false)` - If this is true, then a text input is shown
with the control that allows the user to jump to a specific page.

