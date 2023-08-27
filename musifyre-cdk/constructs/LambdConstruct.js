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
                actions: ['s3:GetObject', 's3:PutObject', 's3:PutObjectAcl'],
                resources: [props.mp3BucketName + '/*']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFtYmRDb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJMYW1iZENvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsNkNBQW1EO0FBQ25ELDJDQUF1QztBQUV2QyxxRUFBK0Q7QUFDL0QsNkJBQThCO0FBc0I5QixNQUFhLGVBQWdCLFNBQVEsc0JBQVM7SUFJNUMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUEyQjtRQUNuRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBSlosaUJBQVksR0FBRyxJQUFJLEdBQUcsRUFBMEIsQ0FBQztRQUNqRCx5QkFBb0IsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUs3RCxNQUFNLGdCQUFnQixHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDO1FBRS9ELGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNyQyxFQUFFLEVBQUUseUJBQXlCO1lBQzdCLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsUUFBUSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDMUIsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUM1QjtTQUNGLENBQUMsQ0FBQztRQUNILGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRTtZQUN2QyxFQUFFLEVBQUUsa0JBQWtCO1lBQ3RCLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsUUFBUSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUM3QixTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQzVCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFO1lBQ3hDLEVBQUUsRUFBRSxtQkFBbUI7WUFDdkIsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxRQUFRLEVBQUU7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Q0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFO1lBQzFELGNBQWMsRUFBRSxlQUFlO1lBQy9CLE1BQU0sRUFBRSxLQUFLO1lBQ2IsY0FBYyxFQUFFLEdBQUc7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJO1lBQzVELGlCQUFpQixFQUFFO2dCQUNqQixpQ0FBaUMsRUFBRSxJQUFJO2dCQUN2QyxpQ0FBaUMsRUFBRSxJQUFJO2dCQUN2QywrQkFBK0IsRUFBRSxJQUFJO2FBQ3RDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDBCQUEwQixDQUFDLElBQVk7UUFDN0MsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQW1CLENBQUM7SUFDdkQsQ0FBQztDQUNGO0FBckdELDBDQXFHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBhd3NfbGFtYmRhIGFzIGxhbWJkYSB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgcmVzb3VyY2VQcm9wcyB9IGZyb20gJy4vQXBpR2FldHdheUNvbnN0cnVjdCc7XG5pbXBvcnQgeyBOb2RlanNGdW5jdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEtbm9kZWpzJztcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5pbnRlcmZhY2UgbGFtYmRhQ29uc3RydWN0UHJvcHMge1xuICB0YWJsZU5hbWU6IHN0cmluZztcbiAgdGFibGVBcm46IHN0cmluZztcbiAgbXAzQnVja2V0TmFtZTogc3RyaW5nOyAvLyBXaWxsIHBhc3MgdGhlc2UgYXMgZW52IHZhcmlhYmxlcyBmb3IgdGhlIGxhbWJkYVxuICBobHNCdWNrZXROYW1lOiBzdHJpbmc7XG59XG5cbnR5cGUgcG9saWNpZXNUeXBlID0ge1xuICBhY3Rpb25zOiBBcnJheTxzdHJpbmc+O1xuICByZXNvdXJjZXM6IEFycmF5PHN0cmluZz47XG59O1xuXG50eXBlIGxhbWJkYUZ1bmN0aW9uVHlwZSA9IHtcbiAgaWQ6IHN0cmluZztcbiAgZGlyUGF0aDogc3RyaW5nO1xuICBtZW1TaXplPzogbnVtYmVyO1xuICB0aW1lb3V0PzogY2RrLkR1cmF0aW9uO1xuICBwb2xpY2llcz86IHBvbGljaWVzVHlwZTtcbn07XG5cbmV4cG9ydCBjbGFzcyBMYW1iZGFDb25zdHJ1Y3QgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgZnVuY3Rpb25zTWFwID0gbmV3IE1hcDxzdHJpbmcsIE5vZGVqc0Z1bmN0aW9uPigpO1xuICBwdWJsaWMgbGFtYmRhc1RvUmVzb3VyY2VNYXAgPSBuZXcgTWFwPHN0cmluZywgcmVzb3VyY2VQcm9wcz4oKTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogbGFtYmRhQ29uc3RydWN0UHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgY29uc3QgZnVuY3Rpb25zRGF0YU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBsYW1iZGFGdW5jdGlvblR5cGU+KCk7XG5cbiAgICBmdW5jdGlvbnNEYXRhTWFwLnNldCgnZ2V0Um9vbXNMYW1iZGEnLCB7XG4gICAgICBpZDogJ2dldFJvb21zUGFnaW5hdGVkTGFtYmRhJyxcbiAgICAgIGRpclBhdGg6ICdnZXRSb29tc0xhbWJkYScsXG4gICAgICBwb2xpY2llczoge1xuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOlNjYW4nXSxcbiAgICAgICAgcmVzb3VyY2VzOiBbcHJvcHMudGFibGVBcm5dXG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVuY3Rpb25zRGF0YU1hcC5zZXQoJ2NyZWF0ZVJvb21MYW1iZGEnLCB7XG4gICAgICBpZDogJ2NyZWF0ZVJvb21MYW1iZGEnLFxuICAgICAgZGlyUGF0aDogJ2NyZWF0ZVJvb21MYW1iZGEnLFxuICAgICAgcG9saWNpZXM6IHtcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpQdXRJdGVtJ10sXG4gICAgICAgIHJlc291cmNlczogW3Byb3BzLnRhYmxlQXJuXVxuICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uc0RhdGFNYXAuc2V0KCdnZXRTM1ByZXNpZ25lZFVybCcsIHtcbiAgICAgIGlkOiAnZ2V0UzNQcmVzaWduZWRVcmwnLFxuICAgICAgZGlyUGF0aDogJ2dldFByZXNpZ25lZFVybExhbWJkYScsXG4gICAgICBwb2xpY2llczoge1xuICAgICAgICBhY3Rpb25zOiBbJ3MzOkdldE9iamVjdCcsICdzMzpQdXRPYmplY3QnLCAnczM6UHV0T2JqZWN0QWNsJ10sXG4gICAgICAgIHJlc291cmNlczogW3Byb3BzLm1wM0J1Y2tldE5hbWUgKyAnLyonXVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb25zRGF0YU1hcC5mb3JFYWNoKCh2YWx1ZTogbGFtYmRhRnVuY3Rpb25UeXBlLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdGVtcCA9IHRoaXMuY3JlYXRlTGFtYmRhRnVuY3Rpb24oa2V5LCB2YWx1ZSk7XG4gICAgICBpZiAodmFsdWUucG9saWNpZXMpIHtcbiAgICAgICAgdGhpcy5hdHRhY2hQb2xpY2llcyh0ZW1wLCB2YWx1ZS5wb2xpY2llcyk7XG4gICAgICB9XG4gICAgICB0aGlzLmZ1bmN0aW9uc01hcC5zZXQoa2V5LCB0ZW1wKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY3JlYXRlUmVzb3VyY2VNYXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTGFtYmRhRnVuY3Rpb24obmFtZTogc3RyaW5nLCBkYXRhOiBsYW1iZGFGdW5jdGlvblR5cGUpIHtcbiAgICByZXR1cm4gbmV3IE5vZGVqc0Z1bmN0aW9uKHRoaXMsIGRhdGEuaWQsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNl9YLFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXInLFxuICAgICAgZW50cnk6IHBhdGguam9pbihfX2Rpcm5hbWUsIGAuLi9sYW1iZGFIYW5kbGVycy8ke2RhdGEuZGlyUGF0aH0vaW5kZXguanNgKSxcbiAgICAgIG1lbW9yeVNpemU6IGRhdGEubWVtU2l6ZSA/IGRhdGEubWVtU2l6ZSA6IDI1NixcbiAgICAgIHRpbWVvdXQ6IGRhdGEudGltZW91dCA/IGRhdGEudGltZW91dCA6IGNkay5EdXJhdGlvbi5taW51dGVzKDUpLFxuICAgICAgZnVuY3Rpb25OYW1lOiBuYW1lXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaFBvbGljaWVzKGZ1bmM6IE5vZGVqc0Z1bmN0aW9uLCBwb2xpY2llczogcG9saWNpZXNUeXBlKSB7XG4gICAgZnVuYy5hZGRUb1JvbGVQb2xpY3kobmV3IGNkay5hd3NfaWFtLlBvbGljeVN0YXRlbWVudChwb2xpY2llcykpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVSZXNvdXJjZU1hcCgpIHtcbiAgICBjb25zdCBnZXRSb29tc0xhbWJkYSA9IHRoaXMuZ2V0TWFwT2JqZWN0QXNOb2RlRnVuY3Rpb24oJ2dldFJvb21zTGFtYmRhJyk7XG4gICAgdGhpcy5sYW1iZGFzVG9SZXNvdXJjZU1hcC5zZXQoZ2V0Um9vbXNMYW1iZGEuZnVuY3Rpb25OYW1lLCB7XG4gICAgICBsYW1iZGFGdW5jdGlvbjogZ2V0Um9vbXNMYW1iZGEsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcGFyZW50UmVzb3VyY2U6ICcvJyxcbiAgICAgIHJlc291cmNlOiAncm9vbXMnLFxuICAgICAgYXV0aG9yaXphdGlvblR5cGU6IGNkay5hd3NfYXBpZ2F0ZXdheS5BdXRob3JpemF0aW9uVHlwZS5OT05FLFxuICAgICAgcmVxdWVzdFBhcmFtZXRlcnM6IHtcbiAgICAgICAgJ21ldGhvZC5yZXF1ZXN0LnF1ZXJ5c3RyaW5nLnNpemUnOiB0cnVlLFxuICAgICAgICAnbWV0aG9kLnJlcXVlc3QucXVlcnlzdHJpbmcubGFzdCc6IGZhbHNlXG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgY3JlYXRlUm9vbUxhbWJkYSA9XG4gICAgICB0aGlzLmdldE1hcE9iamVjdEFzTm9kZUZ1bmN0aW9uKCdjcmVhdGVSb29tTGFtYmRhJyk7XG4gICAgdGhpcy5sYW1iZGFzVG9SZXNvdXJjZU1hcC5zZXQoY3JlYXRlUm9vbUxhbWJkYS5mdW5jdGlvbk5hbWUsIHtcbiAgICAgIGxhbWJkYUZ1bmN0aW9uOiBjcmVhdGVSb29tTGFtYmRhLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBwYXJlbnRSZXNvdXJjZTogJy9yb29tcycsXG4gICAgICByZXNvdXJjZTogJ2NyZWF0ZS1yb29tcycsXG4gICAgICBhdXRob3JpemF0aW9uVHlwZTogY2RrLmF3c19hcGlnYXRld2F5LkF1dGhvcml6YXRpb25UeXBlLk5PTkVcbiAgICB9KTtcbiAgICBjb25zdCBnZXRQcmVzaWduZWRVcmwgPVxuICAgICAgdGhpcy5nZXRNYXBPYmplY3RBc05vZGVGdW5jdGlvbignZ2V0UzNQcmVzaWduZWRVcmwnKTtcbiAgICB0aGlzLmxhbWJkYXNUb1Jlc291cmNlTWFwLnNldChnZXRQcmVzaWduZWRVcmwuZnVuY3Rpb25OYW1lLCB7XG4gICAgICBsYW1iZGFGdW5jdGlvbjogZ2V0UHJlc2lnbmVkVXJsLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHBhcmVudFJlc291cmNlOiAnLycsXG4gICAgICByZXNvdXJjZTogJ3NpZ25fdXBsb2FkJyxcbiAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBjZGsuYXdzX2FwaWdhdGV3YXkuQXV0aG9yaXphdGlvblR5cGUuTk9ORSxcbiAgICAgIHJlcXVlc3RQYXJhbWV0ZXJzOiB7XG4gICAgICAgICdtZXRob2QucmVxdWVzdC5xdWVyeXN0cmluZy5maWxlJzogdHJ1ZSxcbiAgICAgICAgJ21ldGhvZC5yZXF1ZXN0LnF1ZXJ5c3RyaW5nLnR5cGUnOiB0cnVlLFxuICAgICAgICAnbWV0aG9kLnJlcXVlc3QucXVlcnlzdHJpbmcuaWQnOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldE1hcE9iamVjdEFzTm9kZUZ1bmN0aW9uKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmZ1bmN0aW9uc01hcC5nZXQobmFtZSkgYXMgTm9kZWpzRnVuY3Rpb247XG4gIH1cbn1cbiJdfQ==