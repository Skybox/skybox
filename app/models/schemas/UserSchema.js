

module.exports = function(mongoose) {
  return mongoose.Schema({
    email: String,
    displayName: String,
    online: Boolean,
    affiliations: {
      steam: {
        id: String,
        token: String
      },
      bnet: {
        id: String,
        token: String
      }
    },
    details: {
      rank: mongoose.Schema.Types.ObjectId,
      bio: String,
      country: String
    },
    forumPosts: [],
    achievements: [],
    games: [],
    groups: [],
    roles: [],
    created: {type: Date, default: Date.now }
  });
}
