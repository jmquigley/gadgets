<a name="module_Accordion"></a>

## Accordion
This is a container element that holds the contents of the accordioncontrol.  It creates a `<ul>` tag (Accordion) that will hold N numberof `<li>` tags (AccordionItem).An accordion control contains N number of AccordionItems.  These itemswill display/hide the contents of that item when the header of thatitem is clicked.#### Examples:```javascriptimport {Accordion} from 'gadgets';<Accordion>    <AccordionItem ... />    ...</Accordion>```#### EventsNone#### Styles- `ui-accordion` - Applied to the `<ul>` tag for the list.  This is the toplevel of the control.#### Properties- `children: React.ReactNode (null)` - the children nodes contained withinthis container.

