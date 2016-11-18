/**
 * Created by jessietang on 11/16/2016.
 */
var header = require('./header');
var body = require('./body');
exports.create = function(name){
    return {
        name: name,
        header: header.create(),
        body: body.create()
    };
};