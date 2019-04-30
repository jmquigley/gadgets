import "./lib/globals";

import {
	Accordion,
	AccordionItem,
	getDefaultAccordionItemProps,
	getDefaultAccordionProps
} from "./lib/accordion";
import {Badge, getDefaultBadgeProps} from "./lib/badge";
import {
	Breadcrumbs,
	Crumbs,
	getDefaultBreadcrumbsProps
} from "./lib/breadcrumbs";
import {Break, getDefaultBreakProps} from "./lib/break";
import {Browser, getDefaultBrowserProps} from "./lib/browser";
import {Button, getDefaultButtonProps} from "./lib/button";
import {ButtonCircle, getDefaultButtonCircleProps} from "./lib/buttonCircle";
import {ButtonDialog, getDefaultButtonDialogProps} from "./lib/buttonDialog";
import {ButtonText, getDefaultButtonTextProps} from "./lib/buttonText";
import {ButtonToggle, getDefaultButtonToggleProps} from "./lib/buttonToggle";
import {Container, getDefaultContainerProps} from "./lib/container";
import {
	Datagrid,
	DatagridColumn,
	DatagridRow,
	getDefaultDatagridProps
} from "./lib/datagrid";
import {
	DialogBox,
	DialogBoxType,
	getDefaultDialogBoxProps
} from "./lib/dialogBox";
import {DialogWindow, getDefaultDialogWindowProps} from "./lib/dialogWindow";
import {Divider, DividerType, getDefaultDividerProps} from "./lib/divider";
import {
	Dropdown,
	DropdownOption,
	getDefaultDropdownProps
} from "./lib/dropdown";
import {
	DynamicList,
	DynamicListItem,
	getDefaultDynamicListProps
} from "./lib/dynamicList";
import {Editor, getDefaultEditorProps} from "./lib/editor";
import {getDefaultIconProps, Icon} from "./lib/icon";
import {getDefaultItemProps, Item} from "./lib/item";
import {getDefaultLabelProps, Label} from "./lib/label";
import {
	getDefaultListDividerProps,
	getDefaultListFooterProps,
	getDefaultListHeaderProps,
	getDefaultListItemProps,
	getDefaultListProps,
	List,
	ListDivider,
	ListFooter,
	ListHeader,
	ListItem
} from "./lib/list";
import {
	getDefaultOptionGroupProps,
	getDefaultOptionProps,
	Option,
	OptionGroup,
	OptionType
} from "./lib/option";
import {getDefaultPagerProps, Pager} from "./lib/pager";
import {getDefaultPreviewProps, Preview, PreviewMode} from "./lib/preview";
import {
	BaseComponent,
	BaseProps,
	Color,
	defaultSize,
	Direction,
	FontStyle,
	getDefaultBaseProps,
	getDefaultWrapperProps,
	getTheme,
	getThemeList,
	globalize,
	Justify,
	Location,
	setTheme,
	Sizes,
	Sizing,
	SortOrder,
	Styling,
	Theme,
	ThemeProps,
	Wrapper
} from "./lib/shared";
import {getDefaultSliderProps, Slider} from "./lib/slider";
import {getDefaultSwitchProps, Switch, SwitchType} from "./lib/switch";
import {
	getDefaultTabContainerProps,
	getDefaultTabProps,
	Tab,
	TabContainer
} from "./lib/tabs";
import {
	getDefaultTagListProps,
	getDefaultTagProps,
	Tag,
	TagList
} from "./lib/tagList";

import {getDefaultTextAreaProps, TextArea} from "./lib/textArea";

import {
	getDefaultTextFieldProps,
	TextField,
	TextFieldType,
	validateEmail,
	validateMaxLength,
	validateMinLength,
	validateRegex,
	validateURL,
	Validator,
	ValidatorFn
} from "./lib/textField";
import {getDefaultTitleProps, Title, TitleLayout} from "./lib/title";
import {getDefaultToastProps, Toast, ToastLevel} from "./lib/toast";
import {getDefaultToolbarProps, Toolbar} from "./lib/toolbar";
import {getDefaultTooltipProps, Tooltip} from "./lib/tooltip";
import {
	getDefaultTreeviewProps,
	TreeItem,
	Treeview,
	TreeviewData,
	TreeviewProps
} from "./lib/treeview";
import {getDefaultTriangleProps, Triangle} from "./lib/triangle";

