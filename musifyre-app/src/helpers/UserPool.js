import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPoolData = {
    UserPoolId  : 'us-east-1_PgpIXX87t',
    ClientId  : '4q35d0u2m5vdl7k39v3vc7nfuh'
} // Change this after cdk deployment

export default new CognitoUserPool(userPoolData);