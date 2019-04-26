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

import autobind from "autobind-decorator";
import * as React from "react";
import {nilEvent} from "util.toolbox";
import {ButtonCircle} from "../buttonCircle";
import {Label} from "../label";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	disabled,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";

export interface TagProps extends BaseProps {
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	onDelete?: (tag: string) => void;
	onMouseOut?: (e: React.MouseEvent<HTMLDivElement>) => void;
	onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
	usedelete?: boolean;
}

export function getDefaultTagProps(): TagProps {
	return {
		...getDefaultBaseProps(),
		obj: "Tag",
		onClick: nilEvent,
		onDelete: nilEvent,
		onMouseOut: nilEvent,
		onMouseOver: nilEvent,
		usedelete: false
	};
}

export interface TagState extends BaseState {
	showDelete?: boolean;
}

export function getDefaultTagState(): TagState {
	return {...getDefaultBaseState(), showDelete: false};
}

const DeleteButtonView: any = styled(ButtonCircle)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transition: opacity ${(props: TagProps) => props.theme.transitionDelay}
		ease-in-out;
	width: unset;
`;

const TagView: any = styled.div`
	border: solid 1px silver;
	border-radius: 3px;
	cursor: default;
	box-sizing: border-box;
	display: inline;
	font-size: inherit;
	opacity: 1;
	margin: 0 1px;
	padding: 0 3px;
	position: relative;

	> span {
		font-size: inherit;
	}

	${(props: TagProps) => disabled(props)}
	${(props: TagProps) => invisible(props)}
`;

export const StyledLabel: any = styled(Label)``;

export class Tag extends BaseComponent<TagProps, TagState> {
	private tag: string;
	public static readonly defaultProps: TagProps = getDefaultTagProps();
	public state: TagState = getDefaultTagState();

	constructor(props: TagProps) {
		super(props, "ui-tag", Tag.defaultProps.style);
	}

	@autobind
	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (this.props.usedelete && !this.props.disabled) {
			this.props.onDelete(this.tag);
		}

		this.props.onClick(e);
	}

	@autobind
	private handleMouseOut(e: React.MouseEvent<HTMLDivElement>) {
		if (this.props.usedelete && !this.props.disabled) {
			this.setState({showDelete: false});
			this.props.onMouseOut(e);
		}
	}

	@autobind
	private handleMouseOver(e: React.MouseEvent<HTMLDivElement>) {
		if (this.props.usedelete && !this.props.disabled) {
			this.setState({showDelete: true});
			this.props.onMouseOver(e);
		}
	}

	public render() {
		this.updateClassName();

		const {onDelete, ...props} = this.props;

		this.tag = React.Children.map(props.children, (child: any) => {
			return String(child);
		}).join(" ");

		let deleteButton: any = null;
		if (props.usedelete) {
			deleteButton = (
				<DeleteButtonView
					disabled={props.disabled}
					iconName='times'
					onClick={this.handleClick}
					sizing={BaseComponent.prev(props.sizing).type}
					style={{
						backgroundColor: Color.white,
						borderColor: Color.error,
						color: Color.error,
						opacity: this.state.showDelete ? "1.0" : "0.0"
					}}
					visible={props.visible}
				/>
			);
		}

		return (
			<Wrapper {...props}>
				<TagView
					className={this.className}
					onMouseOut={this.handleMouseOut}
					onMouseOver={this.handleMouseOver}
					style={this.state.style}
				>
					<StyledLabel
						disabled={props.disabled}
						noedit
						text={this.tag}
						visible={props.visible}
					/>
					{deleteButton}
				</TagView>
			</Wrapper>
		);
	}
}

export default Tag;
