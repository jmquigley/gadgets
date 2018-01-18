'use strict';

const debug = require('debug')('DemoOption');

import autobind from 'autobind-decorator';
import {EnumValues as ev} from 'enum-values';
import * as React from 'react';
import {
	Break,
	Container,
	Option,
	OptionType
} from '../../';

export default class DemoOption extends React.Component<any, undefined> {

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	@autobind
	private handleClick(val: boolean, text: string) {
		debug('clicked option, flag: %o, text: %o', val, text);
	}

	private buildOptions() {
		const options: any[] = [];

		for (const key of ev.getNames(OptionType)) {
			options.push(
				<Option
					disabled={this.props['disabled']}
					onClick={this.handleClick}
					sizing={this.props['sizing']}
					optionType={OptionType[key]}
				/>
			);

			options.push(
				<Option
					disabled={this.props['disabled']}
					initialToggle={true}
					onClick={this.handleClick}
					optionType={OptionType[key]}
					sizing={this.props['sizing']}
					text={key}
				/>
			);

			options.push(<Break sizing={this.props['sizing']} />);
		}

		return options;
	}

	public render() {
		return (
			<Container id="optionExample" title="Option">
				{this.buildOptions()}
			</Container>
		);
	}
}
