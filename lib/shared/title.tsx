'use strict';

import * as React from 'react';
import {Label} from '../label';
import {BaseProps} from './props';

const styles = require('./styles.css');

export interface TitleProps extends BaseProps {
	leftTitle?: string;
	rightTitle?: string;
}

export const TitleComponent = (props: TitleProps) => {
	return (
		<div className={`ui-title ${styles.title} ${(!props.noripple && !props.disabled) ? 'ripple' : ''}`}
			 onClick={props.onClick}>
			<Label className={`ui-leftTitle ${styles.leftTitle}`}>{props.leftTitle}</Label>
			<Label className={`ui-rightTitle ${styles.rightTitle}`}>{props.rightTitle}</Label>
		</div>
	);
};
