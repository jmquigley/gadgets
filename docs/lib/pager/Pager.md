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

The right side of list contains a dialog button with `...`.  This allows
the user of the control to change the page size.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/pager.png" width="40%" />

## Examples:

```javascript
import {Pager} from 'gadgets';
<Pager
    initialPage="1"
    pageSizes={[25,50,100,500]}
    sizing={Sizing.normal}
    totalItems="2999"
    onSelection={
        (page: number) => {
            console.log(`Clicked on page: ${page}`);
        }
    }
    onSort={
        (sortOrder: any) => {
            if (sortOrder === SortOrder.ascending) {
                console.log(`Sorting pager in ascending`);
            } else {
                console.log(`Sorting pager in descending`);
            }
        }
    }
    useinput
    />
```

The example above would create a `Pager` control that contains 120 page
entries to choose from.  The default page size is the first entry in
the `pageSizes` array property.

This control would also include a `TextField` that allows the user to jump
to a page by its number position.

## API
#### Events
- `onChangePageSize(pageSize: number)` - when the page size of the control
is change in the dialog box this event is invoked with the new size.
- `onSelection(page: number)` - When the control changes to a new page, this
event is invoked.  It will give the new page selection as a parameter.
- `onSort(sortOrder: SortOrder)` - When this callback is given, then the
dialog button will present an *ascending* and *descending* option.  When one
of these are selected, then it will invoke this callback with the selected
type.

#### Styles
- `ui-pager` - The top level style for the control on the `<div>` container.

#### Properties
- `initialPage=1 {number}` - The page to start with in the list display.
- `pagesToDisplay=3 {number}` - The number of page buttons to show with
the control.
- `pageSizes=[25, 50, 100] {number[]}` - A list of page number sizes that
can be used by the pager.  It is used against the total items to
determine the total number of pages in the control display.
- `totalItems=0 {number}` - The total number of items represented by the
control.
- `useinput=false {boolean}` - If this is true, then a text input is shown
with the control that allows the user to jump to a specific page.

