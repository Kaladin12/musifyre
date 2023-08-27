const AWS = require('aws-sdk')
const s3 = new AWS.S3({signatureVersion: 'v4'})
   
const CORS_HEADERS = {
  "Access-Control-Allow-Origin" : "*", // Permitimos requests de todos los orgienes
  "Access-Control-Allow-Credentials" : true // En caso de que usemos HTTPS
}

exports.handler = async function(event, context) {
  // definimos como constantes el nombre del bucket y el prefijo
  const bucketName = 'musifyre-storage';
  const room = event.queryStringParameters.id
  // TODO: modify this with the name of the bucket, which should come in the event body
  const objectKeyPrefix = `${room}/${Date.now()}/`;
  console.log(event)
  // extraemos el tipo de archivo y el nombre
  const filename = event.queryStringParameters.file;
  const filetype = event.queryStringParameters.type;
  const expirationTime = 600;

  // Instanciamos un objeto con los parametros a enviar
  var s3Params = {
    Bucket: bucketName,
    Key: objectKeyPrefix + `${filename}`,
    ContentType: filetype,
    Expires: expirationTime,
  };
  // Hacemos uso del método getSignedUrl del sdk para obtener un URL que nos permita hacer PUT al
  // bucket de forma directa
  try{
    const presignedUrl =  s3.getSignedUrl('putObject', s3Params)
    // si todo sale bien, retornamos el objeto obtenido que contiene el url y el token/credenciales del pre-sign
    return {
      "body":presignedUrl,
      "statusCode": 200,
      "headers": CORS_HEADERS
    }
  } catch (err) {
    return {
      "body":'There was an error' + `${err}`,
      "statusCode": 502,
      "headers": CORS_HEADERS
    }
  }

}