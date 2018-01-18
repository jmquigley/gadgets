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
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/breadcrumbs.png" width="50%" />
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
 *     onSelect={(name: string, uri: string) => {
 *         debug('selected => name: %s, uri: %s', name, uri);
 *     }}
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onSelect(name: string, uri: string)` - When an item is selected this
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
 * - `chevron: {string} ('chevron-right)` - The font awesome icon used as a
 * divider between path elements in the component.
 * - `icon: {string} ('paperclip')` - The font awesome icon placed at the
 * front of the component path list.
 * - `items: {Crumbs[]} ([])` - An array of name/uri pairs that represent the
 * path locations that will be displayed.  They are displayed in the order
 * of the array.  The data type is a Crumbs interface that contains name (as
 * as string) and uri (as a string).
 * - `noicon {boolean} (false)` - Suppresses the icon on the front of the
 * list when true.
 *
 * @module Breadcrumbs
 */

'use strict';

// const debug = require('debug')('Breadcrumbs');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Keys} from 'util.keys';
import {nilEvent} from 'util.toolbox';
import {ButtonText} from '../buttonText';
import {Icon} from '../icon';
import {
	BaseComponent,
	BaseProps,
	disabled,
	getDefaultBaseProps,
	invisible,
	Justify,
	Sizing,
	Wrapper
} from '../shared';
import styled, {withProps} from '../shared/themed-components';

export interface Crumbs {
	name: string;
	uri: string;
}

export interface BreadcrumbsProps extends BaseProps {
	chevron?: string;
	icon?: string;
	items?: Crumbs[];
	noicon?: boolean;
	onSelect?: any;
}

export function getDefaultBreadcrumbsProps(): BreadcrumbsProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			chevron: 'chevron-right',
			icon: 'paperclip',
			items: [],
			obj: 'Breadcrumbs',
			onSelect: nilEvent
		})
	);
}

export const BreadcrumbsView: any = withProps<BreadcrumbsProps, HTMLDivElement>(styled.div)`
	display: inline-flex;

	${props => disabled(props)}
	${props => invisible(props)}
`;

export const IconView: any = withProps<BreadcrumbsProps, HTMLElement>(styled(Icon))`
	margin-top: ${(props: BreadcrumbsProps) => {
		switch (props.sizing) {
			case Sizing.xxsmall: return('0.075rem');
			case Sizing.xsmall: return('0.1rem');
			case Sizing.small: return('0.2rem');
			case Sizing.large: return('0.3rem');
			case Sizing.xlarge: return('0.5rem');
			case Sizing.xxlarge: return('0.7rem');

			case Sizing.normal:
			default:
				return('0.2rem');
		}
	}};
	padding: 0 0.3rem;
`;

export const ChevronIconView: any = styled(IconView)`
	opacity: 0.33;
`;

export class Breadcrumbs extends BaseComponent<BreadcrumbsProps, undefined> {
	public static readonly defaultProps: BreadcrumbsProps = getDefaultBreadcrumbsProps();

	private _nameKeys: Keys;
	private _iconKeys: Keys;
	private _components: any[] = [];

	constructor(props: BreadcrumbsProps) {
		super(props, Breadcrumbs.defaultProps.style);

		this._classes.add('ui-breadcrumbs');

		this._nameKeys = new Keys({testing: this.props.testing, testingPrefix: 'name'});
		this._iconKeys = new Keys({testing: this.props.testing, testingPrefix: 'icon'});

		this.componentWillReceiveProps(this.props);
		this.componentWillUpdate(this.props);
	}

	@autobind
	private buttonSelector(name: string, uri: string) {
		const self: any = this;

		return () => {
			self.props.onSelect(name, uri);
		};
	}

	public componentWillReceiveProps(nextProps: BreadcrumbsProps) {
		this._components = [];

		if (nextProps.items.length >= 1) {

			for (const [idx, {name, uri}] of nextProps.items.entries()) {
				this._components.push(
					<ButtonText
						{...nextProps}
						className="ui-breadcrumbs-name"
						justify={Justify.center}
						key={this._nameKeys.at(idx)}
						onClick={this.buttonSelector(name, uri)}
						text={name}
					/>
				);
				this._components.push(
					<ChevronIconView
						{...nextProps}
						className="ui-breadcrumbs-chevron"
						iconName={nextProps.chevron}
						key={this._iconKeys.at(idx)}
					/>
				);
			}

			// Remove the last icon from the array
			this._components.splice(-1, 1);
		}
	}

	public render() {

		let icon: any = null;
		if (!this.props.noicon) {
			icon = (
				<IconView
					{...this.props}
					className="ui-breadcrumbs-icon"
					iconName={this.props.icon}
				/>
			);
		}

		return(
			<Wrapper {...this.props} >
				<BreadcrumbsView className={this.classes}>
					{icon}
					{this._components}
				</BreadcrumbsView>
			</Wrapper>
		);
	}
}
