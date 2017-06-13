<a name="module_Icon"></a>

## Icon
Displays a graphical icon within the current container.  The control
uses [Font Awesome](http://fontawesome.io/) for the icons.  It can
also accept an image file.  It uses seve sizings for the icons: xxsmall,
xsmall, small, medium/normal, large, xlarge, and xxlarge.  These are
exposed through an enumeration named `Size` defined in the global
shared props..

#### Examples:

```javascript
import {Icon, Size} from 'gadgets';
<Icon size={Size.small} iconName="cab" />
<Icon size={Size.normal} iconName="paper-plane-o" />
<Icon imageFile="./image.png" />
<Icon iconName="cab" color="red" backgroundColor="gray" />
```

#### Events
None

#### Styles
- `ui-icon` - applied to the top level container for the icon.

#### Properties
- `backgroundColor: string` - Sets the background color of the icon when
`iconName` is used.
- `color: string` - Sets the icon color when `iconName` is used.  The
default is *black*.
- `iconName: string` - The name of the font awesome icon that will be
used in this icon.  This option is mutually exclusive to imageFile
- `imageFile: string` - The path to an image file that will be used in
this icon.  This option is mutually excludive to iconName.
- `size: Size` - There are seven icon sizes that can be used.  See the
shared props documentation for the enumerations used for each size.

