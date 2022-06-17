require('dotenv').config()
const SolidBucket = require('solid-bucket')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

let provider = new SolidBucket('wasabi', {
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
})

// Uploads a file to Wasabi
function uploadFile(file) {

  let filePath = 'C:/Users/markg/OneDrive/Pictures/Afbeeldingen/Wallpapers/tempsnip.png'
  /* provider.uploadFile(bucketName, filePath).then((resp) => {
      if (resp.status === 200) {
          console.log(resp.message) 
          // Output: Bucket "example" was uploaded successfully
      }
  }).catch((resp) => {
      if (resp.status === 400){
          console.log(resp.message) 
          // Output: Some error coming from the provider...
      }
  }) */

  let baseURL = 'https://s3.eu-central-1.wasabisys.com/circle-test-bucket/'
  let URL = baseURL.concat(filePath.substring(filePath.lastIndexOf('/') + 1)) 
  console.log(URL)
}
exports.uploadFile = uploadFile


// Gets URL of an object from Wasabi.
function readFile(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  let remoteFilename = 'tempsnip.png'

 /*  provider.readFile(bucketName, remoteFilename).then((resp) => {
      if (resp.status === 200) {
          console.log(resp.message) 
          // Output: Object "example.txt" was fetched successfully from bucket "example"
      }
  }).catch((resp) => {
      if (resp.status === 400){
          console.log(resp.message)
          // Output: Some error coming from the provider...
      }
  }) */

  provider.getListOfFiles(bucketName).then((resp) => {
    if (resp.status === 200) {
        console.log(resp.message) 
        // Output: The list of objects was fetched successfully from bucket "example"
    }
}).catch((resp) => {
    if (resp.status === 400){
        console.log(resp.message)
        // Output: Some error coming from the provider...
    }
})
}
exports.readFile = readFile