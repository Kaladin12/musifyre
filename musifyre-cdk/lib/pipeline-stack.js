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
                installCommands: ['ls', 'cd musifyre-cdk', 'npm install -g aws-cdk'],
                commands: ['npm ci', 'npm run build', 'npx cdk synth', 'npm publish'],
                primaryOutputDirectory: 'musifyre-cdk/cdk.out'
            })
        });
    }
}
exports.MusifyreCodePipeline = MusifyreCodePipeline;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBZ0Q7QUFDaEQsc0RBQXNEO0FBRXRELDRDQUF1RDtBQUN2RCxpREFBOEQ7QUFFOUQsTUFBYSxvQkFBcUIsU0FBUSxtQkFBSztJQUM3QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDdkUsWUFBWSxFQUFFLG1CQUFtQjtZQUNqQyxZQUFZLEVBQUUsS0FBSztZQUNuQixLQUFLLEVBQUUsSUFBSSxZQUFZLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRTtnQkFDakQsb0JBQW9CLEVBQUU7b0JBQ3BCLElBQUkseUJBQWUsQ0FBQzt3QkFDbEIsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7d0JBQzNCLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQzt3QkFDaEIsTUFBTSxFQUFFLGdCQUFNLENBQUMsS0FBSztxQkFDckIsQ0FBQztvQkFDRixJQUFJLHlCQUFlLENBQUM7d0JBQ2xCLE9BQU8sRUFBRSxDQUFDLDJCQUEyQixDQUFDO3dCQUN0QyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7d0JBQ2hCLE1BQU0sRUFBRSxnQkFBTSxDQUFDLEtBQUs7cUJBQ3JCLENBQUM7aUJBQ0g7Z0JBQ0QsS0FBSyxFQUFFLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQy9DLG9CQUFvQixFQUNwQixNQUFNLEVBQ047b0JBQ0UsYUFBYSxFQUFFLG1DQUF1QjtpQkFDdkMsQ0FDRjtnQkFDRCxlQUFlLEVBQUUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLENBQUM7Z0JBQ3BFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQztnQkFDckUsc0JBQXNCLEVBQUUsc0JBQXNCO2FBQy9DLENBQUM7U0FDSCxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFqQ0Qsb0RBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBjb2RlcGlwZWxpbmUgZnJvbSAnYXdzLWNkay1saWIvcGlwZWxpbmVzJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQ09ERVNUQVJfQ09OTkVDVElPTl9BUk4gfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgRWZmZWN0LCBQb2xpY3lTdGF0ZW1lbnQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcblxuZXhwb3J0IGNsYXNzIE11c2lmeXJlQ29kZVBpcGVsaW5lIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHBpcGVsaW5lID0gbmV3IGNvZGVwaXBlbGluZS5Db2RlUGlwZWxpbmUodGhpcywgJ015c2lmeXJlUGlwZWxpbmUnLCB7XG4gICAgICBwaXBlbGluZU5hbWU6ICdtdXNpZnlyZS1waXBlbGluZScsXG4gICAgICBzZWxmTXV0YXRpb246IGZhbHNlLFxuICAgICAgc3ludGg6IG5ldyBjb2RlcGlwZWxpbmUuQ29kZUJ1aWxkU3RlcCgnc3ludGhTdGVwJywge1xuICAgICAgICByb2xlUG9saWN5U3RhdGVtZW50czogW1xuICAgICAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICAgICAgYWN0aW9uczogWydjb2RlYXJ0aWZhY3Q6KiddLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgICAgIGVmZmVjdDogRWZmZWN0LkFMTE9XXG4gICAgICAgICAgfSksXG4gICAgICAgICAgbmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgICAgICBhY3Rpb25zOiBbJ3N0czpHZXRTZXJ2aWNlQmVhcmVyVG9rZW4nXSxcbiAgICAgICAgICAgIHJlc291cmNlczogWycqJ10sXG4gICAgICAgICAgICBlZmZlY3Q6IEVmZmVjdC5BTExPV1xuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIGlucHV0OiBjb2RlcGlwZWxpbmUuQ29kZVBpcGVsaW5lU291cmNlLmNvbm5lY3Rpb24oXG4gICAgICAgICAgJ0thbGFkaW4xMi9tdXNpZnlyZScsXG4gICAgICAgICAgJ21haW4nLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb25Bcm46IENPREVTVEFSX0NPTk5FQ1RJT05fQVJOXG4gICAgICAgICAgfVxuICAgICAgICApLFxuICAgICAgICBpbnN0YWxsQ29tbWFuZHM6IFsnbHMnLCAnY2QgbXVzaWZ5cmUtY2RrJywgJ25wbSBpbnN0YWxsIC1nIGF3cy1jZGsnXSxcbiAgICAgICAgY29tbWFuZHM6IFsnbnBtIGNpJywgJ25wbSBydW4gYnVpbGQnLCAnbnB4IGNkayBzeW50aCcsICducG0gcHVibGlzaCddLFxuICAgICAgICBwcmltYXJ5T3V0cHV0RGlyZWN0b3J5OiAnbXVzaWZ5cmUtY2RrL2Nkay5vdXQnXG4gICAgICB9KVxuICAgIH0pO1xuICB9XG59XG4iXX0=