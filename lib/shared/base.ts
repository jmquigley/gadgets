import * as React from 'react';
import {Size} from './index';

const styles = require('./styles.css');

export interface BaseOptions {
	className?: boolean;
	disabled?: boolean;
	visible?: boolean;
}

const defaultBaseOptions: BaseOptions = {
	className: true,
	disabled: true,
	visible: true
};

/**
 * A base class between React and all components in the module.
 */
export abstract class BaseComponent<P, S> extends React.Component<P, S> {

	protected _classes: string = '';
	protected _inlineStyle: any = {};    // inline style overrides
	protected _styles: any = {};         // css modules styles

	constructor(props: P, pstyles: any = {}) {
		super(props);
		this._styles = pstyles;
	}

	get classes(): string {
		return this._classes;
	}

	set classes(str: string) {
		this._classes = str;
	}

	get inlineStyle(): any {
		return this._inlineStyle;
	}

	set inlineStyle(val: any) {
		this._inlineStyle = Object.assign(this._inlineStyle, val);
	}

	get style(): string {
		return this._inlineStyle;
	}

	get styles(): any {
		return this._styles;
	}

	protected buildStyles(props: P, style: any = {}, opts?: BaseOptions): void {
		this._classes = '';
		this._inlineStyle = Object.assign(this._inlineStyle, props['style'], style);

		opts = Object.assign(
			defaultBaseOptions,
			opts
		);

		if (props['className'] !== '' && opts.className) {
			this._classes += ` ${props['className']}`;
		}

		if (!props['visible'] && opts.visible) {
			this._classes += ` ${styles.invisible}`;
		}

		if (props['disabled'] && opts.disabled) {
			this._classes += ` ${styles.disabled} nohover`;
		}
	}

	/**
	 * Takes a sizing parameter and a styles object and searches for the
	 * corresponding style class CSS.  If it is found, then it returns the local
	 * style for that size.
	 * @returns {string} the name of the local style for that size.  If
	 * it is not found, then an empty string is returned.
	 */
	protected getSizeStyle() {

		switch (this.props['size']) {
		case Size.xxsmall:
			if ('xxsmall' in this.styles) {
				return this.styles.xxsmall;
			}
			break;

		case Size.xsmall:
			if ('xsmall' in this.styles) {
				return this.styles.xsmall;
			}
			break;

		case Size.small:
			if ('small' in this.styles) {
				return this.styles.small;
			}
			break;

		case Size.large:
			if ('large' in this.styles) {
				return this.styles.large;
			}
			break;

		case Size.xlarge:
			if ('xlarge' in this.styles) {
				return this.styles.xlarge;
			}
			break;

		case Size.xxlarge:
			if ('xxlarge' in this.styles) {
				return this.styles.xxlarge;
			}
			break;

		case Size.normal:
		case Size.medium:
		default:
			if ('medium' in this.styles) {
				return this.styles.medium;
			}
		}

		return '';
	}
}
