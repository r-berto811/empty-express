// lib/env-creator/index.js

// Load dependencies.
const fs = require('fs')
const dotenv = require('dotenv')
const readline = require('readline')

/**
 * Create .env file based on .env.defaults properties.
 * @param { string } envPath - The full path to the real .env file.
 * @param { string } envDefaultsPath - The full path to the .env.defaults file.
 * @param { object } param2 - Options.
 * @param { object } param2.stdin
 * @param { object } param2.stdout
 */
module.exports = function (envPath, envDefaultsPath, { input, output }) {
  // Set options as default.
  input = input || process.stdin
  output = output || process.stdout

  // Create .env file if not exists.
  createIfNotExists()

  // Open and parse .env.
  const envReal = dotenv.parse(fs.readFileSync(envPath))
  // Open and parse .env.example.
  const envExample = dotenv.parse(fs.readFileSync(envDefaultsPath))

  /**
   * Check unsetted parameters and set it from stdin.
   * @async
   */
  async function setParameters () {
    for (var key in envExample) {
      if (!envReal[key]) {
        await setToEnv(key)
      }
    }
  }

  /**
   * Set value from input.
   * @param {string} key
   * @async
   */
  async function setToEnv (key) {
    const rl = readline.createInterface({
      input,
      output
    })
    const value = await getValue(rl, key)
    fs.appendFileSync(envPath, `${key}=${value}\n`)
    rl.close()
  }

  /**
   * Get value from input.
   * @param {object} rl - Readline interface.
   * @param {string} key
   * @async
   */
  function getValue (rl, key) {
    return new Promise((resolve) => {
      rl.question(`${key} [${envExample[key]}] : `, (value) => {
        if (!value) {
          return resolve(envExample[key])
        }
        return resolve(value)
      })
    })
  }

  /**
   * Create new empty .env file.
   */
  function createIfNotExists () {
    if (!fs.existsSync(envPath)) {
      fs.closeSync(fs.openSync(envPath, 'w'))
    }
  }

  /**
   * Set all parameters and exit.
   */
  setParameters().then(() => {
    process.exit(0)
  })
}
