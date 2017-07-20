// TODO: add DialogBox documentation
// TODO: add DialogBox implementation

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps
} from '../shared';

export enum DialogBoxType {
	error,
	warning,
	success,
	info,
	custom
}

export interface DialogBoxProps extends BaseProps {
	dialogType?: DialogBoxType;
	onSelection?: any;
}

export function getDefaultDialogBoxProps(): DialogBoxProps {
	return cloneDeep(Object.assign(getDefaultBaseProps(), {
		dialogType: DialogBoxType.info,
		onSelection: nilEvent
	}));
}

export class DialogBox extends BaseComponent<DialogBoxProps, undefined> {

	public static defaultProps: DialogBoxProps = getDefaultDialogBoxProps();

	constructor(props: DialogBoxProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	public shouldComponentUpdate(nextProps: DialogBoxProps) {
		super.resetStyles(nextProps);

		this.classes.push('ui-dialogbox');
		this.classes.push(this.styles.dialogBox);

		super.buildStyles(nextProps);
		return true;
	}

	public render() {
		return (
			<div />
		);
	}
}
