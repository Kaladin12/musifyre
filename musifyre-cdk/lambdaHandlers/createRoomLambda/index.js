const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

const CORS_HEADERS = {
    "Access-Control-Allow-Origin" : "*", // Permit requests from all origins
    "Access-Control-Allow-Credentials" : true, // In case of using HTTPS
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, content-type, Accept, X-Auth-Token'
}

exports.handler = async function(event, context) {
    console.log('event',JSON.stringify(event))

    const name = JSON.parse(event.body).name;
    console.log('NAME FOR NEW ROOM', name)
    // call dynamo for new room
    let roomId = await createNewRoom(name)
    // return roomId
    if (roomId===null) {
        const errorMessage = `ERROR: ${err}`;
        console.log(errorMessage);
        return format_response(500, errorMessage);
    }
    return format_response(200, {
        'name' : name,
        'room' : roomId
    });
}

const createNewRoom = async (name) => {
    const roomId = uuidv4()
    console.log(roomId)
    const item = getRoomParams(name, roomId);
    const roomParams = {
        TableName: 'musifyre-rooms',
        Item: item
    }
    try {
        await dynamodb.put(roomParams).promise()
        console.log(`Room ${roomId} with name ${name} created successfully`)
        return roomId
    } catch (err) {
        console.log(`Error creating room ${name}`, JSON.stringify(err))
        return null
    }
}

const getRoomParams = (name, roomId) => {
    const params = {
        "id": roomId,
        "clients": dynamodb.createSet(['*'], { validate: true }),
        "creation_timestamp": Date.now().toString(),
        "current": "http://archive.org/download/mbid-e08c3db9-fc33-4d4e-b8b7-818d34228bef/mbid-e08c3db9-fc33-4d4e-b8b7-818d34228bef-1001004518.jpg",
        "name": name,
        "playing": {},
        "queue": []
      };
    return params
}

const format_response = (code, body) => {
    return {
        "statusCode": code,
        "body": JSON.stringify(body),
        "headers": {
            ...CORS_HEADERS,
            "Content-Type": "application/json"
        }
     }
}