import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EC2Construct } from '../constructs/ec2Construct';
import { CognitoCostruct } from '../constructs/CognitoConstruct';
import { S3Construct } from '../constructs/S3BucketsConstruct';
import { DynamoConstruct } from '../constructs/DynamoConstruct';
import { LambdaConstruct } from '../constructs/LambdConstruct';
import {
  MusifyreApiGateway,
  resourceProps
} from '../constructs/ApiGaetwayConstruct';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MusifyreCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // s3 buckets
    const s3Buckets = new S3Construct(this, 'musifyreBucketsConstruct', {
      mp3BucketName: 'musifyre-storage',
      hlsBucketName: 'musifyre-transformed'
    });

    new EC2Construct(this, 'ec2Construct', {
      s3Arn: s3Buckets.mp3Bucket.bucketArn
    });
    const cognito = new CognitoCostruct(this, 'cognitoConstruct', {
      userPoolName: 'musifyire-userPool'
    });

    // dynamodb table
    const tables = new DynamoConstruct(this, 'musifyreTablesConstruct', {
      tableName: 'musifyre-rooms'
    });

    const apis = new MusifyreApiGateway(this, 'musifyreApi', {
      apiName: 'musifyre-api',
      stageName: 'dev'
    });

    // now lets create our lambdas
    const lambdas = new LambdaConstruct(this, 'musifyreLambdasConstruct', {
      tableName: tables.roomsTable.tableName,
      tableArn: tables.roomsTable.tableArn,
      mp3BucketName: s3Buckets.mp3Bucket.bucketArn,
      hlsBucketName: s3Buckets.hlsBucket.bucketArn
    });

    // create the resource for each lambda
    apis.createResourceForLambda(lambdas.lambdasToResourceMap);
  }
}
