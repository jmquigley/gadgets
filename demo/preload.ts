process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
(window as any).ipcRenderer = require("electron").ipcRenderer;
