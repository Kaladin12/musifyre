import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPoolData = {
    UserPoolId  : 'us-east-1_KtWjWTz09',
    ClientId  : '73kpb4l8hq5a0dgof36o8eld63'
} // Change this after cdk deployment

export default new CognitoUserPool(userPoolData);