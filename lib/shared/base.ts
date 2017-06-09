import {BaseProps} from './props';

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
 * All of the components share a similar way of creating the initial CSS class list
 * for that module.  This function initializes that common behavior.
 * @param props {BaseProps} the base properties for the component
 * @param opts {BaseOptions} these options allow the user to turn off setting of
 * defaults within this function.  By default they are all on.
 * @returns {string[]} an array of initial CSS classes that are common for every
 * component.
 */
export function baseClasses(props: BaseProps, opts?: BaseOptions): string[] {
	const l: string[] = props.classes.slice();

	opts = Object.assign(
		defaultBaseOptions,
		opts
	);

	if (props.className !== '' && opts.className) {
		l.push(props.className);
	}

	if (!props.visible && opts.visible) {
		l.push(styles.invisible);
	}

	if (props.disabled && opts.disabled) {
		l.push(styles.disabled);
		l.push('nohover');
	}

	return l;
}
