module.exports = function(mongoose) {
  return mongoose.Schema({
    title: String,
    content: {
      current: String,
      original: String,
    },
    tags: [],
    replies: [],
    author: mongoose.Schema.Types.ObjectId,
    forum: mongoose.Schema.Types.ObjectId,
    updated: {type: Date, default: Date.now },
    created: {type: Date, default: Date.now }
  });
}
