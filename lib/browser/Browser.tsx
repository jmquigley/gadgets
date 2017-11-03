// TODO: add documentation for Browser

'use strict';

const debug = require('debug')('Browser');

import {List} from 'immutable';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {Divider} from '../divider';
import {BaseComponent, BaseProps, getDefaultBaseProps, getTheme} from '../shared';
import styled, {ThemeProvider, withProps} from '../shared/themed-components';
import {TextField} from '../textField';
import {Toolbar} from '../toolbar';

export interface BrowserProps extends BaseProps {
	home?: string;
	onClip?: any;
	uri?: string;
	useparser?: boolean;
}

export interface BrowserState {
	search?: string;
	uri?: string;
	uriHistory?: List<string>;
}

export function getDefaultBrowserProps(): BrowserProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			home: '',
			onClip: nilEvent,
			uri: 'http://www.example.com',
			useparser: false
		})
	);
}

export const BrowserContainer: any = withProps<BrowserProps, HTMLDivElement>(styled.div)`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	min-height: 500px;
	min-width: 600px;
`;

export const BrowserContent: any = withProps<BrowserProps, HTMLIFrameElement>(styled.div)`
	display: flex;
	border: solid 1px ${props => props.theme.borderColor};
	flex-grow: 1;

	> webview {
		width: 100%;
	}
`;

export const BrowserToolbar: any = withProps<BrowserProps, HTMLDivElement>(styled(Toolbar))`
	border: solid 1px ${props => props.theme.borderColor};
	border-bottom: none;
`;

export const URLTextField: any = withProps<BrowserProps, any>(styled(TextField))`
	width: 17em;
`;

export const SearchTextField: any = withProps<BrowserProps, any>(styled(TextField))`
	border-radius: 45px;
	width: 9em;

	input {
		border-radius: inherit;
		padding-left: 8px;
	}
`;

export class Browser extends BaseComponent<BrowserProps, BrowserState> {

	private _webview: any = null;
	private _browser: any = null;

	public static readonly defaultProps: BrowserProps = getDefaultBrowserProps();

	constructor(props: BrowserProps) {
		super(props, {}, Browser.defaultProps.style);

		const url = this.props.uri || this.props.home || '';
		this.state = {
			search: '',
			uri: url,
			uriHistory: List(url)
		};

		this.bindCallbacks(
			'handleBack',
			'handleForward',
			'handleHome',
			'handleRef',
			'handleReload',
			'handleSearch',
			'handleSnapshot',
			'handleURLChange',
			'handleURLKeyPress'
		);
	}

	private handleBack() {
		if (this._webview && this._webview.canGoBack()) {
			this._webview.goBack();
		}
	}

	private handleForward() {
		if (this._webview && this._webview.canGoForward()) {
			this._webview.goForward();
		}
	}

	private handleHome() {
		if (this._webview && this.props.home) {
			this.setState({
				uri: this.props.home
			}, () => {
				this.refreshPage();
			});
		}
	}

	private handleRef(ref: any) {
		this._browser = ref;
	}

	private handleReload() {
		if (this._webview) {
			this._webview.reload();
		}
	}

	private handleSearch(e: React.FormEvent<HTMLInputElement>) {
		const value: string = (e.target as HTMLInputElement).value;
		this.setState({
			search: value
		}, () => {
			if (this._webview) {
				if (value) {
					this._webview.findInPage(value);
				} else {
					this._webview.stopFindInPage('clearSelection');
				}
			}
		});
	}

	private handleSnapshot() {
		if (this._webview) {
			this._webview.executeJavaScript(
				'document.documentElement.innerHTML',
				false,
				(content: string) => {
					let dom: any = null;

					// By default the webview content is not parsed into
					// a DOM.  If the user requests it then this callback
					// will always parse the DOM contents before returning
					// it.
					if (this.props.useparser) {
						const parser = new DOMParser();
						dom = parser.parseFromString(content, 'text/html');
					}

					this.props.onClip(this.state.uri, content, dom);
				}
			);
		}
	}

	private handleURLChange(e: React.FormEvent<HTMLInputElement>) {
		this.setState({
			uri: (e.target as HTMLInputElement).value
		});
	}

	private handleURLKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			const value: string = (e.target as HTMLInputElement).value;

			this.setState({
				uri: value,
				uriHistory: this.state.uriHistory.push(value)
			}, () => {
				this.refreshPage();
			});
		}
	}

	private refreshPage() {
		if (this._webview) {
			debug('Loading URI: %s for webview: %O', this.state.uri, this._webview);
			this._webview.src = this.state.uri;
		}
	}

	public componentDidMount() {

		// The webview is dynamically inserted into the div represented by the
		// <div> in BrowserContent

		this._webview = document.createElement('webview');
		this._webview.setAttribute('id', this.props.id || 'ui-browser-content');
		this._webview.nodeintegration = true;
		this._browser.appendChild(this._webview);
		this.refreshPage();
	}

	public render() {
		return(
			<ThemeProvider theme={getTheme()}>
				<BrowserContainer>
					<BrowserToolbar>
						<Button iconName="arrow-left" onClick={this.handleBack} />
						<Button iconName="arrow-right" onClick={this.handleForward} />
						<Button iconName="refresh" onClick={this.handleReload} />
						<Divider />
						<Button iconName="home" onClick={this.handleHome} />
						<URLTextField
							onChange={this.handleURLChange}
							onKeyPress={this.handleURLKeyPress}
							value={this.state.uri}
						/>
						<Button iconName="camera-retro" onClick={this.handleSnapshot} />
						<Divider />
						<SearchTextField
							onChange={this.handleSearch}
							placeholder="search"
							useclear
							value={this.state.search}
						/>
					</BrowserToolbar>
					<BrowserContent
						innerRef={this.handleRef}
					/>
				</BrowserContainer>
			</ThemeProvider>
		);
	}
}
