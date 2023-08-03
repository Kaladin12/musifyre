import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPoolData = {
    UserPoolId  : 'us-east-1_VGMbXIQMZ',
    ClientId  : '502ffrh2alet3d98r5eggfptvd'
}

export default new CognitoUserPool(userPoolData);