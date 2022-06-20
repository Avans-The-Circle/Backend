var express = require("express");
var router = express.Router();
const ffmpeg = require('fluent-ffmpeg');

/* GET home page. */
router.get("/", function (req, res, next) {
  res.writeHead(200,{
    'Content-type':'video/mp4'
  })
  video.pipe(res)
});

module.exports = router;
