'use strict';

const debug = require('debug')('DemoListItem');

import * as React from 'react';
import {
	Button,
	ButtonCircle,
	ButtonDialog,
	ButtonToggle,
	Container,
	Icon,
	List,
	ListDivider,
	ListHeader,
	ListItem
} from '../../';

export default class DemoListItem extends React.Component<any, undefined> {

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	public render() {
		return (
			<Container id="listExample1" title="List/ListItem">
				<List alternating sizing={this.props['sizing']}>
					<ListHeader
						leftButton={<ButtonDialog iconName="bars"><div>header dialog</div><br/></ButtonDialog>}
						noedit
						rightButton={<Button iconName="plus" />}
						title={`Demo List Header (${this.props['sizing']})`}
					/>
					<ListItem
						leftButton={<Button iconName="podcast"/>}
						rightButton={<Button iconName="paper-plane-o"/>}
						title="List Item 1"
						widget="12"
					/>
					<ListItem
						leftButton={<Icon iconName="bolt" />}
						rightButton={<Button />}
						title="List Item 2 (with icon)"
						widget="13"
					/>
					<ListItem
						hiddenLeftButton
						leftButton={<Icon iconName="car" />}
						title="List Item 3 (with hidden icon)"
						widget="14"
					/>
					<ListDivider />
					<ListItem
						hiddenLeftButton
						hiddenRightButton
						leftButton={<Button />}
						rightButton={
							<ButtonCircle
								iconName="times"
								style={{
									color: 'red',
									borderColor: 'red'
								}}
							/>
						}
						title="List Item 4a (hide/show)"
						widget="15"
					/>
					<ListItem
						hiddenLeftButton
						hiddenRightButton
						leftButton={
							<ButtonDialog iconName="wrench">Test Dialog Button</ButtonDialog>
						}
						rightButton={
							<Button
								iconName="times"
								style={{color: 'red'}}
							/>
						}
						title="List Item 4b (hide/show)"
						widget="15"
					/>
					<ListItem title="List Item 5" />
					<ListItem
						rightButton={
							<ButtonToggle
								iconNameOn="star"
								iconNameOff="star-o"
								fgColorOn="#ffe11a"
								fgColorOff="#004358"
							/>
						}
						title="List Item 6 (Toggle)"
						widget="15"
					/>
					<ListItem title="List Item 7 (disabled)" disabled />
					<ListItem
						disabled
						rightButton={
							<Button />
						}
						title="List Item 8 (disabled w/ buttons)"
					/>
					<ListItem
						rightButton={<Button />}
						stacked
						title="List Item 9 (stacked)"
						widget="stacked bottom widget"
					/>
					<ListItem
						noripple
						title="List Item 10 (noripple edit)"
					/>
					<ListItem
						noripple
						noedit
						title="List Item 11 (noedit)"
					/>
				</List>
			</Container>
		);
	}
}
