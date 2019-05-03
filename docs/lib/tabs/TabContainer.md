<a name="module_TabContainer"></a>

## TabContainer
A typical tab control container.  This manages `Tab` elements within it.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/tabs.png" width="50%" />

## Examples:

```javascript
import {Tab, TabContainer} from 'gadgets';

const debug = require('debug')('App')

<TabContainer
     maxTabs={3}
     location={Location.bottom}
     nonavigation
     onRemove={(tab: any) => {
         debug(removing %o (id=${tab.props['id']})`, tab.props["title"]);
     }}
     onSelect={(tab: any, previous: any) => {
         debug(
             `selected: %o (id=${tab.props["id"]}), previous: %o (id=${
                 previous.props["id"]
             })`,
             tab.props["title"],
             previous.props["title"]
         );
     }}
>
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

## API
#### Events
- `onRemove(tab)` - When a tab is removed this event is invoked.  The
callback will receive the tab instance that was removed.
- `onSelect(tab, previousTab)` - When a `Tab` is selected this event is
invoked.  The callback will receive a reference to the selected tab and the
previous tab.  If there is no previous tab, then the selected and
previous values are the same.

#### Styles
- `ui-tab-container` - Global style applied to the root `<div>` element of
the `TabContainer` component.
- `ui-tab-bar` - Global style that is applied to each of the tab elements
within the container.
- `ui-tab-content` - Global style applied to the content that will be
displayed by a selected tab.
- `ui-tab-navigation` - style applied to the div surrounding the navigation
buttons within the tab bar.

#### Properties
- `children: {any} (null)` - the objects within the `TabContainer`.  This
control will only use `Tab` components and ignore all others.
- `maxTabs: {number} (5)` - the maximum number of tabs that will be shown
within the container.  This respects the order in which they are given
to the control.
- `noclose: {boolean} (false)` - if true, then the close buttons on each
tab are suppressed, otherwise they are shown.
- `nonavigation: {boolean} (false)` - if true, then the navigation
chevron buttons are suppressed within the tab bar, otherwise they are shown
- `tabWidth: {number} (75)` - the number of pixels for each `Tab`
component within the container.

