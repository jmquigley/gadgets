"use strict";

const debug = require("debug")("DemoDialogBox");

import autobind from "autobind-decorator";
import * as loremIpsum from "lorem-ipsum";
import * as React from "react";
import {ButtonText, DialogBox, DialogBoxType} from "../../dist/bundle";
import {StyledContainer} from "../app";

export interface DemoDialogBoxState {
	dialogError: boolean;
	dialogWarning: boolean;
	dialogSuccess: boolean;
	dialogInfo: boolean;
	dialogCustom: boolean;
}

export default class DemoDilogBox extends React.Component<
	any,
	DemoDialogBoxState
> {
	private randomText: string = loremIpsum({
		units: "sentences",
		count: 2,
		random: null
	});

	constructor(props: any) {
		super(props);
		debug("creating");

		this.state = {
			dialogError: false,
			dialogWarning: false,
			dialogSuccess: false,
			dialogInfo: false,
			dialogCustom: false
		};
	}

	@autobind
	private handleShowErrorDialog() {
		this.setState({dialogError: true});
	}

	@autobind
	private handleCloseErrorDialog(flag: boolean) {
		debug(`Error Dialog selection: ${flag}`);
		this.setState({dialogError: false});
	}

	@autobind
	private handleShowWarningDialog() {
		this.setState({dialogWarning: true});
	}

	@autobind
	private handleCloseWarningDialog(flag: boolean) {
		debug(`Warning Dialog selection: ${flag}`);
		this.setState({dialogWarning: false});
	}

	@autobind
	private handleShowSuccessDialog() {
		this.setState({dialogSuccess: true});
	}

	@autobind
	private handleCloseSuccessDialog(flag: boolean) {
		debug(`Success Dialog selection: ${flag}`);
		this.setState({dialogSuccess: false});
	}

	@autobind
	private handleShowInfoDialog() {
		this.setState({dialogInfo: true});
	}

	@autobind
	private handleCloseInfoDialog(flag: boolean) {
		debug(`Info Dialog selection: ${flag}`);
		this.setState({dialogInfo: false});
	}

	@autobind
	private handleShowCustomDialog() {
		this.setState({dialogCustom: true});
	}

	@autobind
	private handleCloseCustomDialog(flag: boolean) {
		debug(`Custom Dialog selection: ${flag}`);
		this.setState({dialogCustom: false});
	}

	public render() {
		return (
			<StyledContainer id='dialogBoxExample' title='Dialog Box'>
				<div id='simple-buttons'>
					<div className='box'>
						<ButtonText
							noicon
							onClick={this.handleShowErrorDialog}
							style={{
								backgroundColor: "#d9534f"
							}}
							text='Show Error Dialog'
						/>
						<DialogBox
							dialogType={DialogBoxType.error}
							message={
								"This is a sample error dialog message\n" +
								this.randomText
							}
							onSelection={this.handleCloseErrorDialog}
							show={this.state.dialogError}
						/>
					</div>

					<div className='box'>
						<ButtonText
							noicon
							onClick={this.handleShowWarningDialog}
							style={{
								backgroundColor: "#f0ad4e"
							}}
							text='Show Warning Dialog'
						/>
						<DialogBox
							dialogType={DialogBoxType.warning}
							message={
								"This is a sample warning dialog message\n" +
								this.randomText
							}
							onSelection={this.handleCloseWarningDialog}
							show={this.state.dialogWarning}
						/>
					</div>

					<div className='box'>
						<ButtonText
							noicon
							onClick={this.handleShowSuccessDialog}
							style={{
								backgroundColor: "#5cb85c"
							}}
							text='Show Success Dialog'
						/>
						<DialogBox
							dialogType={DialogBoxType.success}
							message={
								"This is a sample success dialog message\n" +
								this.randomText
							}
							onSelection={this.handleCloseSuccessDialog}
							show={this.state.dialogSuccess}
						/>
					</div>

					<div className='box'>
						<ButtonText
							noicon
							onClick={this.handleShowInfoDialog}
							style={{
								backgroundColor: "#5bc0de"
							}}
							text='Show Info Dialog'
						/>
						<DialogBox
							dialogType={DialogBoxType.info}
							message={
								"This is a sample info dialog message\n" +
								this.randomText
							}
							onSelection={this.handleCloseInfoDialog}
							show={this.state.dialogInfo}
						/>
					</div>

					<div className='box'>
						<ButtonText
							noicon
							onClick={this.handleShowCustomDialog}
							style={{
								backgroundColor: "magenta"
							}}
							text='Show Custom Dialog'
						/>
						<DialogBox
							dialogType={DialogBoxType.custom}
							iconName='car'
							message={
								"This is a sample custom dialog message\n" +
								this.randomText
							}
							onSelection={this.handleCloseCustomDialog}
							show={this.state.dialogCustom}
							style={{
								color: "magenta"
							}}
						/>
					</div>
				</div>
			</StyledContainer>
		);
	}
}
