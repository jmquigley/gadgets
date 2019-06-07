<a name="module_AccordionItem"></a>

## AccordionItem
Generates elements that will be contained within the `Accordion`.  This
will resolve to an `<li>` tag.  It represents each individual item
within the accordion.  It is the container for the content.  It can
also be thought of as a container for content.

The `AccordionItem` represents a clickable header within this control.
It is derived from the ListItem/Item control, so it can have
buttons on the left/right side of title text.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/accordion.png" width="60%" />

## Examples:

```javascript
import {Accordion, AccordionItem} from 'gadgets';
<Accordion>
    <AccordionItem
        initialToggle={true}
        rightButton={<Button iconName="car" />}
        title="Accordion Item #1"
    >
    ...
    </AccordionItem>
    <AccordionItem title="Accordion Item #2">...</AccordionItem>
</Accordion>
```

This example would create an accordion control with two items.  The first
item would be expanded by default and contain a right button control.

#### Events
- `onClick(e)` - Invoked when the AccordionItem is clicked.
- `onUpdate(toggleState: boolean)` - This callback is invoked when the header
portion of the AccordionItem is clicked.  It is given the current state of
the toggle (true if visible, otherwise false)

#### Styles
- `ui-accordionitem` - The top level style for the Item on the outer `<div>`
- `ui-accordion-content` - Style applied to the content under the
AccordionItem. This exists around the inner `<div>`

#### Properties
- `initialToggle {boolean}` - The initial state of the content.  If true, then
the content is shown, otherwise it is hidden.  Set initially to false.
- `leftButton=null {Button}` - An instance of a button control placed to the
left of the title.
- `nocollapse=false {boolean}` - When this is set to true, then this
Accordion item will not expand/contract when the title bar is clicked.  This
is false by default.
- `rightButton=null {Button}` - An instance of a button control placed to
the right of the title.

