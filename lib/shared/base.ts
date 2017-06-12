import * as React from 'react';

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
	protected _style: any = {};

	constructor(props: P) {
		super(props);
	}

	protected buildStyles(props: P, style: any = {}, opts?: BaseOptions): void {
		this._classes = '';
		this._style = Object.assign(this._style, props['style'], style);

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
}
