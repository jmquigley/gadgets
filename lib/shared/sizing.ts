/*
 * Handles management of sizes for components in the library.  This includes:
 *
 * - Fonts (.fontStyle)
 * - Button boxes (.boxStyle)
 * - Borders (.borderStyle)
 *
 * This class is a singleton that computes a range of sizes based on a
 * requested base size (normal).  There are 7 basic sizings in the library:
 *
 * - xxsmall (-10px from normal)
 * - xsmall (-8px from normal)
 * - small (-4px from normal)
 * - normal/medium (base font size)
 * - large (+8px from normal)
 * - xlarge (+16px from normal)
 * - xxlarge (+32px from normal)
 *
 * When a component is created in this library it will have a Sizing
 * parameter (part of the BaseProps).  This sizing parameter determines the
 * font and box sizes for all components.
 *
 * #### Examples
 *
 * ```javascript
 * import {Sizes} from 'gadgets';
 *
 * // Creates a default object with a 16px base font size.
 * const sizes = Sizes.instance(16);
 * ```
 *
 * This would retrieve an instance of a sizing object based on a `normal` size
 * of 16px (1.0em).  Each of the style class strings could then be retrieved
 * and used within a component.  With the current design this is handled
 * automatically within the `BaseComponent` class; it will create and expose
 * this object (composition).
 *
 * Each of the sizes are offsets from normal/medium, where normal uses
 * the typical constant of 16px = 1.0em.
 *
 * The library uses these settings to assign sizes so the UI components can
 * be scaled/responsive to size changes.
 *
 */

"use strict";

const debug = require("debug")("gadgets.shared.sizing");

import {css} from "styled-components";

const instances = new Map();

export enum Sizing {
	xxsmall = "xxsmall",
	xsmall = "xsmall",
	small = "small",
	normal = "normal",
	medium = "medium",
	large = "large",
	xlarge = "xlarge",
	xxlarge = "xxlarge",
	inherit = "inherit"
}

export interface FontStyle {
	size: number;
	sizerem: string;
	sizepx: string;
	style: string;
}

export interface Styling {
	type: Sizing;
	borderStyle: string;
	boxStyle: string;
	font: FontStyle;
	rectStyle: string;
}

export const borderStyle: any = {
	[Sizing.xxsmall]: css`
		border: solid 0.05em;
	`,
	[Sizing.xsmall]: css`
		border: solid 0.05em;
	`,
	[Sizing.small]: css`
		border: solid 0.1em;
	`,
	[Sizing.medium]: css`
		border: solid 0.15em;
	`,
	[Sizing.normal]: css`
		border: solid 0.15em;
	`,
	[Sizing.large]: css`
		border: solid 0.2em;
	`,
	[Sizing.xlarge]: css`
		border: solid 0.25em;
	`,
	[Sizing.xxlarge]: css`
		border: solid 0.3em;
	`,
	[Sizing.inherit]: css`
		border: inherit;
	`
};
export const boxStyle: any = {};
export const fontStyle: any = {};
export const rectStyle: any = {};
export const lineHeightStyle: any = {};

export class Sizes {
	private _sizes: any = {};

	private readonly _lineHeightRatio: number = 1.5;
	private readonly _rectWidth: number = 1.75;
	private readonly _rectHeight: number = 0.8;

	public static instance(baseFontSize: number): Sizes {
		let tmp = instances.get(baseFontSize);
		if (!tmp) {
			debug("Creating new base font sizing: %d", baseFontSize);
			tmp = new Sizes(baseFontSize);
			instances.set(baseFontSize, tmp);
		}

		return tmp._sizes;
	}

	private constructor(baseFontSize: number) {
		const sizes = [
			[Sizing.xxsmall, -10],
			[Sizing.xsmall, -8],
			[Sizing.small, -4],
			[Sizing.medium, 0],
			[Sizing.normal, 0],
			[Sizing.large, 8],
			[Sizing.xlarge, 16],
			[Sizing.xxlarge, 32],
			[Sizing.inherit, 0]
		];

		for (const [key, val] of sizes) {
			const valSize = baseFontSize + Number(val);

			boxStyle[key] = css`
				width: ${valSize}px;
				height: ${valSize}px;
			`;

			fontStyle[key] = css`
				font-size: ${valSize / baseFontSize}rem;
			`;

			lineHeightStyle[key] = css`
				line-height: ${valSize * this._lineHeightRatio}px;
			`;

			rectStyle[key] = css`
				width: ${valSize * this._rectWidth}px;
				height: ${valSize * this._rectHeight}px;
			`;

			this._sizes[key] = {
				type: key,
				font: {
					lineHeight: `${valSize * this._lineHeightRatio}px`,
					size: valSize,
					sizerem: `${valSize / baseFontSize}rem`,
					sizepx: `${valSize}px`
				}
			};
		}

		debug(
			"Sizing: %O, boxStyle: %O, fontStyle: %O, rectStyle: %O",
			this._sizes,
			boxStyle,
			fontStyle,
			rectStyle
		);
	}

	public toString(): string {
		return JSON.stringify(this._sizes, null, 4);
	}
}
