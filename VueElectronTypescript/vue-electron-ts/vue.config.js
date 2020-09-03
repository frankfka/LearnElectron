module.exports = {
  pluginOptions: {
    electronBuilder: {
      // Use this to change the entrypoint of your app's main process
      mainProcessFile: 'src/background.ts',
      // Provide an array of files that, when changed, will recompile the main process and restart Electron
      mainProcessWatch: ['src/background.ts'],
      preload: 'src/preload.js'
    }
  }
}