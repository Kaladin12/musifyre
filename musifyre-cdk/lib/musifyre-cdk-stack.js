"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusifyreCdkStack = void 0;
const cdk = require("aws-cdk-lib");
const ec2Construct_1 = require("../constructs/ec2Construct");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class MusifyreCdkStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        new ec2Construct_1.EC2Construct(this, 'ec2Construct');
        // The code that defines your stack goes here
        // example resource
        // const queue = new sqs.Queue(this, 'MusifyreCdkQueue', {
        //   visibilityTimeout: cdk.Duration.seconds(300)
        // });
    }
}
exports.MusifyreCdkStack = MusifyreCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzaWZ5cmUtY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVzaWZ5cmUtY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUVuQyw2REFBMEQ7QUFDMUQsOENBQThDO0FBRTlDLE1BQWEsZ0JBQWlCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDN0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixJQUFJLDJCQUFZLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZDLDZDQUE2QztRQUU3QyxtQkFBbUI7UUFDbkIsMERBQTBEO1FBQzFELGlEQUFpRDtRQUNqRCxNQUFNO0lBQ1IsQ0FBQztDQUNGO0FBWkQsNENBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuaW1wb3J0IHsgRUMyQ29uc3RydWN0IH0gZnJvbSAnLi4vY29uc3RydWN0cy9lYzJDb25zdHJ1Y3QnO1xyXG4vLyBpbXBvcnQgKiBhcyBzcXMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNxcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTXVzaWZ5cmVDZGtTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgbmV3IEVDMkNvbnN0cnVjdCh0aGlzLCAnZWMyQ29uc3RydWN0Jyk7XHJcbiAgICAvLyBUaGUgY29kZSB0aGF0IGRlZmluZXMgeW91ciBzdGFjayBnb2VzIGhlcmVcclxuXHJcbiAgICAvLyBleGFtcGxlIHJlc291cmNlXHJcbiAgICAvLyBjb25zdCBxdWV1ZSA9IG5ldyBzcXMuUXVldWUodGhpcywgJ011c2lmeXJlQ2RrUXVldWUnLCB7XHJcbiAgICAvLyAgIHZpc2liaWxpdHlUaW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMDApXHJcbiAgICAvLyB9KTtcclxuICB9XHJcbn1cclxuIl19