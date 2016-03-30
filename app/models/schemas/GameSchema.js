module.exports = function(mongoose) {
  return mongoose.Schema({
    title: String,
    description: String,
    image: {
      main: String,
      background: String,
    },
    link: String
  });
}
