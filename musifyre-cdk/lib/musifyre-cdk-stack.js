"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusifyreCdkStack = void 0;
const cdk = require("aws-cdk-lib");
const ec2Construct_1 = require("../constructs/ec2Construct");
const CognitoConstruct_1 = require("../constructs/CognitoConstruct");
const S3BucketsConstruct_1 = require("../constructs/S3BucketsConstruct");
const DynamoConstruct_1 = require("../constructs/DynamoConstruct");
const LambdConstruct_1 = require("../constructs/LambdConstruct");
const ApiGaetwayConstruct_1 = require("../constructs/ApiGaetwayConstruct");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class MusifyreCdkStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        new ec2Construct_1.EC2Construct(this, 'ec2Construct');
        const cognito = new CognitoConstruct_1.CognitoCostruct(this, 'cognitoConstruct', {
            userPoolName: 'musifyire-userPool'
        });
        // s3 buckets
        const s3Buckets = new S3BucketsConstruct_1.S3Construct(this, 'musifyreBucketsConstruct', {
            mp3BucketName: 'musifyre-storage',
            hlsBucketName: 'musifyre-transformed'
        });
        // dynamodb table
        const tables = new DynamoConstruct_1.DynamoConstruct(this, 'musifyreTablesConstruct', {
            tableName: 'musifyre-rooms'
        });
        const apis = new ApiGaetwayConstruct_1.MusifyreApiGateway(this, 'musifyreApi', {
            apiName: 'musifyre-api',
            stageName: 'dev'
        });
        // now lets create our lambdas
        const lambdas = new LambdConstruct_1.LambdaConstruct(this, 'musifyreLambdasConstruct', {
            tableName: tables.roomsTable.tableName,
            tableArn: tables.roomsTable.tableArn,
            mp3BucketName: s3Buckets.mp3Bucket.bucketArn,
            hlsBucketName: s3Buckets.hlsBucket.bucketArn
        });
        // create the resource for each lambda
        apis.createResourceForLambda(lambdas.lambdasToResourceMap);
    }
}
exports.MusifyreCdkStack = MusifyreCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzaWZ5cmUtY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVzaWZ5cmUtY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUVuQyw2REFBMEQ7QUFDMUQscUVBQWlFO0FBQ2pFLHlFQUErRDtBQUMvRCxtRUFBZ0U7QUFDaEUsaUVBQStEO0FBQy9ELDJFQUcyQztBQUMzQyw4Q0FBOEM7QUFFOUMsTUFBYSxnQkFBaUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUM3QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksMkJBQVksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDdkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUM1RCxZQUFZLEVBQUUsb0JBQW9CO1NBQ25DLENBQUMsQ0FBQztRQUVILGFBQWE7UUFDYixNQUFNLFNBQVMsR0FBRyxJQUFJLGdDQUFXLENBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFFO1lBQ2xFLGFBQWEsRUFBRSxrQkFBa0I7WUFDakMsYUFBYSxFQUFFLHNCQUFzQjtTQUN0QyxDQUFDLENBQUM7UUFFSCxpQkFBaUI7UUFDakIsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRTtZQUNsRSxTQUFTLEVBQUUsZ0JBQWdCO1NBQzVCLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxHQUFHLElBQUksd0NBQWtCLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUN2RCxPQUFPLEVBQUUsY0FBYztZQUN2QixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7UUFFSCw4QkFBOEI7UUFDOUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxnQ0FBZSxDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUNwRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTO1lBQ3RDLFFBQVEsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVE7WUFDcEMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUztZQUM1QyxhQUFhLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTO1NBQzdDLENBQUMsQ0FBQztRQUVILHNDQUFzQztRQUN0QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNGO0FBcENELDRDQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5pbXBvcnQgeyBFQzJDb25zdHJ1Y3QgfSBmcm9tICcuLi9jb25zdHJ1Y3RzL2VjMkNvbnN0cnVjdCc7XHJcbmltcG9ydCB7IENvZ25pdG9Db3N0cnVjdCB9IGZyb20gJy4uL2NvbnN0cnVjdHMvQ29nbml0b0NvbnN0cnVjdCc7XHJcbmltcG9ydCB7IFMzQ29uc3RydWN0IH0gZnJvbSAnLi4vY29uc3RydWN0cy9TM0J1Y2tldHNDb25zdHJ1Y3QnO1xyXG5pbXBvcnQgeyBEeW5hbW9Db25zdHJ1Y3QgfSBmcm9tICcuLi9jb25zdHJ1Y3RzL0R5bmFtb0NvbnN0cnVjdCc7XHJcbmltcG9ydCB7IExhbWJkYUNvbnN0cnVjdCB9IGZyb20gJy4uL2NvbnN0cnVjdHMvTGFtYmRDb25zdHJ1Y3QnO1xyXG5pbXBvcnQge1xyXG4gIE11c2lmeXJlQXBpR2F0ZXdheSxcclxuICByZXNvdXJjZVByb3BzXHJcbn0gZnJvbSAnLi4vY29uc3RydWN0cy9BcGlHYWV0d2F5Q29uc3RydWN0JztcclxuLy8gaW1wb3J0ICogYXMgc3FzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zcXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE11c2lmeXJlQ2RrU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgIG5ldyBFQzJDb25zdHJ1Y3QodGhpcywgJ2VjMkNvbnN0cnVjdCcpO1xyXG4gICAgY29uc3QgY29nbml0byA9IG5ldyBDb2duaXRvQ29zdHJ1Y3QodGhpcywgJ2NvZ25pdG9Db25zdHJ1Y3QnLCB7XHJcbiAgICAgIHVzZXJQb29sTmFtZTogJ211c2lmeWlyZS11c2VyUG9vbCdcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHMzIGJ1Y2tldHNcclxuICAgIGNvbnN0IHMzQnVja2V0cyA9IG5ldyBTM0NvbnN0cnVjdCh0aGlzLCAnbXVzaWZ5cmVCdWNrZXRzQ29uc3RydWN0Jywge1xyXG4gICAgICBtcDNCdWNrZXROYW1lOiAnbXVzaWZ5cmUtc3RvcmFnZScsXHJcbiAgICAgIGhsc0J1Y2tldE5hbWU6ICdtdXNpZnlyZS10cmFuc2Zvcm1lZCdcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGR5bmFtb2RiIHRhYmxlXHJcbiAgICBjb25zdCB0YWJsZXMgPSBuZXcgRHluYW1vQ29uc3RydWN0KHRoaXMsICdtdXNpZnlyZVRhYmxlc0NvbnN0cnVjdCcsIHtcclxuICAgICAgdGFibGVOYW1lOiAnbXVzaWZ5cmUtcm9vbXMnXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBhcGlzID0gbmV3IE11c2lmeXJlQXBpR2F0ZXdheSh0aGlzLCAnbXVzaWZ5cmVBcGknLCB7XHJcbiAgICAgIGFwaU5hbWU6ICdtdXNpZnlyZS1hcGknLFxyXG4gICAgICBzdGFnZU5hbWU6ICdkZXYnXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBub3cgbGV0cyBjcmVhdGUgb3VyIGxhbWJkYXNcclxuICAgIGNvbnN0IGxhbWJkYXMgPSBuZXcgTGFtYmRhQ29uc3RydWN0KHRoaXMsICdtdXNpZnlyZUxhbWJkYXNDb25zdHJ1Y3QnLCB7XHJcbiAgICAgIHRhYmxlTmFtZTogdGFibGVzLnJvb21zVGFibGUudGFibGVOYW1lLFxyXG4gICAgICB0YWJsZUFybjogdGFibGVzLnJvb21zVGFibGUudGFibGVBcm4sXHJcbiAgICAgIG1wM0J1Y2tldE5hbWU6IHMzQnVja2V0cy5tcDNCdWNrZXQuYnVja2V0QXJuLFxyXG4gICAgICBobHNCdWNrZXROYW1lOiBzM0J1Y2tldHMuaGxzQnVja2V0LmJ1Y2tldEFyblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSByZXNvdXJjZSBmb3IgZWFjaCBsYW1iZGFcclxuICAgIGFwaXMuY3JlYXRlUmVzb3VyY2VGb3JMYW1iZGEobGFtYmRhcy5sYW1iZGFzVG9SZXNvdXJjZU1hcCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==