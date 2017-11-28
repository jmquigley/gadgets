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
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	getTheme,
	Justify
} from '../shared';
import styled, {ThemeProvider, withProps} from '../shared/themed-components';

export interface ToolbarProps extends BaseProps {
	justify?: Justify;
}

export function getDefaultToolbarProps(): ToolbarProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			justify: Justify.left,
			obj: 'Toolbar'
		})
	);
}

export const ToolbarView: any = withProps<ToolbarProps, HTMLDivElement>(styled.div)`
	border: solid 1px silver;
	box-sizing: border-box;
	display: flex;
	padding: 3px 2px;
`;

export const ToolbarGroupView: any = withProps<ToolbarProps, HTMLDivElement>(styled.div)`
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
		'Button',
		'ButtonCircle',
		'ButtonDialog',
		'ButtonText',
		'ButtonToggle',
		'Divider',
		'Dropdown',
		'Option',
		'Switch',
		'TextField'
	]);

	constructor(props: ToolbarProps) {
		super(props, Toolbar.defaultProps.style);

		this._keys = new Keys({testing: this.props.testing});
		this._classes.add('ui-toolbar');

		this.componentWillUpdate(this.props);
	}

	public render() {
		const components: any = [];
		const theme: any = getTheme();

		React.Children.forEach(this.props.children, (child: any, idx: number) => {
			if (Toolbar._whitelist.contains(child['type'].name)) {
				const style = Object.assign({}, child['props'].style, {
					display: 'flex',
					height: this.fontSizePX(this.props.sizing, 1.5),
					margin: '0 2px'
				});

				switch (child['props'].obj) {
					case 'Button':
					case 'ButtonCircle':
					case 'ButtonDialog':
					case 'ButtonToggle':
						style['width'] = this.fontSizePX(this.props.sizing, 1.5);

					case 'ButtonText':
						style['border'] = `solid 1px ${theme.borderColor}`,
						delete style['width'];
						break;

					case 'Switch':
						style['padding-top'] = '0.1em';
						style['margin'] = '0 6px';
						break;

					case 'TextField':
						delete style['height'];
						break;
				}

				if (child['props'].obj === 'ButtonCircle') {
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
			<ThemeProvider theme={theme} >
				<ToolbarView className={this.classes}>
					<ToolbarGroupView
						className="ui-toolbar-group"
						justify={this.props.justify}
					>
						{components}
					</ToolbarGroupView>
				</ToolbarView>
			</ThemeProvider>
		);
	}
}
