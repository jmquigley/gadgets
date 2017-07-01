/*
 * Handles management of all sizes for components in the library.  This
 * includes:
 *
 * - Fonts (.fontStyle)
 * - Button boxes (.boxStyle)
 * - Borders (.borderStyle)
 *
 * When a component is created in this library it will have a Sizing
 * parameter (part of the BaseProps).  The size class will take that requested
 * value and compute the appropriate CSS style strings.  The component can
 * then use these style strings to apply the appropriate, consistent
 * sizes for a component.
 *
 * #### Examples
 *
 * ```javascript
 * import {Sizes, Sizing} from 'gadgets';
 *
 * // Creates a default object with a 16px base font size.
 * // It also sets the current size to "normal"
 * const sizes = new Sizes();
 *
 * console.log(sizes.fontStyle);   // CSS class for font style '.normal'
 * console.log(sizes.boxStyle);    // CSS class for box style '.normalBox'
 * console.log(sizing.borderStyle); // CSS class for borders '.normalBorder'
 *
 * sizes.type = Sizing.small;
 *
 * console.log(sizes.fontStyle);   // CSS class for font style '.small'
 * console.log(sizes.boxStyle);    // CSS class for box style '.smallBox'
 * console.log(sizing.borderStyle); // CSS class for borders '.smallBorder'
 * ```
 *
 * This would instantiate a new sizing object an set it to `normal`.  Each
 * of the style class strings could then be retrieved and used within
 * a component.  With the current design this is handled automatically
 * within the `BaseComponent` class; it will create and expose this
 * object (composition).  This class can be instantiate with a base size
 * other than 16px when it is constructed.
 *
 * There are 7 basic sizings in the library:
 *
 * - xxsmall (-10px from normal)
 * - xsmall (-8px from normal)
 * - small (-4px from normal)
 * - normal/medium (base font size)
 * - large (+8px from normal)
 * - xlarge (+16px from normal)
 * - xxlarge (+32px from normal)
 *
 * Each of the sizes are offsets from normal/medium, where normal uses
 * the typical constant of 16px = 1.0em.  The sizings for the whole library
 * can be changed by constructing a new object by passing a new value for
 * the base size.  All of the other offset values will be recalculated from
 * this new base.  The proper `XXem` size is then calculated
 *
 * The library uses these settings to assign sizes so the UI components can
 * be scaled/responsive to size changes.
 *
 */

'use strict';

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
	sizeem: string;
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

	private _currentSizing: Sizing = Sizing.normal;
	private _sizes: any = {};

	constructor(initialSizing: Sizing = Sizing.normal, baseFontSize: number = 16) {
		this._currentSizing = initialSizing;

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
					sizeem: `${valSize / baseFontSize}em`,
					sizepx: `${valSize}px`,
					style: Sizes.styles[key]
				}
			};
		}
	}

	get borderStyle(): string {
		return this.styling.borderStyle;
	}

	get boxStyle(): string {
		return this.styling.boxStyle;
	}

	get currentSizing(): Sizing {
		return this._currentSizing;
	}

	set currentSizing(sizing: Sizing) {
		if (sizing in this._sizes) {
			this._currentSizing = sizing;
		} else {
			this._currentSizing = Sizing.normal;
		}
	}

	get font(): FontStyle {
		return this.styling.font;
	}

	get fontStyle(): string {
		return this.styling.font.style;
	}

	get fontSize(): number {
		return this.styling.font.size;
	}

	get next(): Styling {
		return this._next(this._currentSizing);
	}

	get prev(): Styling {
		return this._prev(this._currentSizing);
	}

	get styling(): Styling {
		return this._sizes[this._currentSizing];
	}

	get type(): Sizing {
		return this.currentSizing;
	}

	public getSizing(sizing: Sizing) {
		return this._sizes[sizing];
	}

	public toString(): string {
		return JSON.stringify(this._sizes, null, 4);
	}

	private _next(sizing: Sizing): Styling {
		switch (sizing) {
		case Sizing.xxsmall: return this._sizes[Sizing.xsmall];
		case Sizing.xsmall: return this._sizes[Sizing.small];
		case Sizing.small: return this._sizes[Sizing.normal];
		case Sizing.large: return this._sizes[Sizing.xlarge];
		case Sizing.xlarge: return this._sizes[Sizing.xxlarge];
		case Sizing.xxlarge: return this._sizes[Sizing.xxlarge];

		case Sizing.normal:
		case Sizing.medium:
			return this._sizes[Sizing.large];

		default:
			return this._sizes[Sizing.normal];
		}
	}

	private _prev(sizing: Sizing): Styling {
		switch (sizing) {
		case Sizing.xxsmall: return this._sizes[Sizing.xxsmall];
		case Sizing.xsmall: return this._sizes[Sizing.xxsmall];
		case Sizing.small: return this._sizes[Sizing.xsmall];
		case Sizing.large: return this._sizes[Sizing.normal];
		case Sizing.xlarge: return this._sizes[Sizing.large];
		case Sizing.xxlarge: return this._sizes[Sizing.xlarge];

		case Sizing.normal:
		case Sizing.medium:
			return this._sizes[Sizing.small];

		default:
			return this._sizes[Sizing.normal];
		}
	}

}

/**
 * Create a single instance with the default values.  Don't instantiate this class
 * over and over.
 */
export let defaultSize = new Sizes();
