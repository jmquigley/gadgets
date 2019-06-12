<a name="module_ListItem"></a>

## ListItem
Generates elements that will be contained within a `List`.  This resolved
to the `<li>` tag.  It uses the `Item` shared component.

See the `List` component for screen and example usage.

## API
#### Events
- `onBlur(e: React.FocusEvent<HTMLLIElement>)` - Called when the ListItem
loses focus.
- `onClick(e: React.MouseEvent<HTMLLIElement>)` - Invoked when the ListItem
is clicked by the mouse.
- `onDoubleClick(e: React.MouseEvent<HTMLLIElement>)` Invoked when the
ListItem is double clicked by the mouse.
- `onSelection(title: string)` - When the ListItem is clicked this is also
invoked to return the title string associated with this ListItem

#### Styles
- `ui-listitem` - A global style placed on the `<li>` element.

#### Properties
- `href={selectHandler: nilEvent}` - The parent List component passes this
object to each child to share parent variables.  It contains the following
fields:
  - `selectHandler {(item: ListItem) => void}` - invoked by the child when
    it is selected to notify the parent that it was selected.

