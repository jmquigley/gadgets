'use strict';

const debug = require('debug')('DemoEditor');

import * as fs from 'fs';
import * as React from 'react';
import {join} from 'util.join';
import {
	Container,
	Editor
} from '../../';

export default class DemoEditor extends React.Component<any, undefined> {

	private markdown: string;

	constructor(props: any) {
		super(props);
		debug('creating');

		this.markdown = fs.readFileSync(join(process.cwd(), 'demo', 'samples', 'markdown.md'), 'utf8');
	}

	public render() {
		return (
			<Container id="editorExample" title="Editor">
				<Editor content={this.markdown} scheme={{bold: 'red'}} />
			</Container>
		);
	}
}
