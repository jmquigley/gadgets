// TODO: create Triangle documentation

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {
	BaseComponent,
	BaseProps,
	Direction,
	getDefaultBaseProps,
	Sizing
} from '../shared';

export interface TriangleProps extends BaseProps {
	nobase?: boolean;
}

export function getDefaultTriangleProps(): TriangleProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			borderWidth: '2px',
			direction: Direction.up,
			nobase: false,
			sizing: Sizing.normal
		}));
}

export class Triangle extends BaseComponent<TriangleProps, undefined> {

	public static defaultProps: TriangleProps = getDefaultTriangleProps();

	constructor(props: TriangleProps) {
		super(props, require('./styles.css'));
		this.componentWillUpdate(props);
	}

	public componentWillUpdate(nextProps: TriangleProps) {
		this.resetStyles(nextProps);

		this.classes.push('ui-triangle');
		this.classes.push(this.styles.triangle);
		this.classes.push(this.boxStyle());

		switch (this.props.direction) {
			case Direction.right:
				this.classes.push(this.styles.triangleRight);
				break;

			case Direction.left:
				this.classes.push(this.styles.triangleLeft);
				break;

			case Direction.down:
				this.classes.push(this.styles.triangleDown);
				break;

			case Direction.up:
			default:
				this.classes.push(this.styles.triangleUp);
				break;
		}

		this.buildStyles(nextProps, {
			fill: nextProps.backgroundColor,
			stroke: nextProps.borderColor,
			strokeWidth: nextProps.borderWidth
		});
	}

	public render() {
		return (
			(this.props.nobase) ? (
				<svg
					className={this.classes.join(' ')}
					preserveAspectRatio="xMidYMid meet"
					style={this.inlineStyle}
					version="1.1"
					viewBox="0 0 40 40"
					xmlns="http://www.w3.org/2000/svg"
				>
					<polygon points="-3,35, 20,10 43,35" style={{fill: this.props.backgroundColor, stroke: 'none'}} />
					<polygon points="-3,35, 20,10 43,35, 20,10" style={{stroke: this.props.borderColor, strokeWidth: this.props.borderWidth, strokeLinecap: 'square'}} />

				</svg>
			) : (
				<svg
					className={this.classes.join(' ')}
					preserveAspectRatio="xMidYMid meet"
					style={this.inlineStyle}
					version="1.1"
					viewBox="0 0 40 40"
					xmlns="http://www.w3.org/2000/svg"
				>
					<polygon points="0,35, 20,10 40,35" />
				</svg>
			)
		);
	}
}
