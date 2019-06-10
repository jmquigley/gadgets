/**
 * A navigation control used to keep track of previous locations visited.  The
 * rightmost item is the current location.  This provides a "path" back to the
 * start of some navigation (i.e. trail of bread crumbs).
 *
 * This is a traditional widget control, in that it responds to new props and
 * does not maintain the path of breadcrumbs.  An event is used to inform the
 * user that one was selected.  Rebuilding the path is up to the application
 * using the control.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/breadcrumbs.png" width="40%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Breadcrumbs} from 'gadgets';
 *
 * <Breadcrumbs
 *     chevron="arrow-right"
 *     icon="pied-piper"
 *     items={[
 *         {name: 'name1', uri: 'http://www.example1.com'},
 *         {name: 'name2', uri: 'http://www.example2.com'},
 *         {name: 'name3', uri: 'http://www.example3.com'}]
 *     }]
 *     onSelection={(name: string, uri: string) => {
 *         debug('selected => name: %s, uri: %s', name, uri);
 *     }}
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onSelection(name: string, uri: string)` - When an item is selected this
 * callback is invoked.
 *
 * #### Styles
 * - `ui-breadcrumbs` - Applied to the `<div>` container around the Component
 * - `ui-breadcrumbs-name` - Each path/name in the component has this selector.
 * The underlying control is a ButtonText widget.
 * - `ui-breadcrumbs-chevron` - the path separater is an Icon component between
 * each path ButtonText.
 * - `ui-breadcrumbs-icon` - A Icon is placed at the front of the control by
 * default.  This is used to style that first icon.
 *
 * #### Properties
 * - `chevron="chevron-right" {string}` - The font awesome icon used as a
 * divider between path elements in the component.
 * - `icon="paperclip" {string}` - The font awesome icon placed at the
 * front of the component path list.
 * - `items=[] {Crumbs[]}` - An array of name/uri pairs that represent the
 * path locations that will be displayed.  They are displayed in the order
 * of the array.  The data type is a Crumbs interface that contains name (as
 * as string) and uri (as a string).
 * - `noicon=false {boolean}` - Suppresses the icon on the front of the
 * list when true.
 *
 * @module Breadcrumbs
 */

import autobind from "autobind-decorator";
import * as React from "react";
import styled from "styled-components";
import {Keys} from "util.keys";
import {nilEvent} from "util.toolbox";
import {ButtonText} from "../buttonText";
import {Icon} from "../icon";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	disabled,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Justify,
	Sizing,
	Wrapper
} from "../shared";

export interface Crumbs {
	name: string;
	uri: string;
}

export interface BreadcrumbsProps extends BaseProps {
	chevron?: string;
	icon?: string;
	items?: Crumbs[];
	noicon?: boolean;
	onSelection?: (name: string, uri: string) => void;
}

export function getDefaultBreadcrumbsProps(): BreadcrumbsProps {
	return {
		...getDefaultBaseProps(),
		chevron: "chevron-right",
		icon: "paperclip",
		items: [],
		onSelection: nilEvent,
		ripple: false
	};
}

export type BreadcrumbsState = BaseState;

export function getDefaultBreadcrumbsState(): BreadcrumbsState {
	return {...getDefaultBaseState()};
}

const BreadcrumbsView: any = styled.div`
	display: inline-flex;

	${(props: BreadcrumbsProps) => disabled(props)}
	${(props: BreadcrumbsProps) => invisible(props)}
`;

const IconView: any = styled(Icon)`
	margin-top: ${(props: BreadcrumbsProps) => {
		switch (props.sizing) {
			case Sizing.xxsmall:
				return "0.075rem";
			case Sizing.xsmall:
				return "0.1rem";
			case Sizing.small:
				return "0.2rem";
			case Sizing.large:
				return "0.3rem";
			case Sizing.xlarge:
				return "0.5rem";
			case Sizing.xxlarge:
				return "0.7rem";

			case Sizing.normal:
			default:
				return "0.2rem";
		}
	}};
	padding: 0 0.3rem;
`;

const ChevronIconView: any = styled(IconView)`
	opacity: 0.33;
`;

export class Breadcrumbs extends BaseComponent<
	BreadcrumbsProps,
	BreadcrumbsState
> {
	public static readonly defaultProps: BreadcrumbsProps = getDefaultBreadcrumbsProps();

	private _nameKeys: Keys;
	private _iconKeys: Keys;

	constructor(props: BreadcrumbsProps) {
		super(
			"ui-breadcrumbs",
			Breadcrumbs,
			props,
			getDefaultBreadcrumbsState()
		);

		this._nameKeys = new Keys({
			testing: this.props.testing,
			testingPrefix: "name"
		});
		this._iconKeys = new Keys({
			testing: this.props.testing,
			testingPrefix: "icon"
		});
	}

	@autobind
	private buttonSelector(name: string, uri: string) {
		const self: any = this;

		return () => {
			self.props.onSelection(name, uri);
		};
	}

	public render() {
		super.render();

		// The onSelection event should not be passed down through the
		// item and into the sub components.
		const {onSelection, ...props} = this.props;

		const components: any[] = [];
		if (this.props.items.length >= 1) {
			for (const [idx, {name, uri}] of this.props.items.entries()) {
				components.push(
					<ButtonText
						className='ui-breadcrumbs-name'
						justify={Justify.center}
						key={this._nameKeys.at(idx)}
						onClick={this.buttonSelector(name, uri)}
						text={name}
					/>
				);
				components.push(
					<ChevronIconView
						className='ui-breadcrumbs-chevron'
						iconName={this.props.chevron}
						key={this._iconKeys.at(idx)}
						ripple={false}
					/>
				);
			}

			// Remove the last icon from the array
			components.splice(-1, 1);
		}

		let icon: any = null;
		if (!this.props.noicon) {
			icon = (
				<IconView
					{...props}
					className='ui-breadcrumbs-icon'
					iconName={this.props.icon}
					ripple={false}
				/>
			);
		}

		return (
			<Wrapper {...this.props} name={this.name}>
				<BreadcrumbsView className={this.className}>
					{icon}
					{components}
				</BreadcrumbsView>
			</Wrapper>
		);
	}
}

export default Breadcrumbs;
