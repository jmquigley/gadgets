// TODO: add DynamicList documentation
// TODO: add DynamicList implementation

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {Accordion, AccordionItem} from '../accordion';
import {Button} from '../button';
import {ButtonDialog} from '../buttonDialog';
import {List, ListItem} from '../list';
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';

export interface DynamicListProps extends BaseProps {
	items?: string[];
	onNew?: any;
	title?: string;
}

export function getDefaultDynamicListProps(): DynamicListProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			items: [],
			onNew: nilEvent,
			title: ''
		}));
}

export interface DynamicListState {
	items?: string[];
	showNew?: boolean;
}

export class DynamicList extends BaseComponent<DynamicListProps, DynamicListState> {

	public static defaultProps: DynamicListProps = getDefaultDynamicListProps();

	private emptyListItem: any = null;

	constructor(props: DynamicListProps) {
		super(props, require('./styles.css'));
		this.state = {
			items: props.items.slice(),
			showNew: false
		};

		this.emptyListItem = <ListItem key={0} title="" visible={this.state.showNew} />;

		this.handleNew = this.handleNew.bind(this);
		this.handleSettings = this.handleSettings.bind(this);

		this.shouldComponentUpdate(props);
	}

	private handleNew() {
		console.log('handle new');
		this.setState({
			showNew: true
		});

		this.props.onNew();
	}

	private handleSettings() {
	}

	public shouldComponentUpdate(nextProps: DynamicListProps): boolean {
		super.resetStyles(nextProps);
		this.classes.push('ui-dynamiclist');
		super.buildStyles(nextProps);
		return true;
	}

	public render() {

		const listItems = [(
			<ListItem
				key={0}
				title="&nbsp;"
				visible={this.state.showNew}
				useedit
			/>
		)];
		for (const [idx, item] of this.state.items.entries()) {

			listItems.push(
				<ListItem
					hiddenRightButton
					key={idx + 1}
					rightButton={<Button iconName="times" />}
					title={item}
				/>
			);
		}

		return (
			<Accordion className={this.classes.join(' ')}>
				<AccordionItem
					initialToggle={true}
					leftButton={
						<ButtonDialog
							iconName="bars"
							onClick={this.handleSettings}
						/>
					}
					noedit
					rightButton={
						<Button
							iconName="plus"
							onClick={this.handleNew}
						/>
					}
					title={this.props.title}
				>
					<List alternating>
						{listItems}
					</List>
				</AccordionItem>
			</Accordion>
		);
	}
}
