/**
 * A typical toolbar control.  It takes a set of buttons and controls and
 * displays the on a horizontal control.  It will only accept a specific
 * set of controls (from the Gadgets library)
 *
 * - Button
 * - ButtonCircle
 * - ButtonDialog
 * - ButtonText
 * - ButtonToggle
 * - Divider
 * - Dropdown
 * - Option
 * - Switch
 * - TextField
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/toolbar.png" width="60%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Button, Sizing, Toolbar} from 'gadgets';
 *
 * <Toolbar justify={Justify.left} sizing={Sizing.small}>
 *     <Button iconName="cab" onClick={someFunction} />
 *     <Divider />
 *     <Option />
 *     ...
 * </Toolbar>
 * ```
 *
 * ## API
 * #### Events
 * None
 *
 * #### Styles
 * - `ui-toolbar` - global style placed on the root `<div>` component of the
 * toolbar.
 * - `ui-toolbar-group` - The components are all placed within a grouping
 * div to set its left/right/center justification.  This global style is
 * placed on this div.
 *
 * #### Properties
 * - `justify: {Justify} (Justify.left)` - The toolbar can be placed to the left
 * (default), center, or right within its container.  The property sets that
 * location.
 *
 * @module Toolbar
 */

'use strict';

// const debug = require('debug')('Toolbar');

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {BinaryTree} from 'util.ds';
import {Keys} from 'util.keys';
import {Button} from '../button';
import {ButtonCircle} from '../buttonCircle';
import {ButtonDialog} from '../buttonDialog';
import {ButtonText} from '../buttonText';
import {ButtonToggle} from '../buttonToggle';
import {Divider} from '../divider';
import {Dropdown} from '../dropdown';
import {Option} from '../option';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	getTheme,
	Justify
} from '../shared';
import styled, {ThemeProvider, withProps} from '../shared/themed-components';
import {Switch} from '../switch';
import {TextField} from '../textField';

export interface ToolbarProps extends BaseProps {
	justify?: Justify;
}

export function getDefaultToolbarProps(): ToolbarProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			justify: Justify.left
		})
	);
}

export const ToolbarView: any = withProps<ToolbarProps, HTMLDivElement>(styled.div)`
	border: solid 1px silver;
	box-sizing: border-box;
	display: flex;
	padding: 3px 2px;
`;

export const ToolbarContainerView: any = withProps<ToolbarProps, HTMLDivElement>(styled.div)`
	align-items: center;
	display: flex;
	padding: 2px 0 1px 0;

	${props => {
		switch (props.justify) {
			case Justify.center: return ('margin: auto;');
			case Justify.right: return ('margin-left: auto;');
			default: return('');
		}
	}}
`;

export const ToolbarElementView: any = withProps<ToolbarProps, HTMLDivElement>(styled.div)`
	box-sizing: border-box;
`;

export class Toolbar extends BaseComponent<ToolbarProps, undefined> {

	public static readonly defaultProps: ToolbarProps = getDefaultToolbarProps();

	private _keys: Keys;
	private static readonly _whitelist = new BinaryTree([
		Button.name,
		ButtonCircle.name,
		ButtonDialog.name,
		ButtonText.name,
		ButtonToggle.name,
		Divider.name,
		Dropdown.name,
		Option.name,
		'StyledComponent',
		Switch.name,
		TextField.name
	]);

	constructor(props: ToolbarProps) {
		super(props, {}, Toolbar.defaultProps.style);

		this._keys = new Keys({testing: this.props.testing});
		this._classes.add(['ui-toolbar']);

		this.componentWillUpdate(this.props);
	}

	public render() {
		const components: any = [];

		React.Children.forEach(this.props.children, (child: any, idx: number) => {
			if (Toolbar._whitelist.contains(child['type'].name)) {
				const style = Object.assign({}, child['props'].style, {
					display: 'flex',
					height: this.fontSizePX(this.props.sizing, 1.5),
					margin: '0 2px'
				});

				switch (child['type'].name) {
					case Button.name:
					case ButtonCircle.name:
					case ButtonDialog.name:
					case ButtonToggle.name:
						style['width'] = this.fontSizePX(this.props.sizing, 1.5);

					case ButtonText.name:
						style['border'] = 'solid 1px silver';
						break;

					case Switch.name:
						style['padding-top'] = '0.1em';
						style['margin'] = '0 6px';
						break;

					case TextField.name:
					case 'StyledComponent':
						delete style['height'];
				}

				if (child['type'].name === ButtonCircle.name) {
					delete style['border'];
				}

				const newChild = React.cloneElement(child as any, {
					className: 'ui-toolbar-element',
					disabled: this.props.disabled,
					sizing: this.props.sizing,
					visible: this.props.visible
				});

				components.push(
					<ToolbarElementView
						key={this._keys.at(idx)}
						style={style}
					>
						{newChild}
					</ToolbarElementView>
				);
			}
		});

		return(
			<ThemeProvider theme={getTheme()} >
				<ToolbarView className={this.classes}>
					<ToolbarContainerView
						className="ui-toolbar-group"
						justify={this.props.justify}
					>
						{components}
					</ToolbarContainerView>
				</ToolbarView>
			</ThemeProvider>
		);
	}
}
