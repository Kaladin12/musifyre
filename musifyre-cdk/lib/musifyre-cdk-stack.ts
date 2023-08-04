import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EC2Construct } from '../constructs/ec2Construct';
import { CognitoCostruct } from '../constructs/CognitoConstruct';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MusifyreCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new EC2Construct(this, 'ec2Construct');
    const cognito = new CognitoCostruct(this, 'cognitoConstruct', {
      userPoolName: 'musifyire-userPool'
    });
  }
}
