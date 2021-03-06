"use strict"

import { app, Menu } from "electron"
import { createPostWindow, postWindow, openPreference } from "./modules/windows"
import { store } from "./modules/store"
require("./modules/events")
require("./modules/tray")
require("./modules/globalShortcuts")
require("dotenv").config()

const Nucleus = require("nucleus-nodejs")
Nucleus.init("60258c87bcf16266e1db001d", { disableInDev: true })

Nucleus.setProps({
  version: app.getVersion(),
})
Nucleus.appStarted()

app.on("ready", () => {
  const accounts = store.get("accounts") || []
  if (accounts.length > 0) {
    createPostWindow()
  } else {
    createPostWindow()
    openPreference()
  }
})

app.on("activate", () => {
  if (postWindow === null) {
    createPostWindow()
  }
})

Menu.setApplicationMenu(null)

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
