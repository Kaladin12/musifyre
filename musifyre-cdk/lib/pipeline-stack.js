"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusifyreCodePipeline = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const codepipeline = require("aws-cdk-lib/pipelines");
const constants_1 = require("../constants");
class MusifyreCodePipeline extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const pipeline = new codepipeline.CodePipeline(this, 'MysifyrePipeline', {
            pipelineName: 'musifyre-pipeline',
            selfMutation: false,
            synth: new codepipeline.CodeBuildStep('synthStep', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBZ0Q7QUFDaEQsc0RBQXNEO0FBRXRELDRDQUF1RDtBQUV2RCxNQUFhLG9CQUFxQixTQUFRLG1CQUFLO0lBQzdDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUN2RSxZQUFZLEVBQUUsbUJBQW1CO1lBQ2pDLFlBQVksRUFBRSxLQUFLO1lBQ25CLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO2dCQUNqRCxLQUFLLEVBQUUsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FDL0Msb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTjtvQkFDRSxhQUFhLEVBQUUsbUNBQXVCO2lCQUN2QyxDQUNGO2dCQUNELGVBQWUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLHdCQUF3QixDQUFDO2dCQUM5RCxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxhQUFhLENBQUM7Z0JBQ3JFLHNCQUFzQixFQUFFLHNCQUFzQjthQUMvQyxDQUFDO1NBQ0gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBckJELG9EQXFCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgY29kZXBpcGVsaW5lIGZyb20gJ2F3cy1jZGstbGliL3BpcGVsaW5lcyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IENPREVTVEFSX0NPTk5FQ1RJT05fQVJOIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuZXhwb3J0IGNsYXNzIE11c2lmeXJlQ29kZVBpcGVsaW5lIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHBpcGVsaW5lID0gbmV3IGNvZGVwaXBlbGluZS5Db2RlUGlwZWxpbmUodGhpcywgJ015c2lmeXJlUGlwZWxpbmUnLCB7XG4gICAgICBwaXBlbGluZU5hbWU6ICdtdXNpZnlyZS1waXBlbGluZScsXG4gICAgICBzZWxmTXV0YXRpb246IGZhbHNlLFxuICAgICAgc3ludGg6IG5ldyBjb2RlcGlwZWxpbmUuQ29kZUJ1aWxkU3RlcCgnc3ludGhTdGVwJywge1xuICAgICAgICBpbnB1dDogY29kZXBpcGVsaW5lLkNvZGVQaXBlbGluZVNvdXJjZS5jb25uZWN0aW9uKFxuICAgICAgICAgICdLYWxhZGluMTIvbXVzaWZ5cmUnLFxuICAgICAgICAgICdtYWluJyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb25uZWN0aW9uQXJuOiBDT0RFU1RBUl9DT05ORUNUSU9OX0FSTlxuICAgICAgICAgIH1cbiAgICAgICAgKSxcbiAgICAgICAgaW5zdGFsbENvbW1hbmRzOiBbJ2NkIG11c2lmeXJlLWNkaycsICducG0gaW5zdGFsbCAtZyBhd3MtY2RrJ10sXG4gICAgICAgIGNvbW1hbmRzOiBbJ25wbSBjaScsICducG0gcnVuIGJ1aWxkJywgJ25weCBjZGsgc3ludGgnLCAnbnBtIHB1Ymxpc2gnXSxcbiAgICAgICAgcHJpbWFyeU91dHB1dERpcmVjdG9yeTogJ211c2lmeXJlLWNkay9jZGsub3V0J1xuICAgICAgfSlcbiAgICB9KTtcbiAgfVxufVxuIl19