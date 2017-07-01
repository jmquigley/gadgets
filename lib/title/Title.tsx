/**
 * {description}
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button} from 'gadgets';
 * <Button iconName="cab" onClick={someFunction} />
 * ```
 *
 * #### Events
 * - `{name}` - {description}
 *
 * #### Styles
 * - `` - {description}
 *
 * #### Properties
 * - `{name}: {datatype}` - {description}
 *
 * @module Title
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Label} from '../label';
import {BaseComponent} from '../shared/base';
import {BaseProps, getDefaultBaseProps} from '../shared';

export interface TitleProps extends BaseProps {
	stacked?: boolean;
	widget?: any;
}

export function getDefaultTitleProps(): TitleProps {
	return cloneDeep(Object.assign(getDefaultBaseProps(), {
		stacked: false,
		widget: null
	}));
}

export interface TitleState {
}

export class Title extends BaseComponent<TitleProps, TitleState> {

	public static defaultProps: TitleProps = getDefaultTitleProps();

	constructor(props: TitleProps) {
		super(props, require("./styles.css"));
	}

	protected buildStyles() {
		super.resetStyles();

		this.classes.push("ui-title-bar");
		this.classes.push(this.styling.fontStyle);

		if (this.props.stacked) {
			this.classes.push(this.styles.titleBarStacked);
		} else {
			this.classes.push(this.styles.titleBar);
		}

		if (!this.props.noripple && !this.props.disabled) {
			this.classes.push("ripple");
		}

		super.buildStyles(this.props);
	}

	render() {
		this.buildStyles();

		let title: string = "";
		React.Children.forEach(this.props.children, child => {
			title += String(child);
		});

		return (
			<div
				className={this.classes.join(" ")}
				style={this.inlineStyle}
				onClick={this.props.onClick} onDoubleClick={this.props.onDoubleClick}
				>
				<Label
					className={
						"ui-title " +
						(this.props.stacked ? this.styles.titleStacked : this.styles.title)
					}
					noedit={this.props.noedit}
					text={title}
					/>
				<div
					className={
						"ui-widget " +
						(this.props.stacked ? this.styles.widgetStacked : this.styles.widget)
					}>
					{this.props.widget}
				</div>
			</div>
		);
	}
}
