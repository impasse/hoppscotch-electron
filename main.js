const { app, BrowserWindow } = require('electron');

app.setName('Hoppscotch');

async function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        show: false,
        webPreferences: {
            webSecurity: false,
            contextIsolation: true,
            spellcheck: false,
            enableWebSQL: false,
            allowRunningInsecureContent: true,
            partition: 'persist:hoppscotch',
            nativeWindowOpen: true,
        },
    });
    win.maximize();
    await win.loadURL('https://hoppscotch.io');
    win.show();
}

app.whenReady().then(() => {
    createWindow();
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});