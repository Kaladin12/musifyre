"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusifyreApiGateway = void 0;
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
const aws_apigatewayv2_integrations_alpha_1 = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
const aws_apigatewayv2_alpha_1 = require("@aws-cdk/aws-apigatewayv2-alpha");
class MusifyreApiGateway extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.musifyreRestApi = new aws_cdk_lib_1.aws_apigateway.RestApi(this, props.apiName, {
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
        this.musifyreWebsocketApi = new aws_apigatewayv2_alpha_1.WebSocketApi(this, 'musifyreWSApi', {
            apiName: 'musifyre-rt'
        });
        this.musifyreWebsocketStage = new aws_apigatewayv2_alpha_1.WebSocketStage(this, 'musifyreWSStage', {
            webSocketApi: this.musifyreWebsocketApi,
            stageName: 'dev',
            autoDeploy: true
        });
        new cdk.CfnOutput(this, 'musifyreApiUrl', {
            value: this.musifyreRestApi.url
        });
        new cdk.CfnOutput(this, 'musifyreRtApiUrl', {
            value: this.musifyreWebsocketApi.apiEndpoint
        });
    }
    createResourceForLambda(lambdas) {
        lambdas.forEach((_value, key) => {
            let parentResource = this.musifyreRestApi.root;
            if (_value.parentResource != '/') {
                parentResource = this.musifyreRestApi.root.resourceForPath(_value.parentResource);
            }
            console.log(parentResource.path, _value.resource);
            const resourcePath = parentResource.addResource(_value.resource);
            resourcePath.addMethod(_value.method, new aws_cdk_lib_1.aws_apigateway.LambdaIntegration(_value.lambdaFunction, {
                proxy: true
            }), {
                authorizationType: _value.authorizationType,
                requestParameters: _value.requestParameters
                    ? _value.requestParameters
                    : undefined
            });
        });
    }
    createWebsocketRouteForLambda(lambdas) {
        lambdas.forEach((value, key) => {
            this.musifyreWebsocketApi.addRoute('joinroom', {
                integration: new aws_apigatewayv2_integrations_alpha_1.WebSocketLambdaIntegration('testInt', value)
            });
        });
    }
}
exports.MusifyreApiGateway = MusifyreApiGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpR2FldHdheUNvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFwaUdhZXR3YXlDb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLDZDQUdxQjtBQUNyQiwyQ0FBdUM7QUFDdkMsc0dBQTBGO0FBQzFGLDRFQUErRTtBQWlCL0UsTUFBYSxrQkFBbUIsU0FBUSxzQkFBUztJQUsvQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXVCO1FBQy9ELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLDRCQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2pFLGFBQWEsRUFBRTtnQkFDYixTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7YUFDM0I7WUFDRCxNQUFNLEVBQUUsSUFBSTtZQUNaLDJCQUEyQixFQUFFO2dCQUMzQixZQUFZLEVBQUU7b0JBQ1osY0FBYztvQkFDZCxZQUFZO29CQUNaLGVBQWU7b0JBQ2YsV0FBVztpQkFDWjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztnQkFDbEUsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDO2FBQ3BCO1lBQ0QsV0FBVyxFQUFFLEtBQUssQ0FBQyxPQUFPO1NBQzNCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLHFDQUFZLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUNsRSxPQUFPLEVBQUUsYUFBYTtTQUN2QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSx1Q0FBYyxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUN4RSxZQUFZLEVBQUUsSUFBSSxDQUFDLG9CQUFvQjtZQUN2QyxTQUFTLEVBQUUsS0FBSztZQUNoQixVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3hDLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUc7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUMxQyxLQUFLLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVc7U0FDN0MsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHVCQUF1QixDQUFDLE9BQW1DO1FBQ2hFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDL0MsSUFBSSxNQUFNLENBQUMsY0FBYyxJQUFJLEdBQUcsRUFBRTtnQkFDaEMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FDeEQsTUFBTSxDQUFDLGNBQWMsQ0FDRSxDQUFDO2FBQzNCO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxNQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRSxZQUFZLENBQUMsU0FBUyxDQUNwQixNQUFNLENBQUMsTUFBTSxFQUNiLElBQUksNEJBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO2dCQUN0RCxLQUFLLEVBQUUsSUFBSTthQUNaLENBQUMsRUFDRjtnQkFDRSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsaUJBQWlCO2dCQUMzQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsaUJBQWlCO29CQUN6QyxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQjtvQkFDMUIsQ0FBQyxDQUFDLFNBQVM7YUFDZCxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSw2QkFBNkIsQ0FBQyxPQUFvQztRQUN2RSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBcUIsRUFBRSxHQUFXLEVBQUUsRUFBRTtZQUNyRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTtnQkFDN0MsV0FBVyxFQUFFLElBQUksZ0VBQTBCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQzthQUM5RCxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTlFRCxnREE4RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHtcbiAgYXdzX2FwaWdhdGV3YXkgYXMgYXBpZ2F0ZXdheSxcbiAgYXdzX2xhbWJkYSBhcyBsYW1iZGFcbn0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBXZWJTb2NrZXRMYW1iZGFJbnRlZ3JhdGlvbiB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5djItaW50ZWdyYXRpb25zLWFscGhhJztcbmltcG9ydCB7IFdlYlNvY2tldEFwaSwgV2ViU29ja2V0U3RhZ2UgfSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheXYyLWFscGhhJztcbmltcG9ydCB7IE5vZGVqc0Z1bmN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYS1ub2RlanMnO1xuXG5pbnRlcmZhY2UgTXVzaWZ5cmVBcGlQcm9wcyB7XG4gIGFwaU5hbWU6IHN0cmluZztcbiAgc3RhZ2VOYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgcmVzb3VyY2VQcm9wcyB7XG4gIGxhbWJkYUZ1bmN0aW9uOiBsYW1iZGEuRnVuY3Rpb247XG4gIG1ldGhvZDogc3RyaW5nO1xuICBwYXJlbnRSZXNvdXJjZTogc3RyaW5nO1xuICByZXNvdXJjZTogc3RyaW5nO1xuICBhdXRob3JpemF0aW9uVHlwZTogYXBpZ2F0ZXdheS5BdXRob3JpemF0aW9uVHlwZTtcbiAgcmVxdWVzdFBhcmFtZXRlcnM/OiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfTtcbn1cblxuZXhwb3J0IGNsYXNzIE11c2lmeXJlQXBpR2F0ZXdheSBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyBtdXNpZnlyZVJlc3RBcGk6IGFwaWdhdGV3YXkuUmVzdEFwaTtcbiAgcHVibGljIG11c2lmeXJlV2Vic29ja2V0QXBpOiBXZWJTb2NrZXRBcGk7XG4gIHB1YmxpYyBtdXNpZnlyZVdlYnNvY2tldFN0YWdlOiBXZWJTb2NrZXRTdGFnZTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogTXVzaWZ5cmVBcGlQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICB0aGlzLm11c2lmeXJlUmVzdEFwaSA9IG5ldyBhcGlnYXRld2F5LlJlc3RBcGkodGhpcywgcHJvcHMuYXBpTmFtZSwge1xuICAgICAgZGVwbG95T3B0aW9uczoge1xuICAgICAgICBzdGFnZU5hbWU6IHByb3BzLnN0YWdlTmFtZVxuICAgICAgfSxcbiAgICAgIGRlcGxveTogdHJ1ZSxcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICBhbGxvd0hlYWRlcnM6IFtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJyxcbiAgICAgICAgICAnWC1BbXotRGF0ZScsXG4gICAgICAgICAgJ0F1dGhvcml6YXRpb24nLFxuICAgICAgICAgICdYLUFwaS1LZXknXG4gICAgICAgIF0sXG4gICAgICAgIGFsbG93TWV0aG9kczogWydPUFRJT05TJywgJ0dFVCcsICdQT1NUJywgJ1BVVCcsICdQQVRDSCcsICdERUxFVEUnXSxcbiAgICAgICAgYWxsb3dDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgICAgYWxsb3dPcmlnaW5zOiBbJyonXVxuICAgICAgfSxcbiAgICAgIHJlc3RBcGlOYW1lOiBwcm9wcy5hcGlOYW1lXG4gICAgfSk7XG5cbiAgICB0aGlzLm11c2lmeXJlV2Vic29ja2V0QXBpID0gbmV3IFdlYlNvY2tldEFwaSh0aGlzLCAnbXVzaWZ5cmVXU0FwaScsIHtcbiAgICAgIGFwaU5hbWU6ICdtdXNpZnlyZS1ydCdcbiAgICB9KTtcblxuICAgIHRoaXMubXVzaWZ5cmVXZWJzb2NrZXRTdGFnZSA9IG5ldyBXZWJTb2NrZXRTdGFnZSh0aGlzLCAnbXVzaWZ5cmVXU1N0YWdlJywge1xuICAgICAgd2ViU29ja2V0QXBpOiB0aGlzLm11c2lmeXJlV2Vic29ja2V0QXBpLFxuICAgICAgc3RhZ2VOYW1lOiAnZGV2JyxcbiAgICAgIGF1dG9EZXBsb3k6IHRydWVcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdtdXNpZnlyZUFwaVVybCcsIHtcbiAgICAgIHZhbHVlOiB0aGlzLm11c2lmeXJlUmVzdEFwaS51cmxcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdtdXNpZnlyZVJ0QXBpVXJsJywge1xuICAgICAgdmFsdWU6IHRoaXMubXVzaWZ5cmVXZWJzb2NrZXRBcGkuYXBpRW5kcG9pbnRcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVSZXNvdXJjZUZvckxhbWJkYShsYW1iZGFzOiBNYXA8c3RyaW5nLCByZXNvdXJjZVByb3BzPikge1xuICAgIGxhbWJkYXMuZm9yRWFjaCgoX3ZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGxldCBwYXJlbnRSZXNvdXJjZSA9IHRoaXMubXVzaWZ5cmVSZXN0QXBpLnJvb3Q7XG4gICAgICBpZiAoX3ZhbHVlLnBhcmVudFJlc291cmNlICE9ICcvJykge1xuICAgICAgICBwYXJlbnRSZXNvdXJjZSA9IHRoaXMubXVzaWZ5cmVSZXN0QXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKFxuICAgICAgICAgIF92YWx1ZS5wYXJlbnRSZXNvdXJjZVxuICAgICAgICApIGFzIGFwaWdhdGV3YXkuSVJlc291cmNlO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2cocGFyZW50UmVzb3VyY2UucGF0aCwgX3ZhbHVlLnJlc291cmNlKTtcbiAgICAgIGNvbnN0IHJlc291cmNlUGF0aCA9IHBhcmVudFJlc291cmNlLmFkZFJlc291cmNlKF92YWx1ZS5yZXNvdXJjZSk7XG4gICAgICByZXNvdXJjZVBhdGguYWRkTWV0aG9kKFxuICAgICAgICBfdmFsdWUubWV0aG9kLFxuICAgICAgICBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihfdmFsdWUubGFtYmRhRnVuY3Rpb24sIHtcbiAgICAgICAgICBwcm94eTogdHJ1ZVxuICAgICAgICB9KSxcbiAgICAgICAge1xuICAgICAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBfdmFsdWUuYXV0aG9yaXphdGlvblR5cGUsXG4gICAgICAgICAgcmVxdWVzdFBhcmFtZXRlcnM6IF92YWx1ZS5yZXF1ZXN0UGFyYW1ldGVyc1xuICAgICAgICAgICAgPyBfdmFsdWUucmVxdWVzdFBhcmFtZXRlcnNcbiAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlV2Vic29ja2V0Um91dGVGb3JMYW1iZGEobGFtYmRhczogTWFwPHN0cmluZywgTm9kZWpzRnVuY3Rpb24+KSB7XG4gICAgbGFtYmRhcy5mb3JFYWNoKCh2YWx1ZTogTm9kZWpzRnVuY3Rpb24sIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLm11c2lmeXJlV2Vic29ja2V0QXBpLmFkZFJvdXRlKCdqb2lucm9vbScsIHtcbiAgICAgICAgaW50ZWdyYXRpb246IG5ldyBXZWJTb2NrZXRMYW1iZGFJbnRlZ3JhdGlvbigndGVzdEludCcsIHZhbHVlKVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==