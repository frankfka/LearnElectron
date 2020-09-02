import { app, Tray } from "electron";
import path from 'path'

function showWindow(tray, win) {
  // Calculate where the tray window should be
  function getWindowPosition() {
    const windowBounds = win.getBounds();
    const trayBounds = tray.getBounds();

    // Center window horizontally below the tray icon
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 4)
    return { x: x, y: y }
  }

  const position = getWindowPosition();
  win.setPosition(position.x, position.y, false);
  win.show();
}

// Function to either show or hide the window
function toggleWindow(tray, win) {
  win.isVisible() ? win.hide() : showWindow(tray, win);
}

// TA: Create Tray instance
export function createTray(tray, win) {
  // TODO: need to add support for file loading

  // Create a tray
  // eslint-disable-next-line no-undef
  tray = new Tray(path.join(__static, 'tray_icon.png'));
  tray.setIgnoreDoubleClickEvents(true) // Treat double click events as the same as single click events

  // Watcher methods on the tray icon
  tray.on('click', function () {
    toggleWindow(tray, win);
  })
  tray.on('right-click', function () {
    // TODO: Usually show some sort of context menu, such as ability to quit
    toggleWindow(tray, win)
  })

  // Watcher method on the window to support tray behavior - hide the window on pointer unfocus
  win.on('blur', () => {
    win.hide();
  });

  // Disable dock
  app.dock.hide()
}