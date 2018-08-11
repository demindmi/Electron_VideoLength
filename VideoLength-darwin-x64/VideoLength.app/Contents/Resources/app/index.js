const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({width: 550, height: 200, resizable:false});
    mainWindow.loadURL(`file://${__dirname}/index.html`) //__dirname is a local vraible from node js,

}); //event based programming - we listen for of app, for the readu status and do w/e arrow function does  

ipcMain.on('video:submit', (event, data ) =>{  //when this trigers, start function  
    ffmpeg.ffprobe(data, (err, metadata) => {
        mainWindow.webContents.send('video:path', metadata.format.duration); //sending back
    })

});
//electron AP                                  Main BrowserWindow
//ipcMain.on  <------------------------------   ipcRenderer.send | main page asking something to electron
//mainWindow.webContents.send -------------->   ipcRenderer.on   | electron responding

