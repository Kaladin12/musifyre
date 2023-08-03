import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'

const Presigned =  () => {
    const s3 = new S3Client({
        accessKeyId: process.env['ACCESS_KEY_ID'],
        secretAccessKey: process.env['SECRET_ACCESS_KEY'],
        region: process.env['REGION']
    });

    console.log(s3)
    const bucketName = 'musifyre-storage'
    const expirationTime = 3600;
    const objectKeyPrefix = 'room-1/'

    const params = {
        Bucket: bucketName,
        Fields: {
        key: objectKeyPrefix + '${filename}',
        },
        Expires: expirationTime,
    };
    
    const preSignedUrl = s3.createPresignedPost(params);
    
    console.log('Pre-signed URL:', preSignedUrl);
    return;
}

export default Presigned