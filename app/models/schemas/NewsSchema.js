module.exports = function(mongoose) {
  return mongoose.Schema({
    title: String,
    content: String,
    image: String,
    author: mongoose.Schema.Types.ObjectId,
    tags: [],
    created: { type: Date, default: Date.now }
  });
}
