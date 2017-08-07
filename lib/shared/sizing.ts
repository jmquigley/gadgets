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

'use strict';

const instances = new Map();

export enum Sizing {
	xxsmall = 'xxsmall',
	xsmall = 'xsmall',
	small = 'small',
	normal = 'normal',
	medium = 'medium',
	large = 'large',
	xlarge = 'xlarge',
	xxlarge = 'xxlarge'
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
}

export class Sizes {

	public static readonly styles = require('./sizing.css');
	private _sizes: any = {};

	public static instance(baseFontSize: number): Sizes {
		let tmp = instances.get(baseFontSize);
		if (!tmp) {
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
			[Sizing.xxlarge, 32]
		];

		for (const [key, val] of sizes) {
			const valSize = baseFontSize + Number(val);

			this._sizes[key] = {
				type: key,
				borderStyle: Sizes.styles[`${key}Border`],
				boxStyle: Sizes.styles[`${key}Box`],
				font: {
					size: valSize,
					sizerem: `${valSize / baseFontSize}rem`,
					sizepx: `${valSize}px`,
					style: Sizes.styles[key]
				}
			};
		}
	}

	public toString(): string {
		return JSON.stringify(this._sizes, null, 4);
	}

}
