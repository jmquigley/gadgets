/**
 * A multiline text editing component.  It is a a contenteditable div.  As text
 * is added to the component the onUpdate callback is executed to pass the
 * contents that have chnaged.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/textarea.png" width="60%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {TextAra} from "gadgets";
 *
 * <TextArea
 *     maxRows={10}
 *     onUpdate={callback}
 *     value={initial text}
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onUpdate(text: string)` - Invoked when the text within the component is changed.
 * The current text in the component is passed to the callback.
 *
 * #### Styles
 * - `ui-textarea` - Placed on the `<div>` component that wraps the text component.
 *
 * #### Properties
 * - `rows=5 {number}` - The number of lines displayed within the component.
 * - `updateDelay=150 {number}` - The onUpdate function is called when the text is
 * updated.  This is a debounce delay to rate limit how often this function is
 * called when input into the control is fast.  The number is milliseconds.
 * - `value=null {string}` - a string value that will overwrite the contents of
 * the current component.
 *
 * @module TextArea
 */

// const debug = require("debug")("TextArea");

import autobind from "autobind-decorator";
import {debounce} from "lodash";
import * as React from "react";
import {unitToNumber} from "util.calc";
import {splitNL} from "util.string";
import {nilEvent} from "util.toolbox";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";

export interface TextAreaProps extends BaseProps {
	onChange?: (e: React.ChangeEvent<HTMLDivElement>) => void;
	onUpdate?: (text: string) => void;
	rows?: number;
	updateDelay?: number;
	value?: string;
}

export function getDefaultTextAreaProps(): TextAreaProps {
	return {
		...getDefaultBaseProps(),
		onChange: nilEvent,
		onUpdate: nilEvent,
		padding: "4px",
		rows: 5,
		updateDelay: 150,
		value: null
	};
}

export interface TextAreaState extends BaseState {
	value: string;
}

export function getDefaultTextAreaState(): TextAreaState {
	return {
		...getDefaultBaseState(),
		value: ""
	};
}

const TextAreaView: any = styled.div`
	-webkit-transition: all ${(props: TextAreaProps) =>
		props.theme.transitionDelay} ease-in-out;
	border: solid 1px ${(props: TextAreaProps) => props.theme.borderColor};
	height: ${(props: TextAreaProps) => props.maxHeight};
	max-height: ${(props: TextAreaProps) => props.maxHeight};
	outline: none;
	overflow: auto;
	padding: ${(props: TextAreaProps) => props.padding || "4px"};
	width: 100%;

	&:focus {
	    border: 1px solid ${(props: TextAreaProps) => props.theme.outlineColor};
		box-shadow: 0 0 5px ${(props: TextAreaProps) => props.theme.outlineColor};
	}

	${(props: TextAreaProps) => disabled(props)}
	${(props: TextAreaProps) => invisible(props)}
	${(props: TextAreaProps) => props.sizing && fontStyle[props.sizing]}
`;

export class TextArea extends BaseComponent<TextAreaProps, TextAreaState> {
	public static readonly defaultProps: TextAreaProps = getDefaultTextAreaProps();
	private _container: HTMLDivElement = null;
	private _debounceUpdate: any = null;

	constructor(props: TextAreaProps) {
		super(props, "ui-textarea", TextArea.defaultProps.style);

		this._debounceUpdate = debounce(
			this.props.onUpdate,
			this.props.updateDelay
		);

		this.state = {
			...getDefaultTextAreaState(),
			value: this.props.value
		};
	}

	@autobind
	private handleChange(e: React.ChangeEvent<HTMLDivElement>) {
		const target: HTMLDivElement = e.target as HTMLDivElement;
		const value: string = target.innerText;

		this.props.onChange(e);
		this._debounceUpdate(value);
	}

	@autobind
	private handleRef(ref: any) {
		this._container = ref;
	}

	public static getDerivedStateFromProps(
		props: TextAreaProps,
		state: TextAreaState
	) {
		if (props.value && props.value !== state.value) {
			const newState: TextAreaState = {
				...state,
				value: props.value
			};

			return super.getDerivedStateFromProps(props, newState, true);
		}

		return null;
	}

	public componentDidMount() {
		this.updateContent(this.state.value);
	}

	public componentDidUpdate(
		_prevProps: TextAreaProps,
		prevState: TextAreaState
	) {
		if (prevState.value !== this.state.value) {
			this.updateContent(this.state.value);
		}
	}

	private updateContent(text: string) {
		const lines: string[] = splitNL(text);
		this._container.innerHTML = lines
			.map((it: string) => {
				return `<div>${it}</div>`;
			})
			.join("");

		this._debounceUpdate(text);
	}

	public render() {
		this.updateClassName();

		const {onUpdate, ...props} = this.props;

		const totalRows = props.rows < 1 ? 1 : props.rows;
		const padding: number = unitToNumber(props.padding);
		const lineHeight: number = unitToNumber(
			BaseComponent.lineHeightPX(props.sizing)
		);
		const maxHeight = lineHeight * totalRows + padding * 2;

		return (
			<Wrapper {...props}>
				<TextAreaView
					{...props}
					className={this.className}
					contentEditable={true}
					maxHeight={`${maxHeight}px`}
					onInput={this.handleChange}
					ref={this.handleRef}
					style={this.state.style}
					suppressContentEditableWarning
				/>
			</Wrapper>
		);
	}
}

export default TextArea;
