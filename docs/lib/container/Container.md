<a name="module_Container"></a>

## Container
A generic control used to group other controls.  It creates a
section tag around the given child component.

## Examples:

```javascript
import {Container} from 'gadgets';
<Container>
    ...
</Container>
```

## API
#### Events
N/A

#### Styles
- `ui-container` - placed on the root `<div>` tag

#### Properties
- `children: React.ReactNode (null)` - The child components that exist
within the Container.
- `title: {string} ('')` - if a title is given, then an `<h1>` block is
created in front of the section with the given title.  By default there is
no title.

