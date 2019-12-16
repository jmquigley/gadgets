/**
 * A wrapper for the iframe html component.  This component will proxy the Events
 * generated in the iframe back to the parent that holds the iframe.
 *
 * Note that this will suffer from the same origin issue in an electron app
 * and browser.
 *
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/iframe.png" width="60%" />
 *
 * ## Examples:
 *
 * ```javascript
 * <IFrame
 *     content={HTML data string to display}
 *     // TODO: add details for IFrame example code
 * />
 * ```
 *
 * ## API
 * #### Events
 * -
 *
 * #### Styles
 * -
 *
 * #### Properties
 * -
 *
 * @module IFrame
 */

import autobind from "autobind-decorator";
import * as React from "react";
import styled from "styled-components";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	defaultBaseProps,
	Wrapper
} from "../shared";

/* tslint:disable-next-line:interface-name */
export interface IFrameProps extends BaseProps {
	html?: string;
}

/* tslint:disable-next-line:interface-name */
export type IFrameState = BaseState;

const IFrameContent: any = styled.iframe`
	border: solid 1px ${(props: IFrameProps) => props.theme.borderColor};
	height: 100%;
	overflow: auto;
	width: 100%;
`;

export class IFrame extends BaseComponent<IFrameProps, IFrameState> {
	public static readonly defaultProps: IFrameProps = {
		...defaultBaseProps,
		html: ""
	};

	private _iframe: HTMLIFrameElement = null;
	private _events: string[] = ["mousemove", "mouseup", "click"];

	constructor(props: IFrameProps) {
		super("ui-iframe", IFrame, props);
	}

	@autobind
	private buildEvent(eventName: string) {
		return (e: Event) => {
			const newEvent = new (e.constructor as any)(e.type, e);

			this.debug(
				"handleEvent (%o): event: %O, newEvent: %O",
				eventName,
				e,
				newEvent
			);

			this._iframe.parentElement.dispatchEvent(newEvent);
		};
	}

	@autobind
	private handleLoad() {
		this.debug("handleLoad()");

		const iframeWindow = this._iframe.contentWindow;

		for (const eventName of this._events) {
			this.debug("Building Event for %o", eventName);
			iframeWindow.addEventListener(
				eventName,
				this.buildEvent(eventName)
			);
		}
	}

	@autobind
	private handleRef(ref: any) {
		this._iframe = ref;
	}

	public componentDidMount() {
		this.debug("componentDidMount -> iframe: %O", this._iframe);
		this._iframe.onload = this.handleLoad;
		this.forceUpdate();
	}

	public componentDidUpdate(_prevProps: IFrameProps) {
		if (this._iframe) {
			this._iframe.src = `data:text/html,${this.props.html}`;
		}
	}

	public render() {
		super.render();

		return (
			<Wrapper {...this.props} name={this.name}>
				<IFrameContent
					sandbox='allow-same-origin allow-scripts'
					ref={this.handleRef}
				/>
			</Wrapper>
		);
	}
}

export default IFrame;
