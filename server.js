const express = require("express");

const mongoose = require("mongoose");
const multer = require("multer");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const config = require("./config");
const path = require("path");
const app = express();
const fs = require("fs");

const GridFile = require('./models/gridFile.model')

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

const upload = multer({ dest: path.join(__dirname, '.') })

const url = config.mongoURI;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connect to the database
connect.then(
  () => {
    console.log("Connected to the database");
  },  
  (err) => console.log(err)
);

app.get('/', (req, res) => {
    res.send({message: "Welcome to the GridFs Prototype"})
})

app.post('/files', upload.any(), async (req, res, nxt) => {
  console.log(req.files)
  try {
    // uploaded file are accessible as req.files
    if (req.files) {
      const promises = req.files.map(async (file) => {
        const fileStream = fs.createReadStream(file.path)

        // upload file to gridfs
        const gridFile = new GridFile({ filename: file.originalname })
        await gridFile.upload(fileStream)

        // delete the file from local folder
        fs.unlinkSync(file.path)
      })

      await Promise.all(promises)
    }

    res.sendStatus(201)
  } catch (err) {
    nxt(err)
  }
})

app.get("/files", async (req, res, nxt) => {
  try {
    const files = await GridFile.find({});

    res.json(files);
  } catch (err) {
    nxt(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
