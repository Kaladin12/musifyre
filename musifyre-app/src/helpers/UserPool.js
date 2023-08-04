import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPoolData = {
    UserPoolId  : 'us-east-1_yMEo5vAF6',
    ClientId  : '752c0661cvt4eft371ugkoekob'
} // Change this after cdk deployment

export default new CognitoUserPool(userPoolData);