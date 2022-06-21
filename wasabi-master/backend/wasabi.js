require('dotenv').config()
const SolidBucket = require('solid-bucket')
const hbjs = require('handbrake-js')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

let provider = new SolidBucket('wasabi', {
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
})

function encodeFile(filePath){

    let inputVideoPath = filePath
    let basePath = 'encodedVideos/'
    let outputVideoPath = basePath.concat(filePath.substring(filePath.lastIndexOf('/') + 1)) 

    hbjs.spawn({ input: inputVideoPath, output: outputVideoPath })
    .on('error', err => {
        console.log('Werkt niet man.')
        // invalid user input, no video found etc
    })
    .on('begin', err => {
        console.log('Begin.')
    })
    .on('progress', progress => {
        console.log(
        'Percent complete: %s, ETA: %s',
        progress.percentComplete,
        progress.eta
        )
    })
    .on('end', progress => {
        console.log('EZ PZ')
    })
}
exports.encodeFile = encodeFile

// Uploads a file to the Wasabi cloud data storage.
function uploadFile(file) {

  let filePath = file

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

  let baseURL = 'https://s3.eu-central-1.wasabisys.com/circle-test-bucket/'
  let URL = baseURL.concat(filePath.substring(filePath.lastIndexOf('/') + 1)) 
  console.log('The public URL for accessing the uploaded file is: '+ URL)
}
exports.uploadFile = uploadFile


// Downloads a file from the Wasabi cloud data storage.
function downloadFile(fileKey) {

    remoteFilename = fileKey
    basedownloadedFilePath = 'downloads/'
    downloadedFilePath = basedownloadedFilePath.concat(remoteFilename)

    provider.downloadFile(bucketName, remoteFilename, downloadedFilePath).then((resp) => {
        if (resp.status === 200) {
            console.log(resp.message) 
            // Output: Bucket "example" was deleted successfully
        }
    }).catch((resp) => {
        if (resp.status === 400){
            console.log(resp.message) 
            // Output: Some error coming from the provider...
        }
    })
}
exports.downloadFile = downloadFile