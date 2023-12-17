const mongoose = require("mongoose")
// Connect database
async function connectDB() {
    try {
      let connection = await mongoose.connect("mongodb+srv://huy:neYSdOY4LtidHuIF@web.4lkzaei.mongodb.net/todo_app?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to database');
      return connection;
    } catch (error) {
      throw new Error("Failed to connect to database");
    }
  }

  module.exports = connectDB