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
 * - `nosort=false {boolean}` - if set to true, then the tags will not be
 * sorted when displayed, otherwise they are sorted.
 * - `placeholder="new" {string}` - the string placeholder in the input text
 * for new tags.
 * - `tags=[] {string[]}` - the list of tag strings initially added to the
 * control.  This is only respected on creation of the control
 * - `useinput=false {boolean}` - if set to true, then the user is allowed to
 * manipulate the tag list inline, otherwise the list is statically created.
 *
 * @module TagList
 */

import autobind from "autobind-decorator";
import {List} from "immutable";
import * as React from "react";
import styled from "styled-components";
import {FontInfo, getFontInfo, getTextWidth} from "util.html";
import {nilEvent} from "util.toolbox";
import {Icon} from "../icon/Icon";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	defaultBaseProps,
	disabled,
	fontStyle,
	invisible,
	Wrapper
} from "../shared";
import {TextField} from "../textField/TextField";
import {Tag} from "./Tag";

export interface TagListProps extends BaseProps {
	nosort?: boolean;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onDelete?: (tag: string) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onNew?: (tag: string) => void;
	placeholder?: string;
	tags?: string[];
	useinput?: boolean;
}

export interface TagListState extends BaseState {
	inputText: string;
	tags?: List<string>;
}

const StyledIcon: any = styled(Icon)`
	align-items: center;
	display: inline-flex;
	margin-right: 5px;
`;

const StyledTextField: any = styled(TextField)`
	margin-left: 2px;

	> input {
		border: none;

		&::-webkit-input-placeholder {
			color: ${(props: TagListProps) => props.theme.chevronColor};
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
	public static readonly defaultProps: TagListProps = {
		...defaultBaseProps,
		nosort: false,
		onBlur: nilEvent,
		onChange: nilEvent,
		onDelete: nilEvent,
		onKeyDown: nilEvent,
		onKeyPress: nilEvent,
		onNew: nilEvent,
		placeholder: "new",
		tags: [],
		useinput: false
	};

	constructor(props: TagListProps) {
		super("ui-taglist", TagList, props, {
			inputText: "",
			tags: List<string>(props.nosort ? props.tags : props.tags.sort())
		});
	}

	private clearInput(e: HTMLInputElement) {
		this.setState({inputText: ""});
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
			inputText: (e.target as HTMLInputElement).value
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
		super.render();

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
			const fontInfo: FontInfo = getFontInfo();
			const font: string = `${fontInfo.weight} ${fontInfo.size}px ${fontInfo.family[0]}`.trim();

			let width: number = 0;

			if (this.state.inputText.length > 0) {
				width = getTextWidth(this.state.inputText, font);
			} else {
				width = getTextWidth(this.props.placeholder, font);
			}

			const textFieldProps = {
				disabled: this.props.disabled,
				noborder: true,
				onBlur: this.handleBlur,
				onChange: this.handleChange,
				onKeyDown: this.handleKeyDown,
				onKeyPress: this.handleKeyPress,
				placeholder: this.props.placeholder,
				size: this.state.inputText.length,
				sizing: this.props.sizing,
				visible: this.props.visible,
				width: `${width}px`
			};

			// This dynamically adds "value" to the text field input to
			// reset it to blank space when the current tag is
			// empty.
			if (this.state.inputText.length < 1) {
				textFieldProps["value"] = "";
			}

			textInputField = <StyledTextField {...textFieldProps} />;
		}

		return (
			<Wrapper {...this.props} name={this.name}>
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
