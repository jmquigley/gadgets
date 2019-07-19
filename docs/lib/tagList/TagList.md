<a name="module_TagList"></a>

## TagList
The tag list control is a basic list of strings that act as metadata for
another control.  They are used to categorize information.  There are
two types of `TagList` controls: static and dynamic.  With the static
control the list of string are given when the control is created and
are never changed.  With the dynamic control the list of tags can
be added or removed from the list.  Each operation results in an event
signalling what occurred.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/tagList.png" width="40%" />

## Examples:

##### Dynamic TagList
```javascript
import {TagList} from 'gadgets';

<TagList tags={['one', 'two', 'three']} useinput />
```

##### Static TagList
```javascript
import {TagList} from 'gadgets';

<TagList tags={['one', 'two', 'three']} />
```

## API
#### Events
- `onBlur` - invoked when the user leaves the control.  This event works
like the escape key (resets the input)
- `onChange` - invoked as the user presses keys.  Receives the a reference
to the `HTMLInputElement`
- `onDelete(tag: string, tags: List<string>)` - invoked when a user removes
a tag from the list.  The tag that is removed is given to the callback as
the first parameter.  The second parameter is the full list.
- `onKeyDown` - invoked when the user first presses a key.  This watches for
the escape key within the control.
- `onKeyPress` - invoked whne the user presses a key.  This watches for the
enter key within the control.
- `onNew(tag: string, tags: List<string>)` - invoked when the user adds a new
tag to the list. The tag that is added is given to the callback as the first
parameter.  The second parameter is the full list.

#### Styles
- `ui-taglist` - style placed on the root div of the control

#### Properties
- `nosort=false {boolean}` - if set to true, then the tags will not be
sorted when displayed, otherwise they are sorted.
- `placeholder="new" {string}` - the string placeholder in the input text
for new tags.
- `tags=[] {string[]}` - the list of tag strings initially added to the
control.  This is only respected on creation of the control
- `useinput=false {boolean}` - if set to true, then the user is allowed to
manipulate the tag list inline, otherwise the list is statically created.

