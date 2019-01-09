'use strict';

const debug = require('debug')('DemoButtons');

import * as React from 'react';
import {
	Button,
	ButtonCircle,
	ButtonDialog,
	ButtonText,
	ButtonToggle,
	Container,
	Icon,
	Justify
} from '../../dist/bundle';

export default class DemoButtons extends React.Component<any, undefined> {

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	private buildIcons() {
		return (
			<tr className="tblIcons">
				<th>Icon</th>
				<td>
					<Icon
						disabled={this.props['disabled']}
						iconName="handshake-o"
						sizing={this.props['sizing']}
					/>
				</td>
				<td>
					<Icon
						disabled={this.props['disabled']}
						iconName="handshake-o"
						sizing={this.props['sizing']}
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
				<td>
					<Icon
						disabled={this.props['disabled']}
						imageFile="./test-icon-image.png"
						sizing={this.props['sizing']}
					/>
				</td>
				<td>
					<span style={{display: 'table', margin: '0 auto'}}>N/A</span></td>
			</tr>
		);
	}

	private buildButtons() {
		return(
			<tr>
				<th>Button</th>
				<td>
					<Button
						disabled={this.props['disabled']}
						iconName="motorcycle"
						sizing={this.props['sizing']}
					/>
				</td>
				<td>
					<Button
						disabled={this.props['disabled']}
						iconName="motorcycle"
						sizing={this.props['sizing']}
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
				<td>
					<ButtonCircle
						disabled={this.props['disabled']}
						iconName="times"
						sizing={this.props['sizing']}
					/>
				</td>
				<td>
					<ButtonCircle
						disabled={this.props['disabled']}
						iconName="times"
						sizing={this.props['sizing']}
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
				<td>
					<ButtonDialog
						disabled={this.props['disabled']}
						iconName="bars"
						sizing={this.props['sizing']}
					>
						dialog
					</ButtonDialog>
				</td>
				<td>
					<ButtonDialog
						disabled={this.props['disabled']}
						iconName="bars"
						sizing={this.props['sizing']}
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
						disabled={this.props['disabled']}
						iconNameOff="star-o"
						iconNameOn="star"
						fgColorOff="#004358"
						fgColorOn="#ffe11a"
						sizing={this.props['sizing']}
					/>
				</td>
				<td>
					<ButtonToggle
						bgColorOff="red"
						bgColorOn="black"
						disabled={this.props['disabled']}
						fgColorOn="red"
						fgColorOff="black"
						iconNameOff="star-o"
						iconNameOn="star"
						sizing={this.props['sizing']}
					/>
				</td>
			</tr>
		);
	}

	private buildButtonTextRight() {
		return(
			<tr>
				<th>ButtonText<br/>(Right)</th>
				<td>
					<ButtonText
						disabled={this.props['disabled']}
						iconName="paper-plane"
						sizing={this.props['sizing']}
						text="Text"
					/>
				</td>
				<td>
					<ButtonText
						disabled={this.props['disabled']}
						iconName="paper-plane"
						sizing={this.props['sizing']}
						style={{ color: 'white', backgroundColor: 'blue'}}
						text="Text"
					/>
				</td>
			</tr>
		);
	}

	private buildButtonTextLeft() {
		return(
			<tr>
				<th>ButtonText<br/>(Left)</th>
				<td>
					<ButtonText
						disabled={this.props['disabled']}
						iconName="paper-plane"
						justify={Justify.left}
						sizing={this.props['sizing']}
						text="Text"
					/>
				</td>
				<td>
					<ButtonText
						disabled={this.props['disabled']}
						iconName="paper-plane"
						justify={Justify.left}
						sizing={this.props['sizing']}
						style={{color: 'white', backgroundColor: 'red'}}
						text="Text"
					/>
				</td>
			</tr>
		);
	}

	private buildButtonTextCenter() {
		return(
			<tr>
				<th>ButtonText<br/>(Center)</th>
				<td>
					<ButtonText
						disabled={this.props['disabled']}
						text="Text"
						justify={Justify.center}
						sizing={this.props['sizing']}
					/>
				</td>
				<td>
					<ButtonText
						disabled={this.props['disabled']}
						text="Text"
						justify={Justify.center}
						sizing={this.props['sizing']}
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
							<th>Default</th>
							<th>Custom</th>
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
