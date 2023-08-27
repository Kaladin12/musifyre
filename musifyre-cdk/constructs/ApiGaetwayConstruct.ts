import * as cdk from 'aws-cdk-lib';
import {
  aws_apigateway as apigateway,
  aws_lambda as lambda
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface MusifyreApiProps {
  apiName: string;
  stageName: string;
}

export interface resourceProps {
  lambdaFunction: lambda.Function;
  method: string;
  parentResource: string;
  resource: string;
  authorizationType: apigateway.AuthorizationType;
  requestParameters?: { [key: string]: boolean };
}

export class MusifyreApiGateway extends Construct {
  public musifyreRestApi: apigateway.RestApi;

  constructor(scope: Construct, id: string, props: MusifyreApiProps) {
    super(scope, id);

    this.musifyreRestApi = new apigateway.RestApi(this, props.apiName, {
      deployOptions: {
        stageName: props.stageName
      },
      deploy: true,
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key'
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['*']
      },
      restApiName: props.apiName
    });

    new cdk.CfnOutput(this, 'musifyreApiUrl', {
      value: this.musifyreRestApi.url
    });
  }

  public createResourceForLambda(lambdas: Map<string, resourceProps>) {
    lambdas.forEach((_value, key) => {
      let parentResource = this.musifyreRestApi.root;
      if (_value.parentResource != '/') {
        parentResource = this.musifyreRestApi.root.resourceForPath(
          _value.parentResource
        ) as apigateway.IResource;
      }
      console.log(parentResource.path, _value.resource);
      const resourcePath = parentResource.addResource(_value.resource);
      resourcePath.addMethod(
        _value.method,
        new apigateway.LambdaIntegration(_value.lambdaFunction, {
          proxy: true
        }),
        {
          authorizationType: _value.authorizationType,
          requestParameters: _value.requestParameters
            ? _value.requestParameters
            : undefined
        }
      );
    });
  }
}
