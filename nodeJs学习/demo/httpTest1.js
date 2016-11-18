/**
 * Created by jessietang on 11/17/2016.
 */
var http = require('http');

http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text-plain'});
    response.end('Hello word\n');
}).listen(8313);