<a name="module_Tag"></a>

## Tag
A wrapper for a single string value that will appear within a `TagList`.A tag can be static or contain a delete button within it.  This controlwould generally just be used within the `TagList`.#### Examples:```javascriptimport {Tag} from 'gadgets';<Tag usedelete>strvalue</Tag>```#### Events- `onClick` - invoked when the user clicks on the delete button within thecontrol.  This is only visible when `usedelete` is specified.- `onDelete(tag: string)` - invoked when the delete button is pressed.  Thevalue of the tag is given to the callback as a parameter.- `onMouseOut` - invoked when the mouse leaves the control- `onMouseOver` - invoked when the mouse moves over the control.#### Styles- `ui-tag` - placed on the root `<div>` of the control.#### Properties- `usedelete: {boolean} (false)`- if true then the delete button will beshown when the mouse enters the tag, otherwise this is suppressed.

