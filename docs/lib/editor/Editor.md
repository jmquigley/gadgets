<a name="module_Editor"></a>

## Editor
A multi-line text editor control.  It uses a custom
[markup module](https://github.com/jmquigley/quill-markup) under the
[Quill](https://quilljs.com/) editor/api.  It has the following
editing modes for highlighting:

- Asciidoc
- Markdown
- Plaintext
- Restructuredtext

The modes available are dependent on the Quill module.

The control has a built in toolbar to assist with editing a document.
The tools include:

- Changing the font and font size of the content
- Modifying text properties (bold, italic, etc)
- Changing the editing mode highlighting
- Changing the syntax highlihgting color scheme

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/editor.png" width="80%" />

## Examples:

```javascript
import {Editor} from 'gadgets';

<Editor
    content=''
    onChange={someFunction(text)}
    scheme={{bold: "red"}}
/>
```

## API
#### Events
- `onChange(text: string)` - Invoked when the editor control is modified.
It receives a reference to the content text that was changed.  It is rate
limited to only be called once every 250ms
- `onClick(pos: number)` - Invoked when the user clicks on a position within
the editor.
- `onClickLink(link: Match)` - Invoked when a user clicks on a reference link
within the content (dependent on the editing mode)

#### Styles
- `ui-editor` - a global style attached to the root `<div>` around the toolbar
and the editor.
- `ui-editor-toolbar` - a global style attached to the `<div>` around the
toolbar component.
- `ui-editor-quill` - a global style attached to the Quill editor component

#### Properties
- `content=""" {string}` - the initial text content for the component
- `defaultFont="Fira Code" {string}` - The name of the default editor font
- `defaultFontSize=12 {number}` - The size of the font in pixels (px)
- `kBold="ctrl+b" {string}` - keyboard combo for setting text to bold
- `kbHeader1="ctrl+alt+1" {string}` - keyboard combo for heading 1
- `kbHeader2="ctrl+alt+2" {string}` - keyboard combo for heading 2
- `kbHeader3="ctrl+alt+3" {string}` - keyboard combo for heading 3
- `kbHeader4="ctrl+alt+4" {string}` - keyboard combo for heading 4
- `kbHeader5="ctrl+alt+5" {string}` - keyboard combo for heading 5
- `kbHeader6="ctrl+alt+6" {string}` - keyboard combo for heading 6
- `kbItalic="ctrl+i" {string}` - keyboard combo for setting italic text
- `kbMono="ctrl+m" {string}` - keyboard combo for setting mono text
- `kbRedo="ctrl+shift+z" {string}` - keyboard combo for redoing previous
undo operations.
- `kbRefresh="alt+r" {string}` - keyboard combo for refreshing the editor
window.  There are still occasional problems reapplying syntax highlights
so this will rescan the whole document and reapply formatting.
- `kbStrikeThrough="ctrl+shift+t" {string}` keyboard combo for adding
a line strike through in the text.
- `kbUnderline="ctrl+u" {string}` - keyboard combo for adding an underline
to the current text.
- `kbUndo="ctrl+z" {string}` - keyboard combo for undoing the previous set
of operations.
- `scheme={foreground: "white", background: "black"} {Object}` - the
color customizations used by the markup processor.  It contains the following
keys:

  - `admonition` - special strings like TODO or FIXME.  This is the
    foreground color
  - `admonitionBackground` - background color for special strings like TODO
    and FIXME
  - `attribute` - special mode attribute highlighting (like ascii doc keys
    and attributes)
  - `background (white)` - the editor background color
  - `blockquote`
  - `bold`
  - `chevron` - the paren, brace, brackets around an item (such as a link)
  - `comment` - a comment block within the document.  These sections are not
    used when the document is generated.
  - `fence` - The color of the fenced code region
  - `foreground (black)` - the editor foreground color
  - `forumula` - LaTeX formula regions or inlines
  - `h1` - header level 1
  - `h2` - header level 2
  - `h3` - header level 3
  - `h4` - header level 4
  - `h5` - header level 5
  - `h6` - header level 6
  - `hr` - horizontal line markup
  - `italic`
  - `keywords` - special keywords that are used by a mode.  Not all modes
    will use these
  - `language` - the name of the language for a fenced code region.  Today
    this is just decoration due to limits in Quill (it  only uses code to
    try discover the language implicitly instead of  explicit declaration)
  - `link` - URI links
  - `linkName` - The color associated with the name ([name](link)) in a link
  - `linkTitle` - optional title values on links
  - `list` - number and bullet list chevrons
  - `mono`
- `option` - special option inline tokens (like the .Title token in
  asciidoc)
  - `strikethrough`
  - `underline`
  - `wiki` - wiki name coloring in [[name | link]]
- `useSmallButtons=false {boolean}` - if set to true, then the buttons
on the toolbar will use sizing.SMALL, otherwise the sizing is set to the
default for the component (which is typically Sizing.normal).

