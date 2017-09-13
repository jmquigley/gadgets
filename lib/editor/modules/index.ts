import {
	EditorMode,
	EditorStyle,
	QuillManager
} from './quillmanager';

export {
	EditorMode,
	EditorStyle
};

const debug = require('debug')('modules');
const qm = new QuillManager();
const Quill = require('quill');

export function instance(mode: EditorMode, style: EditorStyle, custom?: any, id?: string) {
	const quill = qm.get(mode, style, custom, id);
	debug(`Quill: %o, version: %s`, quill, Quill.version);
	return quill;
}
