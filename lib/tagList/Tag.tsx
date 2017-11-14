/**
 * A wrapper for a single string value that will appear within a `TagList`.
 * A tag can be static or contain a delete button within it.  This control
 * would generally just be used within the `TagList`.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/tagList.png" width="40%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Tag} from 'gadgets';
 * <Tag usedelete>strvalue</Tag>
 * ```
 *
 * ## API
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
	disabled,
	getDefaultBaseProps,
	getTheme,
	invisible
} from '../shared';
import styled, {ThemeProvider, withProps} from '../shared/themed-components';

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

export const DeleteButtonView: any = styled(ButtonCircle)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transition: opacity ${props => props.theme.transitionDelay} ease-in-out;
	width: unset;
`;

export const TagView: any = withProps<TagProps, HTMLDivElement>(styled.div)`
	border: solid 1px silver;
	border-radius: 3px;
	cursor: default;
	box-sizing: border-box;
	display: inline;
	opacity: 1.0;
	margin: 0 1px;
	padding: 0 3px;
	position: relative;

	${props => disabled(props)}
	${props => invisible(props)}
`;

export class Tag extends BaseComponent<TagProps, TagState> {

	private tag: string;
	public static readonly defaultProps: TagProps = getDefaultTagProps();

	constructor(props: TagProps) {
		super(props, Tag.defaultProps.style);
		this._classes.add(['ui-tag']);

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
			this.setState({showDelete: false}, () => {
				this.props.onMouseOut();
			});
		}
	}

	private handleMouseOver() {
		if (this.props.usedelete && !this.props.disabled) {
			this.setState({showDelete: true}, () => {
				this.props.onMouseOver();
			});
		}
	}

	public render() {
		this.tag = React.Children.map(this.props.children, (child: any) => {
			return String(child);
		}).join(' ');

		let deleteButton: any = null;
		if (this.props.usedelete) {
			deleteButton = (
				<DeleteButtonView
					disabled={this.props.disabled}
					iconName="times"
					onClick={this.handleOnClick}
					sizing={this.prev().type}
					style={{
						backgroundColor: Color.white,
						borderColor: Color.error,
						color: Color.error,
						opacity: this.state.showDelete ? '1.0' : '0.0'
					}}
					visible={this.props.visible}
				/>
			);
		}

		return (
			<ThemeProvider theme={getTheme()} >
				<TagView
					{...this.props}
					className={this.classes}
					onMouseOut={this.handleMouseOut}
					onMouseOver={this.handleMouseOver}
				>
					<Label
						disabled={this.props.disabled}
						noedit
						text={this.tag}
						visible={this.props.visible}
					/>
					{deleteButton}
				</TagView>
			</ThemeProvider>
		);
	}
}
