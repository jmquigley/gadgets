// TODO: add documentation for ListItem

//
// Generates elements that will be contained within a List.  This resolved
// to the `<li>` tag.
//

import autobind from "autobind-decorator";
import * as React from "react";
import {nilEvent} from "util.toolbox";
import {
	getDefaultItemProps,
	getDefaultItemState,
	Item,
	ItemProps,
	ItemState
} from "../item";
import {BaseComponent, Sizing, Wrapper} from "../shared";

export interface ListItemProps extends ItemProps {
	href?: any; // holds a function injected by the parent for selection
	onBlur?: (e: React.FocusEvent<HTMLLIElement>) => void;
	onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
	onDoubleClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
	onSelect?: (title: string) => void;
}

export function getDefaultListItemProps(): ListItemProps {
	return {
		...getDefaultItemProps(),
		href: {
			selectHandler: nilEvent,
			sizing: Sizing.normal
		},
		obj: "ListItem",
		onBlur: nilEvent,
		onClick: nilEvent,
		onDoubleClick: nilEvent,
		onSelect: nilEvent
	};
}

export interface ListItemState extends ItemState {
	toggleRipple: boolean; // use this to turn ripple on/off during editing
}

export function getDefaultListItemState(): ListItemState {
	return {
		...getDefaultItemState(),
		toggleRipple: true
	};
}

export class ListItem extends BaseComponent<ListItemProps, ListItemState> {
	public static defaultProps: ListItemProps = getDefaultListItemProps();
	public state: ListItemState = getDefaultListItemState();

	private _delay = 250; // double click delay
	private _preventClick: boolean = false;
	private _timer: any = null;

	constructor(props: ListItemProps) {
		super(props, "ui-listitem", ListItem.defaultProps.style);
	}

	get preventClick(): boolean {
		return this._preventClick;
	}

	/**
	 * When an edit is concluded, this function is called to restore the pre-edit
	 * state.
	 */
	private deactivateEdit() {
		this._preventClick = false;
		this.setState(() => ({toggleRipple: false}));
	}

	@autobind
	private handleBlur(e: React.FocusEvent<HTMLLIElement>) {
		this.deactivateEdit();
		this.props.onBlur(e);
	}

	@autobind
	private handleClick(e: React.MouseEvent<HTMLLIElement>) {
		if (!this.props.disabled && this.props.visible) {
			// This timer will wait N seconds before respecting the single click
			// It is a way to differentiate between single and double click events
			// A double click is handled differently from the single
			this._timer = setTimeout(() => {
				if (!this._preventClick) {
					this.props.href.selectHandler(this);
					this.props.onClick(e);
					this.props.onSelect(this.props.title);
				}
			}, this._delay);
		}
	}

	@autobind
	private handleDoubleClick(e: React.MouseEvent<HTMLLIElement>) {
		if (!this.props.disabled && this.props.visible) {
			// If a double click occurs, then sent a flag preventing the single click
			// from firing after its timer expires
			clearTimeout(this._timer);
			this._preventClick = true;
			this.setState({toggleRipple: true}, () => {
				this.props.onDoubleClick(e);
			});
		}
	}

	@autobind
	private handleKeyDown(e: React.KeyboardEvent<HTMLLIElement>) {
		if (e.key === "Escape") {
			this.deactivateEdit();
		}

		this.props.onKeyDown(e);
	}

	@autobind
	private handleKeyPress(e: React.KeyboardEvent<HTMLLIElement>) {
		if (e.key === "Enter") {
			this.deactivateEdit();
		}

		this.props.onKeyPress(e);
	}

	public render() {
		this.updateClassName();

		return (
			<Wrapper {...this.props}>
				<Item
					{...this.props}
					className={this.className}
					ripple={this.state.toggleRipple}
					onBlur={this.handleBlur}
					onClick={this.handleClick}
					onDoubleClick={this.handleDoubleClick}
					onKeyDown={this.handleKeyDown}
					onKeyPress={this.handleKeyPress}
					sizing={this.props.href.sizing}
					style={this.state.style}
				/>
			</Wrapper>
		);
	}
}

export default ListItem;
