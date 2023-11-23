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
            synth: new codepipeline.CodeBuildStep('synthStep', {
                input: codepipeline.CodePipelineSource.connection('Kaladin12/musifyre', 'main', {
                    connectionArn: constants_1.CODESTAR_CONNECTION_ARN
                }),
                installCommands: ['cd musifyre-cdk', 'npm install -g aws-cdk'],
                commands: ['npm ci', 'npm run build', 'npx cdk synth'],
                primaryOutputDirectory: 'musifyre-cdk/cdk.out'
            })
        });
    }
}
exports.MusifyreCodePipeline = MusifyreCodePipeline;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBZ0Q7QUFDaEQsc0RBQXNEO0FBRXRELDRDQUF1RDtBQUV2RCxNQUFhLG9CQUFxQixTQUFRLG1CQUFLO0lBQzdDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUN2RSxZQUFZLEVBQUUsbUJBQW1CO1lBQ2pDLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO2dCQUNqRCxLQUFLLEVBQUUsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FDL0Msb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTjtvQkFDRSxhQUFhLEVBQUUsbUNBQXVCO2lCQUN2QyxDQUNGO2dCQUNELGVBQWUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLHdCQUF3QixDQUFDO2dCQUM5RCxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQztnQkFDdEQsc0JBQXNCLEVBQUUsc0JBQXNCO2FBQy9DLENBQUM7U0FDSCxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFwQkQsb0RBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBjb2RlcGlwZWxpbmUgZnJvbSAnYXdzLWNkay1saWIvcGlwZWxpbmVzJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQ09ERVNUQVJfQ09OTkVDVElPTl9BUk4gfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5leHBvcnQgY2xhc3MgTXVzaWZ5cmVDb2RlUGlwZWxpbmUgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgcGlwZWxpbmUgPSBuZXcgY29kZXBpcGVsaW5lLkNvZGVQaXBlbGluZSh0aGlzLCAnTXlzaWZ5cmVQaXBlbGluZScsIHtcbiAgICAgIHBpcGVsaW5lTmFtZTogJ211c2lmeXJlLXBpcGVsaW5lJyxcbiAgICAgIHN5bnRoOiBuZXcgY29kZXBpcGVsaW5lLkNvZGVCdWlsZFN0ZXAoJ3N5bnRoU3RlcCcsIHtcbiAgICAgICAgaW5wdXQ6IGNvZGVwaXBlbGluZS5Db2RlUGlwZWxpbmVTb3VyY2UuY29ubmVjdGlvbihcbiAgICAgICAgICAnS2FsYWRpbjEyL211c2lmeXJlJyxcbiAgICAgICAgICAnbWFpbicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29ubmVjdGlvbkFybjogQ09ERVNUQVJfQ09OTkVDVElPTl9BUk5cbiAgICAgICAgICB9XG4gICAgICAgICksXG4gICAgICAgIGluc3RhbGxDb21tYW5kczogWydjZCBtdXNpZnlyZS1jZGsnLCAnbnBtIGluc3RhbGwgLWcgYXdzLWNkayddLFxuICAgICAgICBjb21tYW5kczogWyducG0gY2knLCAnbnBtIHJ1biBidWlsZCcsICducHggY2RrIHN5bnRoJ10sXG4gICAgICAgIHByaW1hcnlPdXRwdXREaXJlY3Rvcnk6ICdtdXNpZnlyZS1jZGsvY2RrLm91dCdcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==