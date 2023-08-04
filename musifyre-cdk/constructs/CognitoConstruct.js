"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoCostruct = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
class CognitoCostruct extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.createUserPool(props.userPoolName);
        this.addPoolClient();
    }
    createUserPool(poolName) {
        this.userPool = new aws_cdk_lib_1.aws_cognito.UserPool(this, `${poolName}`, {
            standardAttributes: {
                email: {
                    required: true,
                    mutable: false
                },
                fullname: {
                    required: true,
                    mutable: false
                }
            },
            selfSignUpEnabled: true,
            passwordPolicy: {
                minLength: 12,
                requireLowercase: true,
                requireUppercase: true,
                requireDigits: true,
                requireSymbols: true
            },
            autoVerify: { email: true },
            email: aws_cdk_lib_1.aws_cognito.UserPoolEmail.withCognito(),
            userPoolName: poolName
        });
    }
    addPoolClient() {
        this.userPool.addClient('musifyre-client', {
            userPoolClientName: 'musifyre-client',
            generateSecret: false,
            authFlows: {
                userPassword: true,
                userSrp: true
            },
            preventUserExistenceErrors: true
        });
    }
}
exports.CognitoCostruct = CognitoCostruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29nbml0b0NvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvZ25pdG9Db25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkNBQXFEO0FBQ3JELDJDQUF1QztBQU12QyxNQUFhLGVBQWdCLFNBQVEsc0JBQVM7SUFHNUMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFtQjtRQUMzRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sY0FBYyxDQUFDLFFBQWdCO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx5QkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxRQUFRLEVBQUUsRUFBRTtZQUN4RCxrQkFBa0IsRUFBRTtnQkFDbEIsS0FBSyxFQUFFO29CQUNMLFFBQVEsRUFBRSxJQUFJO29CQUNkLE9BQU8sRUFBRSxLQUFLO2lCQUNmO2dCQUNELFFBQVEsRUFBRTtvQkFDUixRQUFRLEVBQUUsSUFBSTtvQkFDZCxPQUFPLEVBQUUsS0FBSztpQkFDZjthQUNGO1lBQ0QsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixjQUFjLEVBQUU7Z0JBQ2QsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLGNBQWMsRUFBRSxJQUFJO2FBQ3JCO1lBQ0QsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtZQUMzQixLQUFLLEVBQUUseUJBQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO1lBQzFDLFlBQVksRUFBRSxRQUFRO1NBQ3ZCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxhQUFhO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFO1lBQ3pDLGtCQUFrQixFQUFFLGlCQUFpQjtZQUNyQyxjQUFjLEVBQUUsS0FBSztZQUNyQixTQUFTLEVBQUU7Z0JBQ1QsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFDRCwwQkFBMEIsRUFBRSxJQUFJO1NBQ2pDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTlDRCwwQ0E4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX2NvZ25pdG8gYXMgY29nbml0byB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5pbnRlcmZhY2UgY29nbml0b1Byb3BzIHtcbiAgdXNlclBvb2xOYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBDb2duaXRvQ29zdHJ1Y3QgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgdXNlclBvb2w6IGNvZ25pdG8uVXNlclBvb2w7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IGNvZ25pdG9Qcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgdGhpcy5jcmVhdGVVc2VyUG9vbChwcm9wcy51c2VyUG9vbE5hbWUpO1xuICAgIHRoaXMuYWRkUG9vbENsaWVudCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVVc2VyUG9vbChwb29sTmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy51c2VyUG9vbCA9IG5ldyBjb2duaXRvLlVzZXJQb29sKHRoaXMsIGAke3Bvb2xOYW1lfWAsIHtcbiAgICAgIHN0YW5kYXJkQXR0cmlidXRlczoge1xuICAgICAgICBlbWFpbDoge1xuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIG11dGFibGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIGZ1bGxuYW1lOiB7XG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgbXV0YWJsZTogZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNlbGZTaWduVXBFbmFibGVkOiB0cnVlLFxuICAgICAgcGFzc3dvcmRQb2xpY3k6IHtcbiAgICAgICAgbWluTGVuZ3RoOiAxMixcbiAgICAgICAgcmVxdWlyZUxvd2VyY2FzZTogdHJ1ZSxcbiAgICAgICAgcmVxdWlyZVVwcGVyY2FzZTogdHJ1ZSxcbiAgICAgICAgcmVxdWlyZURpZ2l0czogdHJ1ZSxcbiAgICAgICAgcmVxdWlyZVN5bWJvbHM6IHRydWVcbiAgICAgIH0sXG4gICAgICBhdXRvVmVyaWZ5OiB7IGVtYWlsOiB0cnVlIH0sXG4gICAgICBlbWFpbDogY29nbml0by5Vc2VyUG9vbEVtYWlsLndpdGhDb2duaXRvKCksXG4gICAgICB1c2VyUG9vbE5hbWU6IHBvb2xOYW1lXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFBvb2xDbGllbnQoKSB7XG4gICAgdGhpcy51c2VyUG9vbC5hZGRDbGllbnQoJ211c2lmeXJlLWNsaWVudCcsIHtcbiAgICAgIHVzZXJQb29sQ2xpZW50TmFtZTogJ211c2lmeXJlLWNsaWVudCcsXG4gICAgICBnZW5lcmF0ZVNlY3JldDogZmFsc2UsXG4gICAgICBhdXRoRmxvd3M6IHtcbiAgICAgICAgdXNlclBhc3N3b3JkOiB0cnVlLFxuICAgICAgICB1c2VyU3JwOiB0cnVlXG4gICAgICB9LFxuICAgICAgcHJldmVudFVzZXJFeGlzdGVuY2VFcnJvcnM6IHRydWVcbiAgICB9KTtcbiAgfVxufVxuIl19