"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusifyreCdkStack = void 0;
const cdk = require("aws-cdk-lib");
const ec2Construct_1 = require("../constructs/ec2Construct");
const CognitoConstruct_1 = require("../constructs/CognitoConstruct");
const S3BucketsConstruct_1 = require("../constructs/S3BucketsConstruct");
const DynamoConstruct_1 = require("../constructs/DynamoConstruct");
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
        // now lets create our lambdas
        // then use the lambdas to
    }
}
exports.MusifyreCdkStack = MusifyreCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzaWZ5cmUtY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVzaWZ5cmUtY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUVuQyw2REFBMEQ7QUFDMUQscUVBQWlFO0FBQ2pFLHlFQUErRDtBQUMvRCxtRUFBZ0U7QUFDaEUsOENBQThDO0FBRTlDLE1BQWEsZ0JBQWlCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDN0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixJQUFJLDJCQUFZLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sT0FBTyxHQUFHLElBQUksa0NBQWUsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDNUQsWUFBWSxFQUFFLG9CQUFvQjtTQUNuQyxDQUFDLENBQUM7UUFFSCxhQUFhO1FBQ2IsTUFBTSxTQUFTLEdBQUcsSUFBSSxnQ0FBVyxDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUNsRSxhQUFhLEVBQUUsa0JBQWtCO1lBQ2pDLGFBQWEsRUFBRSxzQkFBc0I7U0FDdEMsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCO1FBQ2pCLE1BQU0sTUFBTSxHQUFHLElBQUksaUNBQWUsQ0FBQyxJQUFJLEVBQUUseUJBQXlCLEVBQUU7WUFDbEUsU0FBUyxFQUFFLGdCQUFnQjtTQUM1QixDQUFDLENBQUM7UUFFSCw4QkFBOEI7UUFFOUIsMEJBQTBCO0lBQzVCLENBQUM7Q0FDRjtBQXhCRCw0Q0F3QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuaW1wb3J0IHsgRUMyQ29uc3RydWN0IH0gZnJvbSAnLi4vY29uc3RydWN0cy9lYzJDb25zdHJ1Y3QnO1xyXG5pbXBvcnQgeyBDb2duaXRvQ29zdHJ1Y3QgfSBmcm9tICcuLi9jb25zdHJ1Y3RzL0NvZ25pdG9Db25zdHJ1Y3QnO1xyXG5pbXBvcnQgeyBTM0NvbnN0cnVjdCB9IGZyb20gJy4uL2NvbnN0cnVjdHMvUzNCdWNrZXRzQ29uc3RydWN0JztcclxuaW1wb3J0IHsgRHluYW1vQ29uc3RydWN0IH0gZnJvbSAnLi4vY29uc3RydWN0cy9EeW5hbW9Db25zdHJ1Y3QnO1xyXG4vLyBpbXBvcnQgKiBhcyBzcXMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNxcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTXVzaWZ5cmVDZGtTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgbmV3IEVDMkNvbnN0cnVjdCh0aGlzLCAnZWMyQ29uc3RydWN0Jyk7XHJcbiAgICBjb25zdCBjb2duaXRvID0gbmV3IENvZ25pdG9Db3N0cnVjdCh0aGlzLCAnY29nbml0b0NvbnN0cnVjdCcsIHtcclxuICAgICAgdXNlclBvb2xOYW1lOiAnbXVzaWZ5aXJlLXVzZXJQb29sJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gczMgYnVja2V0c1xyXG4gICAgY29uc3QgczNCdWNrZXRzID0gbmV3IFMzQ29uc3RydWN0KHRoaXMsICdtdXNpZnlyZUJ1Y2tldHNDb25zdHJ1Y3QnLCB7XHJcbiAgICAgIG1wM0J1Y2tldE5hbWU6ICdtdXNpZnlyZS1zdG9yYWdlJyxcclxuICAgICAgaGxzQnVja2V0TmFtZTogJ211c2lmeXJlLXRyYW5zZm9ybWVkJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZHluYW1vZGIgdGFibGVcclxuICAgIGNvbnN0IHRhYmxlcyA9IG5ldyBEeW5hbW9Db25zdHJ1Y3QodGhpcywgJ211c2lmeXJlVGFibGVzQ29uc3RydWN0Jywge1xyXG4gICAgICB0YWJsZU5hbWU6ICdtdXNpZnlyZS1yb29tcydcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG5vdyBsZXRzIGNyZWF0ZSBvdXIgbGFtYmRhc1xyXG5cclxuICAgIC8vIHRoZW4gdXNlIHRoZSBsYW1iZGFzIHRvXHJcbiAgfVxyXG59XHJcbiJdfQ==