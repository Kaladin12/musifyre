import * as cdk from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface lambdaConstructProps {
  tableName: string;
  mp3BucketName: string; // Will pass these as env variables for the lambdas
  hlsBucketName: string;
}

export class LambdaConstruct extends Construct {
  constructor(scope: Construct, id: string, props: lambdaConstructProps) {
    super(scope, id);

    const getRoomLambda = new lambda.Function(this, 'getRoomsPaginatedLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambdaHandlers/getRoomsLambda')
    });
  }
}
