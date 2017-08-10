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

	private _resetRootStyles: any;

	constructor(props: TriangleProps) {
		super(props, require('./styles.css'));

		this._rootStyles.add([
			'ui-triangle',
			this.styles.triangle
		]);

		this._resetRootStyles = {
			[this.styles.triangleRight]: false,
			[this.styles.triangleLeft]: false,
			[this.styles.triangleDown]: false,
			[this.styles.triangleUp]: false
		};

		this.componentWillUpdate(props);
	}

	public componentWillUpdate(nextProps: TriangleProps) {

		if (this.props.sizing !== nextProps['sizing']) {
			this._rootStyles.off(this.boxStyle(this.props.sizing));
		}

		if (nextProps.sizing === Sizing.inherit) {
			this._rootStyles.on(this.boxStyle(Sizing.normal));
		} else {
			this._rootStyles.on(this.boxStyle(nextProps.sizing));
		}

		if (nextProps.direction !== this.props.direction) {
			this._rootStyles.add(this._resetRootStyles);
		}

		switch (nextProps.direction) {
			case Direction.right:
				this._rootStyles.on(this.styles.triangleRight);
				break;

			case Direction.left:
				this._rootStyles.on(this.styles.triangleLeft);
				break;

			case Direction.down:
				this._rootStyles.on(this.styles.triangleDown);
				break;

			case Direction.up:
			default:
				this._rootStyles.on(this.styles.triangleUp);
				break;
		}

		this.buildInlineStyles(nextProps, {
			fill: nextProps.backgroundColor,
			stroke: nextProps.borderColor,
			strokeWidth: nextProps.borderWidth
		});

		super.componentWillUpdate(nextProps);
	}

	public render() {
		return (
			(this.props.nobase) ? (
				<svg
					className={this._rootStyles.classnames}
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
					className={this._rootStyles.classnames}
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
