import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EC2Construct } from '../constructs/ec2Construct';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MusifyreCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new EC2Construct(this, 'ec2Construct');
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'MusifyreCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
