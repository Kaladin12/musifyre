"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Construct = void 0;
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
class S3Construct extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const corsRule = {
            allowedMethods: [
                aws_cdk_lib_1.aws_s3.HttpMethods.GET,
                aws_cdk_lib_1.aws_s3.HttpMethods.PUT,
                aws_cdk_lib_1.aws_s3.HttpMethods.POST
            ],
            allowedOrigins: ['*']
        };
        this.mp3Bucket = new aws_cdk_lib_1.aws_s3.Bucket(this, props.mp3BucketName, {
            publicReadAccess: true,
            bucketName: props.mp3BucketName,
            cors: [corsRule],
            autoDeleteObjects: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            blockPublicAccess: aws_cdk_lib_1.aws_s3.BlockPublicAccess.BLOCK_ACLS,
            accessControl: aws_cdk_lib_1.aws_s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL
        });
        this.hlsBucket = new aws_cdk_lib_1.aws_s3.Bucket(this, props.hlsBucketName, {
            publicReadAccess: true,
            bucketName: props.hlsBucketName,
            autoDeleteObjects: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            blockPublicAccess: aws_cdk_lib_1.aws_s3.BlockPublicAccess.BLOCK_ACLS,
            accessControl: aws_cdk_lib_1.aws_s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL
        });
    }
}
exports.S3Construct = S3Construct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUzNCdWNrZXRzQ29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUzNCdWNrZXRzQ29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUNuQyw2Q0FBMkM7QUFDM0MsMkNBQXVDO0FBT3ZDLE1BQWEsV0FBWSxTQUFRLHNCQUFTO0lBSXhDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBbUI7UUFDM0QsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLFFBQVEsR0FBZ0I7WUFDNUIsY0FBYyxFQUFFO2dCQUNkLG9CQUFFLENBQUMsV0FBVyxDQUFDLEdBQUc7Z0JBQ2xCLG9CQUFFLENBQUMsV0FBVyxDQUFDLEdBQUc7Z0JBQ2xCLG9CQUFFLENBQUMsV0FBVyxDQUFDLElBQUk7YUFDcEI7WUFDRCxjQUFjLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDdEIsQ0FBQztRQUVGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxvQkFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRTtZQUN4RCxnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLFVBQVUsRUFBRSxLQUFLLENBQUMsYUFBYTtZQUMvQixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDaEIsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPO1lBQ3hDLGlCQUFpQixFQUFFLG9CQUFFLENBQUMsaUJBQWlCLENBQUMsVUFBVTtZQUNsRCxhQUFhLEVBQUUsb0JBQUUsQ0FBQyxtQkFBbUIsQ0FBQyx5QkFBeUI7U0FDaEUsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG9CQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFO1lBQ3hELGdCQUFnQixFQUFFLElBQUk7WUFDdEIsVUFBVSxFQUFFLEtBQUssQ0FBQyxhQUFhO1lBQy9CLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztZQUN4QyxpQkFBaUIsRUFBRSxvQkFBRSxDQUFDLGlCQUFpQixDQUFDLFVBQVU7WUFDbEQsYUFBYSxFQUFFLG9CQUFFLENBQUMsbUJBQW1CLENBQUMseUJBQXlCO1NBQ2hFLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5DRCxrQ0FtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX3MzIGFzIHMzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmludGVyZmFjZSBidWNrZXRzUHJvcHMge1xuICBtcDNCdWNrZXROYW1lOiBzdHJpbmc7XG4gIGhsc0J1Y2tldE5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFMzQ29uc3RydWN0IGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIG1wM0J1Y2tldDogczMuQnVja2V0O1xuICBwdWJsaWMgaGxzQnVja2V0OiBzMy5CdWNrZXQ7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IGJ1Y2tldHNQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICBjb25zdCBjb3JzUnVsZTogczMuQ29yc1J1bGUgPSB7XG4gICAgICBhbGxvd2VkTWV0aG9kczogW1xuICAgICAgICBzMy5IdHRwTWV0aG9kcy5HRVQsXG4gICAgICAgIHMzLkh0dHBNZXRob2RzLlBVVCxcbiAgICAgICAgczMuSHR0cE1ldGhvZHMuUE9TVFxuICAgICAgXSxcbiAgICAgIGFsbG93ZWRPcmlnaW5zOiBbJyonXVxuICAgIH07XG5cbiAgICB0aGlzLm1wM0J1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgcHJvcHMubXAzQnVja2V0TmFtZSwge1xuICAgICAgcHVibGljUmVhZEFjY2VzczogdHJ1ZSxcbiAgICAgIGJ1Y2tldE5hbWU6IHByb3BzLm1wM0J1Y2tldE5hbWUsXG4gICAgICBjb3JzOiBbY29yc1J1bGVdLFxuICAgICAgYXV0b0RlbGV0ZU9iamVjdHM6IHRydWUsXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgICAgYmxvY2tQdWJsaWNBY2Nlc3M6IHMzLkJsb2NrUHVibGljQWNjZXNzLkJMT0NLX0FDTFMsXG4gICAgICBhY2Nlc3NDb250cm9sOiBzMy5CdWNrZXRBY2Nlc3NDb250cm9sLkJVQ0tFVF9PV05FUl9GVUxMX0NPTlRST0xcbiAgICB9KTtcblxuICAgIHRoaXMuaGxzQnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCBwcm9wcy5obHNCdWNrZXROYW1lLCB7XG4gICAgICBwdWJsaWNSZWFkQWNjZXNzOiB0cnVlLFxuICAgICAgYnVja2V0TmFtZTogcHJvcHMuaGxzQnVja2V0TmFtZSxcbiAgICAgIGF1dG9EZWxldGVPYmplY3RzOiB0cnVlLFxuICAgICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICAgIGJsb2NrUHVibGljQWNjZXNzOiBzMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BQ0xTLFxuICAgICAgYWNjZXNzQ29udHJvbDogczMuQnVja2V0QWNjZXNzQ29udHJvbC5CVUNLRVRfT1dORVJfRlVMTF9DT05UUk9MXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==