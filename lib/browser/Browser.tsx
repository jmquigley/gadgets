/**
 * Creates a web browser instance using a [webview](https://electron.atom.io/docs/api/webview-tag/)
 * tag.  This component allows the user to:
 *
 * - Navigate back/forward through pages
 * - Programmatically change the URI reference
 * - Retrieve the details (clip) the current page
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/browser.png" width="60%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Browser} from 'gadgets';
 * import {List} from 'immutable';
 *
 * <Browser
 *     home="http://www.google.com"
 *     onClip={(uri: string, content: string, dom: any, history: List) => {
 *         debug(`uri: %s, content: '%s', dom: %O`, uri, content, dom);
 *     }}
 *     onOpen={(uri: string, history: any) => {
 *         debug(`uri: %s, history: %O`, uri, history);
 *     }}
 *     uri="http://www.example.com"
 *     useparser
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onClip(uri: string, content: string, dom: any, history: List)` - When the user clicks
 * the "clip" button this event is invoked.  It is given the current URI, the text of the
 * page, the parsed dom for the page (if useparser is given) and the current link history
 * - `onOpen(uri: string, history: List)` - When a page is opened in the browser this
 * callback is invoked with the name of the URI that was opened.
 *
 * #### Styles
 * - `ui-browser` - placed on the root `<div>` of the control.  This wraps the toolbar
 * and the browser content.
 * - `ui-browser-content` - placed on the webview tag within the component.
 * - `ui-browser-toolbar` - placed on the root `<div>` around the toolbar control.
 *
 * #### Properties
 * - `home: {string} ('about:blank')` - The site visited when the user clicks on the
 * "home" button in the toolbar.  If this is empty, then 'about:blank' is used.
 * - `notooltips: {boolean} (false)` - When set to true the tooltips will be suppresed.
 * They are shown by default.
 * - `uri: {string} ('about:blank')` - The site the user selects to visit when the control
 * is created. If this is empty, then the home directory is used.  If the home directory
 * is empty, then the site is set to 'about:blank'
 * - `useparser: {boolean} (false)` - If true, then the onClip() event will take the
 * HTML string and parse it into its DOM elements.  By default this is false because it
 * is a performance hit to parse it.
 *
 * @module Browser
 */

'use strict';

const debug = require('debug')('Browser');

import autobind from 'autobind-decorator';
import {List} from 'immutable';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {ButtonDialog} from '../buttonDialog';
import {Divider} from '../divider';
import {BaseComponent, BaseProps, getDefaultBaseProps, getTheme} from '../shared';
import styled, {ThemeProvider, withProps} from '../shared/themed-components';
import {TextField} from '../textField';
import {Toolbar} from '../toolbar';

export interface BrowserProps extends BaseProps {
	home?: string;
	notooltips?: boolean;
	onClip?: any;
	onOpen?: any;
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
			home: 'about:blank',
			notooltips: false,
			obj: 'Browser',
			onClip: nilEvent,
			onOpen: nilEvent,
			uri: 'about:blank',
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

	.ui-title-bar {
		flex-grow: unset;
		border: solid 1px ${props => props.theme.borderColor};
		border-bottom: none;
	}

	.ui-title-widget {
		display: flex;
		justify-content: flex-end;
		padding: 0 10px;
	}
`;

export const BrowserContent: any = withProps<BrowserProps, HTMLIFrameElement>(styled.div)`
	display: flex;
	border: solid 1px ${props => props.theme.borderColor};
	flex-grow: 1;

	> webview {
		width: 100%;
	}
`;

export const BrowserToolbar: any = withProps<BrowserProps, HTMLDivElement>(styled.div)`
	border: solid 1px ${props => props.theme.borderColor};
	margin-bottom: -1px;
	display: flex;
`;

export const BrowserToolbarButtons: any = styled(Toolbar)`
	border: none;
`;

export const BrowserToolbarURL: any = styled.div`
	display: flex;
	flex-grow: 1;

