const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Create a user schema
const userSchema = new mongoose.Schema({
       email: {
              type: String,
              required: true,
              lowercase: true, // Ensure email is always lowercase for consistency
       },
       username: {
              type: String,
              required: true
       }
});

// Apply the passport-local-mongoose plugin to automatically handle username and password hashing
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' }); // This makes email the username field for login

// Export the model
module.exports = mongoose.model('User', userSchema);

