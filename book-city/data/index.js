var homeJson = require('./mock/home.json');
var data = require('./mock/data.json');

var obj = {
    "/api/data": homeJson,
    "/api/top-home": data,

}

module.exports = function(path) {
    return obj[path]
}