<a name="module_BaseComponent"></a>

## BaseComponent
The base class for all components in the library.  This enables each moduleto guarantee certain variables will be present through inheritance.  Thesevariables include:- `classes` - an array of CSS classnames that will be used on the rootelement of the control- `inlineStyles` - an object that holds user defined style overrides- `locationStyle` - There are 9 locations within a region: topLeft, top,topRight, middleLeft, middle, middleRight, bottomLeft, bottom, bottomRight.The location prop is used to specify the CSS used to calculte this positionin a control using transform and relative coordinates.- `styles` - an object that represent the styles in the CSS module associatedto this control.- `sizes` - Sizing class that has computed sizes from the base (normal) sizefont styles for the application.The values of these variables are computed automatically for any componentthat inherits from BaseComponent (controlled by props).  This class inheritsfrom `React.PureComponent` to take advantage of `shouldComponentUpdate`shallow object comparison when computing styles based on props/state.#### Examples:```javascriptimport {BaseComponent} from '../shared';...export class XYZ extends BaseComponent<Props, State> {   ...}...<XYZ sizing={Sizing.xxsmall} location={Location.topRight} />```In the example above the `sizing` and `location` would be computedautomatically for the given values.  These values are then available to thechild class to use in building the component using these styles.

<a name="module_BaseComponent..value"></a>

### BaseComponent~value(methods)
Many components must bind their callbacks to the original instance.  Inthe constructor for each React component many `.bind` calls are made.This function will take N parameter strings, that represent the names ofthe callback functions and will bind them to `this`.#### Example:```this.bindCallbacks('handleChange', 'handleClick', 'handleFocus');```This example would bind the three given callbacks (handleChange,handlClick, and handleFocus) to the instance's `this` pointer.

**Kind**: inner method of [<code>BaseComponent</code>](#module_BaseComponent)  

| Param | Type | Description |
| --- | --- | --- |
| methods | <code>any</code> | a variable list of string parameters that represent the name of a callback method that will be bound to `this` instance. |

