"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyusifyreLambdaTestStack = void 0;
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const path = require("path");
class MyusifyreLambdaTestStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.lambdaFn = new aws_lambda_nodejs_1.NodejsFunction(this, 'testLambda', {
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_16_X,
            handler: 'handler',
            entry: path.join(__dirname, `../lambdaHandlers/runPostDeploymentChecks/index.js`),
            memorySize: 256,
            timeout: cdk.Duration.minutes(1),
            functionName: 'testLambda'
        });
    }
}
exports.MyusifyreLambdaTestStack = MyusifyreLambdaTestStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWctdGVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlZy10ZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsNkNBQW1EO0FBRW5ELHFFQUErRDtBQUMvRCw2QkFBOEI7QUFFOUIsTUFBYSx3QkFBeUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUdyRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxrQ0FBYyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDckQsT0FBTyxFQUFFLHdCQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQ2QsU0FBUyxFQUNULG9EQUFvRCxDQUNyRDtZQUNELFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQyxZQUFZLEVBQUUsWUFBWTtTQUMzQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFsQkQsNERBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGF3c19sYW1iZGEgYXMgbGFtYmRhIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBOb2RlanNGdW5jdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEtbm9kZWpzJztcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5leHBvcnQgY2xhc3MgTXl1c2lmeXJlTGFtYmRhVGVzdFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgcHVibGljIGxhbWJkYUZuOiBOb2RlanNGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICB0aGlzLmxhbWJkYUZuID0gbmV3IE5vZGVqc0Z1bmN0aW9uKHRoaXMsICd0ZXN0TGFtYmRhJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlcicsXG4gICAgICBlbnRyeTogcGF0aC5qb2luKFxuICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgIGAuLi9sYW1iZGFIYW5kbGVycy9ydW5Qb3N0RGVwbG95bWVudENoZWNrcy9pbmRleC5qc2BcbiAgICAgICksXG4gICAgICBtZW1vcnlTaXplOiAyNTYsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24ubWludXRlcygxKSxcbiAgICAgIGZ1bmN0aW9uTmFtZTogJ3Rlc3RMYW1iZGEnXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==