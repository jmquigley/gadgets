<a name="module_WebView"></a>

## WebView
A simple WebView wrapper for react.  This wrapper is needed by the Browser
component to properly apply styled componets to it (using styled.webview
doesn't work).

Example:

```javascript
const BrowserContent: any = styled(WebView)``;

<BrowserContent
    className="ui-browser-content"
    innerRef={this.handleRef}
/>
```

