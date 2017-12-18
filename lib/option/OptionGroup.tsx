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
	fontStyle,
	getDefaultBaseProps,
	getTheme,
	Sizing
} from '../shared';
import styled, {ThemeProvider, withProps} from '../shared/themed-components';
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

export const StyledOptionGroup: any = withProps<OptionGroupProps, HTMLDivElement>(styled.div)`
	border: solid 1px ${props => props.theme.borderColor};
	display: inline-flex;
	flex-direction: column;
	margin: ${(props: OptionGroupProps) => {
		switch (props.sizing) {
			case Sizing.xxsmall: return('0.25rem 0 0 0');
			case Sizing.xsmall: return('0.4rem 0 0 0');
			case Sizing.small: return('0.6rem 0 0 0');
			case Sizing.large: return('1.2rem 0 0 0');
			case Sizing.xlarge: return('1.5rem 0 0 0');
			case Sizing.xxlarge: return('2.5rem 0 0 0');

			case Sizing.normal:
			default:
				return('0.75rem 0 0 0');
		}
	}};
	padding: 0.5rem;
	position: relative;

	${props => props.sizing && fontStyle[props.sizing]}
`;

export const StyledOption: any = styled(Option)`
`;

export const StyledTitle: any = styled(Title)`
	background-color: ${props => props.theme.backgroundColor};
	left: 0.5rem;
	padding: 0 0.33rem;
	position: absolute;
	top: -${(props: OptionGroupProps) => {
		switch (props.sizing) {
			case Sizing.xxsmall: return('0.25rem');
			case Sizing.xsmall: return('0.4rem');
			case Sizing.small: return('0.6rem');
			case Sizing.large: return('1.2rem');
			case Sizing.xlarge: return('1.5rem');
			case Sizing.xxlarge: return('2.5rem');

			case Sizing.normal:
			default:
				return('0.75rem');
		}
	}};
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
					sizing={this.props.sizing}
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
					sizing={this.props.sizing}
				>
					<StyledTitle
						className="ui-option-group-title"
						layout={TitleLayout.none}
						noedit
						noripple
						sizing={this.props.sizing}
						title={this.props.title}
					/>
					{this.buildOptionList()}
				</StyledOptionGroup>
			</ThemeProvider>
		);
	}
}
