import * as React from 'react';
import {nil} from 'util.toolbox';
import {BaseProps} from '../shared/props';

const sharedStyles = require('../shared/styles.css');
const styles = require('./styles.css');

export interface LabelProps extends BaseProps {
}

export const LabelComponent = (props: LabelProps) => (
	<span
		className={props.classes.join(' ')}
		onClick={props.onClick}
		disabled={props.disabled}
		style={props.style}>
		{props.children}
	</span>
);

export class Label extends React.Component<LabelProps, undefined> {

	public static defaultProps: LabelProps = {
		classes: [],
		className: '',
		disabled: false,
        onClick: nil,
		style: {},
		visible: true
	}

	constructor(props: LabelProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);

		if (this.props.className !== '') {
			l.push(this.props.className);
		}

		l.push(styles.label);
		l.push('ui-label');

		if (!this.props.visible) {
			l.push(sharedStyles.invisible);
		}

		if (this.props.disabled) {
			l.push(sharedStyles.disabled);
			l.push(styles.nohover);
		}

		return l;
	}

	render() {
		return (
			<LabelComponent
				{...this.props}
				classes={this.buildClasses()}
			/>
		);
	}
}
