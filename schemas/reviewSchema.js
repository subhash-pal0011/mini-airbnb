const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
       Comment: {
              type: String,
              required: true
       },
       rating: {
              type: Number,
              min: 1,
              max: 5,
              required: true
       },
       cratedate: {
              type: Date,
              default: Date.now // 👉 `Date.now` (function) likhna hai, not `Date.now()`
       },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;