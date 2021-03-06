"use strict";

const debug = require("debug")("DemoToolbar");

import * as React from "react";
import {
	Break,
	Button,
	ButtonCircle,
	ButtonDialog,
	ButtonText,
	ButtonToggle,
	Divider,
	DividerType,
	Dropdown,
	Justify,
	Option,
	OptionType,
	Switch,
	TextField,
	Toolbar
} from "../../dist/bundle";
import {StyledContainer} from "./helpers";

export default class DemoToolbar extends React.Component<any, undefined> {
	private items: any = [
		{val: "idstr1", label: "lstr1"},
		{val: "idstr2", label: "lstr2"},
		{val: "idstr3", label: "lstr3"}
	];

	constructor(props: any) {
		super(props);
		debug("creating");
	}

	public render() {
		return (
			<StyledContainer id='toolbarExample' title='Toolbar'>
				<h3>Left Justify space divider chevron</h3>
				<Toolbar
					disabled={this.props["disabled"]}
					justify={Justify.left}
					sizing={this.props["sizing"]}
				>
					<Button disabled={true} iconName='car' />
					<ButtonCircle iconName='times' />
					<ButtonDialog iconName='bars'>Test Text</ButtonDialog>
					<Divider />
					<ButtonText text='btext' iconName='fighter-jet' />
					<ButtonToggle
						iconNameOn='star'
						iconNameOff='star-o'
						fgColorOn='red'
						fgColorOff='green'
					/>
					<Option optionType={OptionType.dot} text='test' />
					<Switch />
					<TextField placeholder='test' size={4} maxLength={4} />
					<Dropdown initialValue='idstr1' items={this.items} />
				</Toolbar>
				<Break sizing={this.props["sizing"]} />

				<h3>Center Justify vertical divider chevron</h3>
				<Toolbar
					disabled={this.props["disabled"]}
					justify={Justify.center}
					sizing={this.props["sizing"]}
				>
					<Button disabled={true} iconName='car' />
					<ButtonCircle iconName='times' />
					<ButtonDialog iconName='bars'>Test Text</ButtonDialog>
					<Divider dividerType={DividerType.vertical} />
					<ButtonText text='btext' iconName='fighter-jet' />
					<ButtonToggle
						iconNameOn='star'
						iconNameOff='star-o'
						fgColorOn='red'
						fgColorOff='green'
					/>
					<Option optionType={OptionType.dot} text='test' />
					<Switch />
					<TextField placeholder='test' size={4} maxLength={4} />
					<Dropdown initialValue='idstr1' items={this.items} />
				</Toolbar>
				<Break sizing={this.props["sizing"]} />

				<h3>Right Justify horizontal divider chevron</h3>
				<Toolbar
					disabled={this.props["disabled"]}
					justify={Justify.right}
					sizing={this.props["sizing"]}
				>
					<Button disabled={true} iconName='car' />
					<ButtonCircle iconName='times' />
					<ButtonDialog iconName='bars'>Test Text</ButtonDialog>
					<Divider dividerType={DividerType.horizontal} />
					<ButtonText text='btext' iconName='fighter-jet' />
					<ButtonToggle
						iconNameOn='star'
						iconNameOff='star-o'
						fgColorOn='red'
						fgColorOff='green'
					/>
					<Option optionType={OptionType.dot} text='test' />
					<Switch />
					<TextField placeholder='test' size={4} maxLength={4} />
					<Dropdown initialValue='idstr1' items={this.items} />
				</Toolbar>
				<Break sizing={this.props["sizing"]} />

				<h3>Center Justify</h3>
				<Toolbar
					disabled={this.props["disabled"]}
					justify={Justify.center}
					sizing={this.props["sizing"]}
				>
					<Button iconName='car' />
					<ButtonCircle iconName='times' />
					<ButtonDialog iconName='bars'>Test Text</ButtonDialog>
					<ButtonText text='btext' iconName='fighter-jet' />
					<ButtonToggle
						iconNameOn='star'
						iconNameOff='star-o'
						fgColorOn='red'
						fgColorOff='green'
					/>
					<Option optionType={OptionType.dot} text='test' />
					<Switch />
					<TextField placeholder='test' size={4} maxLength={4} />
				</Toolbar>
			</StyledContainer>
		);
	}
}
