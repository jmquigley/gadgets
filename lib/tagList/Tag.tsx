/**
 * A wrapper for a single string value that will appear within a `TagList`.
 * A tag can be static or contain a delete button within it.  This control
 * would generally just be used within the `TagList`.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Tag} from 'gadgets';
 * <Tag usedelete>strvalue</Tag>
 * ```
 *
 * #### Events
 * - `onClick` - invoked when the user clicks on the delete button within the
 * control.  This is only visible when `usedelete` is specified.
 * - `onDelete(tag: string)` - invoked when the delete button is pressed.  The
 * value of the tag is given to the callback as a parameter.
 * - `onMouseOut` - invoked when the mouse leaves the control
 * - `onMouseOver` - invoked when the mouse moves over the control.
 *
 * #### Styles
 * - `ui-tag` - placed on the root `<div>` of the control.
 *
 * #### Properties
 * - `usedelete: {boolean} (false)`- if true then the delete button will be
 * shown when the mouse enters the tag, otherwise this is suppressed.
 *
 * @module Tag
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {ButtonCircle} from '../buttonCircle';
import {Label} from '../label';
import {
	BaseComponent,
	BaseProps,
	Color,
	getDefaultBaseProps
} from '../shared';

export interface TagProps extends BaseProps {
	onClick?: any;
	onDelete?: any;
	onMouseOut?: any;
	onMouseOver?: any;
	usedelete?: boolean;
}

export function getDefaultTagProps(): TagProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			onClick: nilEvent,
			onDelete: nilEvent,
			onMouseOut: nilEvent,
			onMouseOver: nilEvent,
			usedelete: false
		})
	);
}

export interface TagState {
	showDelete?: boolean;
}

export class Tag extends BaseComponent<TagProps, TagState> {

	private tag: string;
	public static readonly defaultProps: TagProps = getDefaultTagProps();

	constructor(props: TagProps) {
		super(props, require('./styles.css'));

		this._rootStyles.add([
			'ui-tag',
			this.styles.tag
		]);

		this.state = {
			showDelete: false
		};

		this.bindCallbacks(
			'handleOnClick',
			'handleMouseOut',
			'handleMouseOver'
		);

		this.componentWillUpdate(props, this.state);
	}

	private handleOnClick(e: React.MouseEvent<HTMLDivElement>) {
		if (this.props.usedelete && !this.props.disabled) {
			this.props.onDelete(this.tag);
		}

		this.props.onClick(e);
	}

	private handleMouseOut() {
		if (this.props.usedelete && !this.props.disabled) {
			this.setState({showDelete: false});
		}

		this.props.onMouseOut();
	}

	private handleMouseOver() {
		if (this.props.usedelete && !this.props.disabled) {
			this.setState({showDelete: true});
		}

		this.props.onMouseOver();
	}

	public componentWillUpdate(nextProps: TagProps, nextState: TagState) {

		this._rootStyles.onIfElse(nextState.showDelete && !this.props.disabled)(
			this.styles.tagHover
		)(
			this.styles.tagNoHover
		);

		super.componentWillUpdate(nextProps);
	}

	public render() {

		this.tag = React.Children.map(this.props.children, (child: any) => {
			return String(child);
		}).join(' ');

		return (
			<div
				className={this._rootStyles.classnames}
				onMouseOut={this.handleMouseOut}
				onMouseOver={this.handleMouseOver}
			>
				<Label
					disabled={this.props.disabled}
					noedit
					text={this.tag}
					visible={this.props.visible}
				/>
				{this.props.usedelete &&
				<ButtonCircle
					className={`${this.styles.tagDeleteButton} ${this.styles.middle}`}
					disabled={this.props.disabled}
					iconName="times"
					onClick={this.handleOnClick}
					sizing={this.prev().type}
					style={{
						backgroundColor: Color.white,
						borderColor: Color.error,
						color: Color.error
					}}
					visible={this.state.showDelete}
				/>
				}
			</div>
		);
	}
}
