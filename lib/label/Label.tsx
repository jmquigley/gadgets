'use strict';

import * as React from 'react';
import {BaseProps, getDefaultBaseProps} from '../shared/props';

const styles = require('./styles.css');

export interface LabelProps extends BaseProps {
}

export const LabelComponent = (props: LabelProps) => (
	<span
		className={props.classes.join(' ')}
		onClick={props.onClick}
		disabled={props.disabled}>
		{props.children}
	</span>
);

export class Label extends React.Component<LabelProps, undefined> {

	public static defaultProps: LabelProps = getDefaultBaseProps();

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
			l.push(styles.invisible);
		}

		if (this.props.disabled) {
			l.push(styles.disabled);
			l.push('nohover');
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
