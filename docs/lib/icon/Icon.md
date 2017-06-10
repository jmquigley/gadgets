<a name="module_Icon"></a>

## Icon
Displays a graphical icon within the current container.  The control uses
[Font Awesome](http://fontawesome.io/) for the icons.  It can also
accept an image file.  It uses four sizings for the icons: small
medium/normal, large, and xlarge.  These are exposed through an
enumeration named `IconSize`.

#### Examples:

```javascript
import {Icon, IconSize} from 'gadgets';
<Icon size={IconSize.small} iconName="cab" />
<Icon size={IconSize.normal} iconName="paper-plane-o" />
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
- `size: IconSize` - There are four icon sizes that can be used:
IconSize.small (16px), IconSize.medium (36px), IconSize.large (48px),
IconSize.xlarge (64px).

