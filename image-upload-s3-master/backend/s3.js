require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const SolidBucket = require('solid-bucket')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

let provider = new SolidBucket('wasabi', {
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
})

// uploads a file to s3
function uploadFile(file) {
  //const fileStream = fs.createReadStream(file.path)

  /* const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  } */

  let filePath = 'C:/Users/markg/OneDrive/Pictures/Afbeeldingen/IDK/f037ffa294e3f17.png'
  provider.uploadFile(bucketName, filePath).then((resp) => {
      if (resp.status === 200) {
          console.log(resp.message) 
          // Output: Bucket "example" was uploaded successfully
      }
  }).catch((resp) => {
      if (resp.status === 400){
          console.log(resp.message) 
          // Output: Some error coming from the provider...
      }
  })
}
exports.uploadFile = uploadFile


// downloads a file from s3
function readFile(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  let remoteFilename = 'f037ffa294e3f17.png'

  return provider.readFile(bucketName, remoteFilename).then((resp) => {
      if (resp.status === 200) {
          console.log(resp.message) 
          // Output: Object "example.txt" was fetched successfully from bucket "example"
      }
  }).catch((resp) => {
      if (resp.status === 400){
          console.log(resp.message)
          // Output: Some error coming from the provider...
      }
  })
}
exports.readFile = readFile