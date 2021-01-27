const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    requried: true
  }
}, {
  timestamps: true
})

module.exports = notesSchema
