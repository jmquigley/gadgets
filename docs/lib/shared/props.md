<a name="module_BaseProps"></a>

## BaseProps
The following properties are shared by all components in the library

#### Events
The following are the current event types supported by components:

- onBlur
- onChange
- onClick
- onClose
- onDoubleClick
- onInput
- onKeyDown
- onKeyPress
- onMouseOut

#### Properties
The following are the properties on the BaseProps object used by most
components.

- `backgroundColor: string (inherit)` - the CSS background color for the control
- `borderColor: string (inherit)` - the CSS border color around the control.
- `children: React.ReactNode (null)` - the React child nodes that may exists
within this control (not all controls will have children i.e. self closed)
- `color: string (inherit)` - the CSS foreground color for the control.
- `contentEditable: boolean (false)` - this will make the control editable.  This
is used in controls like the Label to allow changing the string contents.
- `disabled: boolean (false)` - if true then then the control is disabled.
- `id: string ('')` - the CSS id field.  This is used to uniquely identify a
component (for CSS)
- `location: Location (Location.none)` - Sets the positional location style for a
control (see the Location enumeration below).
- `noedit: boolean (false)` - When this is set the contents of the control can't be
changed.
- `noripple: boolean (false)` - turns off the ripple effect for a button.
- `selected: boolean (false)` - if true, then this component was selected via a
mouse click (such as the ListItem).  If false, then it was not clicked.
- `sizing: Sizing (Sizing.normal)` - The font sizing for the control.  It is set to
`Sizing.normal` by default which represents 1.0em.
- `style: object ({})` - an object of key value/pairs that represent CSS style
settings
- `visible: boolean (true)` - turns the display of this control on or off.  If true,
then the component can be seen.

The `Sizing` enumeration contains the following values:

- Sizing.xxsmall (20px, 0.5em)
- Sizing.xsmall (24px, 0.75em)
- Sizing.small (32px, 0.9em)
- Sizing.medium/Sizing.normal (40px, 1.0em)
- Sizing.large (48px, 1.25em)
- Sizing.xlarge (64px, 1.5em)
- Sizing.xxsmall (80px, 2.0em)

The `Location` enumeration contains the following values:

- Location.none
- Location.topLeft
- Location.top
- Location.topRight
- Location.middleLeft
- Location.middle
- Location.middleRight
- Location.bottomLeft
- Location.bottom
- Location.bottomRight

