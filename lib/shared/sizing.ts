/*
 * Handles management of all sizes for components in the library.  This
 * includes:
 *
 * - Fonts (.fontStyle)
 * - Button boxes (.boxStyle)
 * - Borders (.borderStyle)
 *
 * When a component is created in this library it will have a Sizing
 * parameter (part of the BaseProps).  This class will take that requested
 * size value and compute the appropriate CSS style strings.  The component
 * can then use these style strings to apply the appropriate, consistent
 * sizes for a component.
 *
 * #### Examples
 *
 * ```javascript
 * import {Sizing} from 'gadgets';
 * const sizing = new Sizing(Sizing.small);
 *
 * console.log(sizing.fontStyle);   // CSS class for font style '.small'
 * console.log(sizing.boxStyle);    // CSS class for box style '.smallBox'
 * console.log(sizing.borderStyle); // CSS class for borders '.smallBorder'
 * ```
 *
 * This would instantiate a new sizing object an set it to small.  Each
 * of the style class strings could then be retrieved and used within
 * a component.  With the current design this is handled automatically
 * within the `BaseComponent` class; it will create and expose this
 * object (composition).
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
 * can be changed by setting a new value for `baseFontSize`.  When this
 * class is used all of the other offset values will be recalculated from
 * this new base.  The proper `XXem` size is then calculated (Note that
 * these values will not change with baseFontSize changes, only with offset
 * changes).
 *
 * The library uses these settings to assign sizes so the UI components can
 * be scaled/responsive to size changes.
 *
 */

'use strict';

export interface FontSize {
	fontSize: string;
	size: number;
	sizepx: string;
}

export interface Sizings {
	[key: string]: FontSize;
}

export class Sizing {
	public static readonly styles = require('./sizing.css');

	public static readonly baseFontSize: number = 16;

	public static readonly xxsmall: string = 'xxsmall';
	public static readonly xsmall: string = 'xsmall';
	public static readonly small: string = 'small';
	public static readonly normal: string = 'normal';
	public static readonly medium: string = 'medium';
	public static readonly large: string = 'large';
	public static readonly xlarge: string = 'xlarge';
	public static readonly xxlarge: string = 'xxlarge';

	public static readonly sizes: Sizings = ((baseSize: number) => {
		const obj: Sizings = {};
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
			const valSize = baseSize + Number(val);

			obj[key] = {
				size: valSize,
				sizepx: `${valSize}px`,
				fontSize: `${valSize / baseSize}em`
			};
		}

		return obj;
	})(Sizing.baseFontSize);

	/** A reference object to the next sizing based on current */
	private static readonly _next = (() => {
		const obj: any = {};
		obj[Sizing.xxsmall] = new Sizing(Sizing.xsmall);
		obj[Sizing.xsmall] = new Sizing(Sizing.small);
		obj[Sizing.small] = new Sizing(Sizing.normal);
		obj[Sizing.normal] = new Sizing(Sizing.large);
		obj[Sizing.large] = new Sizing(Sizing.xlarge);
		obj[Sizing.xlarge] = new Sizing(Sizing.xxlarge);
		obj[Sizing.xxlarge] = new Sizing(Sizing.xxlarge);
		return obj;
	})();

	/** A referece object to the previous sizing based on current */
	private static readonly _prev = (() => {
		const obj: any = {};
		obj[Sizing.xxsmall] = new Sizing(Sizing.xxsmall);
		obj[Sizing.xsmall] = new Sizing(Sizing.xxsmall);
		obj[Sizing.small] = new Sizing(Sizing.xsmall);
		obj[Sizing.normal] = new Sizing(Sizing.small);
		obj[Sizing.large] = new Sizing(Sizing.normal);
		obj[Sizing.xlarge] = new Sizing(Sizing.large);
		obj[Sizing.xxlarge] = new Sizing(Sizing.xlarge);
		return obj;
	})();

	private _borderStyle: string = '';
	private _boxStyle: string = '';
	private _fontStyle: string = '';
	private _size: FontSize = {
		fontSize: '1.0em',
		size: Sizing.baseFontSize,
		sizepx: `${Sizing.baseFontSize}px`
	};
	private _type: string = '';

	constructor(type: string = Sizing.normal) {
		this._type = type;

		if (type in Sizing.sizes) {
			this._borderStyle = Sizing.styles[`${type}Border`];
			this._boxStyle = Sizing.styles[`${type}Box`];
			this._fontStyle = Sizing.styles[type];
			this._size = Sizing.sizes[type];
		}
	}

	get borderStyle(): string {
		return this._borderStyle;
	}

	get boxStyle(): string {
		return this._boxStyle;
	}

	get fontStyle(): string {
		return this._fontStyle;
	}

	get next(): Sizing {
		return Sizing._next[this.type];
	}

	get prev(): Sizing {
		return Sizing._prev[this.type];
	}

	get size(): FontSize {
		return this._size;
	}

	get type(): string {
		return this._type;
	}

	public toString(): string {
		const s: string[] = [
			`type: ${this._type}`,
			`borderStyle: ${this._borderStyle}`,
			`boxStyle: ${this._boxStyle}`,
			`fontStyle: ${this._fontStyle}`,
			`size: ${JSON.stringify(Sizing.sizes[this.type])}`
		];

		return s.join(',');
	}
}
