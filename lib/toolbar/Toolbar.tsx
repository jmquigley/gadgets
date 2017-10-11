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

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {ClassNames} from 'util.classnames';
import {BinaryTree} from 'util.ds';
import {Keys} from 'util.keys';
import {
	Button,
	ButtonCircle,
	ButtonDialog,
	ButtonText,
	ButtonToggle,
	Divider,
	Dropdown,
	Option,
	Switch,
	TextField
} from '../../index';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Justify
} from '../shared';

const styles = require('./styles.css');

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

export class Toolbar extends BaseComponent<ToolbarProps, undefined> {

	public static readonly defaultProps: ToolbarProps = getDefaultToolbarProps();

	private _groupStyles: ClassNames = new ClassNames();
	private _keys: Keys;
	private static readonly _resetJustify = [
		styles.right,
		styles.center,
		styles.left
	];
	private static readonly _whitelist = new BinaryTree([
		Button.name,
		ButtonCircle.name,
		ButtonDialog.name,
		ButtonText.name,
		ButtonToggle.name,
		Divider.name,
		Dropdown.name,
		Option.name,
		Switch.name,
		TextField.name
	]);

	constructor(props: ToolbarProps) {
		super(props, styles);

		this._keys = new Keys({testing: this.props.testing});

		this._groupStyles.add([
			'ui-toolbar-group',
			this.styles.toolbarGroup
		]);

		this._rootStyles.add([
			'ui-toolbar',
			this.styles.toolbar
		]);

		this.componentWillUpdate(this.props);
	}

	public componentWillUpdate(nextProps: ToolbarProps) {

		if (nextProps.justify !== this.props.justify) {
			this._groupStyles.reset(Toolbar._resetJustify);
		}

		switch (nextProps.justify) {
			case Justify.right:
				this._groupStyles.on(this.styles.right);
				break;

			case Justify.center:
				this._groupStyles.on(this.styles.center);
				break;

			case Justify.left:
			default:
				this._groupStyles.on(this.styles.left);
				break;
		}

		super.componentWillUpdate(nextProps);
	}

	public render() {
		const components: any = [];

		React.Children.forEach(this.props.children, (child: any, idx: number) => {
			if (Toolbar._whitelist.contains(child['type'].name)) {
				const style = {
					height: this.fontSizePX(this.props.sizing, 1.5)
				};

				switch (child['type'].name) {
					case Button.name:
					case ButtonCircle.name:
					case ButtonDialog.name:
					case ButtonToggle.name:
						style['width'] = this.fontSizePX(this.props.sizing, 1.5);

					case ButtonText.name:
						style['margin'] = '0 1px 0 2px';
						style['border'] = 'solid 1px silver';
						break;
				}

				const newChild = React.cloneElement(child as any, {
					className: this.styles.toolbarElement,
					disabled: this.props.disabled,
					key: this._keys.at(idx),
					sizing: this.props.sizing,
					style: style,
					visible: this.props.visible
				});

				components.push(newChild);
			}
		});

		return(
			<div className={this._rootStyles.classnames}>
				<div className={this._groupStyles.classnames}>
					{components}
				</div>
			</div>
		);
	}
}
