/**
 * Draws a triangle shape using SVG.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button} from 'gadgets';
 * <Button iconName="cab" onClick={someFunction} />
 * ```
 *
 * #### Events
 * - `{name}` - {description}
 *
 * #### Styles
 * - `` - {description}
 *
 * #### Properties
 * - `{name}: {datatype}` - {description}
 *
 * @module DynamicList
 */

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
}

export function getDefaultTriangleProps(): TriangleProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			color: 'white',
			borderColor: 'black',
			direction: Direction.up,
			sizing: Sizing.normal
		}));
}

export interface TriangleState {
}

export class Triangle extends BaseComponent<TriangleProps, TriangleState> {

	public static defaultProps: TriangleProps = getDefaultTriangleProps();

	constructor(props: TriangleProps) {
		super(props, require("./styles.css"));
	}

	protected buildStyles() {
		super.buildStyles(this.props, {
			fill: this.props.color,
			stroke: this.props.borderColor,
			strokeSize: 1
		});
		this.classes.push("ui-triangle");
		this.classes.push(this.styles.triangle);
		this.classes.push(this.boxSizeStyle);

		switch(this.props.direction) {
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

	}

	render() {
		this.buildStyles();

		return (
			<svg
				className={this.classes.join(' ')}
				preserveAspectRatio="xMidYMid meet"
				version="1.1"
				viewBox="0 0 40 40"
				xmlns="http://www.w3.org/2000/svg"
				>
				<polygon points="0,30, 20,10 40,30" style={this.inlineStyle} />
			</svg>
		);
	}
}
