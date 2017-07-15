<a name="module_Badge"></a>

## Badge
The Badge widget is used to annotate/overlay another widget with acounter.  This widget surrounds the component it will annotate.  Thecontrol receives a prop named `counter` that sets the actual value.#### Examples:```javascriptimport {Badge} from 'gadgets';<Badge    counter={this.state.count}    location={Location.topRight}    >    <div>...</div></Badge>```#### Events- `onClick(counter: number)` - when the counter value is clicked thiscallback is invoked.  It is given the current count value.#### Styles- `ui-badge` - Top level class on the `<div>` of the badge (not thecontainer)#### Properties- `counter: number (0)` - The number value displayed by the badge- `suppress: boolean (false)` - If this is set to true, then numbersless than 1 are not shown, otherwise all values are shown.

