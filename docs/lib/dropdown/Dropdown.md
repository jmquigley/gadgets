<a name="module_Dropdown"></a>

## Dropdown
A dropdown list using the HTML select/option elements.  An initial list of
values and their associated labels are given to the control.

This is a static dropdown.  Use the `Select` dropdown for a dynamic
version.

Items are placed into an array of structures of type `DropdownOption`.
Each option contains a value (the id)  and the dispay label.  This strucure
is used to build the `<option>` list under the `<select>`.  The user then
selects an option from this list.  The selection invokes an `onSelection`
callback.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/dropdown.png" width="20%" height="20%" />

## Examples:

```javascript
import {Dropdown, DropdownOption} from 'gadgets';

let options: DropdownOption[] = [
    {val: 'val1', label: 'label1'},
    {val: 'val2', label: 'label2'},
    {val: 'val3', label: 'label3'}
];

<Dropdown iconName="cab" onClick={someFunction}
    initialValue='val1'
    items={options}
    onSelection{(val: DropdownDataType) => {// process value}}
/>
```

## API
#### Events
- `onSelection(val: string)` - The value (id) of the item that was selected
from the list.

#### Styles
- `ui-dropdown` - A global style placed on the `<select>` element.
- `ui-dropdown-container` - a div container that wraps the dropdown component.

#### Properties
- `initialValue="" {string}` - The initial id value from the list of
provided items.
- `items=[] {DropdownOption[]}` - An array of items used to build
the list (see example above for construction).

