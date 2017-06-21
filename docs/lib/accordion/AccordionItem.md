<a name="module_AccordionItem"></a>

## AccordionItem
Generates elements that will be contained within the Accordion.  This
will resolve to an `<li>` tag.  It represents each individual item
within the accordion.  It is the container for the content.  It can
als be thought of as a container for content.

The AccordionItem represet a clickable header within this control.  It
also has a "plus" button on the right side of this header.  This
button represents a creation event (tied to the onNew callback).

#### Examples:

```javascript
import {Accordion, AccordionItem} from 'gadgets';
<Accordion>
    <AccordionItem title="Accordion Item #1">...</AccordionItem>
    <AccordionItem title="Accordion Item #2">...</AccordionItem>
</Accordion>
```

#### Events
- `onClick(toggleState)` - This callback is invoked when the header
portion of the AccordionItem is clicked.  It is given the current
state of the toggle (true if visible, otherwise false)
- `onNew(title)` - This callback is invoked if the "plus" button is
clicked.  The name of the item is given to this callback.

#### Styles
- `ui-accordionitem` - The top level style for the Item
- `ui-accordion-content` - Style applied to the content under the AccordionItem.

#### Properties
- `initialToggle: boolean` - The initial state of the content.  If true, then
the content is shown, otherwise it is hidden.  Set initially to false.
- `showButton: boolean` - The right button is shown by default.  If this option
is false, then the button is suppresed.

