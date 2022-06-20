const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', function(req,res){
    res.writeHead(200,{'Content-Type':'video/mp4'});
    console.log(req.header);
    var rs = fs.createReadStream('media/test.mp4')
    rs.pipe(res);
})

app.listen(8000, function() {
    console.log("server is listening at: " + "8000")
})