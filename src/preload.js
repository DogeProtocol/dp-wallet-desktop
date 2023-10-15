const { contextBridge, ipcRenderer,shell } = require('electron');

contextBridge.exposeInMainWorld('StorageApi', {
    SetItem: function (key, value) {
        //console.log("StorageApi1 " + JSON.stringify(value).length);
        window.localStorage.setItem(key, JSON.stringify(value));
        result = window.localStorage.getItem(key);
        //console.log("StorageApi2 " + result.length);
    },
    GetItem: function (key) {
        result = window.localStorage.getItem(key);
        return result;
    }
});

contextBridge.exposeInMainWorld('ClipboardApi', {
    send: (channel, data) => ipcRenderer.invoke(channel, data),
    handle: (channel, callable, event, data) => ipcRenderer.on(channel, callable(event, data))
})

contextBridge.exposeInMainWorld('ShellApi', {
    send: (channel, data) => ipcRenderer.invoke(channel, data),
    handle: (channel, callable, event, data) => ipcRenderer.on(channel, callable(event, data))
})