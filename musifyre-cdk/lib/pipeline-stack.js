"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusifyreCodePipeline = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const codepipeline = require("aws-cdk-lib/pipelines");
const constants_1 = require("../constants");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
class MusifyreCodePipeline extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const pipeline = new codepipeline.CodePipeline(this, 'MysifyrePipeline', {
            pipelineName: 'musifyre-pipeline',
            selfMutation: false,
            synth: new codepipeline.CodeBuildStep('synthStep', {
                rolePolicyStatements: [
                    new aws_iam_1.PolicyStatement({
                        actions: ['codeartifact:*'],
                        resources: ['*'],
                        effect: aws_iam_1.Effect.ALLOW
                    }),
                    new aws_iam_1.PolicyStatement({
                        actions: ['sts:GetServiceBearerToken'],
                        resources: ['*'],
                        effect: aws_iam_1.Effect.ALLOW
                    })
                ],
                input: codepipeline.CodePipelineSource.connection('Kaladin12/musifyre', 'main', {
                    connectionArn: constants_1.CODESTAR_CONNECTION_ARN
                }),
                installCommands: ['cd musifyre-cdk', 'npm install -g aws-cdk'],
                commands: ['npm ci', 'npm run build', 'npx cdk synth', 'npm publish'],
                primaryOutputDirectory: 'musifyre-cdk/cdk.out'
            })
        });
    }
}
exports.MusifyreCodePipeline = MusifyreCodePipeline;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBZ0Q7QUFDaEQsc0RBQXNEO0FBRXRELDRDQUF1RDtBQUN2RCxpREFBOEQ7QUFFOUQsTUFBYSxvQkFBcUIsU0FBUSxtQkFBSztJQUM3QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDdkUsWUFBWSxFQUFFLG1CQUFtQjtZQUNqQyxZQUFZLEVBQUUsS0FBSztZQUNuQixLQUFLLEVBQUUsSUFBSSxZQUFZLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRTtnQkFDakQsb0JBQW9CLEVBQUU7b0JBQ3BCLElBQUkseUJBQWUsQ0FBQzt3QkFDbEIsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7d0JBQzNCLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQzt3QkFDaEIsTUFBTSxFQUFFLGdCQUFNLENBQUMsS0FBSztxQkFDckIsQ0FBQztvQkFDRixJQUFJLHlCQUFlLENBQUM7d0JBQ2xCLE9BQU8sRUFBRSxDQUFDLDJCQUEyQixDQUFDO3dCQUN0QyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7d0JBQ2hCLE1BQU0sRUFBRSxnQkFBTSxDQUFDLEtBQUs7cUJBQ3JCLENBQUM7aUJBQ0g7Z0JBQ0QsS0FBSyxFQUFFLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQy9DLG9CQUFvQixFQUNwQixNQUFNLEVBQ047b0JBQ0UsYUFBYSxFQUFFLG1DQUF1QjtpQkFDdkMsQ0FDRjtnQkFDRCxlQUFlLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSx3QkFBd0IsQ0FBQztnQkFDOUQsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxDQUFDO2dCQUNyRSxzQkFBc0IsRUFBRSxzQkFBc0I7YUFDL0MsQ0FBQztTQUNILENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWpDRCxvREFpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGNvZGVwaXBlbGluZSBmcm9tICdhd3MtY2RrLWxpYi9waXBlbGluZXMnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBDT0RFU1RBUl9DT05ORUNUSU9OX0FSTiB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBFZmZlY3QsIFBvbGljeVN0YXRlbWVudCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuXG5leHBvcnQgY2xhc3MgTXVzaWZ5cmVDb2RlUGlwZWxpbmUgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgcGlwZWxpbmUgPSBuZXcgY29kZXBpcGVsaW5lLkNvZGVQaXBlbGluZSh0aGlzLCAnTXlzaWZ5cmVQaXBlbGluZScsIHtcbiAgICAgIHBpcGVsaW5lTmFtZTogJ211c2lmeXJlLXBpcGVsaW5lJyxcbiAgICAgIHNlbGZNdXRhdGlvbjogZmFsc2UsXG4gICAgICBzeW50aDogbmV3IGNvZGVwaXBlbGluZS5Db2RlQnVpbGRTdGVwKCdzeW50aFN0ZXAnLCB7XG4gICAgICAgIHJvbGVQb2xpY3lTdGF0ZW1lbnRzOiBbXG4gICAgICAgICAgbmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgICAgICBhY3Rpb25zOiBbJ2NvZGVhcnRpZmFjdDoqJ10sXG4gICAgICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICAgICAgZWZmZWN0OiBFZmZlY3QuQUxMT1dcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgICAgIGFjdGlvbnM6IFsnc3RzOkdldFNlcnZpY2VCZWFyZXJUb2tlbiddLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgICAgIGVmZmVjdDogRWZmZWN0LkFMTE9XXG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgaW5wdXQ6IGNvZGVwaXBlbGluZS5Db2RlUGlwZWxpbmVTb3VyY2UuY29ubmVjdGlvbihcbiAgICAgICAgICAnS2FsYWRpbjEyL211c2lmeXJlJyxcbiAgICAgICAgICAnbWFpbicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29ubmVjdGlvbkFybjogQ09ERVNUQVJfQ09OTkVDVElPTl9BUk5cbiAgICAgICAgICB9XG4gICAgICAgICksXG4gICAgICAgIGluc3RhbGxDb21tYW5kczogWydjZCBtdXNpZnlyZS1jZGsnLCAnbnBtIGluc3RhbGwgLWcgYXdzLWNkayddLFxuICAgICAgICBjb21tYW5kczogWyducG0gY2knLCAnbnBtIHJ1biBidWlsZCcsICducHggY2RrIHN5bnRoJywgJ25wbSBwdWJsaXNoJ10sXG4gICAgICAgIHByaW1hcnlPdXRwdXREaXJlY3Rvcnk6ICdtdXNpZnlyZS1jZGsvY2RrLm91dCdcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==