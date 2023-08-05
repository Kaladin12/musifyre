import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EC2Construct } from '../constructs/ec2Construct';
import { CognitoCostruct } from '../constructs/CognitoConstruct';
import { S3Construct } from '../constructs/S3BucketsConstruct';
import { DynamoConstruct } from '../constructs/DynamoConstruct';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MusifyreCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new EC2Construct(this, 'ec2Construct');
    const cognito = new CognitoCostruct(this, 'cognitoConstruct', {
      userPoolName: 'musifyire-userPool'
    });

    // s3 buckets
    const s3Buckets = new S3Construct(this, 'musifyreBucketsConstruct', {
      mp3BucketName: 'musifyre-storage',
      hlsBucketName: 'musifyre-transformed'
    });

    // dynamodb table
    const tables = new DynamoConstruct(this, 'musifyreTablesConstruct', {
      tableName: 'musifyre-rooms'
    });

    // now lets create our lambdas

    // then use the lambdas to
  }
}
