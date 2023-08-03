import axios from 'axios'

const Presigned = async (file, room) => {
  // recibimos el archivo (un objeto de tipo File) como parametro
  console.log(file)
  // funcion auxiliar para subir la imagen, espera el url obtenido con el sdk y el archivo cargado
  const uploadImageToS3 = async (presignedUrl, file) => {
    console.log('SENDING TO', presignedUrl)
    // Hacemos un put al URL enviando el archivo y estableciendo el tipo de archivo que se está enviando
    let resp = await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type
      }
    })
    .then(res => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log('ERROR',err)
      return null
    });
    return resp
    
  } 

  const generatePresignedUrl = async (file, room) => {
    // funcion que genera la llamada al apigateway de la lambda que genera el presigned url
    // este es el endpoint al que se llama pasando como query strings el nombre y tipo del archivo
    //JSON.parse( JSON.stringify( file.name.replace(/\s/g,'') )
    const filename = decodeURI(file.name.replace(/\s/g,''))

    const URL = `https://3qdiu2w7k9.execute-api.us-east-1.amazonaws.com/dev1_0/sign_upload?file=${filename}&type=${file.type}&id=${room}`
    // realizamos un get al apigateway
    let res = await axios.get(URL)
      .then(async (response) => {
        // recibimos dentro de data el presigned url
        console.log('RES',response.data)
        console.log(response)
        // llamamos a la función que realiza el put
        return await uploadImageToS3(response.data, file)
      }).catch( error => {
        console.error(error)
        return null
      })  
      return res  
  };
  // ESTO ES LO PRIMERO EN EJECUTARSE DE LA FUNCION
   return await generatePresignedUrl(file, room);
};

export default Presigned