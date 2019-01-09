const debug = require('debug')('gadgets');

import 'util.string';

// process.env['NODE_ENV'] = process.env['NODE_ENV'] || 'production';

debug('env: %O', process.env);
debug('exe: %s', process.env['NODE_ENV']);

import {Accordion, AccordionItem} from './lib/accordion';
import {Badge} from './lib/badge';
import {Breadcrumbs, Crumbs} from './lib/breadcrumbs';
import {Break} from './lib/break';
import {Browser} from './lib/browser';
import {Button} from './lib/button';
import {ButtonCircle} from './lib/buttonCircle';
import {ButtonDialog} from './lib/buttonDialog';
import {ButtonText} from './lib/buttonText';
import {ButtonToggle} from './lib/buttonToggle';
import {Container} from './lib/container';
import {DialogBox, DialogBoxType} from './lib/dialogBox';
import {DialogWindow} from './lib/dialogWindow';
import {Divider, DividerType} from './lib/divider';
import {Dropdown, DropdownOption} from './lib/dropdown';
import {DynamicList, DynamicListItem} from './lib/dynamicList';
import {Editor} from './lib/editor';
import {Icon} from './lib/icon';
import {Item} from './lib/item';
import {Label} from './lib/label';
import {List, ListDivider, ListFooter, ListHeader, ListItem} from './lib/list';
import {Option, OptionGroup, OptionType} from './lib/option';
import {Pager} from './lib/pager';
import {Select} from './lib/select';
import {
	BaseComponent,
	BaseProps,
	Color,
	Direction,
	FontStyle,
	getTheme,
	getThemeList,
	Justify,
	Location,
	setTheme,
	Sizing,
	SortOrder,
	Styling,
	Theme,
	ThemeProps,
	Wrapper
} from './lib/shared';
import {Slider} from './lib/slider';
import {Switch, SwitchType} from './lib/switch';
import {Tab, TabContainer} from './lib/tabs';
import {Tag, TagList} from './lib/tagList';
import {
	TextField,
	Validator,
	ValidatorFn
} from './lib/textField';
import {Title, TitleLayout} from './lib/title';
import {Toast, ToastLevel} from './lib/toast';
import {Toolbar} from './lib/toolbar';
import {Tooltip} from './lib/tooltip';
import {Treeview, TreeviewItem} from './lib/treeview';
import {Triangle} from './lib/triangle';

// Themed component classes
import styled, {
	createGlobalStyle,
	css,
	keyframes,
	ThemeProvider,
	withTheme
} from './lib/shared/themed-components';

const pkg = require('./package.json');
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
	getTheme,
	getThemeList,
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
	Select,
	setTheme,
	Sizing,
	Slider,
	SortOrder,
	styled,
	Styling,
	Switch,
	SwitchType,
	TextField,
	Tab,
	TabContainer,
	Tag,
	TagList,
	Theme,
	ThemeProps,
	ThemeProvider,
	Title,
	TitleLayout,
	Toast,
	ToastLevel,
	Toolbar,
	Tooltip,
	Treeview,
	TreeviewItem,
	Triangle,
	version,
	Validator,
	ValidatorFn,
	withTheme,
	Wrapper
};
