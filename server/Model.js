const mongoose = require('mongoose')
const ModelSchema = mongoose.Schema({
    _id: String,
    value: Object
})

module.exports = mongoose.model('Model', ModelSchema)