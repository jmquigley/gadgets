// TODO: Add documentation for the OptionGroup

'use strict';

// const debug = require('debug')('OptionGroup');

import autobind from 'autobind-decorator';
import {OrderedMap} from 'immutable';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	getTheme
} from '../shared';
import styled, {ThemeProvider} from '../shared/themed-components';
import {Title, TitleLayout} from '../title';
import {Option, OptionType} from './Option';

export interface OptionGroupProps extends BaseProps {
	default?: string;
	onSelect?: any;
	optionType?: OptionType;
	options?: string[];
	title?: string;
}

export interface OptionGroupState {
	options?: OrderedMap<string, boolean>;
}

export function getDefaultOptionGroupProps(): OptionGroupProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			obj: 'OptionGroup',
			default: '',
			onSelect: nilEvent,
			optionType: OptionType.square,
			options: [],
			title: ''
		})
	);
}

export const StyledOptionGroup: any = styled.div`
	border: solid 1px ${props => props.theme.borderColor};
	display: inline-flex;
	flex-direction: column;
	margin: 0.75rem 0 0 0;
	padding: 0.75rem 0.5rem 0.5rem 0.5rem;
	position: relative;
`;

export const StyledOption: any = styled(Option)`
`;

export const StyledTitle: any = styled(Title)`
	background-color: ${props => props.theme.backgroundColor};
	left: 0.5rem;
	padding: 0 0.33rem;
	position: absolute;
	top: -0.75rem;
`;

export class OptionGroup extends BaseComponent<OptionGroupProps, OptionGroupState> {

	private static readonly defaultProps: OptionGroupProps = getDefaultOptionGroupProps();

	constructor(props: OptionGroupProps) {
		super(props, OptionGroup.defaultProps.style);

		this._classes.add('ui-option-group');

		this.state = {
			options: this.handleOptions(this.props.options, this.props.default)
		};

		this.componentWillUpdate(this.props);
	}

	private buildOptionList() {
		const options: any = [];

		for (const [text, toggle] of this.state.options.entries()) {
			options.push(
				<StyledOption
					key={text}
					onClick={this.handleSelection}
					optionType={this.props.optionType}
					selected={toggle}
					text={text}
				/>
			);
		}

		return options;
	}

	@autobind
	private handleSelection(toggle: boolean, text: string) {
		if (this.state.options.get(text)) {
			this.forceUpdate();
		} else {
			this.setState({
				options: this.handleOptions(this.props.options, text)
			}, () => {
				this.props.onSelect(text, toggle);
			});
		}
	}

	@autobind
	private handleOptions(labels: string[], selected: string) {
		let options: OrderedMap<string, boolean> = (this.state && 'options' in this.state) ? this.state.options : OrderedMap();
		for (const label of labels) {
			options = options.set(label, label === selected);
		}

		return options;
	}

	public componentWillReceiveProps(nextProps: OptionGroupProps) {
		this.setState({options: this.handleOptions(nextProps.options, nextProps.default)});
	}

	public render() {
		return(
			<ThemeProvider theme={getTheme()}>
				<StyledOptionGroup
					className={this.classes}
				>
					<StyledTitle
						className="ui-option-group-title"
						layout={TitleLayout.none}
						noedit
						noripple
						title={this.props.title}
					/>
					{this.buildOptionList()}
				</StyledOptionGroup>
			</ThemeProvider>
		);
	}
}
