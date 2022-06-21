const express = require('express')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { encodeFile, uploadFile, downloadFile } = require('./wasabi')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
const dotenv = require('dotenv')

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
const connectDB = require('./config/db')

//Routes
app.use('/', require('./routes/index'));
//Load Config
dotenv.config({ path: './config/config.env' });

connectDB();
app.listen(8050, () => console.log("listening on port 8080"))