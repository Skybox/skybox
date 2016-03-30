module.exports = function(mongoose) {
  return mongoose.Schema({
    title: String,
    description: String,
    mediaUrl: String,
    type: String,
    tags: [],
    author: mongoose.Schema.Types.ObjectId,
    created: { type: Date, default: Date.now }
  });
}
