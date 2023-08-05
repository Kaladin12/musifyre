import { DynamoDB } from 'aws-sdk';
const dynamodb = new DynamoDB.DocumentClient();

const CORS_HEADERS = {
    "Access-Control-Allow-Origin" : "*", // Permitimos requests de todos los orgienes
    "Access-Control-Allow-Credentials" : true // En caso de que usemos HTTPS
}

export async function handler(event, context) {
    console.log(event)
    // el tamaño de la paginacion se define por medio del querystring
    const pageSize = event.queryStringParameters.size;
    // Establecemos los parametros para la busqueda, definiendo el nombre de la table
    // y el limite de elementos a tomar (parseado a int)
    let scanParams = {
        TableName: 'musifyre-rooms',
        Limit: parseInt(pageSize, 10)
    };
    // en caso de que queramos consultar otra pagina, la llamada deberá de tener
    // el querystring last, el cual se envia con el nombre de ExclusiveStartKey
    // para comezar la bósqueda desde ese id (sin incluirlo, de ahí el exclusive en el nombre )
    if ('last' in event.queryStringParameters) {
        scanParams.ExclusiveStartKey = {id:event.queryStringParameters.last}
    }

    try { 
        // realizamos el scan
        const res = await dynamodb.scan(scanParams).promise()
        // obtenemos la llave del ultimo elemento obtenido
        // si hemos leido toda la tabla, este valor será vacio
        const { LastEvaluatedKey } = res;
        // definimos el objeto que contiene los elementos leidos y el id del ultimo elemento
        // para poder realizar la llamada ala siguiente pagina
        const body = {
            'items': res.Items,
            "last": LastEvaluatedKey
        }
        // retornamos 200 si todo va bien
        return format_response(200, body)
    } catch (err) {
        return format_response(502, 'ERROR: '+`${err}`)  
    }
}

const format_response = (code, body) => {
    return {
        "statusCode": code,
        "body": JSON.stringify(body),
        "headers": CORS_HEADERS
     }
}