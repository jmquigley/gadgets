//
// This is a container element that holds the contents of a list.  It creates
// the `<ul>` tag that will hold all of the `<li>` tags.
//

'use strict';

import * as React from 'react';
import {getUUID} from 'util.toolbox';
import {BaseProps} from '../../lib/props';

export interface ListProps extends BaseProps {
}

const styles = require('./styles.css');

export const ListComponent = (props: ListProps) => (
    <ul
		disabled={props.enabled ? false : true}
		className={`ui ui-list ${props.classes.join(' ')}`}
		id={props.id}>
		{props.children}
	</ul>
);

export class List extends React.Component<ListProps, undefined> {

	public static defaultProps: ListProps = {
		id: getUUID(true),
		classes: [],
		enabled: true,
		visible: true
	}

	constructor(props: ListProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);
		l.push(styles.list);

		if (!this.props.visible) {
			l.push(styles.listInvisible);
			l.push(styles.listDisabled);
		}

		if (!this.props.enabled) {
			l.push(styles.listDisabled);
		}

		return l;
	}

	render() {
		return (
			<ListComponent
				{...this.props}
				classes={this.buildClasses()}
			/>
		);
	}
}
