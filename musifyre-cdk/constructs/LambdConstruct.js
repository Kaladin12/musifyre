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
        this.rtLambdasToResourceMap = new Map();
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
        functionsDataMap.forEach((value, key) => {
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
        const getRoomLambda = this.getMapObjectAsNodeFunction('getRoomLambda');
        this.lambdasToResourceMap.set(getRoomLambda.functionName, {
            lambdaFunction: getRoomLambda,
            method: 'GET',
            parentResource: '/rooms',
            resource: '{id}',
            authorizationType: cdk.aws_apigateway.AuthorizationType.NONE
        });
    }
    getMapObjectAsNodeFunction(name) {
        return this.functionsMap.get(name);
    }
}
exports.LambdaConstruct = LambdaConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFtYmRDb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJMYW1iZENvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsNkNBQW1EO0FBQ25ELDJDQUF1QztBQUV2QyxxRUFBK0Q7QUFDL0QsNkJBQThCO0FBdUI5QixNQUFhLGVBQWdCLFNBQVEsc0JBQVM7SUFLNUMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUEyQjtRQUNuRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBTFosaUJBQVksR0FBRyxJQUFJLEdBQUcsRUFBMEIsQ0FBQztRQUNqRCx5QkFBb0IsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUN4RCwyQkFBc0IsR0FBRyxJQUFJLEdBQUcsRUFBMEIsQ0FBQztRQUtoRSxNQUFNLGdCQUFnQixHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDO1FBRS9ELGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNyQyxFQUFFLEVBQUUseUJBQXlCO1lBQzdCLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsUUFBUSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDMUIsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUM1QjtTQUNGLENBQUMsQ0FBQztRQUNILGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRTtZQUN2QyxFQUFFLEVBQUUsa0JBQWtCO1lBQ3RCLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsUUFBUSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUM3QixTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQzVCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFO1lBQ3hDLEVBQUUsRUFBRSxtQkFBbUI7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QkFBb0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTtZQUN4RCxjQUFjLEVBQUUsYUFBYTtZQUM3QixNQUFNLEVBQUUsS0FBSztZQUNiLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSTtTQUM3RCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sMEJBQTBCLENBQUMsSUFBWTtRQUM3QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBbUIsQ0FBQztJQUN2RCxDQUFDO0NBQ0Y7QUFsSUQsMENBa0lDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGF3c19sYW1iZGEgYXMgbGFtYmRhIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyByZXNvdXJjZVByb3BzIH0gZnJvbSAnLi9BcGlHYWV0d2F5Q29uc3RydWN0JztcbmltcG9ydCB7IE5vZGVqc0Z1bmN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYS1ub2RlanMnO1xuaW1wb3J0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5pbXBvcnQgeyBXZWJTb2NrZXRBcGksIFdlYlNvY2tldFN0YWdlIH0gZnJvbSAnQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXl2Mi1hbHBoYSc7XG5cbmludGVyZmFjZSBsYW1iZGFDb25zdHJ1Y3RQcm9wcyB7XG4gIHRhYmxlTmFtZTogc3RyaW5nO1xuICB0YWJsZUFybjogc3RyaW5nO1xuICBtcDNCdWNrZXROYW1lOiBzdHJpbmc7IC8vIFdpbGwgcGFzcyB0aGVzZSBhcyBlbnYgdmFyaWFibGVzIGZvciB0aGUgbGFtYmRhXG4gIGhsc0J1Y2tldE5hbWU6IHN0cmluZztcbn1cblxudHlwZSBwb2xpY2llc1R5cGUgPSB7XG4gIGFjdGlvbnM6IEFycmF5PHN0cmluZz47XG4gIHJlc291cmNlczogQXJyYXk8c3RyaW5nPjtcbn07XG5cbnR5cGUgbGFtYmRhRnVuY3Rpb25UeXBlID0ge1xuICBpZDogc3RyaW5nO1xuICBkaXJQYXRoOiBzdHJpbmc7XG4gIG1lbVNpemU/OiBudW1iZXI7XG4gIHRpbWVvdXQ/OiBjZGsuRHVyYXRpb247XG4gIHBvbGljaWVzPzogcG9saWNpZXNUeXBlO1xufTtcblxuZXhwb3J0IGNsYXNzIExhbWJkYUNvbnN0cnVjdCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyBmdW5jdGlvbnNNYXAgPSBuZXcgTWFwPHN0cmluZywgTm9kZWpzRnVuY3Rpb24+KCk7XG4gIHB1YmxpYyBsYW1iZGFzVG9SZXNvdXJjZU1hcCA9IG5ldyBNYXA8c3RyaW5nLCByZXNvdXJjZVByb3BzPigpO1xuICBwdWJsaWMgcnRMYW1iZGFzVG9SZXNvdXJjZU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBOb2RlanNGdW5jdGlvbj4oKTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogbGFtYmRhQ29uc3RydWN0UHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgY29uc3QgZnVuY3Rpb25zRGF0YU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBsYW1iZGFGdW5jdGlvblR5cGU+KCk7XG5cbiAgICBmdW5jdGlvbnNEYXRhTWFwLnNldCgnZ2V0Um9vbXNMYW1iZGEnLCB7XG4gICAgICBpZDogJ2dldFJvb21zUGFnaW5hdGVkTGFtYmRhJyxcbiAgICAgIGRpclBhdGg6ICdnZXRSb29tc0xhbWJkYScsXG4gICAgICBwb2xpY2llczoge1xuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOlNjYW4nXSxcbiAgICAgICAgcmVzb3VyY2VzOiBbcHJvcHMudGFibGVBcm5dXG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVuY3Rpb25zRGF0YU1hcC5zZXQoJ2NyZWF0ZVJvb21MYW1iZGEnLCB7XG4gICAgICBpZDogJ2NyZWF0ZVJvb21MYW1iZGEnLFxuICAgICAgZGlyUGF0aDogJ2NyZWF0ZVJvb21MYW1iZGEnLFxuICAgICAgcG9saWNpZXM6IHtcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpQdXRJdGVtJ10sXG4gICAgICAgIHJlc291cmNlczogW3Byb3BzLnRhYmxlQXJuXVxuICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uc0RhdGFNYXAuc2V0KCdnZXRTM1ByZXNpZ25lZFVybCcsIHtcbiAgICAgIGlkOiAnZ2V0UzNQcmVzaWduZWRVcmwnLFxuICAgICAgZGlyUGF0aDogJ2dldFByZXNpZ25lZFVybExhbWJkYScsXG4gICAgICBwb2xpY2llczoge1xuICAgICAgICBhY3Rpb25zOiBbJ3MzOkdldE9iamVjdCcsICdzMzpQdXRPYmplY3QnLCAnczM6UHV0T2JqZWN0QWNsJ10sXG4gICAgICAgIHJlc291cmNlczogW3Byb3BzLm1wM0J1Y2tldE5hbWUgKyAnLyonXSAvLyBEdWhoaCwgdGhlIHdpbGRjYXJkXG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVuY3Rpb25zRGF0YU1hcC5zZXQoJ2dldFJvb21MYW1iZGEnLCB7XG4gICAgICBpZDogJ2dldFJvb21MYW1iZGEnLFxuICAgICAgZGlyUGF0aDogJ2dldFJvb21MYW1iZGEnLFxuICAgICAgcG9saWNpZXM6IHtcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpRdWVyeSddLFxuICAgICAgICByZXNvdXJjZXM6IFtwcm9wcy50YWJsZUFybl1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBmdW5jdGlvbnNEYXRhTWFwLnNldCgnam9pblJvb21SdExhbWJkYScsIHtcbiAgICAgIGlkOiAnam9pblJvb21SdExhbWJkYScsXG4gICAgICBkaXJQYXRoOiAnam9pblJ0TGFtYmRhJyxcbiAgICAgIHBvbGljaWVzOiB7XG4gICAgICAgIGFjdGlvbnM6IFsnZHluYW1vZGI6VXBkYXRlSXRlbSddLFxuICAgICAgICByZXNvdXJjZXM6IFtwcm9wcy50YWJsZUFybl1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uc0RhdGFNYXAuZm9yRWFjaCgodmFsdWU6IGxhbWJkYUZ1bmN0aW9uVHlwZSwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHRlbXAgPSB0aGlzLmNyZWF0ZUxhbWJkYUZ1bmN0aW9uKGtleSwgdmFsdWUpO1xuICAgICAgaWYgKHZhbHVlLnBvbGljaWVzKSB7XG4gICAgICAgIHRoaXMuYXR0YWNoUG9saWNpZXModGVtcCwgdmFsdWUucG9saWNpZXMpO1xuICAgICAgfVxuICAgICAgaWYgKGtleS5pbmNsdWRlcygnUnRMYW1iZGEnKSkge1xuICAgICAgICB0aGlzLnJ0TGFtYmRhc1RvUmVzb3VyY2VNYXAuc2V0KGtleSwgdGVtcCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZnVuY3Rpb25zTWFwLnNldChrZXksIHRlbXApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jcmVhdGVSZXNvdXJjZU1hcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVMYW1iZGFGdW5jdGlvbihuYW1lOiBzdHJpbmcsIGRhdGE6IGxhbWJkYUZ1bmN0aW9uVHlwZSkge1xuICAgIHJldHVybiBuZXcgTm9kZWpzRnVuY3Rpb24odGhpcywgZGF0YS5pZCwge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlcicsXG4gICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgYC4uL2xhbWJkYUhhbmRsZXJzLyR7ZGF0YS5kaXJQYXRofS9pbmRleC5qc2ApLFxuICAgICAgbWVtb3J5U2l6ZTogZGF0YS5tZW1TaXplID8gZGF0YS5tZW1TaXplIDogMjU2LFxuICAgICAgdGltZW91dDogZGF0YS50aW1lb3V0ID8gZGF0YS50aW1lb3V0IDogY2RrLkR1cmF0aW9uLm1pbnV0ZXMoNSksXG4gICAgICBmdW5jdGlvbk5hbWU6IG5hbWVcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoUG9saWNpZXMoZnVuYzogTm9kZWpzRnVuY3Rpb24sIHBvbGljaWVzOiBwb2xpY2llc1R5cGUpIHtcbiAgICBmdW5jLmFkZFRvUm9sZVBvbGljeShuZXcgY2RrLmF3c19pYW0uUG9saWN5U3RhdGVtZW50KHBvbGljaWVzKSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVJlc291cmNlTWFwKCkge1xuICAgIGNvbnN0IGdldFJvb21zTGFtYmRhID0gdGhpcy5nZXRNYXBPYmplY3RBc05vZGVGdW5jdGlvbignZ2V0Um9vbXNMYW1iZGEnKTtcbiAgICB0aGlzLmxhbWJkYXNUb1Jlc291cmNlTWFwLnNldChnZXRSb29tc0xhbWJkYS5mdW5jdGlvbk5hbWUsIHtcbiAgICAgIGxhbWJkYUZ1bmN0aW9uOiBnZXRSb29tc0xhbWJkYSxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBwYXJlbnRSZXNvdXJjZTogJy8nLFxuICAgICAgcmVzb3VyY2U6ICdyb29tcycsXG4gICAgICBhdXRob3JpemF0aW9uVHlwZTogY2RrLmF3c19hcGlnYXRld2F5LkF1dGhvcml6YXRpb25UeXBlLk5PTkUsXG4gICAgICByZXF1ZXN0UGFyYW1ldGVyczoge1xuICAgICAgICAnbWV0aG9kLnJlcXVlc3QucXVlcnlzdHJpbmcuc2l6ZSc6IHRydWUsXG4gICAgICAgICdtZXRob2QucmVxdWVzdC5xdWVyeXN0cmluZy5sYXN0JzogZmFsc2VcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBjcmVhdGVSb29tTGFtYmRhID1cbiAgICAgIHRoaXMuZ2V0TWFwT2JqZWN0QXNOb2RlRnVuY3Rpb24oJ2NyZWF0ZVJvb21MYW1iZGEnKTtcbiAgICB0aGlzLmxhbWJkYXNUb1Jlc291cmNlTWFwLnNldChjcmVhdGVSb29tTGFtYmRhLmZ1bmN0aW9uTmFtZSwge1xuICAgICAgbGFtYmRhRnVuY3Rpb246IGNyZWF0ZVJvb21MYW1iZGEsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHBhcmVudFJlc291cmNlOiAnL3Jvb21zJyxcbiAgICAgIHJlc291cmNlOiAnY3JlYXRlLXJvb21zJyxcbiAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBjZGsuYXdzX2FwaWdhdGV3YXkuQXV0aG9yaXphdGlvblR5cGUuTk9ORVxuICAgIH0pO1xuICAgIGNvbnN0IGdldFByZXNpZ25lZFVybCA9XG4gICAgICB0aGlzLmdldE1hcE9iamVjdEFzTm9kZUZ1bmN0aW9uKCdnZXRTM1ByZXNpZ25lZFVybCcpO1xuICAgIHRoaXMubGFtYmRhc1RvUmVzb3VyY2VNYXAuc2V0KGdldFByZXNpZ25lZFVybC5mdW5jdGlvbk5hbWUsIHtcbiAgICAgIGxhbWJkYUZ1bmN0aW9uOiBnZXRQcmVzaWduZWRVcmwsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcGFyZW50UmVzb3VyY2U6ICcvJyxcbiAgICAgIHJlc291cmNlOiAnc2lnbl91cGxvYWQnLFxuICAgICAgYXV0aG9yaXphdGlvblR5cGU6IGNkay5hd3NfYXBpZ2F0ZXdheS5BdXRob3JpemF0aW9uVHlwZS5OT05FLFxuICAgICAgcmVxdWVzdFBhcmFtZXRlcnM6IHtcbiAgICAgICAgJ21ldGhvZC5yZXF1ZXN0LnF1ZXJ5c3RyaW5nLmZpbGUnOiB0cnVlLFxuICAgICAgICAnbWV0aG9kLnJlcXVlc3QucXVlcnlzdHJpbmcudHlwZSc6IHRydWUsXG4gICAgICAgICdtZXRob2QucmVxdWVzdC5xdWVyeXN0cmluZy5pZCc6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBnZXRSb29tTGFtYmRhID0gdGhpcy5nZXRNYXBPYmplY3RBc05vZGVGdW5jdGlvbignZ2V0Um9vbUxhbWJkYScpO1xuICAgIHRoaXMubGFtYmRhc1RvUmVzb3VyY2VNYXAuc2V0KGdldFJvb21MYW1iZGEuZnVuY3Rpb25OYW1lLCB7XG4gICAgICBsYW1iZGFGdW5jdGlvbjogZ2V0Um9vbUxhbWJkYSxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBwYXJlbnRSZXNvdXJjZTogJy9yb29tcycsXG4gICAgICByZXNvdXJjZTogJ3tpZH0nLFxuICAgICAgYXV0aG9yaXphdGlvblR5cGU6IGNkay5hd3NfYXBpZ2F0ZXdheS5BdXRob3JpemF0aW9uVHlwZS5OT05FXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldE1hcE9iamVjdEFzTm9kZUZ1bmN0aW9uKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmZ1bmN0aW9uc01hcC5nZXQobmFtZSkgYXMgTm9kZWpzRnVuY3Rpb247XG4gIH1cbn1cbiJdfQ==