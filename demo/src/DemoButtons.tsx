'use strict';

const debug = require('debug')('DemoButtons');

import * as React from 'react';

const {
	Button,
	ButtonCircle,
	ButtonDialog,
	ButtonToggle,
	ButtonText,
	Container,
	Icon,
	Justify,
	Sizing
} = require('../../dist/bundle');

export default class DemoButtons extends React.Component<any, undefined> {

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	private buildIcons() {
		return (
			<tr className="tblIcons">
				<th>Icon</th>
				<td><Icon iconName="handshake-o" sizing={Sizing.xxsmall}/></td>
				<td><Icon iconName="handshake-o" sizing={Sizing.xsmall}/></td>
				<td><Icon iconName="handshake-o" sizing={Sizing.small}/></td>
				<td><Icon iconName="handshake-o" sizing={Sizing.normal}/></td>
				<td><Icon iconName="handshake-o" sizing={Sizing.large}/></td>
				<td><Icon iconName="handshake-o" sizing={Sizing.xlarge}/></td>
				<td><Icon iconName="handshake-o" sizing={Sizing.xxlarge}/></td>
				<td><Icon iconName="handshake-o" sizing={Sizing.normal} disabled={true}/></td>
				<td>
					<Icon
						iconName="handshake-o"
						sizing={Sizing.normal}
						style={{color: 'red', backgroundColor: 'blue'}}
					/>
				</td>
			</tr>
		);
	}

