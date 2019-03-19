// lib/dir-creator/index.js

// Load dependencies.
const fs = require('fs')

/**
 * Helper to create nested directories by path.
 * @param {string} directoryPath - Full path to the needed directory.
 */
function cretaeDir (directoryPath) {
  const dirsArray = directoryPath.split('/')
  let createdPath = ''
  for (let i = 1; i < dirsArray.length; i++) {
    createdPath = createdPath + '/' + dirsArray[i]
    if (!fs.existsSync(createdPath)) {
      fs.mkdirSync(createdPath)
    }
  }
}

/**
 * Create folders by array of paths.
 * @param {array} directoryPaths - The array of paths to all needed directories.
 */
module.exports = function (directoryPaths) {
  for (let directoryPath of directoryPaths) {
    cretaeDir(directoryPath)
  }
}
