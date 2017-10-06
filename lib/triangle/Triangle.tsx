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

const styles = require('./styles.css');

export interface TriangleProps extends BaseProps {
	nobase?: boolean;
}

export function getDefaultTriangleProps(): TriangleProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			direction: Direction.up,
			nobase: false,
			sizing: Sizing.normal,
			style: {
				fill: 'black',
				stroke: 'black',
				stokeWidth: '2px'
			}
		}
	));
}

export class Triangle extends BaseComponent<TriangleProps, undefined> {

	public static readonly defaultProps: TriangleProps = getDefaultTriangleProps();

	private static readonly _resetPosition: string[] = [
		styles.triangleRight,
		styles.triangleLeft,
		styles.triangleDown,
		styles.triangleUp
	];

	constructor(props: TriangleProps) {
		super(props, styles, Triangle.defaultProps.style);

		this._rootStyles.add([
			'ui-triangle',
			this.styles.triangle
		]);

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
			this._rootStyles.reset(Triangle._resetPosition);
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

		super.componentWillUpdate(nextProps);
	}

	public render() {
		const is = this.inlineStyles;

		return (
			(this.props.nobase) ? (
				<svg
					className={this._rootStyles.classnames}
					preserveAspectRatio="xMidYMid meet"
					version="1.1"
					viewBox="0 0 40 40"
					xmlns="http://www.w3.org/2000/svg"
				>
					<polygon points="-3,35, 20,10 43,35" style={{fill: is['fill'], stroke: 'none'}} />
					<polygon points="-3,35, 20,10 43,35, 20,10" style={{stroke: is['stroke'], strokeWidth: is['strokeWidth'], strokeLinecap: 'square'}} />
				</svg>
			) : (
				<svg
					className={this._rootStyles.classnames}
					preserveAspectRatio="xMidYMid meet"
					style={is}
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
