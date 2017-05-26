import * as React from 'react';
import {render} from 'react-dom';
import {getUUID} from 'util.toolbox';

const bundle = require('../dist/bundle');

const Button = bundle.Button;
const ButtonDialog = bundle.ButtonDialog;
const ButtonToggle = bundle.ButtonToggle;
const List = bundle.List;
const ListItem = bundle.ListItem;

render(
	<div id="app">
		<div id="listExample">
			<h3>List/ListItem Example</h3>
			<List alternating id="simple-list">
				<ListItem
					id={getUUID()}
					leftTitle="List Item 1" rightTitle="12"
					leftButton={<Button iconName="podcast"/>}
					rightButton={<Button iconName="paper-plane-o"/>}
				/>
				<ListItem id={getUUID()} leftTitle="List Item 2" rightTitle="13" rightButton={<Button />}/>
				<ListItem id={getUUID()} leftTitle="List Item 3" rightTitle="14" />
				<ListItem
					id={getUUID()}
					leftTitle="List Item 4a (hide/show)" rightTitle="15"
					leftButton={<Button />}
					hiddenLeftButton
					rightButton={
						<ButtonDialog iconName="times">Test Dialog Button</ButtonDialog>
					}
					hiddenRightButton
				/>
				<ListItem
					id={getUUID()}
					leftTitle="List Item 4b (hide/show)" rightTitle="15"
					hiddenLeftButton
					leftButton={
						<ButtonDialog iconName="wrench">Test Dialog Button</ButtonDialog>
					}
				/>
				<ListItem id={getUUID()} leftTitle="List Item 5" />
				<ListItem
					id={getUUID()}
					leftTitle="List Item 6 (Toggle)" rightTitle="15"
					rightButton={
						<ButtonToggle iconNameOn="star" iconNameOff="star-o" fgColorOn="yellow" fgColorOff="#004358" />
					}
				/>
			</List>
		</div>
	</div>,
	document.getElementById('root')
);
