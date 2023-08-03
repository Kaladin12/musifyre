const AWS = require('aws-sdk');
const fs = require('fs').promises
var ffmetadata = require("ffmetadata");
const axios = require('axios');

AWS.config.update({
    accessKeyId: 'XXX',
    secretAccessKey: 'XXX'
  });

ffmetadata.setFfmpegPath("/usr/bin/ffmpeg");
const s3 = new AWS.S3();
// https://musifyre-storage.s3.amazonaws.com/c24e1492-f741-11ed-aa36-f4a475ea78e6/1684718607049/03%C2%B5-ziq-MushroomCompost.mp3
async function readMP3Metadata(bucketName, key) {
  let cover_url = `http://coverartarchive.org/release/2158470c-710a-4990-8575-86086cef634a/front`                
  console.log('COVER', cover_url)
  try {
      let res2 = await axios.get(cover_url);  
      console.log('WORKED!', res2.request.host+res2.request.path)
  } catch(err) {
      console.log('FAIL')
  }
}

const bucketName = 'musifyre-storage';
const key = '515ec2fa-91a8-4a8b-a8c9-9798a2d65e46/1685251275900/10Portishead-Roads-Live.mp3';


readMP3Metadata(bucketName, key)