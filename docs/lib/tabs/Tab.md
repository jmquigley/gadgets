<a name="module_Tab"></a>

## Tab
Represents a single `Tab` entry within a `TabContainer`.  This component
would generally be used only with the `TabContainer`.  The tab acts
as a wrapper for some other content (the children within the control can
be any other object).

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/tabs.png" width="50%" />

## Examples:

```javascript
import {Tab, TabContainer} from 'gadgets';

<TabContainer maxTabs={3} location={Location.bottom} nonavigation>
    <Tab title="tab #1">#1<br/><br/>{randomText}</Tab>
    <Tab title="tab #2">#2<br/><br/>{randomText}</Tab>
    <Tab title="tab #3">#3<br/><br/>{randomText}</Tab>
    <Tab title="tab #4">#4<br/><br/>{randomText}</Tab>
</TabContainer>
```
This example will create a tab container with four tabs drawn on the
bottom of the control.  It will suppress the navigation buttons.
This example sets the max number of tabs to 3, so the fourth would
be suppressed.

The tab contents in this example hold a string, but could hold any other
valid HTML objects.

## API
#### Events
- `onClick` - invoked when a tab is selected from the Container
- `onClose` - invoked when the close button is selected on the tab.  A
reference to the closed tab is passed to the callback.

#### Styles
- `ui-tab` - The global CSS class applied to the top level `div` of the
`Tab` component.

#### Properties
- `href: {any}` - This is a general object used to pass references from
the parent to the child.  It includes the following attributes:
  - `selectHandler` - a function reference back to the container that is
    invoked to tell the container that this tab was selected.
- `orientation` - the location in the container component where the
tab will be drawn (top, bottom, left, right)
- `selected: {boolean} (false)` - if this is set to true, then the tab
will show as selected.
- `title: {string} ('')` - the text that will be shown on the tab.

