module.exports = function(mongoose) {
  return mongoose.Schema({
    title: String,
    description: String,
    icon: String,
    author: mongoose.Schema.Types.ObjectId,
    posts: [],
    tags: [],
    parent: mongoose.Schema.Types.ObjectId,
    subforums: [],
    availability: {
      roles: [],
      locked: {type: Boolean, default: false}
    },
    order: Number,
    created: {type: Date, default: Date.now }
  });
}
