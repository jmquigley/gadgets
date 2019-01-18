<a name="module_BaseProps"></a>

## BaseProps
The following properties are shared by all components in the library

## API
#### Properties
The following are the properties on the BaseProps object used by most
components.

- `className: {string} ('')` - the global classname string that will be applied
to the given component
- `contentEditable: {boolean} (false)` - this will make the control editable.  This
is used in controls like the Label to allow changing the string contents.
- `controlled: {boolean} (true)` - A controlled component is one where the component
manages the internal state.  When this is false, then the state is managed via props
to the control (e.g. selected on Option or ButtonToggle).
- `direction`
- `disabled: {boolean} (false)` - if true then then the control is disabled.
- `errorMessage {string} ('')` - An error message that is passed into the
component.
- `focus {boolean} (false)` - if true, the component has the focus.  This is
not used on all components.
- `id: {string} ('')` - the CSS id field.  This is used to uniquely identify a
component (for CSS)
- `location: {Location} (Location.none)` - Sets the positional location style for a
control (see the Location enumeration below).
- `noedit: {boolean} (false)` - When this is set the contents of the control can't be
changed.
- `nohover: {boolean} (false)` - Controls that use a hover can use the nohover to
turn off that function.
- `noripple: {boolean} (false)` - turns off the ripple effect for a button.
- `notheme: {boolean} (false)` - suppress the theme provider if set to true.
- `obj {string} ('Unknown')` - a string that names a component.  We can't use the
class name to represent the name of a component because it is lost when the app
is minified.  This is used to preserve the name of the component in props.
- `selected: {boolean} (false)` - if true, then this component was selected via a
mouse click (such as the ListItem).  If false, then it was not clicked.
- `sizing: {Sizing} (Sizing.normal)` - The component sizing for the control.  It is
set to `Sizing.normal` by default which represents 1.0em.
- `style: {object} ({})` - an object of key value/pairs that represent CSS style
settings
- `testing {boolean} (false)` - if set to true, then the component is being used
under test.  Some components will generate unique UUID values that will differ
on each execution of the program.  This can be used in cases where a stable, deterministic
id is needed.
- `visible: {boolean} (true)` - turns the display of this control on or off.  If true,
then the component can be seen.

### Enumerations

##### Direction
- up
- down
- left
- right

##### Location
- none
- topLeft
- top
- topRight
- middleLeft
- middle
- middleRight
- bottomLeft
- bottom
- bottomRight

