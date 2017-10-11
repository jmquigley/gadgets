require('./lib/monkey');

import {Accordion, AccordionItem} from './lib/accordion';
import {Badge} from './lib/badge';
import {Button} from './lib/button';
import {ButtonCircle} from './lib/buttonCircle';
import {ButtonDialog} from './lib/buttonDialog';
import {ButtonText} from './lib/buttonText';
import {ButtonToggle} from './lib/buttonToggle';
import {Container} from './lib/container';
import {DialogBox, DialogBoxType} from './lib/dialogBox';
import {Divider, DividerType} from './lib/divider';
import {Dropdown} from './lib/dropdown';
import {DynamicList, DynamicListItem} from './lib/dynamicList';
import {Editor} from './lib/editor';
import {Icon} from './lib/icon';
import {Item} from './lib/item';
import {Label} from './lib/label';
import {List, ListDivider, ListHeader, ListItem} from './lib/list';
import {Option, OptionType} from './lib/option';
import {Pager} from './lib/pager';
import {Select} from './lib/select';
import {
	BaseComponent,
	BaseProps,
	Color,
	Direction,
	FontStyle,
	Justify,
	Location,
	Sizing,
	SortOrder,
	Styling
} from './lib/shared';
import {Switch, SwitchType} from './lib/switch';
import {Tab, TabContainer} from './lib/tabs';
import {Tag, TagList} from './lib/tagList';
import {
	TextField,
	Validator,
	ValidatorFn
} from './lib/textField';
import {Title, TitleLayout} from './lib/title';
import {Toast, ToastLevel, ToastType} from './lib/toast';
import {Toolbar} from './lib/toolbar';
import {Tooltip} from './lib/tooltip';
import {Triangle} from './lib/triangle';

const pkg = require('./package.json');
const version = `v${JSON.stringify(pkg.version)}`;

export {
	Accordion,
	AccordionItem,
	Badge,
	BaseComponent,
	BaseProps,
	Button,
	ButtonCircle,
	ButtonDialog,
	ButtonToggle,
	ButtonText,
	Color,
	Container,
	DialogBox,
	DialogBoxType,
	Direction,
	Divider,
	DividerType,
	Dropdown,
	DynamicList,
	DynamicListItem,
	Editor,
	FontStyle,
	Icon,
	Item,
	Justify,
	Label,
	List,
	ListDivider,
	ListHeader,
	ListItem,
	Location,
	Option,
	OptionType,
	Pager,
	Select,
	Sizing,
	SortOrder,
	Styling,
	Switch,
	SwitchType,
	TextField,
	Tab,
	TabContainer,
	Tag,
	TagList,
	Title,
	TitleLayout,
	Toast,
	ToastLevel,
	ToastType,
	Toolbar,
	Tooltip,
	Triangle,
	version,
	Validator,
	ValidatorFn
};
