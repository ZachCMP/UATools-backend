const d = require('./default')

let e = {}

try {
    e = require('./env')
} catch (err) {
    console.error('No environment config detected, using defaults')
}

const conf = { ...d, ...e }

module.exports = conf
