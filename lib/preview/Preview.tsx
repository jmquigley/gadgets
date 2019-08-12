/**
 * Takes a string of a markup language (asciidoc, markdown, or
 * restructuredtext), converts it to HTML, and presents it in an iframe element.
 *
 * The componet uses the [util.markup](https://github.com/jmquigley/util.markup)
 * package for parsing content into a proper HTML document.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/preview.png" width="60%" />
 *
 * ## Examples:
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
 * #### Events
 * - `onChange(content: string, html: string)` - invoked when the content is
 * changed in the control. It will contain the content parsed and the
 * resulting HTML, both as strings.
 *
 * #### Styles
 * - `ui-preview` - Applied to the div container surrounding the iframe
 * component
 * - `ui-preview-content` - Applied to the underlying iframe component.  This
 * is an id
 *
 * #### Properties
 * - `content="" {string}` - The markup document content as a string
 * - `css="" {string}` - The CSS that will be applied to the parsed content HTML.
 * - `mode=PreviewMode.markdown {PreviewMode}` - The markup format of the given
 * content.  It has three possible values: `PreviewMode.asciidoc`,
 * `PreviewMoode.markdown`, `PreviewMode.restructuredtext}`
 *
 * @module Preview
 */

import autobind from "autobind-decorator";
import * as React from "react";
import styled from "styled-components";
import {HTMLResults, MarkupFactory, MarkupMode} from "util.markup";
import {nilEvent} from "util.toolbox";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	defaultBaseProps,
	disabled,
	invisible,
	Wrapper
} from "../shared";

export const PreviewMode = {
	...MarkupMode
};

export type PreviewMode = MarkupMode;

export interface PreviewProps extends BaseProps {
	content?: string;
	css?: string;
	mode?: PreviewMode;
	onChange?: (content: string, html: string) => void;
	onMouseMove?: (event: MouseEvent) => void;
	onMouseUp?: (event: MouseEvent) => void;
}

export interface PreviewState extends BaseState {
	content: string;
	html: string;
}

const IFrameContent: any = styled.iframe`
	border: none;
	height: 100%;
	overflow: auto;
	width: 100%;
`;

const PreviewWrapper: any = styled.div`
	border: solid 1px ${(props: PreviewProps) => props.theme.borderColor};
	align-items: stretch;
	display: flex;
	height: 100%;

	${(props: PreviewProps) => disabled(props)}
	${(props: PreviewProps) => invisible(props)}
`;

export class Preview extends BaseComponent<PreviewProps, PreviewState> {
	public static readonly defaultProps: PreviewProps = {
		...defaultBaseProps,
		content: "",
		css: "",
		mode: PreviewMode.markdown,
		onChange: nilEvent,
		onMouseMove: nilEvent,
		onMouseUp: nilEvent
	};

	private static readonly parsers = {
		[PreviewMode.asciidoc]: MarkupFactory.instance(MarkupMode.asciidoc),
		[PreviewMode.markdown]: MarkupFactory.instance(MarkupMode.markdown),
		[PreviewMode.restructuredtext]: MarkupFactory.instance(
			MarkupMode.restructuredtext
		)
	};

	private _iframe: HTMLIFrameElement = null;

	constructor(props: PreviewProps) {
		super("ui-preview", Preview, props, {
			content: "",
			html: ""
		});
	}

	@autobind
	private handleRef(ref: any) {
		this._iframe = ref;
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
		if (this._iframe) {
			Preview.parsers[this.props.mode]
				.parse({markup: content, css: this.props.css})
				.then((results: HTMLResults) => {
					this._iframe.src = `data:text/html,${results.html}`;
					this._iframe.onload = () => {
						const iframeWindow = this._iframe.contentWindow;

						this.debug(
							"iframe: %O, window: %O",
							this._iframe,
							iframeWindow
						);

						iframeWindow.addEventListener(
							"mousemove",
							this.props.onMouseMove
						);

						iframeWindow.addEventListener(
							"mouseup",
							this.props.onMouseUp
						);
					};

					this.props.onChange(content, results.html);
				})
				.catch((err: string) => console.error(err));
		}
	}

	public render() {
		super.render();

		return (
			<Wrapper {...this.props} name={this.name}>
				<PreviewWrapper
					className={this.className}
					disabled={this.props.disabled}
					style={this.state.style}
					visible={this.props.visible}
				>
					<IFrameContent
						className='ui-preview-content'
						sandbox='allow-same-origin allow-scripts'
						ref={this.handleRef}
					/>
				</PreviewWrapper>
			</Wrapper>
		);
	}
}

export default Preview;
