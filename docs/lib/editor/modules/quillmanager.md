<a name="module_QuillManager"></a>

## QuillManager
Used by the Editor react component to create and manage different instancesof the Quill library based on the selected editing mode and display style.This class will automatically read the style configuration objects andcustom syntax highlighting modules and make them available on request.When a custom mode/style is requested a new Quill instance is created andcached (memoized).This class is not used directly by the Editor class.  A global `instance`method is provided as the entry point for retrieving Quill instances (inthe index for the `modules`),#### Examples:```javascriptconst qm = new QuillManager()```

