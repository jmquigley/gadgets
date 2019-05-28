/**
 * Creates a web browser instance using a [webview](https://electron.atom.io/docs/api/webview-tag/)
 * tag.  This component allows the user to:
 *
 * - Navigate back/forward through pages
 * - Programmatically change the URI reference
 * - Retrieve the details (clip) the current page
 * - Perform a text search within the page with forward/backward navigation
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/browser.png" width="80%" />
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
 * - `onClip(uri: string, content: string, dom: any, history: List<string>)` -
 * When the user clicks the "clip" button this event is invoked.  It is
 * given the current URI, the text of the page, the parsed dom for the page
 * (if useparser is given) and the current link history
 * - `onOpen(uri: string, history: List<string>)` - When a page is opened in the
 * browser this callback is invoked with the name of the URI that was opened.
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
 * - `kbBack="alt+left" {string}` - Moves to the prior page if there is one.
 * - `kbForward="alt+right" {string}` - Moves to the next page if there is one.
 * - `kbHome="alt+home" {string}` - Go to the users home page
 * - `kbNextSearch="f3" {string}` - Go to the next search term
 * - `kbPreviousSearch="alt+f3" {string}` - Go to the prior search term
 * - `kbRefresh="ctrl+r" {string}` - Reload the current webpage
 * - `kbSnapshot="" {string}` - Takes a snapshot of the current page.
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

const debug = require("debug")("gadgets.Browser");

import autobind from "autobind-decorator";
import {WebviewTag} from "electron";
import {List} from "immutable";
import * as React from "react";
import {HotKeys, KeyMapOptions} from "react-hotkeys";
import styled from "styled-components";
import {nilEvent, objFindKeyByValue} from "util.toolbox";
import {Button} from "../button";
import {Divider} from "../divider";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	getDefaultBaseProps,
	getDefaultBaseState,
	Wrapper
} from "../shared";
import {TextField} from "../textField";
import {Toolbar} from "../toolbar";
import {WebView} from "./WebView";

export interface BrowserProps extends BaseProps {
	home?: string;
	kbBack?: string | KeyMapOptions;
	kbForward?: string | KeyMapOptions;
	kbHome?: string;
	kbNextSearch?: string;
	kbPreviousSearch?: string;
	kbRefresh?: string;
	kbSnapshot?: string;
	notooltips?: boolean;
	onClip?: (
		uri: string,
		content: string,
		dom: Document,
		history: List<string>
	) => void;
	onOpen?: (uri: string, history: List<string>) => void;
	uri?: string;
	useparser?: boolean;
}

export function getDefaultBrowserProps(): BrowserProps {
	return {
		...getDefaultBaseProps(),
		home: "about:blank",
		kbBack: "alt+arrowleft",
		kbForward: "alt+arrowright",
		kbHome: "alt+home",
		kbNextSearch: "f3",
		kbPreviousSearch: "alt+f3",
		kbRefresh: "alt+r",
		kbSnapshot: "",
		notooltips: false,
		obj: "Browser",
		onClip: nilEvent,
		onOpen: nilEvent,
		uri: "about:blank",
		useparser: false
	};
}

export interface BrowserState extends BaseState {
	search?: string;
	uri?: string;
	uriHistory?: List<string>;
}

export function getDefaultBrowserState(): BrowserState {
	return {
		...getDefaultBaseState(),
		search: "",
		uri: "",
		uriHistory: List()
	};
}

const BrowserContainer: any = styled(HotKeys)`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	min-height: 500px;
	min-width: 600px;

	.ui-title-bar {
		flex-grow: unset;
		border: solid 1px ${(props: BrowserProps) => props.theme.borderColor};
		border-bottom: none;
	}

	.ui-title-widget {
		display: flex;
		justify-content: flex-end;
		padding: 0 10px;
	}
`;

const BrowserContent: any = styled(WebView)`
	display: flex;
	border: solid 1px ${(props: BrowserProps) => props.theme.borderColor};
	flex-grow: 1;
`;

const BrowserToolbar: any = styled.div`
	border: solid 1px ${(props: BrowserProps) => props.theme.borderColor};
	margin-bottom: -1px;
	display: flex;
`;

const BrowserToolbarButtons: any = styled(Toolbar)`
	border: none;
`;

const BrowserToolbarURL: any = styled.div`
	display: flex;
	flex-grow: 1;

	.ui-textfield-container {
		justify-content: center;
		width: 100%;
	}
`;

const URLTextField: any = styled(TextField)``;

const SearchTextField: any = styled(TextField)`
	border-radius: 45px;
	width: 12em;

	input {
		border-radius: inherit;
		padding-left: 8px;
	}
`;

export class Browser extends BaseComponent<BrowserProps, BrowserState> {
	private _webview: WebviewTag = null;
	private _webViewHandlerEnabled: boolean = false;
	public static readonly defaultProps: BrowserProps = getDefaultBrowserProps();

	constructor(props: BrowserProps) {
		super(props, "ui-browser", Browser.defaultProps.style);

		this.buildKeyMap({
			kbBack: this.handleBack,
			kbForward: this.handleForward,
			kbHome: this.handleHome,
			kbNextSearch: this.handleNextSearch,
			kbPreviousSearch: this.handlePreviousSearch,
			kbRefresh: this.handleReload,
			kbSnapshot: this.handleSnapshot
		});

		const uri: string = this.props.uri || this.props.home || "";
		this.state = {
			...getDefaultBrowserState(),
			uri: uri,
			uriHistory: List(uri)
		};
	}

	/**
	 * Keyboard events do not propagate outside of the webview instance.  This
	 * method is a workaround for that problem.  Once the webview is mounted
	 * the contents of the webview instance can be retrieved.  An event
	 * handler can be placed on the contents to detect input events.  This
	 * function then works as a proxy to intercept keyboard events within
	 * the content of the webview.  Each pseudo keyevent is passed to a
	 * special keyhandler that will interpret each keyup event and send it
	 * to the handler defined for the component.  This function cannot be
	 * called until the webview dom has finished loading or the call to
	 * getWebContents() will fail.
	 */
	public enableWebViewHandler() {
		if (!this._webViewHandlerEnabled && "getWebContents" in this._webview) {
			this._webview
				.getWebContents()
				.on("before-input-event", (_event: any, input: any) => {
					if (["keyUp"].includes(input.type)) {
						const keyboardEvent = new KeyboardEvent(input.type, {
							code: input.code,
							key: input.key,
							shiftKey: input.shift,
							altKey: input.alt,
							ctrlKey: input.control,
							metaKey: input.meta,
							repeat: input.isAutoRepeat
						});

						this.specialKeyHandler(keyboardEvent);
					}
				});
			this._webViewHandlerEnabled = true;
		}
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
			this.setState(
				{
					uri: this.props.home
				},
				() => {
					this.refreshPage();
				}
			);
		}
	}

	@autobind
	private handleNextSearch() {
		if (this._webview) {
			if (this.state.search) {
				this._webview.findInPage(this.state.search, {
					forward: true,
					findNext: true
				});
			}
		}
	}

	@autobind
	private handlePreviousSearch() {
		if (this._webview) {
			if (this.state.search) {
				this._webview.findInPage(this.state.search, {
					forward: false,
					findNext: true
				});
			}
		}
	}

	@autobind
	private handleReload() {
		if (this._webview) {
			this.handleSearch({target: {value: ""}} as any);
			this._webview.reload();
		}
	}

	@autobind
	private handleSearch(e: React.FormEvent<HTMLInputElement>) {
		const value: string = (e.target as HTMLInputElement).value;
		this.setState(
			{
				search: value
			},
			() => {
				if (this._webview) {
					if (value) {
						this._webview.findInPage(value, {findNext: false});
					} else {
						this._webview.stopFindInPage("clearSelection");
					}
				}
			}
		);
	}

	@autobind
	private handleSnapshot() {
		if (this._webview) {
			this._webview.executeJavaScript(
				"document.documentElement.innerHTML",
				false,
				(content: string) => {
					let dom: Document = null;

					// By default the webview content is not parsed into
					// a DOM.  If the user requests it then this callback
					// will always parse the DOM contents before returning
					// it.
					if (this.props.useparser) {
						const parser = new DOMParser();
						dom = parser.parseFromString(content, "text/html");
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
		if (e.key === "Enter") {
			const value: string = (e.target as HTMLInputElement).value;

			this.setState(
				{
					uri: value,
					uriHistory: this.state.uriHistory.push(value)
				},
				() => {
					this.refreshPage();
				}
			);
		}
	}

	@autobind
	private handleWebViewRef(ref: any) {
		this._webview = ref;

		// Adds a special keyboard event handler to the webview
		// component when the dom finishes loading.
		this._webview.addEventListener("dom-ready", () => {
			this.enableWebViewHandler();
		});
	}

	private refreshPage() {
		if (this._webview) {
			debug(
				"Loading URI: %s for webview: %O",
				this.state.uri,
				this._webview
			);

			this._webview.src = this.state.uri;
			this.props.onOpen(this.state.uri, this.state.uriHistory);
			this.enableWebViewHandler();
		}
	}

	/**
	 * Custom key event processor for the webview component.  Each key up event
	 * is sent from the webview to this function, where the parts of the event
	 * are used to build an equivalent HotKeys combo reference.  That reference
	 * is then used to find a keyboard handler definition to invoke.
	 * @param e {KeyboardEvent} - A keyUp event from a webview instance.
	 */
	private specialKeyHandler(e: KeyboardEvent) {
		const combo: string[] = [];

		if (e.altKey) {
			combo.push("alt");
		}

		if (e.ctrlKey) {
			combo.push("ctrl");
		}

		if (e.key) {
			combo.push(e.key.toLowerCase());
		}

		// reverse lookup of the constructed key combo to find an associated
		// key handler.
		const kb = objFindKeyByValue(this.keyMap, combo.join("+"));

		if (kb && kb in this.props) {
			this.keyHandler[kb](e);
		}
	}

	public componentDidMount() {
		this.refreshPage();
	}

	public render() {
		this.updateClassName();

		return (
			<Wrapper {...this.props}>
				<BrowserContainer
					className={this.className}
					handlers={this.keyHandler}
					keyMap={this.keyMap}
				>
					<BrowserToolbar className='ui-browser-toolbar'>
						<BrowserToolbarButtons>
							<Button
								iconName='arrow-left'
								onClick={this.handleBack}
								tooltip={this.props.notooltips ? "" : "back"}
							/>
							<Button
								iconName='arrow-right'
								onClick={this.handleForward}
								tooltip={this.props.notooltips ? "" : "forward"}
							/>
							<Button
								iconName='refresh'
								onClick={this.handleReload}
								tooltip={this.props.notooltips ? "" : "refresh"}
							/>
							<Divider />
							<Button
								iconName='home'
								onClick={this.handleHome}
								tooltip={this.props.notooltips ? "" : "home"}
							/>
						</BrowserToolbarButtons>
						<BrowserToolbarURL>
							<URLTextField
								onChange={this.handleURLChange}
								onKeyPress={this.handleURLKeyPress}
								tooltip={
									this.props.notooltips ? "" : "website URL"
								}
								value={this.state.uri}
							/>
						</BrowserToolbarURL>
						<BrowserToolbarButtons>
							<Button
								iconName='camera-retro'
								onClick={this.handleSnapshot}
								tooltip={
									this.props.notooltips ? "" : "clip webpage"
								}
							/>
							<Divider />
							<SearchTextField
								obj='TextField'
								onChange={this.handleSearch}
								placeholder='search'
								tooltip={
									this.props.notooltips
										? ""
										: "search text on page"
								}
								useclear
								value={this.state.search}
							/>
							<Button
								iconName='step-backward'
								onClick={this.handlePreviousSearch}
								tooltip={
									this.props.notooltips
										? ""
										: "search backward"
								}
							/>
							<Button
								iconName='step-forward'
								onClick={this.handleNextSearch}
								tooltip={
									this.props.notooltips
										? ""
										: "search forward"
								}
							/>
						</BrowserToolbarButtons>
					</BrowserToolbar>
					<BrowserContent
						className='ui-browser-content'
						innerRef={this.handleWebViewRef}
					/>
				</BrowserContainer>
			</Wrapper>
		);
	}
}

export default Browser;
