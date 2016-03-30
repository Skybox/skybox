module.exports = function(mongoose) {
  return mongoose.Schema({
    title: String,
    image: String,
    ip: String,
    link: String,
    type: String,
    query: {
      type: String,
      host: String,
      port: String,
      notes: String
    }
  });
}
