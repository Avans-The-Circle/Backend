const express = require('express')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { encodeFile, uploadFile, downloadFile } = require('./wasabi')

const app = express()



app.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = readFile(key)
  console.log(readStream)
  readStream.pipe(res)
})

app.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file
  console.log(file)

  let remoteFilename = 'EldenRingVid.mp4'

  let basedownloadedFilePath = 'uploads/'
  let filePath = basedownloadedFilePath.concat(remoteFilename)
  console.log(filePath)

  let encodedFile = encodeFile(filePath)
  uploadFile(encodedFile)
  //downloadFile(encodedFile)
})

app.listen(8080, () => console.log("listening on port 8080"))