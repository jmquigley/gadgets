/**
 * The tag list control is a basic list of strings that act as metadata for
 * another control.  They are used to categorize information.  There are
 * two types of `TagList` controls: static and dynamic.  With the static
 * control the list of string are given when the control is created and
 * are never changed.  With the dynamic control the list of tags can
 * be added or removed from the list.  Each operation results in an event
 * signalling what occurred.
 *
 * #### Examples:
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

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {List, SortedList} from 'util.ds';
import {nilEvent} from 'util.toolbox';
import {Icon} from '../icon';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps
} from '../shared';
import {TextField} from '../textField';
import {Tag} from './Tag';

export interface TagListProps extends BaseProps {
	nosort?: boolean;
	onBlur?: any;
	onChange?: any;
	onDelete?: any;
	onKeyDown?: any;
	onKeyPress?: any;
	onNew?: any;
	tags?: string[];
	useinput?: boolean;
}

export function getDefaultTagListProps(): TagListProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			nosort: false,
			onBlur: nilEvent,
			onChange: nilEvent,
			onDelete: nilEvent,
			onKeyDown: nilEvent,
			onKeyPress: nilEvent,
			onNew: nilEvent,
			tags: [],
			useinput: false
		})
	);
}

export interface TagListState {
	inputTextSize: number;
	tags?: string[];
}

export class TagList extends BaseComponent<TagListProps, TagListState> {

	private tags: SortedList<string> | List<string>;
	public static readonly defaultProps: TagListProps = getDefaultTagListProps();

	constructor(props: TagListProps) {
		super(props, require('./styles.css'));

		if (props.nosort) {
			this.tags = new List<string>(props.tags);
		} else {
			this.tags = new SortedList<string>(props.tags);
		}

		this._rootStyles.add([
			'ui-taglist',
			this.styles.tagList
		]);

		this.state = {
			inputTextSize: 1,
			tags: this.tags.array
		};

		this.bindCallbacks(
			'handleBlur',
			'handleChange',
			'handleDelete',
			'handleKeyDown',
			'handleKeyPress'
		);

		this.componentWillUpdate(props);
	}

	private clearInput(e: HTMLInputElement) {
		this.setState({inputTextSize: 1});
		e.value = '';
	}

	private handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		this.clearInput(e.target as HTMLInputElement);
		this.props.onBlur(e);
	}

	private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			inputTextSize: (e.target as HTMLInputElement).value.length
		});

		this.props.onChange(e);
	}

	private handleDelete(tag: string) {
		this.tags.remove(tag);
		this.setState({
			tags: this.tags.array
		}, () => {
			this.props.onDelete(tag);
		});
	}

	private handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Escape') {
			this.clearInput(e.target as HTMLInputElement);
		}

		this.props.onKeyDown(e);
	}

	private handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			const target = e.target as HTMLInputElement;

			this.tags.insert(target.value);
			this.setState({
				tags: this.tags.array
			}, () => {
				this.props.onNew(target.value);
				this.clearInput(target);
			});
		}

		this.props.onKeyPress(e);
	}

	public render() {

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

		return (
			<div className={this._rootStyles.classnames}>
				<Icon iconName="tags" />
				{tags}
				{this.props.useinput &&
				<TextField
					className={this.styles.tagListInput}
					disabled={this.props.disabled}
					onBlur={this.handleBlur}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
					onKeyPress={this.handleKeyPress}
					placeholder="new"
					size={this.state.inputTextSize}
					visible={this.props.visible}
				/>
				}
			</div>
		);
	}
}
