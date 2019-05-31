<a name="module_DynamicList"></a>

## DynamicList
The `DynamicList` control is a specialized List control that can be
manipulated by the user.  They can add/remove/select items from it.  The
control takes an initial list to seed the control, but then items can be
dynamically added/removed.

Some of the features include:

- Add new items with the "+" button
- Sort the list in ascending/descending order
- Incrementally search for items
- List is divided into pages for performance
- A right or left widget can be added to each list item

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/dynamicList.png" width="60%" />

## Examples:

#### Simple
```javascript
import {DynamicList} from 'gadgets';

<DynamicList
    errorMessage="Error message"
    items={{
        title1: {left: widget1, right: widget1}
        title2: {left: widget2, right: widget2}
        title1: {left: widget3, right: widget3}
    }}
    onDelete={(title: string) => {
        console.log(`Deleting item from list: ${title}`);
    }}
    onError({message: string} => {
        console.log(message);
    })
    onNew={(title: string) => {
        console.log(`Adding new item to list: ${title}`);
    }}
    onSelection={(title: string) => {
        console.log(`Selected item: ${title}`);
    }}
    onUpdate={(previous: string, title: string) =>
        console.log(`previous: ${previous}, title: ${title}`);
    }}
    pageSizes={[10, 20, 30]}
    title="Dynamic List Test"
/>
```

#### With Error Handling
This will display an error message at the top of the list and then automatically
fade away after 5 seconds.

```javascript
import {DynamicList} from 'gadgets';

<DynamicList
    errorMessage="Show this error message"
    errorMessageDuration={3}
    items={{
        title1: {right: widget1}
        title2: {right: widget2}
        title1: {right: widget3}
    }}
    onError={(message: string) => console.log(message)}
    pageSizes={[10, 20, 30]}
    title="Dynamic List Test"
/>
```

## API
#### Events
- `onBlur` - Invoked when a list item control loses focus.
- `onClick` - Invoked when a list item is clicked.
- `onDelete(title: string)` - This event is executed when an item is removed
from the list.
- `onError(message: string)` - when an error message is written to the
component this callback is invoked.
- `onFocus` - Invoked when a list item is clicked.
- `onNew(title: string)` - This event is executed when an item is added to
the list.  The title of the new item is a parameter to the callback
- `onSelection(title: string)` - Invoked when a list item is selected. The title
of the selected item is a parameter to the callback.
- `onSort(sortOrder: SortOrder)` - Invoked whne the list is sorted.  It will
give the selected order to the callback.
- `onUpdate(previous: string, title: string)` - When an item is renamed this
callback is invoked.  The previous value and the new title are passed to the
callback

#### Styles
- `ui-dynamiclist` - applied to the `div` accordion control that holds the
list.
- `ui-dynamiclist-container` - applied to the top level container `div` that
surrounds the list and the *toast* for error message handling.

#### Properties
- `errorMessage: {string} ('')` - A message the will be temporarily displayed
within the control.  When this message is first set it will be shown and
then decay.  It will then invoke the onError callback.
- `errorMessageDuration: {number} (5)` - the time in seconds that the
error message string will be shown within the control before fading away.
Set to five seconds by default.
- `items: DynamicListItem ({}}` - An object that holds unique title and
widgets in the format `{[title]: {left: widget, right: widget}`.  Each item in
the object represents a list item.  A widget, like a button or Option, can
be used as supporting widgets in the list.
- `layout: TitleLayout (TitleLayout.dominant)` - How the title/widget
will be displayed in the list item (seee the Title control).
- `nocollapse: boolean (false)` - Determines if the list can be
"rolled up" when the header is clicked.  The default behavior is to
allow.  IF this is set to false, then the list can't be collapsed.
- `noselect {boolean} (false)` - when true the selection highlight is
disabled and removed.
- `pageSizes: number[] ([25, 50, 100])` - A list of page number sizes that
can be used by the pager.  It is used against the total items to
determine the total number of pages in the control display.
- `sortOrder: SortOrder (SortOrder.ascending)` - The list sort order.  Can
be either ascending or descending.
- `title: string ('')` - This string value is in the header of the control.

