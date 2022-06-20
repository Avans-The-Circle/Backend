const hbjs = require('handbrake-js')

let inputVideoPath = 'C:/Users/markg/Videos/Videos/EldenRingVid.mp4'
let outputVideoPath = 'C:/Users/markg/Videos/Videos/EncodedVid.m4v'

function encodeVideo(){
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

encodeVideo()
exports.encodeVideo = encodeVideo