	.ui-textfield-container {
		justify-content: center;
		width: 100%;
	}
`;

export const BrowserToolbarSearch: any = styled(Toolbar)`
	border: none;
`;

export const URLTextField: any = styled(TextField)`
`;

export const SearchTextField: any = styled(TextField)`
	border-radius: 45px;
	width: 12em;

	input {
		border-radius: inherit;
		padding-left: 8px;
	}
`;

export class Browser extends BaseComponent<BrowserProps, BrowserState> {

	private _webview: any = null;
	private _browser: HTMLDivElement = null;

	public static readonly defaultProps: BrowserProps = getDefaultBrowserProps();

	constructor(props: BrowserProps) {
		super(props, Browser.defaultProps.style);

		this._classes.add('ui-browser');
		const url = this.props.uri || this.props.home || '';

		this.state = {
			search: '',
			uri: url,
			uriHistory: List(url)
		};
	}

	@autobind
	private handleBack() {
		if (this._webview && this._webview.canGoBack()) {
			this._webview.goBack();
		}
	}

	@autobind
	private handleForward() {
		if (this._webview && this._webview.canGoForward()) {
			this._webview.goForward();
		}
	}

	@autobind
	private handleHome() {
		if (this._webview && this.props.home) {
			this.setState({
				uri: this.props.home
			}, () => {
				this.refreshPage();
			});
		}
	}

	@autobind
	private handleRef(ref: any) {
		this._browser = ref;
	}

	@autobind
	private handleReload() {
		if (this._webview) {
			this._webview.reload();
		}
	}

	@autobind
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

	@autobind
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

					this.props.onClip(
						this.state.uri,
						content,
						dom,
						this.state.uriHistory
					);
				}
			);
		}
	}

	@autobind
	private handleURLChange(e: React.FormEvent<HTMLInputElement>) {
		this.setState({
			uri: (e.target as HTMLInputElement).value
		});
	}

	@autobind
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
			this.props.onOpen(this.state.uri, this.state.uriHistory);
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
				<BrowserContainer className={this.classes} >
					<BrowserToolbar className="ui-browser-toolbar">
						<BrowserToolbarButtons>
							<Button
								iconName="arrow-left"
								onClick={this.handleBack}
								tooltip={this.props.notooltips ? '' : 'back'}
							/>
							<Button
								iconName="arrow-right"
								onClick={this.handleForward}
								tooltip={this.props.notooltips ? '' : 'forward'}
							/>
							<Button
								iconName="refresh"
								onClick={this.handleReload}
								tooltip={this.props.notooltips ? '' : 'refresh'}
							/>
							<Divider />
							<Button
								iconName="home"
								onClick={this.handleHome}
								tooltip={this.props.notooltips ? '' : 'home'}
							/>
						</BrowserToolbarButtons>
						<BrowserToolbarURL>
							<URLTextField
								onChange={this.handleURLChange}
								onKeyPress={this.handleURLKeyPress}
								tooltip={this.props.notooltips ? '' : 'website URL'}
								value={this.state.uri}
							/>
						</BrowserToolbarURL>
						<BrowserToolbarSearch>
							<ButtonDialog
								iconName="chevron-down"
								tooltip={this.props.notooltips ? '' : 'history'}
							>
								history
							</ButtonDialog>
							<Button
								iconName="camera-retro"
								onClick={this.handleSnapshot}
								tooltip={this.props.notooltips ? '' : 'clip webpage'}
							/>
							<Divider />
							<SearchTextField
								onChange={this.handleSearch}
								placeholder="search"
								tooltip={this.props.notooltips ? '' : 'search text on page'}
								useclear
								value={this.state.search}
							/>
							<Button
								iconName="step-forward"
								tooltip={this.props.notooltips ? '' : 'continue search'}
							/>
						</BrowserToolbarSearch>
					</BrowserToolbar>
					<BrowserContent
						className="ui-browser-content"
						innerRef={this.handleRef}
					/>
				</BrowserContainer>
			</ThemeProvider>
		);
	}
}
