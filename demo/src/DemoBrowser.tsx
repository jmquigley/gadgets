'use strict';

const debug = require('debug')('DemoBrowser');

import autobind from 'autobind-decorator';
import * as React from 'react';
import {
	Browser,
	Container
} from '../../dist/bundle';

export default class DemoBrowser extends React.Component<any, undefined> {

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	@autobind
	private handleClip(uri: string, content: string, dom: any, history: any) {
		debug(`handleClip => uri: %s, content: '%s', dom: %O, history: %O`, uri, content, dom, history);
	}

	@autobind
	private handleOpen(uri: string, history: any) {
		debug(`handleOpen => uri: %s, history: %O`, uri, history);
	}

	public render() {
		return (
			<Container id="browserExample" title="Browser">
				<Browser
					home="http://www.example.com"
					notooltips
					onClip={this.handleClip}
					onOpen={this.handleOpen}
					uri="http://www.google.com"
					useparser
				/>
			</Container>
		);
	}
}
