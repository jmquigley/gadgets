// TOOD: add documentation for ButtonBar control

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {getUUID} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Justify
} from '../shared';

export interface ButtonBarProps extends BaseProps {
	buttonSize?: string;
	justify?: Justify;
}

export function getDefaultButtonBarProps(): ButtonBarProps {
	return cloneDeep(Object.assign(getDefaultBaseProps(), {
		buttonSize: '24px',
		justify: Justify.left
	}));
}

export class ButtonBar extends BaseComponent<ButtonBarProps, undefined> {

	public static readonly defaultProps: ButtonBarProps = getDefaultButtonBarProps();

	private _groupClasses: string[] = [];

	constructor(props: ButtonBarProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	public shouldComponentUpdate(nextProps: ButtonBarProps): boolean {
		this.resetStyles(nextProps);

		this.classes.push('ui-button-bar');
		this.classes.push(this.styles.buttonBar);

		this._groupClasses = [];
		this._groupClasses.push(this.styles.buttonBarGroup);

		switch (this.props.justify) {
			case Justify.right:
				this._groupClasses.push(this.styles.right);
				break;

			case Justify.center:
				this._groupClasses.push(this.styles.center);
				break;

			case Justify.left:
			default:
				this._groupClasses.push(this.styles.left);
		}

		this.buildStyles(nextProps);
		return true;
	}

	public render() {
		const buttons: any = [];
		const buttonStyle = {
			width: this.props.buttonSize,
			height: this.props.buttonSize
		};

		React.Children.forEach(this.props.children, child => {
			const newChild = React.cloneElement(child as any, {
				disabled: this.props.disabled,
				sizing: this.props.sizing,
				visible: this.props.visible
			});

			buttons.push(
				<div key={getUUID()} style={{...buttonStyle}} className={this.styles.buttonBarBox}>
					{newChild}
				</div>
			);
		});

		return(
			<div className={this.classes.join(' ')}>
				<div className={this._groupClasses.join(' ')}>
					{buttons}
				</div>
			</div>
		);
	}
}
