<a name="module_Browser"></a>

## Browser
Creates a web browser instance using a [webview](https://electron.atom.io/docs/api/webview-tag/)
tag.  This component allows the user to:

- Navigate back/forward through pages
- Programmatically change the URI reference
- Retrieve the details (clip) the current page
- Perform a text search within the page with forward/backward navigation

## Screen:
<img src="https://github.com/jmquigley/gadgets/blob/master/images/browser.png" width="80%" />

## Examples:

```javascript
import {Browser} from 'gadgets';
import {List} from 'immutable';

<Browser
    home="http://www.google.com"
    onClip={(uri: string, content: string, dom: any, history: List) => {
        debug(`uri: %s, content: '%s', dom: %O`, uri, content, dom);
    }}
    onOpen={(uri: string, history: any) => {
        debug(`uri: %s, history: %O`, uri, history);
    }}
    uri="http://www.example.com"
    useparser
/>
```

## API
#### Events
- `onClip(uri: string, content: string, dom: any, history: List<string>)` -
When the user clicks the "clip" button this event is invoked.  It is
given the current URI, the text of the page, the parsed dom for the page
(if useparser is given) and the current link history
- `onOpen(uri: string, history: List<string>)` - When a page is opened in the
browser this callback is invoked with the name of the URI that was opened.

#### Styles
- `ui-browser` - placed on the root `<div>` of the control.  This wraps the toolbar
and the browser content.
- `ui-browser-content` - placed on the webview tag within the component.
- `ui-browser-toolbar` - placed on the root `<div>` around the toolbar control.

#### Properties
- `home=about:blank {string}` - The site visited when the user clicks on the
"home" button in the toolbar.  If this is empty, then 'about:blank' is used.
- `kbBack="alt+left" {string}` - Moves to the prior page if there is one.
- `kbForward="alt+right" {string}` - Moves to the next page if there is one.
- `kbHome="alt+home" {string}` - Go to the users home page
- `kbNextSearch="f3" {string}` - Go to the next search term
- `kbPreviousSearch="alt+f3" {string}` - Go to the prior search term
- `kbRefresh="ctrl+r" {string}` - Reload the current webpage
- `kbSnapshot="" {string}` - Takes a snapshot of the current page.
- `notooltips=false {boolean}` - When set to true the tooltips will be suppresed.
They are shown by default.
- `uri=about:blank {string}` - The site the user selects to visit when the control
is created. If this is empty, then the home directory is used.  If the home directory
is empty, then the site is set to 'about:blank'
- `useparser=false {boolean}` - If true, then the onClip() event will take the
HTML string and parse it into its DOM elements.  By default this is false because it
is a performance hit to parse it.

