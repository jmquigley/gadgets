<a name="module_Accordion"></a>

## Accordion
This is a container element that holds the contents of the accordion control
It creates a `<ul>` tag (Accordion) that will hold N number of `<li>` tags
(AccordionItem).

An accordion control contains N number of AccordionItems.  The AccordionItem
will display/hide their contents when the header of that AccordionItem item
is clicked.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/accordion.png" width="60%" />

## Examples:

```javascript
import {Accordion} from 'gadgets';

<Accordion>
    <AccordionItem ... />
    ...
</Accordion>
```

## API
#### Events
None

#### Styles
- `ui-accordion` - Applied to the `<ul>` tag for the list.  This is the top
level of the control.

#### Properties
- `children=null {React.ReactNode}` - the children nodes contained within
this container.	Generally this will be `AccordionItem` controls.

