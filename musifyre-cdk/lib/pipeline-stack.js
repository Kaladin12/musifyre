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
                commands: ['npm ci', 'npm run build', 'npx cdk synth']
            })
        });
    }
}
exports.MusifyreCodePipeline = MusifyreCodePipeline;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBZ0Q7QUFDaEQsc0RBQXNEO0FBRXRELDRDQUF1RDtBQUV2RCxNQUFhLG9CQUFxQixTQUFRLG1CQUFLO0lBQzdDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUN2RSxZQUFZLEVBQUUsbUJBQW1CO1lBQ2pDLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO2dCQUNqRCxLQUFLLEVBQUUsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FDL0Msb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTjtvQkFDRSxhQUFhLEVBQUUsbUNBQXVCO2lCQUN2QyxDQUNGO2dCQUNELGVBQWUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLHdCQUF3QixDQUFDO2dCQUM5RCxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQzthQUN2RCxDQUFDO1NBQ0gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbkJELG9EQW1CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgY29kZXBpcGVsaW5lIGZyb20gJ2F3cy1jZGstbGliL3BpcGVsaW5lcyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IENPREVTVEFSX0NPTk5FQ1RJT05fQVJOIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuZXhwb3J0IGNsYXNzIE11c2lmeXJlQ29kZVBpcGVsaW5lIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHBpcGVsaW5lID0gbmV3IGNvZGVwaXBlbGluZS5Db2RlUGlwZWxpbmUodGhpcywgJ015c2lmeXJlUGlwZWxpbmUnLCB7XG4gICAgICBwaXBlbGluZU5hbWU6ICdtdXNpZnlyZS1waXBlbGluZScsXG4gICAgICBzeW50aDogbmV3IGNvZGVwaXBlbGluZS5Db2RlQnVpbGRTdGVwKCdzeW50aFN0ZXAnLCB7XG4gICAgICAgIGlucHV0OiBjb2RlcGlwZWxpbmUuQ29kZVBpcGVsaW5lU291cmNlLmNvbm5lY3Rpb24oXG4gICAgICAgICAgJ0thbGFkaW4xMi9tdXNpZnlyZScsXG4gICAgICAgICAgJ21haW4nLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb25Bcm46IENPREVTVEFSX0NPTk5FQ1RJT05fQVJOXG4gICAgICAgICAgfVxuICAgICAgICApLFxuICAgICAgICBpbnN0YWxsQ29tbWFuZHM6IFsnY2QgbXVzaWZ5cmUtY2RrJywgJ25wbSBpbnN0YWxsIC1nIGF3cy1jZGsnXSxcbiAgICAgICAgY29tbWFuZHM6IFsnbnBtIGNpJywgJ25wbSBydW4gYnVpbGQnLCAnbnB4IGNkayBzeW50aCddXG4gICAgICB9KVxuICAgIH0pO1xuICB9XG59XG4iXX0=