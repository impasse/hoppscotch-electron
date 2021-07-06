const { app, BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');

app.setName('Hoppscotch');

let windowState;

async function createWindow({ x, y, width, height }) {
    const win = new BrowserWindow({
        x,
        y,
        width,
        height,
        show: false,
        webPreferences: {
            webSecurity: false,
            contextIsolation: true,
            spellcheck: false,
            enableWebSQL: false,
            allowRunningInsecureContent: true,
            partition: 'persist:hoppscotch',
            nativeWindowOpen: true,
            defaultFontSize: 14,
        },
    });
    await win.loadURL('https://hoppscotch.io');
    win.show();
    return win;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow(windowState)
            .then(windowState.manage);
    }
});

app.whenReady().then(() => {
    windowState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 800,
        maximize: true,
    });
    createWindow(windowState)
        .then(windowState.manage);
});