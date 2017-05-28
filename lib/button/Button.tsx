import * as React from 'react';
import {nil} from 'util.toolbox';
import {BaseProps} from '../shared/props';

const sharedStyles = require('../shared/styles.css');
const styles = require('./styles.css');

export interface ButtonProps extends BaseProps {
	noripple?: boolean;     // turn off the button ripple effect
	iconName?: string;      // font awesome string
}

export const ButtonComponent = (props: ButtonProps) => (
    <i
        className={props.classes.join(' ')}
        onClick={props.onClick}
		aria-hidden="true"
	    disabled={props.disabled}
	    style={props.style}
	>
    </i>
);

/**
 * Creates a Button control
 */
export class Button extends React.Component<ButtonProps, undefined> {

    public static defaultProps: ButtonProps = {
		classes: [],
		disabled: false,
        iconName: 'bomb',
		noripple: false,
        onClick: nil,
		style: {},
		visible: true
    };

    constructor(props: ButtonProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);

		if (this.props.className !== '') {
			l.push(this.props.className);
		}
		l.push(styles.button);
		l.push('fa');
		l.push(`fa-${this.props.iconName}`);
		l.push('ui-button');

		if (!this.props.noripple && !this.props.disabled) {
			l.push('ripple');
		}

		if (!this.props.visible) {
			l.push(sharedStyles.invisible);
			l.push(sharedStyles.disabled);
		}

		if (this.props.disabled) {
			l.push(sharedStyles.disabled);
			l.push(styles.nohover);
		}

		return l;
	}

	private handleClick = (e: any) => {
		if (!this.props.disabled && this.props.visible && this.props.onClick != null) {
			this.props.onClick();
		}
		e.stopPropagation();
	}

	render() {
		return (
			<ButtonComponent
				{...this.props}
				onClick={this.handleClick}
				classes={this.buildClasses()}
			/>
		);
	}
}
