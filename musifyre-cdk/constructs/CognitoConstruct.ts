import * as cdk from 'aws-cdk-lib';
import { aws_cognito as cognito } from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface cognitoProps {
  userPoolName: string;
}

export class CognitoCostruct extends Construct {
  public userPool: cognito.UserPool;

  constructor(scope: Construct, id: string, props: cognitoProps) {
    super(scope, id);
    this.createUserPool(props.userPoolName);
    this.addPoolClient();
  }

  private createUserPool(poolName: string) {
    this.userPool = new cognito.UserPool(this, `${poolName}`, {
      standardAttributes: {
        email: {
          required: true,
          mutable: false
        },
        fullname: {
          required: true,
          mutable: false
        }
      },
      selfSignUpEnabled: true,
      passwordPolicy: {
        minLength: 12,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true
      },
      autoVerify: { email: true },
      email: cognito.UserPoolEmail.withCognito(),
      userPoolName: poolName
    });
  }

  private addPoolClient() {
    this.userPool.addClient('musifyre-client', {
      userPoolClientName: 'musifyre-client',
      generateSecret: false,
      authFlows: {
        userPassword: true,
        userSrp: true
      },
      preventUserExistenceErrors: true
    });
  }
}
