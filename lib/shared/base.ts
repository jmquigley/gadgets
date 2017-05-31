import {BaseProps} from './props';

const styles = require('./styles.css');

/**
 * All of the components share a similar way of creating the initial CSS class list
 * for that module.  This function initializes that common behavior.
 * @param props {BaseProps} the base properties for the component
 * @returns {string[]} an array of initial CSS classes that are common for every
 * component.
 */
export function baseClasses(props: BaseProps): string[] {
	const l: string[] = Array.from(props.classes);

	if (props.className !== '') {
		l.push(props.className);
	}

	if (!props.visible) {
		l.push(styles.invisible);
	}

	if (props.disabled) {
		l.push(styles.disabled);
		l.push('nohover');
	}

	return l;
}
