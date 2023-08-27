import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface bucketsProps {
  mp3BucketName: string;
  hlsBucketName: string;
}

export class S3Construct extends Construct {
  public mp3Bucket: s3.Bucket;
  public hlsBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: bucketsProps) {
    super(scope, id);

    const corsRule: s3.CorsRule = {
      allowedMethods: [
        s3.HttpMethods.GET,
        s3.HttpMethods.PUT,
        s3.HttpMethods.POST,
        s3.HttpMethods.HEAD
      ],
      allowedOrigins: ['*'],
      allowedHeaders: ['*']
    };

    this.mp3Bucket = new s3.Bucket(this, props.mp3BucketName, {
      publicReadAccess: true,

      bucketName: props.mp3BucketName,
      cors: [corsRule],
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL
    });

    this.hlsBucket = new s3.Bucket(this, props.hlsBucketName, {
      publicReadAccess: true,
      bucketName: props.hlsBucketName,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL
    });
  }
}
