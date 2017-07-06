<a name="module_ListDivider"></a>

## ListDivider
Creats a dividing line within a List compoenent.  It uses a single
`<hr />` to wihtin a list item to make the dividing line.

#### Examples:

```javascript
import {List, ListDivider} from 'gadgets';
<List>
    <ListDivider backgroundColor="red" />
</List>
```

#### Events
None

#### Styles
- `ui-list-divider` - A class style on the `<li>` tag (root) of the
component.

#### Properties
- `color: string (inherit)` - The color of the dividing line

