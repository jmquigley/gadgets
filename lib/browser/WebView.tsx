/**
 * A simple WebView wrapper for react.  This wrapper is needed by the Browser
 * component to properly apply styled componets to it (using styled.webview
 * doesn't work).
 *
 * Example:
 *
 * ```javascript
 * const BrowserContent: any = styled(WebView)``;
 *
 * <BrowserContent
 *     className="ui-browser-content"
 *     innerRef={this.handleRef}
 * />
 * ```
 *
 * @module WebView
 */
import autobind from "autobind-decorator";
import _ from "lodash";
import * as React from "react";
import {nilEvent} from "util.toolbox";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	getDefaultBaseProps,
	getDefaultBaseState
} from "../shared";

export interface WebViewProps extends BaseProps {
	innerRef?: (ref: any) => void;
}

export function getDefaultWebViewProps(): WebViewProps {
	return _.omitBy(
		{
			...getDefaultBaseProps(),
			innerRef: nilEvent,
			obj: "WebView"
		},
		_.isNil
	);
}

export type WebViewState = BaseState;

export function getDefaultWebViewState(): WebViewState {
	return {
		...getDefaultBaseState()
	};
}

export class WebView extends BaseComponent<WebViewProps, WebViewState> {
	public static readonly defaultProps: WebViewProps = getDefaultWebViewProps();
	public state: WebViewState = getDefaultWebViewState();

	constructor(props: any) {
		super(props, "ui-webview", WebView.defaultProps.style);
	}

	@autobind
	private handleRef(ref: any) {
		this.props.innerRef(ref);
	}

	public render() {
		this.updateClassName();

		const {
			controlled,
			focus,
			noborder,
			noedit,
			nohover,
			nopropagation,
			notheme,
			notooltip,
			ripple,
			testing,
			visible,
			innerRef,
			...props
		} = this.props;

		return <webview {...props} ref={this.handleRef} />;
	}
}

export default WebView;