// Themed component classes
import styled, {
	createGlobalStyle,
	css,
	keyframes,
	ThemeProvider,
	withTheme
} from "./lib/shared/themed-components";

const pkg = require("./package.json");
const version = `v${JSON.stringify(pkg.version)}`;

export {
	Accordion,
	AccordionItem,
	Badge,
	BaseComponent,
	BaseProps,
	Breadcrumbs,
	Break,
	Browser,
	Button,
	ButtonCircle,
	ButtonDialog,
	ButtonToggle,
	ButtonText,
	Color,
	Container,
	createGlobalStyle,
	Crumbs,
	css,
	Datagrid,
	DatagridColumn,
	DatagridRow,
	defaultSize,
	DialogBox,
	DialogBoxType,
	DialogWindow,
	Direction,
	Divider,
	DividerType,
	Dropdown,
	DropdownOption,
	DynamicList,
	DynamicListItem,
	Editor,
	FontStyle,
	getDefaultAccordionProps,
	getDefaultAccordionItemProps,
	getDefaultBadgeProps,
	getDefaultBaseProps,
	getDefaultBreadcrumbsProps,
	getDefaultBreakProps,
	getDefaultBrowserProps,
	getDefaultButtonCircleProps,
	getDefaultButtonDialogProps,
	getDefaultButtonProps,
	getDefaultButtonTextProps,
	getDefaultButtonToggleProps,
	getDefaultContainerProps,
	getDefaultDatagridProps,
	getDefaultDialogBoxProps,
	getDefaultDialogWindowProps,
	getDefaultDividerProps,
	getDefaultDropdownProps,
	getDefaultDynamicListProps,
	getDefaultEditorProps,
	getDefaultIconProps,
	getDefaultItemProps,
	getDefaultLabelProps,
	getDefaultListDividerProps,
	getDefaultListFooterProps,
	getDefaultListHeaderProps,
	getDefaultListItemProps,
	getDefaultListProps,
	getDefaultOptionGroupProps,
	getDefaultOptionProps,
	getDefaultPagerProps,
	getDefaultPreviewProps,
	getDefaultSliderProps,
	getDefaultSwitchProps,
	getDefaultTabContainerProps,
	getDefaultTabProps,
	getDefaultTagListProps,
	getDefaultTagProps,
	getDefaultTextAreaProps,
	getDefaultTextFieldProps,
	getDefaultTitleProps,
	getDefaultToastProps,
	getDefaultToolbarProps,
	getDefaultTreeviewProps,
	getDefaultTooltipProps,
	getDefaultTriangleProps,
	getDefaultWrapperProps,
	getTheme,
	getThemeList,
	globalize,
	Icon,
	Item,
	Justify,
	keyframes,
	Label,
	List,
	ListDivider,
	ListFooter,
	ListHeader,
	ListItem,
	Location,
	Option,
	OptionGroup,
	OptionType,
	Pager,
	Preview,
	PreviewMode,
	setTheme,
	Sizes,
	Sizing,
	Slider,
	SortOrder,
	styled,
	Styling,
	Switch,
	SwitchType,
	Tab,
	TabContainer,
	Tag,
	TagList,
	TextArea,
	TextField,
	TextFieldType,
	Theme,
	ThemeProps,
	ThemeProvider,
	Title,
	TitleLayout,
	Toast,
	ToastLevel,
	Toolbar,
	Tooltip,
	TreeItem,
	Treeview,
	TreeviewData,
	TreeviewProps,
	Triangle,
	validateEmail,
	validateMaxLength,
	validateMinLength,
	validateRegex,
	validateURL,
	Validator,
	ValidatorFn,
	version,
	withTheme,
	Wrapper
};
