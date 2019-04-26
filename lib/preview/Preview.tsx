/**
 * Takes a string of a markup language (asciidoc, markdown, or
 * restructuredtext), converts it to HTML, and presents it in a webview control.
 *
 * The componet uses the [util.markup](https://github.com/jmquigley/util.markup)
 * package for parsing content into a proper HTML document.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/preview.png" width="60%" />
 *
 * #### Examples:
 *
 * ```javascript
 * <Preview
 *     content={markup content string}
 *     css={css string to apply}
 *     mode={PreviewMode.markdown}
 * />
 * ```
 *
 * ## API
 * - `onChange(content: string, html: string)` - invoked when the content is changed in the control.
 * It will contain the content parsed and the resulting HTML, both as strings.
 *
 * #### Styles
 * - `ui-preview` - Applied to the div container surrounding the webview component
 * - `ui-preview-content` - Applied to the underlying webview component.  This is an id
 *
 * #### Properties
 * - `content {string}` - The markup document content as a string
 * - `css {string}` - The CSS that will be applied to the parsed content HTML.
 * - `mode {PreviewMode}` - The markup format of the given content.  It has three
 * possible values: `PreviewMode.asciidoc`, `PreviewMoode.markdown`,
 * `PreviewMode.restructuredtext}`
 *
 * @module Preview
 */

// const debug = require("debug")("Preview");

import autobind from "autobind-decorator";
import * as React from "react";
import {HTMLResults, MarkupFactory, MarkupMode} from "util.markup";
import {nilEvent} from "util.toolbox";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	disabled,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";

export const PreviewMode = {
	...MarkupMode
};

export type PreviewMode = MarkupMode;

export interface PreviewProps extends BaseProps {
	content?: string;
	css?: string;
	mode?: PreviewMode;
	onChange(content: string, html: string): void;
}

export function getDefaultPreviewProps(): PreviewProps {
	return {
		...getDefaultBaseProps(),
		content: "",
		css: "",
		mode: PreviewMode.markdown,
		obj: "Preview",
		onChange: nilEvent
	};
}

export interface PreviewState extends BaseState {
	content: string;
	html: string;
}

export function getDefaultPreviewState(): PreviewState {
	return {
		...getDefaultBaseState(),
		content: "",
		html: ""
	};
}

const PreviewWrapper: any = styled.div`
	border: solid 1px ${(props: PreviewProps) => props.theme.borderColor};
	height: 100%;
	overflow: auto;

	webview {
		height: 100%;
	}

	${(props: PreviewProps) => disabled(props)}
	${(props: PreviewProps) => invisible(props)}
`;

export class Preview extends BaseComponent<PreviewProps, PreviewState> {
	private static readonly parsers = {
		[PreviewMode.asciidoc]: MarkupFactory.instance(MarkupMode.asciidoc),
		[PreviewMode.markdown]: MarkupFactory.instance(MarkupMode.markdown),
		[PreviewMode.restructuredtext]: MarkupFactory.instance(
			MarkupMode.restructuredtext
		)
	};

	public static readonly defaultProps: PreviewProps = getDefaultPreviewProps();
	public state: PreviewState = getDefaultPreviewState();
	private _preview: HTMLDivElement;
	private _webview: any = null;

	constructor(props: PreviewProps) {
		super(props, "ui-preview", Preview.defaultProps.style);
	}

	@autobind
	private handleRef(ref: any) {
		this._preview = ref;
	}

	public static getDerivedStateFromProps(
		props: PreviewProps,
		state: PreviewState
	) {
		if (props.content !== state.content) {
			const newState: PreviewState = {
				...state,
				content: props.content
			};

			return super.getDerivedStateFromProps(props, newState, true);
		}

		return null;
	}

	public componentDidMount() {
		if (!this._webview) {
			this._webview = document.createElement("webview");
			this._webview.setAttribute(
				"id",
				this.props.id || "ui-preview-content"
			);
			this._webview.nodeintegration = true;
			this._preview.appendChild(this._webview);
		}

		this.parseContent(this.state.content);
	}

	public componentDidUpdate(
		_prevProps: PreviewProps,
		prevState?: PreviewState
	) {
		if (prevState.content !== this.state.content) {
			this.parseContent(this.state.content);
		}
	}

	private parseContent(content: string) {
		Preview.parsers[this.props.mode]
			.parse({markup: content, css: this.props.css})
			.then((results: HTMLResults) => {
				this._webview.src = `data:text/html,${results.html}`;
				this.props.onChange(content, results.html);
			})
			.catch((err: string) => console.error(err));
	}

	public render() {
		this.updateClassName();

		return (
			<Wrapper {...this.props}>
				<PreviewWrapper
					className={this.className}
					disabled={this.props.disabled}
					ref={this.handleRef}
					style={this.state.style}
					visible={this.props.visible}
				/>
			</Wrapper>
		);
	}
}

export default Preview;
