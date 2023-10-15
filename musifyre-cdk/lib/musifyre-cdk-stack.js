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
        // s3 buckets
        const s3Buckets = new S3BucketsConstruct_1.S3Construct(this, 'musifyreBucketsConstruct', {
            mp3BucketName: 'musifyre-storage',
            hlsBucketName: 'musifyre-transformed'
        });
        new ec2Construct_1.EC2Construct(this, 'ec2Construct', {
            s3Arn: s3Buckets.mp3Bucket.bucketArn
        });
        const cognito = new CognitoConstruct_1.CognitoCostruct(this, 'cognitoConstruct', {
            userPoolName: 'musifyire-userPool'
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
        apis.createWebsocketRouteForLambda(lambdas.rtLambdasToResourceMap);
    }
}
exports.MusifyreCdkStack = MusifyreCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzaWZ5cmUtY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVzaWZ5cmUtY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUVuQyw2REFBMEQ7QUFDMUQscUVBQWlFO0FBQ2pFLHlFQUErRDtBQUMvRCxtRUFBZ0U7QUFDaEUsaUVBQStEO0FBQy9ELDJFQUcyQztBQUMzQyw4Q0FBOEM7QUFFOUMsTUFBYSxnQkFBaUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUM3QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLGFBQWE7UUFDYixNQUFNLFNBQVMsR0FBRyxJQUFJLGdDQUFXLENBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFFO1lBQ2xFLGFBQWEsRUFBRSxrQkFBa0I7WUFDakMsYUFBYSxFQUFFLHNCQUFzQjtTQUN0QyxDQUFDLENBQUM7UUFFSCxJQUFJLDJCQUFZLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUNyQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTO1NBQ3JDLENBQUMsQ0FBQztRQUNILE1BQU0sT0FBTyxHQUFHLElBQUksa0NBQWUsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDNUQsWUFBWSxFQUFFLG9CQUFvQjtTQUNuQyxDQUFDLENBQUM7UUFFSCxpQkFBaUI7UUFDakIsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRTtZQUNsRSxTQUFTLEVBQUUsZ0JBQWdCO1NBQzVCLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxHQUFHLElBQUksd0NBQWtCLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUN2RCxPQUFPLEVBQUUsY0FBYztZQUN2QixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7UUFFSCw4QkFBOEI7UUFDOUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxnQ0FBZSxDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUNwRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTO1lBQ3RDLFFBQVEsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVE7WUFDcEMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUztZQUM1QyxhQUFhLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTO1NBQzdDLENBQUMsQ0FBQztRQUVILHNDQUFzQztRQUN0QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Q0FDRjtBQXZDRCw0Q0F1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuaW1wb3J0IHsgRUMyQ29uc3RydWN0IH0gZnJvbSAnLi4vY29uc3RydWN0cy9lYzJDb25zdHJ1Y3QnO1xyXG5pbXBvcnQgeyBDb2duaXRvQ29zdHJ1Y3QgfSBmcm9tICcuLi9jb25zdHJ1Y3RzL0NvZ25pdG9Db25zdHJ1Y3QnO1xyXG5pbXBvcnQgeyBTM0NvbnN0cnVjdCB9IGZyb20gJy4uL2NvbnN0cnVjdHMvUzNCdWNrZXRzQ29uc3RydWN0JztcclxuaW1wb3J0IHsgRHluYW1vQ29uc3RydWN0IH0gZnJvbSAnLi4vY29uc3RydWN0cy9EeW5hbW9Db25zdHJ1Y3QnO1xyXG5pbXBvcnQgeyBMYW1iZGFDb25zdHJ1Y3QgfSBmcm9tICcuLi9jb25zdHJ1Y3RzL0xhbWJkQ29uc3RydWN0JztcclxuaW1wb3J0IHtcclxuICBNdXNpZnlyZUFwaUdhdGV3YXksXHJcbiAgcmVzb3VyY2VQcm9wc1xyXG59IGZyb20gJy4uL2NvbnN0cnVjdHMvQXBpR2FldHdheUNvbnN0cnVjdCc7XHJcbi8vIGltcG9ydCAqIGFzIHNxcyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3FzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNdXNpZnlyZUNka1N0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICAvLyBzMyBidWNrZXRzXHJcbiAgICBjb25zdCBzM0J1Y2tldHMgPSBuZXcgUzNDb25zdHJ1Y3QodGhpcywgJ211c2lmeXJlQnVja2V0c0NvbnN0cnVjdCcsIHtcclxuICAgICAgbXAzQnVja2V0TmFtZTogJ211c2lmeXJlLXN0b3JhZ2UnLFxyXG4gICAgICBobHNCdWNrZXROYW1lOiAnbXVzaWZ5cmUtdHJhbnNmb3JtZWQnXHJcbiAgICB9KTtcclxuXHJcbiAgICBuZXcgRUMyQ29uc3RydWN0KHRoaXMsICdlYzJDb25zdHJ1Y3QnLCB7XHJcbiAgICAgIHMzQXJuOiBzM0J1Y2tldHMubXAzQnVja2V0LmJ1Y2tldEFyblxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBjb2duaXRvID0gbmV3IENvZ25pdG9Db3N0cnVjdCh0aGlzLCAnY29nbml0b0NvbnN0cnVjdCcsIHtcclxuICAgICAgdXNlclBvb2xOYW1lOiAnbXVzaWZ5aXJlLXVzZXJQb29sJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZHluYW1vZGIgdGFibGVcclxuICAgIGNvbnN0IHRhYmxlcyA9IG5ldyBEeW5hbW9Db25zdHJ1Y3QodGhpcywgJ211c2lmeXJlVGFibGVzQ29uc3RydWN0Jywge1xyXG4gICAgICB0YWJsZU5hbWU6ICdtdXNpZnlyZS1yb29tcydcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGFwaXMgPSBuZXcgTXVzaWZ5cmVBcGlHYXRld2F5KHRoaXMsICdtdXNpZnlyZUFwaScsIHtcclxuICAgICAgYXBpTmFtZTogJ211c2lmeXJlLWFwaScsXHJcbiAgICAgIHN0YWdlTmFtZTogJ2RldidcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG5vdyBsZXRzIGNyZWF0ZSBvdXIgbGFtYmRhc1xyXG4gICAgY29uc3QgbGFtYmRhcyA9IG5ldyBMYW1iZGFDb25zdHJ1Y3QodGhpcywgJ211c2lmeXJlTGFtYmRhc0NvbnN0cnVjdCcsIHtcclxuICAgICAgdGFibGVOYW1lOiB0YWJsZXMucm9vbXNUYWJsZS50YWJsZU5hbWUsXHJcbiAgICAgIHRhYmxlQXJuOiB0YWJsZXMucm9vbXNUYWJsZS50YWJsZUFybixcclxuICAgICAgbXAzQnVja2V0TmFtZTogczNCdWNrZXRzLm1wM0J1Y2tldC5idWNrZXRBcm4sXHJcbiAgICAgIGhsc0J1Y2tldE5hbWU6IHMzQnVja2V0cy5obHNCdWNrZXQuYnVja2V0QXJuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjcmVhdGUgdGhlIHJlc291cmNlIGZvciBlYWNoIGxhbWJkYVxyXG4gICAgYXBpcy5jcmVhdGVSZXNvdXJjZUZvckxhbWJkYShsYW1iZGFzLmxhbWJkYXNUb1Jlc291cmNlTWFwKTtcclxuICAgIGFwaXMuY3JlYXRlV2Vic29ja2V0Um91dGVGb3JMYW1iZGEobGFtYmRhcy5ydExhbWJkYXNUb1Jlc291cmNlTWFwKTtcclxuICB9XHJcbn1cclxuIl19