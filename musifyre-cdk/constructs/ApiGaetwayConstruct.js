"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusifyreApiGateway = void 0;
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
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
        new cdk.CfnOutput(this, 'musifyreApiUrl', {
            value: this.musifyreRestApi.url
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
}
exports.MusifyreApiGateway = MusifyreApiGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpR2FldHdheUNvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFwaUdhZXR3YXlDb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLDZDQUdxQjtBQUNyQiwyQ0FBdUM7QUFnQnZDLE1BQWEsa0JBQW1CLFNBQVEsc0JBQVM7SUFHL0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUF1QjtRQUMvRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSw0QkFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNqRSxhQUFhLEVBQUU7Z0JBQ2IsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2FBQzNCO1lBQ0QsTUFBTSxFQUFFLElBQUk7WUFDWiwyQkFBMkIsRUFBRTtnQkFDM0IsWUFBWSxFQUFFO29CQUNaLGNBQWM7b0JBQ2QsWUFBWTtvQkFDWixlQUFlO29CQUNmLFdBQVc7aUJBQ1o7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7Z0JBQ2xFLGdCQUFnQixFQUFFLElBQUk7Z0JBQ3RCLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQzthQUNwQjtZQUNELFdBQVcsRUFBRSxLQUFLLENBQUMsT0FBTztTQUMzQixDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3hDLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUc7U0FDaEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHVCQUF1QixDQUFDLE9BQW1DO1FBQ2hFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDL0MsSUFBSSxNQUFNLENBQUMsY0FBYyxJQUFJLEdBQUcsRUFBRTtnQkFDaEMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FDeEQsTUFBTSxDQUFDLGNBQWMsQ0FDRSxDQUFDO2FBQzNCO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxNQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRSxZQUFZLENBQUMsU0FBUyxDQUNwQixNQUFNLENBQUMsTUFBTSxFQUNiLElBQUksNEJBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO2dCQUN0RCxLQUFLLEVBQUUsSUFBSTthQUNaLENBQUMsRUFDRjtnQkFDRSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsaUJBQWlCO2dCQUMzQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsaUJBQWlCO29CQUN6QyxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQjtvQkFDMUIsQ0FBQyxDQUFDLFNBQVM7YUFDZCxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXRERCxnREFzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHtcbiAgYXdzX2FwaWdhdGV3YXkgYXMgYXBpZ2F0ZXdheSxcbiAgYXdzX2xhbWJkYSBhcyBsYW1iZGFcbn0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmludGVyZmFjZSBNdXNpZnlyZUFwaVByb3BzIHtcbiAgYXBpTmFtZTogc3RyaW5nO1xuICBzdGFnZU5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSByZXNvdXJjZVByb3BzIHtcbiAgbGFtYmRhRnVuY3Rpb246IGxhbWJkYS5GdW5jdGlvbjtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIHBhcmVudFJlc291cmNlOiBzdHJpbmc7XG4gIHJlc291cmNlOiBzdHJpbmc7XG4gIGF1dGhvcml6YXRpb25UeXBlOiBhcGlnYXRld2F5LkF1dGhvcml6YXRpb25UeXBlO1xuICByZXF1ZXN0UGFyYW1ldGVycz86IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9O1xufVxuXG5leHBvcnQgY2xhc3MgTXVzaWZ5cmVBcGlHYXRld2F5IGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIG11c2lmeXJlUmVzdEFwaTogYXBpZ2F0ZXdheS5SZXN0QXBpO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBNdXNpZnlyZUFwaVByb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIHRoaXMubXVzaWZ5cmVSZXN0QXBpID0gbmV3IGFwaWdhdGV3YXkuUmVzdEFwaSh0aGlzLCBwcm9wcy5hcGlOYW1lLCB7XG4gICAgICBkZXBsb3lPcHRpb25zOiB7XG4gICAgICAgIHN0YWdlTmFtZTogcHJvcHMuc3RhZ2VOYW1lXG4gICAgICB9LFxuICAgICAgZGVwbG95OiB0cnVlLFxuICAgICAgZGVmYXVsdENvcnNQcmVmbGlnaHRPcHRpb25zOiB7XG4gICAgICAgIGFsbG93SGVhZGVyczogW1xuICAgICAgICAgICdDb250ZW50LVR5cGUnLFxuICAgICAgICAgICdYLUFtei1EYXRlJyxcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbicsXG4gICAgICAgICAgJ1gtQXBpLUtleSdcbiAgICAgICAgXSxcbiAgICAgICAgYWxsb3dNZXRob2RzOiBbJ09QVElPTlMnLCAnR0VUJywgJ1BPU1QnLCAnUFVUJywgJ1BBVENIJywgJ0RFTEVURSddLFxuICAgICAgICBhbGxvd0NyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICBhbGxvd09yaWdpbnM6IFsnKiddXG4gICAgICB9LFxuICAgICAgcmVzdEFwaU5hbWU6IHByb3BzLmFwaU5hbWVcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdtdXNpZnlyZUFwaVVybCcsIHtcbiAgICAgIHZhbHVlOiB0aGlzLm11c2lmeXJlUmVzdEFwaS51cmxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVSZXNvdXJjZUZvckxhbWJkYShsYW1iZGFzOiBNYXA8c3RyaW5nLCByZXNvdXJjZVByb3BzPikge1xuICAgIGxhbWJkYXMuZm9yRWFjaCgoX3ZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGxldCBwYXJlbnRSZXNvdXJjZSA9IHRoaXMubXVzaWZ5cmVSZXN0QXBpLnJvb3Q7XG4gICAgICBpZiAoX3ZhbHVlLnBhcmVudFJlc291cmNlICE9ICcvJykge1xuICAgICAgICBwYXJlbnRSZXNvdXJjZSA9IHRoaXMubXVzaWZ5cmVSZXN0QXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKFxuICAgICAgICAgIF92YWx1ZS5wYXJlbnRSZXNvdXJjZVxuICAgICAgICApIGFzIGFwaWdhdGV3YXkuSVJlc291cmNlO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2cocGFyZW50UmVzb3VyY2UucGF0aCwgX3ZhbHVlLnJlc291cmNlKTtcbiAgICAgIGNvbnN0IHJlc291cmNlUGF0aCA9IHBhcmVudFJlc291cmNlLmFkZFJlc291cmNlKF92YWx1ZS5yZXNvdXJjZSk7XG4gICAgICByZXNvdXJjZVBhdGguYWRkTWV0aG9kKFxuICAgICAgICBfdmFsdWUubWV0aG9kLFxuICAgICAgICBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihfdmFsdWUubGFtYmRhRnVuY3Rpb24sIHtcbiAgICAgICAgICBwcm94eTogdHJ1ZVxuICAgICAgICB9KSxcbiAgICAgICAge1xuICAgICAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBfdmFsdWUuYXV0aG9yaXphdGlvblR5cGUsXG4gICAgICAgICAgcmVxdWVzdFBhcmFtZXRlcnM6IF92YWx1ZS5yZXF1ZXN0UGFyYW1ldGVyc1xuICAgICAgICAgICAgPyBfdmFsdWUucmVxdWVzdFBhcmFtZXRlcnNcbiAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==