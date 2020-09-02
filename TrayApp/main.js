const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');

// Tray is the "menu bar" instance
let tray = null;
// Window ???
let window = null;

// Create a window instance
const createWindow = () => {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    fullscreenable: false,
    // resizable: false,
    // transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  window.loadFile('index.html')
  window.webContents.openDevTools()
  // Hide the window when it loses focus
  window.on('blur', () => {
    window.hide();
    // Debug mode if devtools is opened
    // if (!window.webContents.isDevToolsOpened()) {
    // }
  });
}
// Calculate where the tray window should be
const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))    // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4)
  return {x: x, y: y}
}
const showWindow = () => {
  const position = getWindowPosition();
  window.setPosition(position.x, position.y, false);
  window.show();
}
// Function to either show or hide the window
const toggleWindow = () => {
  console.log("Toggle")
  window.isVisible() ? window.hide() : showWindow();
}
// Special function to handle right clicks
const rightClickMenu = () => {
  // This creates a native menu with certain actions
  // However, menus are technically most useful in a top "toolbar"
  const menu = [
    {
      role: 'quit',
      accelerator: 'Command+Q'
    }
  ];
  tray.popUpContextMenu(Menu.buildFromTemplate(menu));
}
// Function to create a tray object
const createTray = () => {
  tray = new Tray(path.join('tray_icon.png'));
  tray.setIgnoreDoubleClickEvents(true) // Treat double click events as the same as single click events
  tray.on('click', function (event) {
    toggleWindow();
  })
  tray.on('right-click', function (event) {
    console.log("Right clicked")
    // Usually show some sort of context menu, such as ability to quit
    // In macOS, usually just show the same thing
    rightClickMenu()
  })
}

// Only show in tray
app.dock.hide()
app.whenReady().then(() => {
  // Create the tray and window instances
  console.log("Creating tray and window")
  createTray();
  createWindow();
})
