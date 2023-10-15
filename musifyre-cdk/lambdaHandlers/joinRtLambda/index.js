const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB();
const lambda = new AWS.Lambda();

// esta función es llamada cuando existe un mensaje que posee la acción
// joinroom, la cual solo puede ser ejecutada por un clienet una vez que
// ha solicitado y asegurado una conexión al endpoint $connect, que basicamente
// permite realizar el hanshake que levanta la linea que une a cliente y socket 
exports.handler = async function(event, context) {
    console.log(JSON.stringify(event))
    // el id de conexión es basicamente el identificador del cliente (la 
    // instancia del navegador que accede a un room)
    // permite conocer quién es cada cliente del socket
    const connectionId = event.requestContext.connectionId
    console.log('CONNECTION ID: ' , connectionId)
    const room_id = JSON.parse(event.body).data.key
    console.log('ROOM ID: ', room_id) 

    const message = {
        'type': 'success',
        'msg': `You are successfully subscribed to room ${room_id}`
    }
    let response = {}
    // obtenemos el 
    const domain = event.requestContext.domainName;
    const stage = event.requestContext.stage;
    const callback_endpoint = `https://${domain}/${stage}`;
    // Se genera una instancia de la API que permita tener acceso a
    // la management API en ordern de establecer la versión con la que se trabaja
    // y el ednpoint que se utiliza para enviar mensajes de vuelta a los clientes
    const apiGateway = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: callback_endpoint
    });
    
    try {
        // se guarda el id del cliente en el stringset del room
        await addToClientListForRoom(connectionId, room_id)
        // establecemos una llamada a postConnection para realzar un POST al cliente 
        // identificado, proveyendo del mensaje deseado
        await apiGateway.postToConnection({
          ConnectionId: connectionId,
          Data: JSON.stringify(message)
        }).promise();
        // Invocar lambda para que realice el envio de canción actual (si existe)
        await invokeGetRoomQueueLambda(room_id, connectionId, song=true)
        // invocar a lambda para enviar el queue
        await invokeGetRoomQueueLambda(room_id, connectionId)
        response = {
            statusCode: 200,
            body: JSON.stringify('Message sent successfully'),
        };
        console.log('Message sent successfully');


    } catch (error) {
        console.error('Error sending message:', error);
        response = {
            statusCode: 500,
            body: JSON.stringify(`ERROR: ${error}`),
        };
    }
    return response;
}

const invokeGetRoomQueueLambda = async (roomId, clientId, song = false) => {
    const payload = song ? 
            JSON.stringify({ room: roomId, client: clientId, song: true }) :
            JSON.stringify({ room: roomId, client: clientId })
    const params = {
        FunctionName: 'lambda_get_room_queue_musifyre',
        InvocationType: 'Event', // Asynchronous invocation
        Payload: payload
    };
    console.log('INSIDE INVOKE', roomId, clientId);
    try {
        await lambda.invoke(params).promise();
        console.log('Lambda function triggered successfully', clientId);
    } catch (err) {
        console.log('Error invoking the push song lambda:', err);
    }
}

const addToClientListForRoom = async (connectionId, roomId) => {
    const table = 'musifyre-rooms'
    const params = {
        TableName: table,
        Key: {
            id: { S: roomId }
        },
        UpdateExpression: 'ADD #attr :value',
        ExpressionAttributeNames: {
            '#attr': 'clients'
        },
        ExpressionAttributeValues: {
            ':value': { SS: [connectionId] }
        }
    };

    try {
        await dynamodb.updateItem(params).promise();
        console.log(`Client ${connectionId} added to room ${roomId}`);
    } catch (err) {
        console.log(`ERROR: ${err}`);
    }
}