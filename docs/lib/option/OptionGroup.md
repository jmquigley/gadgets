<a name="module_OptionGroup"></a>

## OptionGroup
This component creates a grouping of Option components.  Within the group
only one option can be selected at a time.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/optionGroup.png" width="50%" />

## Examples:

```javascript
import {OptionGroup} from 'gadgets';

<OptionGroup
    default="option1"
    disabled={this.props['disabled']}
    onSelect={this.handleSelect}
    options={[
        'option1',
        'option2',
        'option3',
        'option4 this is a longer string'
    ]}
    optionType={OptionType.circle}
    sizing={this.props['sizing']}
    title="test options"
/>
```

#### Events
- `onSelect(text: string)` - When an option is selected in the group this
callback is invoked.  The text value of the option is passed to the
function.

#### Styles
- `ui-option-group` - The global style applied to the container `div` around
the component.
- `ui-option-group-title` - The style applied to the `title` property

#### Properties
- `default: {string}: ('')` - The default option selected when the control
is created.
- `optionType: {OptionType} (square)` - The Option component has 10 distinct
graphics.  This option sets that choice.
- `options: {string[]} []` - an array of of strings that represent the
option choices.
- `title: {string} ('')` - a string that represents the option group title

