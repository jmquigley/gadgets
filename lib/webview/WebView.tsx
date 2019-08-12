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
import * as React from "react";
import {nilEvent} from "util.toolbox";
import {BaseComponent, BaseProps, BaseState, defaultBaseProps} from "../shared";

export interface WebViewProps extends BaseProps {
	innerRef?: (ref: any) => void;
}

export type WebViewState = BaseState;

export class WebView extends BaseComponent<WebViewProps, WebViewState> {
	public static readonly defaultProps: WebViewProps = {
		...defaultBaseProps,
		innerRef: nilEvent
	};

	constructor(props: any) {
		super("ui-webview", WebView, props);
	}

	@autobind
	private handleRef(ref: any) {
		this.props.innerRef(ref);
	}

	public render() {
		super.render();

		const {
			backgroundColor,
			borderColor,
			controlled,
			errorMessage,
			focus,
			maxHeight,
			maxWidth,
			minHeight,
			minWidth,
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
