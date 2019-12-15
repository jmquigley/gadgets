/**
 * The tag list control is a basic list of strings that act as metadata for
 * another control.  They are used to categorize information.  There are
 * two types of `TagList` controls: static and dynamic.  With the static
 * control the list of string are given when the control is created and
 * are never changed.  With the dynamic control the list of tags can
 * be added or removed from the list.  Each operation results in an event
 * signalling what occurred (new or delete).  The tags from the events
 * must them be used to update the parent state and pass the new tags
 * back into the component (this is an uncontrolled component)
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
 * - `onDelete(tag: string, tags: string[])` - invoked when a user removes
 * a tag from the list.  The tag that is removed is given to the callback as
 * the first parameter.  The second parameter is the full list.
 * - `onKeyDown` - invoked when the user first presses a key.  This watches for
 * the escape key within the control.
 * - `onKeyPress` - invoked whne the user presses a key.  This watches for the
 * enter key within the control.
 * - `onNew(tag: string, tags: string[])` - invoked when the user adds a new
 * tag to the list. The tag that is added is given to the callback as the first
 * parameter.  The second parameter is the full list.
 *
 * #### Styles
 * - `ui-taglist` - style placed on the root div of the control
 *
 * #### Properties
 * - `nosort=false {boolean}` - if set to true, then the tags will not be
 * sorted when displayed, otherwise they are sorted.
 * - `placeholder="new" {string}` - the string placeholder in the input text
 * for new tags.
 * - `tags=[] {string[]|string}` - the list of tag strings initially added to
 * the control.  This is only respected on creation of the control
 * - `useinput=false {boolean}` - if set to true, then the user is allowed to
 * manipulate the tag list inline, otherwise the list is statically created.
 *
 * @module TagList
 */

import autobind from "autobind-decorator";
import * as _ from "lodash";
import * as React from "react";
import styled from "styled-components";
import {FontInfo, getFontInfo, getTextWidth} from "util.html";
import memoize from "util.memoize";
import {parseList} from "util.string";
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
	onDelete?: (tag: string, tags: string[]) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onNew?: (tag: string, tags: string[]) => void;
	placeholder?: string;
	tags?: string[] | string;
	useinput?: boolean;
}

export interface TagListState extends BaseState {
	inputText: string;
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
			inputText: ""
		});
	}

	/**
	 * Retrieves a sanitized version of the input tag list.  The component can
	 * accept a string list or an array of strings.  This method reads the props
	 * for the tags and ensures that it is converted to an array of strings.
	 * all blank tags are removed from the array.
	 */
	get tags(): string[] {
		const self = this;

		function normalizeTags(tags: string | string[]) {
			let newTags: string[];

			self.debug(
				"normalizeTags -> tags: '%O', type: %o",
				tags,
				typeof tags
			);

			if (typeof tags === "string") {
				newTags = parseList(tags);
			} else {
				newTags = tags || [];
			}

			self.debug("newTags before: %O", newTags);

			newTags = newTags
				.map((it: string) => it.trim())
				.filter((it: string) => it);

			self.debug("tags: `%O` -> newTags; %O", tags, newTags);

			return newTags;
		}

		return memoize(this.props.tags, normalizeTags);
	}

	private buildTags() {
		if (this.tags.length > 0) {
			return this.tags.map((tag: string) => {
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
		}

		return null;
	}

	private buildTextInputField() {
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

			return <StyledTextField {...textFieldProps} />;
		}

		return null;
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
		this.props.onDelete(
			tag,
			this.tags.filter((it: string) => it !== tag)
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

			if (target.value && !this.tags.includes(target.value)) {
				const tag: string = target.value;
				const tags: string[] = _.clone(this.tags);

				tags.push(tag);
				this.props.onNew(tag, this.props.nosort ? tags : tags.sort());
			}

			this.clearInput(target);
			this.props.onKeyPress(e);
		}
	}

	public render() {
		super.render();

		const tags = this.buildTags();
		const textInputField = this.buildTextInputField();

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
