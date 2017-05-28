//
// This generic control is used to group others controls.
//

'use strict';

import * as React from 'react';
import {BaseProps} from '../shared/props';

const styles = require('./styles.css');

export interface ContainerProps extends BaseProps {
}

export const Container = (props: ContainerProps) => (
	<section className={`ui-container ${styles.container}`} id={props.id}>
        {props.children}
    </section>
);
