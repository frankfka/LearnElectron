module.exports = {
  pluginOptions: {
    electronBuilder: {
      // Use this to change the entrypoint of your app's main process
      mainProcessFile: 'src/background.js',
      // Provide an array of files that, when changed, will recompile the main process and restart Electron
      mainProcessWatch: ['src/background.js', 'src/tray.js'],
      preload: 'src/preload.js'
    }
  }
}