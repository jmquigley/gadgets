import * as React from 'react';
import {nil} from 'util.toolbox';
import {BaseProps} from '../props';

const styles = require('./styles.css');

export interface ButtonProps extends BaseProps {
	iconName?: string;      // font awesome string
}

export const ButtonComponent = (props: ButtonProps) => (
    <button
        className={`fa fa-${props.iconName} ui ui-button ripple ${props.classes.join(' ')}`}
        onClick={props.onClick}
		aria-hidden="true"
		disabled={props.enabled ? false : true}
	>
    </button>
);

/**
 * Creates a Button control
 */
export class Button extends React.Component<ButtonProps, undefined> {

    public static defaultProps: ButtonProps = {
        iconName: 'bomb',
		enabled: true,
		classes: [],
        onClick: nil,
		visible: true
    };

    constructor(props: ButtonProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);
		l.push(styles.button);

		if (!this.props.visible) {
			l.push(styles.buttonInvisible);
			l.push(styles.buttonDisabled);
		}

		if (!this.props.enabled) {
			l.push(styles.buttonDisabled);
			l.push(styles.nohover);
		}

		return l;
	}

	private handleClick = (e: any) => {
		if (this.props.enabled && this.props.visible && this.props.onClick != null) {
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
