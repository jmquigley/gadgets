<a name="module_Preview"></a>

## Preview
Takes a string of a markup language (asciidoc, markdown, or
restructuredtext), converts it to HTML, and presents it in a webview control.

The componet uses the [util.markup](https://github.com/jmquigley/util.markup)
package for parsing content into a proper HTML document.

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/preview.png" width="60%" />

## Examples:

```javascript
<Preview
    content={markup content string}
    css={css string to apply}
    mode={PreviewMode.markdown}
/>
```

## API
#### Events
- `onChange(content: string, html: string)` - invoked when the content is
changed in the control. It will contain the content parsed and the
resulting HTML, both as strings.

#### Styles
- `ui-preview` - Applied to the div container surrounding the webview
component
- `ui-preview-content` - Applied to the underlying webview component.  This
is an id

#### Properties
- `content="" {string}` - The markup document content as a string
- `css="" {string}` - The CSS that will be applied to the parsed content HTML.
- `mode=PreviewMode.markdown {PreviewMode}` - The markup format of the given
content.  It has three possible values: `PreviewMode.asciidoc`,
`PreviewMoode.markdown`, `PreviewMode.restructuredtext}`

