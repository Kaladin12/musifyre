"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaConstruct = void 0;
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const path = require("path");
class LambdaConstruct extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.functionsMap = new Map();
        this.lambdasToResourceMap = new Map();
        const functionsDataMap = new Map();
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
                actions: ['s3:GetObject'],
                resources: [props.mp3BucketName]
            }
        });
        functionsDataMap.forEach((value, key) => {
            const temp = this.createLambdaFunction(key, value);
            if (value.policies) {
                this.attachPolicies(temp, value.policies);
            }
            this.functionsMap.set(key, temp);
        });
        this.createResourceMap();
    }
    createLambdaFunction(name, data) {
        return new aws_lambda_nodejs_1.NodejsFunction(this, data.id, {
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_16_X,
            handler: 'handler',
            entry: path.join(__dirname, `../lambdaHandlers/${data.dirPath}/index.js`),
            memorySize: data.memSize ? data.memSize : 256,
            timeout: data.timeout ? data.timeout : cdk.Duration.minutes(5),
            functionName: name
        });
    }
    attachPolicies(func, policies) {
        func.addToRolePolicy(new cdk.aws_iam.PolicyStatement(policies));
    }
    createResourceMap() {
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
        const createRoomLambda = this.getMapObjectAsNodeFunction('createRoomLambda');
        this.lambdasToResourceMap.set(createRoomLambda.functionName, {
            lambdaFunction: createRoomLambda,
            method: 'POST',
            parentResource: '/rooms',
            resource: 'create-rooms',
            authorizationType: cdk.aws_apigateway.AuthorizationType.NONE
        });
        const getPresignedUrl = this.getMapObjectAsNodeFunction('getS3PresignedUrl');
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
    }
    getMapObjectAsNodeFunction(name) {
        return this.functionsMap.get(name);
    }
}
exports.LambdaConstruct = LambdaConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFtYmRDb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJMYW1iZENvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsNkNBQW1EO0FBQ25ELDJDQUF1QztBQUV2QyxxRUFBK0Q7QUFDL0QsNkJBQThCO0FBc0I5QixNQUFhLGVBQWdCLFNBQVEsc0JBQVM7SUFJNUMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUEyQjtRQUNuRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBSlosaUJBQVksR0FBRyxJQUFJLEdBQUcsRUFBMEIsQ0FBQztRQUNqRCx5QkFBb0IsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUs3RCxNQUFNLGdCQUFnQixHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDO1FBRS9ELGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNyQyxFQUFFLEVBQUUseUJBQXlCO1lBQzdCLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsUUFBUSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDMUIsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUM1QjtTQUNGLENBQUMsQ0FBQztRQUNILGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRTtZQUN2QyxFQUFFLEVBQUUsa0JBQWtCO1lBQ3RCLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsUUFBUSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUM3QixTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQzVCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFO1lBQ3hDLEVBQUUsRUFBRSxtQkFBbUI7WUFDdkIsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxRQUFRLEVBQUU7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QUFjLEVBQUUsZUFBZTtZQUMvQixNQUFNLEVBQUUsS0FBSztZQUNiLGNBQWMsRUFBRSxHQUFHO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSTtZQUM1RCxpQkFBaUIsRUFBRTtnQkFDakIsaUNBQWlDLEVBQUUsSUFBSTtnQkFDdkMsaUNBQWlDLEVBQUUsSUFBSTtnQkFDdkMsK0JBQStCLEVBQUUsSUFBSTthQUN0QztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTywwQkFBMEIsQ0FBQyxJQUFZO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFtQixDQUFDO0lBQ3ZELENBQUM7Q0FDRjtBQXJHRCwwQ0FxR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX2xhbWJkYSBhcyBsYW1iZGEgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IHJlc291cmNlUHJvcHMgfSBmcm9tICcuL0FwaUdhZXR3YXlDb25zdHJ1Y3QnO1xuaW1wb3J0IHsgTm9kZWpzRnVuY3Rpb24gfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhLW5vZGVqcyc7XG5pbXBvcnQgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuaW50ZXJmYWNlIGxhbWJkYUNvbnN0cnVjdFByb3BzIHtcbiAgdGFibGVOYW1lOiBzdHJpbmc7XG4gIHRhYmxlQXJuOiBzdHJpbmc7XG4gIG1wM0J1Y2tldE5hbWU6IHN0cmluZzsgLy8gV2lsbCBwYXNzIHRoZXNlIGFzIGVudiB2YXJpYWJsZXMgZm9yIHRoZSBsYW1iZGFzXG4gIGhsc0J1Y2tldE5hbWU6IHN0cmluZztcbn1cblxudHlwZSBwb2xpY2llc1R5cGUgPSB7XG4gIGFjdGlvbnM6IEFycmF5PHN0cmluZz47XG4gIHJlc291cmNlczogQXJyYXk8c3RyaW5nPjtcbn07XG5cbnR5cGUgbGFtYmRhRnVuY3Rpb25UeXBlID0ge1xuICBpZDogc3RyaW5nO1xuICBkaXJQYXRoOiBzdHJpbmc7XG4gIG1lbVNpemU/OiBudW1iZXI7XG4gIHRpbWVvdXQ/OiBjZGsuRHVyYXRpb247XG4gIHBvbGljaWVzPzogcG9saWNpZXNUeXBlO1xufTtcblxuZXhwb3J0IGNsYXNzIExhbWJkYUNvbnN0cnVjdCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyBmdW5jdGlvbnNNYXAgPSBuZXcgTWFwPHN0cmluZywgTm9kZWpzRnVuY3Rpb24+KCk7XG4gIHB1YmxpYyBsYW1iZGFzVG9SZXNvdXJjZU1hcCA9IG5ldyBNYXA8c3RyaW5nLCByZXNvdXJjZVByb3BzPigpO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBsYW1iZGFDb25zdHJ1Y3RQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICBjb25zdCBmdW5jdGlvbnNEYXRhTWFwID0gbmV3IE1hcDxzdHJpbmcsIGxhbWJkYUZ1bmN0aW9uVHlwZT4oKTtcblxuICAgIGZ1bmN0aW9uc0RhdGFNYXAuc2V0KCdnZXRSb29tc0xhbWJkYScsIHtcbiAgICAgIGlkOiAnZ2V0Um9vbXNQYWdpbmF0ZWRMYW1iZGEnLFxuICAgICAgZGlyUGF0aDogJ2dldFJvb21zTGFtYmRhJyxcbiAgICAgIHBvbGljaWVzOiB7XG4gICAgICAgIGFjdGlvbnM6IFsnZHluYW1vZGI6U2NhbiddLFxuICAgICAgICByZXNvdXJjZXM6IFtwcm9wcy50YWJsZUFybl1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBmdW5jdGlvbnNEYXRhTWFwLnNldCgnY3JlYXRlUm9vbUxhbWJkYScsIHtcbiAgICAgIGlkOiAnY3JlYXRlUm9vbUxhbWJkYScsXG4gICAgICBkaXJQYXRoOiAnY3JlYXRlUm9vbUxhbWJkYScsXG4gICAgICBwb2xpY2llczoge1xuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOlB1dEl0ZW0nXSxcbiAgICAgICAgcmVzb3VyY2VzOiBbcHJvcHMudGFibGVBcm5dXG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVuY3Rpb25zRGF0YU1hcC5zZXQoJ2dldFMzUHJlc2lnbmVkVXJsJywge1xuICAgICAgaWQ6ICdnZXRTM1ByZXNpZ25lZFVybCcsXG4gICAgICBkaXJQYXRoOiAnZ2V0UHJlc2lnbmVkVXJsTGFtYmRhJyxcbiAgICAgIHBvbGljaWVzOiB7XG4gICAgICAgIGFjdGlvbnM6IFsnczM6R2V0T2JqZWN0J10sXG4gICAgICAgIHJlc291cmNlczogW3Byb3BzLm1wM0J1Y2tldE5hbWVdXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbnNEYXRhTWFwLmZvckVhY2goKHZhbHVlOiBsYW1iZGFGdW5jdGlvblR5cGUsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCB0ZW1wID0gdGhpcy5jcmVhdGVMYW1iZGFGdW5jdGlvbihrZXksIHZhbHVlKTtcbiAgICAgIGlmICh2YWx1ZS5wb2xpY2llcykge1xuICAgICAgICB0aGlzLmF0dGFjaFBvbGljaWVzKHRlbXAsIHZhbHVlLnBvbGljaWVzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZnVuY3Rpb25zTWFwLnNldChrZXksIHRlbXApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jcmVhdGVSZXNvdXJjZU1hcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVMYW1iZGFGdW5jdGlvbihuYW1lOiBzdHJpbmcsIGRhdGE6IGxhbWJkYUZ1bmN0aW9uVHlwZSkge1xuICAgIHJldHVybiBuZXcgTm9kZWpzRnVuY3Rpb24odGhpcywgZGF0YS5pZCwge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlcicsXG4gICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgYC4uL2xhbWJkYUhhbmRsZXJzLyR7ZGF0YS5kaXJQYXRofS9pbmRleC5qc2ApLFxuICAgICAgbWVtb3J5U2l6ZTogZGF0YS5tZW1TaXplID8gZGF0YS5tZW1TaXplIDogMjU2LFxuICAgICAgdGltZW91dDogZGF0YS50aW1lb3V0ID8gZGF0YS50aW1lb3V0IDogY2RrLkR1cmF0aW9uLm1pbnV0ZXMoNSksXG4gICAgICBmdW5jdGlvbk5hbWU6IG5hbWVcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoUG9saWNpZXMoZnVuYzogTm9kZWpzRnVuY3Rpb24sIHBvbGljaWVzOiBwb2xpY2llc1R5cGUpIHtcbiAgICBmdW5jLmFkZFRvUm9sZVBvbGljeShuZXcgY2RrLmF3c19pYW0uUG9saWN5U3RhdGVtZW50KHBvbGljaWVzKSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVJlc291cmNlTWFwKCkge1xuICAgIGNvbnN0IGdldFJvb21zTGFtYmRhID0gdGhpcy5nZXRNYXBPYmplY3RBc05vZGVGdW5jdGlvbignZ2V0Um9vbXNMYW1iZGEnKTtcbiAgICB0aGlzLmxhbWJkYXNUb1Jlc291cmNlTWFwLnNldChnZXRSb29tc0xhbWJkYS5mdW5jdGlvbk5hbWUsIHtcbiAgICAgIGxhbWJkYUZ1bmN0aW9uOiBnZXRSb29tc0xhbWJkYSxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBwYXJlbnRSZXNvdXJjZTogJy8nLFxuICAgICAgcmVzb3VyY2U6ICdyb29tcycsXG4gICAgICBhdXRob3JpemF0aW9uVHlwZTogY2RrLmF3c19hcGlnYXRld2F5LkF1dGhvcml6YXRpb25UeXBlLk5PTkUsXG4gICAgICByZXF1ZXN0UGFyYW1ldGVyczoge1xuICAgICAgICAnbWV0aG9kLnJlcXVlc3QucXVlcnlzdHJpbmcuc2l6ZSc6IHRydWUsXG4gICAgICAgICdtZXRob2QucmVxdWVzdC5xdWVyeXN0cmluZy5sYXN0JzogZmFsc2VcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBjcmVhdGVSb29tTGFtYmRhID1cbiAgICAgIHRoaXMuZ2V0TWFwT2JqZWN0QXNOb2RlRnVuY3Rpb24oJ2NyZWF0ZVJvb21MYW1iZGEnKTtcbiAgICB0aGlzLmxhbWJkYXNUb1Jlc291cmNlTWFwLnNldChjcmVhdGVSb29tTGFtYmRhLmZ1bmN0aW9uTmFtZSwge1xuICAgICAgbGFtYmRhRnVuY3Rpb246IGNyZWF0ZVJvb21MYW1iZGEsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHBhcmVudFJlc291cmNlOiAnL3Jvb21zJyxcbiAgICAgIHJlc291cmNlOiAnY3JlYXRlLXJvb21zJyxcbiAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBjZGsuYXdzX2FwaWdhdGV3YXkuQXV0aG9yaXphdGlvblR5cGUuTk9ORVxuICAgIH0pO1xuICAgIGNvbnN0IGdldFByZXNpZ25lZFVybCA9XG4gICAgICB0aGlzLmdldE1hcE9iamVjdEFzTm9kZUZ1bmN0aW9uKCdnZXRTM1ByZXNpZ25lZFVybCcpO1xuICAgIHRoaXMubGFtYmRhc1RvUmVzb3VyY2VNYXAuc2V0KGdldFByZXNpZ25lZFVybC5mdW5jdGlvbk5hbWUsIHtcbiAgICAgIGxhbWJkYUZ1bmN0aW9uOiBnZXRQcmVzaWduZWRVcmwsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcGFyZW50UmVzb3VyY2U6ICcvJyxcbiAgICAgIHJlc291cmNlOiAnc2lnbl91cGxvYWQnLFxuICAgICAgYXV0aG9yaXphdGlvblR5cGU6IGNkay5hd3NfYXBpZ2F0ZXdheS5BdXRob3JpemF0aW9uVHlwZS5OT05FLFxuICAgICAgcmVxdWVzdFBhcmFtZXRlcnM6IHtcbiAgICAgICAgJ21ldGhvZC5yZXF1ZXN0LnF1ZXJ5c3RyaW5nLmZpbGUnOiB0cnVlLFxuICAgICAgICAnbWV0aG9kLnJlcXVlc3QucXVlcnlzdHJpbmcudHlwZSc6IHRydWUsXG4gICAgICAgICdtZXRob2QucmVxdWVzdC5xdWVyeXN0cmluZy5pZCc6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TWFwT2JqZWN0QXNOb2RlRnVuY3Rpb24obmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZnVuY3Rpb25zTWFwLmdldChuYW1lKSBhcyBOb2RlanNGdW5jdGlvbjtcbiAgfVxufVxuIl19