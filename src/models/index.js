const mongoose = require('mongoose')

module.exports = uri => {
    const db = mongoose.createConnection(uri, { useNewUrlParser: true })

    const models = {
        Character: require('./Character')(db)
    }

    return {
        db,
        models
    }
}