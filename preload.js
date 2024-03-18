const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Invoke Methods
  testInvoke: (args) => ipcRenderer.invoke('test-invoke', args),
  // Send Methods
  testSend: (args) => ipcRenderer.send('test-send', args),
  // Receive Methods
  testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) }),
  
  quitApp: (args) => ipcRenderer.send('quit-app', args),

  testDatabase: () => ipcRenderer.send('test-database'),
  testDatabaseReceive: (args) => ipcRenderer.invoke('testdb-receive', args)
});