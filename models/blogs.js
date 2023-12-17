const mongoose = require('mongoose')
const TodosSchema = new mongoose.Schema({
    userId: String,
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    imageUrls: [String],
    category:{
        type: String,
    },
    author: String,
    timeAdd: String,
    dateAdd: String,
})

module.exports = mongoose.model('blogs', TodosSchema)