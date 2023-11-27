import * as cdk from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path = require('path');

export class MyusifyreLambdaTestStack extends cdk.Stack {
  public lambdaFn: NodejsFunction;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.lambdaFn = new NodejsFunction(this, 'testLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      entry: path.join(
        __dirname,
        `../lambdaHandlers/runPostDeploymentChecks/index.js`
      ),
      memorySize: 256,
      timeout: cdk.Duration.minutes(1),
      functionName: 'testLambda'
    });

    this.lambdaFn.addToRolePolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ['CodePipeline:*'],
        resources: ['*']
      })
    );
  }
}
