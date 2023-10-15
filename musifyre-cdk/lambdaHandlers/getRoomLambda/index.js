const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient();

const CORS_HEADERS = {
    "Access-Control-Allow-Origin" : "*", // Permitimos requests de todos los orgienes
    "Access-Control-Allow-Credentials" : true // En caso de que usemos HTTPS
  }

exports.handler = async function(event, context) {
    console.log(event)

    const room_id = event.pathParameters.id;

    const queryParams = {
        TableName: 'musifyre-rooms',
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': `${room_id}`
        }
    }

    try {
        const res = await dynamodb.query(queryParams).promise()
        const body = res.Items
        return format_response(200, body)
    } catch (err) {
        return format_response(502, 'Error '+`${err}`)
    }
}

const format_response = (code, body) => {
    return {
        "statusCode": code,
        "body": JSON.stringify(body),
        "headers": CORS_HEADERS
     }
}