import * as cdk from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { resourceProps } from './ApiGaetwayConstruct';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path = require('path');
import { WebSocketApi, WebSocketStage } from '@aws-cdk/aws-apigatewayv2-alpha';

interface lambdaConstructProps {
  tableName: string;
  tableArn: string;
  mp3BucketName: string; // Will pass these as env variables for the lambda
  hlsBucketName: string;
}

type policiesType = {
  actions: Array<string>;
  resources: Array<string>;
};

type lambdaFunctionType = {
  id: string;
  dirPath: string;
  memSize?: number;
  timeout?: cdk.Duration;
  policies?: policiesType;
};

export class LambdaConstruct extends Construct {
  public functionsMap = new Map<string, NodejsFunction>();
  public lambdasToResourceMap = new Map<string, resourceProps>();
  public rtLambdasToResourceMap = new Map<string, NodejsFunction>();

  constructor(scope: Construct, id: string, props: lambdaConstructProps) {
    super(scope, id);

    const functionsDataMap = new Map<string, lambdaFunctionType>();

    functionsDataMap.set('getRoomsLambda', {
      id: 'getRoomsPaginatedLambda',
      dirPath: 'getRoomsLambda',
      policies: {
        actions: ['dynamodb:Scan'],
        resources: [props.tableArn]
      }
    });
    functionsDataMap.set('createRoomLambda', {
      id: 'createRoomLambda',
      dirPath: 'createRoomLambda',
      policies: {
        actions: ['dynamodb:PutItem'],
        resources: [props.tableArn]
      }
    });
    functionsDataMap.set('getS3PresignedUrl', {
      id: 'getS3PresignedUrl',
      dirPath: 'getPresignedUrlLambda',
      policies: {
        actions: ['s3:GetObject', 's3:PutObject', 's3:PutObjectAcl'],
        resources: [props.mp3BucketName + '/*'] // Duhhh, the wildcard
      }
    });
    functionsDataMap.set('getRoomLambda', {
      id: 'getRoomLambda',
      dirPath: 'getRoomLambda',
      policies: {
        actions: ['dynamodb:Query'],
        resources: [props.tableArn]
      }
    });
    functionsDataMap.set('joinRoomRtLambda', {
      id: 'joinRoomRtLambda',
      dirPath: 'joinRtLambda',
      policies: {
        actions: ['dynamodb:UpdateItem'],
        resources: [props.tableArn]
      }
    });

    functionsDataMap.forEach((value: lambdaFunctionType, key: string) => {
      const temp = this.createLambdaFunction(key, value);
      if (value.policies) {
        this.attachPolicies(temp, value.policies);
      }
      if (key.includes('RtLambda')) {
        this.rtLambdasToResourceMap.set(key, temp);
      }

      this.functionsMap.set(key, temp);
    });

    this.createResourceMap();
  }

  private createLambdaFunction(name: string, data: lambdaFunctionType) {
    return new NodejsFunction(this, data.id, {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      entry: path.join(__dirname, `../lambdaHandlers/${data.dirPath}/index.js`),
      memorySize: data.memSize ? data.memSize : 256,
      timeout: data.timeout ? data.timeout : cdk.Duration.minutes(5),
      functionName: name
    });
  }

  private attachPolicies(func: NodejsFunction, policies: policiesType) {
    func.addToRolePolicy(new cdk.aws_iam.PolicyStatement(policies));
  }

  private createResourceMap() {
    const getRoomsLambda = this.getMapObjectAsNodeFunction('getRoomsLambda');
    this.lambdasToResourceMap.set(getRoomsLambda.functionName, {
      lambdaFunction: getRoomsLambda,
      method: 'GET',
      parentResource: '/',
      resource: 'rooms',
      authorizationType: cdk.aws_apigateway.AuthorizationType.NONE,
      requestParameters: {
        'method.request.querystring.size': true,
        'method.request.querystring.last': false
      }
    });
    const createRoomLambda =
      this.getMapObjectAsNodeFunction('createRoomLambda');
    this.lambdasToResourceMap.set(createRoomLambda.functionName, {
      lambdaFunction: createRoomLambda,
      method: 'POST',
      parentResource: '/rooms',
      resource: 'create-rooms',
      authorizationType: cdk.aws_apigateway.AuthorizationType.NONE
    });
    const getPresignedUrl =
      this.getMapObjectAsNodeFunction('getS3PresignedUrl');
    this.lambdasToResourceMap.set(getPresignedUrl.functionName, {
      lambdaFunction: getPresignedUrl,
      method: 'GET',
      parentResource: '/',
      resource: 'sign_upload',
      authorizationType: cdk.aws_apigateway.AuthorizationType.NONE,
      requestParameters: {
        'method.request.querystring.file': true,
        'method.request.querystring.type': true,
        'method.request.querystring.id': true
      }
    });
    const getRoomLambda = this.getMapObjectAsNodeFunction('getRoomLambda');
    this.lambdasToResourceMap.set(getRoomLambda.functionName, {
      lambdaFunction: getRoomLambda,
      method: 'GET',
      parentResource: '/rooms',
      resource: '{id}',
      authorizationType: cdk.aws_apigateway.AuthorizationType.NONE
    });
  }

  private getMapObjectAsNodeFunction(name: string) {
    return this.functionsMap.get(name) as NodejsFunction;
  }
}
