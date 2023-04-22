const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    validate: {
      validator(v) {
        return (v.length >= 2 && v.length <= 30);
      }
    }
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    validate: {
      validator(v) {
        return (v.length >= 2 && v.length <= 30);
      }
    }
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return (v.length > 0);
      }
    }
  }
})

module.exports = mongoose.model('user', userSchema);