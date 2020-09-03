import { ipcMain } from 'electron'

ipcMain.on('async-message', (event, arg) => {
  console.log(arg)
  event.reply('async-reply', `Async: ${arg}`)
})
ipcMain.on('sync-message', (event, arg) => {
  console.log(arg)
  event.returnValue = `Sync: ${arg}`
})