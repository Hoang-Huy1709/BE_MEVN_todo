const mongoose = require('mongoose')
const TodosSchema = new mongoose.Schema({
    userId: String,
    todo: String,
    title: String,
    showEdit: {
        type: Boolean,
        default: false 
      },
      showInfo: {
        type: Boolean,
        default: false 
      },
    timeAdd: String,
    dateAdd: String,
    completed: {
      type: Boolean,
      default: false
    },
})

module.exports = mongoose.model('todos', TodosSchema)