	private buildIconImages() {
		return (
			<tr className="tblIcons">
				<th>Icon Images</th>
				<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.xxsmall}/></td>
				<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.xsmall}/></td>
				<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.small}/></td>
				<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.normal}/></td>
				<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.large}/></td>
				<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.xlarge}/></td>
				<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.xxlarge}/></td>
				<td><Icon imageFile="./test-icon-image.png" sizing={Sizing.normal} disabled={true}/></td>
				<td><span style={{display: 'table', margin: '0 auto'}}>N/A</span></td>
			</tr>
		);
	}

	private buildButtons() {
		return(
			<tr>
				<th>Button</th>
				<td><Button iconName="motorcycle" sizing={Sizing.xxsmall}/></td>
				<td><Button iconName="motorcycle" sizing={Sizing.xsmall}/></td>
				<td><Button iconName="motorcycle" sizing={Sizing.small}/></td>
				<td><Button id="btn-normal" iconName="motorcycle" sizing={Sizing.normal} tooltip="normal"/></td>
				<td><Button iconName="motorcycle" sizing={Sizing.large}/></td>
				<td><Button iconName="motorcycle" sizing={Sizing.xlarge}/></td>
				<td><Button iconName="motorcycle" sizing={Sizing.xxlarge}/></td>
				<td><Button iconName="motorcycle" sizing={Sizing.normal} disabled={true}/></td>
				<td>
					<Button
						iconName="motorcycle"
						sizing={Sizing.normal}
						style={{color: 'yellow', backgroundColor: 'green'}}
					/>
				</td>
			</tr>
		);
	}

	private buildButtonCircle() {
		return(
			<tr>
				<th>ButtonCircle</th>
				<td><ButtonCircle iconName="times" sizing={Sizing.xxsmall}/></td>
				<td><ButtonCircle iconName="times" sizing={Sizing.xsmall}/></td>
				<td><ButtonCircle iconName="times" sizing={Sizing.small}/></td>
				<td><ButtonCircle iconName="times" sizing={Sizing.normal}/></td>
				<td><ButtonCircle iconName="times" sizing={Sizing.large}/></td>
				<td><ButtonCircle iconName="times" sizing={Sizing.xlarge}/></td>
				<td><ButtonCircle iconName="times" sizing={Sizing.xxlarge}/></td>
				<td><ButtonCircle iconName="times" sizing={Sizing.normal} disabled={true}/></td>
				<td>
					<ButtonCircle
						iconName="times"
						sizing={Sizing.normal}
						style={{color: 'green', backgroundColor: 'orange', borderColor: 'green'}}
					/>
				</td>
			</tr>
		);
	}

	private buildButtonDialog() {
		return(
			<tr>
				<th>ButtonDialog</th>
				<td><ButtonDialog iconName="bars" sizing={Sizing.xxsmall}>dialog</ButtonDialog></td>
				<td><ButtonDialog iconName="bars" sizing={Sizing.xsmall}>dialog</ButtonDialog></td>
				<td><ButtonDialog iconName="bars" sizing={Sizing.small}>dialog</ButtonDialog></td>
				<td><ButtonDialog iconName="bars" sizing={Sizing.normal}>dialog</ButtonDialog></td>
				<td><ButtonDialog iconName="bars" sizing={Sizing.large}>dialog</ButtonDialog></td>
				<td><ButtonDialog iconName="bars" sizing={Sizing.xlarge}>dialog</ButtonDialog></td>
				<td><ButtonDialog iconName="bars" sizing={Sizing.xxlarge}>dialog</ButtonDialog></td>
				<td><ButtonDialog iconName="bars" sizing={Sizing.normal} disabled={true}>dialog</ButtonDialog></td>
				<td>
					<ButtonDialog
						iconName="bars"
						sizing={Sizing.normal}
						style={{color: 'white', backgroundColor: 'teal'}}
					>
						dialog
					</ButtonDialog>
				</td>
			</tr>
		);
	}

	private buildButtonToggle() {
		return(
			<tr>
				<th>ButtonToggle</th>
				<td>
					<ButtonToggle
						iconNameOn="star"
						iconNameOff="star-o"
						fgColorOn="#ffe11a"
						fgColorOff="#004358"
						sizing={Sizing.xxsmall}
					/>
				</td>
				<td>
					<ButtonToggle
						iconNameOn="star"
						iconNameOff="star-o"
						fgColorOn="#ffe11a"
						fgColorOff="#004358"
						sizing={Sizing.xsmall}
					/>
				</td>
				<td>
					<ButtonToggle
						iconNameOn="star"
						iconNameOff="star-o"
						fgColorOn="#ffe11a"
						fgColorOff="#004358"
						sizing={Sizing.small}
					/>
				</td>
				<td>
					<ButtonToggle
						iconNameOn="star"
						iconNameOff="star-o"
						fgColorOn="#ffe11a"
						fgColorOff="#004358"
						sizing={Sizing.normal}
					/>
				</td>
				<td>
					<ButtonToggle
						iconNameOn="star"
						iconNameOff="star-o"
						fgColorOn="#ffe11a"
						fgColorOff="#004358"
						sizing={Sizing.large}
					/>
				</td>
				<td>
					<ButtonToggle
						iconNameOn="star"
						iconNameOff="star-o"
						fgColorOn="#ffe11a"
						fgColorOff="#004358"
						sizing={Sizing.xlarge}
					/>
				</td>
				<td>
					<ButtonToggle
						iconNameOn="star"
						iconNameOff="star-o"
						fgColorOn="#ffe11a"
						fgColorOff="#004358"
						sizing={Sizing.xxlarge}
					/>
				</td>
				<td>
					<ButtonToggle
						iconNameOn="star"
						iconNameOff="star-o"
						fgColorOn="#ffe11a"
						fgColorOff="#004358"
						sizing={Sizing.normal}
						disabled={true}
					/>
				</td>
				<td>
					<ButtonToggle
						iconNameOn="star"
						iconNameOff="star-o"
						fgColorOn="red"
						fgColorOff="black"
						bgColorOn="black"
						bgColorOff="red"
						sizing={Sizing.normal}
					/>
				</td>
			</tr>
		);
	}

	private buildButtonTextRight() {
		return(
			<tr>
				<th>ButtonText<br/>(Right)</th>
				<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.xxsmall}/></td>
				<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.xsmall}/></td>
				<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.small}/></td>
				<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.normal}/></td>
				<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.large}/></td>
				<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.xlarge}/></td>
				<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.xxlarge}/></td>
				<td><ButtonText text="Text" iconName="paper-plane" sizing={Sizing.normal} disabled={true}/></td>
				<td>
					<ButtonText
						text="Text"
						iconName="paper-plane"
						sizing={Sizing.normal}
						style={{ color: 'white', backgroundColor: 'blue'}}
					/>
				</td>
			</tr>
		);
	}

	private buildButtonTextLeft() {
		return(
			<tr>
				<th>ButtonText<br/>(Left)</th>
				<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.xxsmall}/></td>
				<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.xsmall}/></td>
				<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.small}/></td>
				<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.normal}/></td>
				<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.large}/></td>
				<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.xlarge}/></td>
				<td><ButtonText text="Text" justify={Justify.left} iconName="paper-plane" sizing={Sizing.xxlarge}/></td>
				<td>
					<ButtonText
						disabled={true}
						iconName="paper-plane"
						justify={Justify.left}
						sizing={Sizing.normal}
						text="Text"
					/>
				</td>
				<td>
					<ButtonText
						text="Text"
						justify={Justify.left}
						iconName="paper-plane"
						sizing={Sizing.normal}
						style={{color: 'white', backgroundColor: 'red'}}
					/>
				</td>
			</tr>
		);
	}

	private buildButtonTextCenter() {
		return(
			<tr>
				<th>ButtonText<br/>(Center)</th>
				<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.xxsmall}/></td>
				<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.xsmall}/></td>
				<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.small}/></td>
				<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.normal}/></td>
				<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.large}/></td>
				<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.xlarge}/></td>
				<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.xxlarge}/></td>
				<td><ButtonText text="Text" justify={Justify.center} sizing={Sizing.normal} disabled={true}/></td>
				<td>
					<ButtonText
						text="Text"
						justify={Justify.center}
						sizing={Sizing.normal}
						style={{color: 'white', backgroundColor: 'red'}}
					/>
				</td>
			</tr>
		);
	}

	public render() {
		return (
			<Container id="buttonExample" title="Buttons & Icons">
				<table id="buttonTable">
					<thead>
						<tr>
							<th />
							<th>xxsmall</th>
							<th>xsmall</th>
							<th>small</th>
							<th>normal<br/>medium</th>
							<th>large</th>
							<th>xlarge</th>
							<th>xxlarge</th>
							<th>disabled</th>
							<th>custom</th>
						</tr>
					</thead>
					<tbody>
						{this.buildIcons()}
						{this.buildIconImages()}
						{this.buildButtons()}
						{this.buildButtonCircle()}
						{this.buildButtonDialog()}
						{this.buildButtonToggle()}
						{this.buildButtonTextRight()}
						{this.buildButtonTextLeft()}
						{this.buildButtonTextCenter()}
					</tbody>
				</table>
			</Container>
		);
	}
}
