var fs = require('fs');

module.exports = function(){
    var config = {};
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        config[name] = require('./' + name);
    });
    return config;
}
