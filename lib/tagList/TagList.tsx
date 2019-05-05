/**
 * The tag list control is a basic list of strings that act as metadata for
 * another control.  They are used to categorize information.  There are
 * two types of `TagList` controls: static and dynamic.  With the static
 * control the list of string are given when the control is created and
 * are never changed.  With the dynamic control the list of tags can
 * be added or removed from the list.  Each operation results in an event
 * signalling what occurred.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/tagList.png" width="40%" />
 *
 * ## Examples:
 *
 * ##### Dynamic TagList
 * ```javascript
 * import {TagList} from 'gadgets';
 *
 * <TagList tags={['one', 'two', 'three']} useinput />
 * ```
 *
 * ##### Static TagList
 * ```javascript
 * import {TagList} from 'gadgets';
 *
 * <TagList tags={['one', 'two', 'three']} />
 * ```
 *
 * ## API
 * #### Events
 * - `onBlur` - invoked when the user leaves the control.  This event works
 * like the escape key (resets the input)
 * - `onChange` - invoked as the user presses keys.  Receives the a reference
 * to the `HTMLInputElement`
 * - `onDelete(tag: string)` - invoked when a user removes a tag from the list.
 * The tag that is removed is given to the callback as a parameter.
 * - `onKeyDown` - invoked when the user first presses a key.  This watches for
 * the escape key within the control.
 * - `onKeyPress` - invoked whne the user presses a key.  This watches for the
 * enter key within the control.
 * - `onNew(tag: string)` - invoked when the user adds a new tag to the list.
 * The tag that is added is given to the callback as a parameter.
 *
 * #### Styles
 * - `ui-taglist` - style placed on the root div of the control
 *
 * #### Properties
 * - `nosort: {boolean} (false)` - if set to true, then the tags will not be
 * sorted when displayed, otherwise they are sorted.
 * - `tags: {string[]} ([])` - the list of tag strings initially added to the
 * control.  This is only respected on creation of the control
 * - `useinput: {boolean} (false)` - if set to true, then the user is allowed to
 * manipulate the tag list inline, otherwise the list is statically created.
 *
 * @module TagList
 */

// const debug = require("debug")("gadgets.TagList");

import autobind from "autobind-decorator";
import {List} from "immutable";
import * as React from "react";
import {nilEvent} from "util.toolbox";
import {Icon} from "../icon";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";
import {TextField} from "../textField";
import {Tag} from "./Tag";

export interface TagListProps extends BaseProps {
	nosort?: boolean;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onDelete?: (tag: string) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onNew?: (tag: string) => void;
	tags?: string[];
	useinput?: boolean;
}

export function getDefaultTagListProps(): TagListProps {
	return {
		...getDefaultBaseProps(),
		nosort: false,
		obj: "TagList",
		onBlur: nilEvent,
		onChange: nilEvent,
		onDelete: nilEvent,
		onKeyDown: nilEvent,
		onKeyPress: nilEvent,
		onNew: nilEvent,
		tags: [],
		useinput: false
	};
}

export interface TagListState extends BaseState {
	inputTextSize: number;
	tags?: List<string>;
}

export function getDefaultTagListState(): TagListState {
	return {
		...getDefaultBaseState(),
		inputTextSize: 1,
		tags: null
	};
}

const StyledIcon: any = styled(Icon)`
	margin-right: 5px;
`;

const StyledTextField: any = styled(TextField)`
	margin-left: 2px;

	> input {
		border: none;

		&::-webkit-input-placeholder {
			color: silver;
			opacity: 0.5;
		}
	}

	${(props: TagListProps) => props.sizing && fontStyle[props.sizing]}
`;

const TagListView: any = styled.div`
	display: inline-flex;

	${(props: TagListProps) => props.sizing && fontStyle[props.sizing]}
	${(props: TagListProps) => disabled(props)}
	${(props: TagListProps) => invisible(props)}
`;

export class TagList extends BaseComponent<TagListProps, TagListState> {
	public static readonly defaultProps: TagListProps = getDefaultTagListProps();
	public state: TagListState = getDefaultTagListState();

	constructor(props: TagListProps) {
		super(props, "ui-taglist", TagList.defaultProps.style);

		this.state = {
			...getDefaultTagListState(),
			tags: List<string>(props.tags)
		};
	}

	private clearInput(e: HTMLInputElement) {
		this.setState({inputTextSize: 0});
		e.value = "";
	}

	@autobind
	private handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		this.clearInput(e.target as HTMLInputElement);
		this.props.onBlur(e);
	}

	@autobind
	private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			inputTextSize: (e.target as HTMLInputElement).value.length
		});

		this.props.onChange(e);
	}

	@autobind
	private handleDelete(tag: string) {
		let {tags} = this.state;

		tags = tags.remove(tags.indexOf(tag));

		this.setState(
			{
				tags: this.props.nosort ? tags : tags.sort()
			},
			() => {
				this.props.onDelete(tag);
			}
		);
	}

	@autobind
	private handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Escape") {
			this.clearInput(e.target as HTMLInputElement);
		}

		this.props.onKeyDown(e);
	}

	@autobind
	private handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			const target = e.target as HTMLInputElement;
			let {tags} = this.state;

			if (target.value && !tags.contains(target.value)) {
				tags = tags.push(target.value);

				this.setState({
					tags: this.props.nosort ? tags : tags.sort()
				});

				this.props.onNew(target.value);
			}

			this.clearInput(target);
			this.props.onKeyPress(e);
		}
	}

	public render() {
		this.updateClassName();

		const tags = this.state.tags.map((tag: string) => {
			return (
				<Tag
					disabled={this.props.disabled}
					key={tag}
					onDelete={this.handleDelete}
					usedelete={this.props.useinput}
					visible={this.props.visible}
				>
					{tag}
				</Tag>
			);
		});

		let textInputField = null;
		if (this.props.useinput) {
			const textFieldProps = {
				disabled: this.props.disabled,
				noborder: true,
				onBlur: this.handleBlur,
				onChange: this.handleChange,
				onKeyDown: this.handleKeyDown,
				onKeyPress: this.handleKeyPress,
				placeholder: "new",
				size: this.state.inputTextSize,
				sizing: this.props.sizing,
				visible: this.props.visible
			};

			// This dynamically adds "value" to the text field input to
			// reset it to blacnk space when the current tag is
			// empty.
			if (this.state.inputTextSize < 1) {
				textFieldProps["value"] = "";
			}

			textInputField = <StyledTextField {...textFieldProps} />;
		}

		return (
			<Wrapper {...this.props}>
				<TagListView
					className={this.className}
					sizing={this.props.sizing}
					style={this.state.style}
				>
					<StyledIcon
						disabled={this.props.disabled}
						iconName='tags'
						sizing={this.props.sizing}
						visible={this.props.visible}
					/>
					{tags}
					{textInputField}
				</TagListView>
			</Wrapper>
		);
	}
}

export default TagList;
