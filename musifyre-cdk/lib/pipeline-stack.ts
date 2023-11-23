import { Stack, StackProps } from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { CODESTAR_CONNECTION_ARN } from '../constants';

export class MusifyreCodePipeline extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new codepipeline.CodePipeline(this, 'MysifyrePipeline', {
      pipelineName: 'musifyre-pipeline',
      synth: new codepipeline.CodeBuildStep('synthStep', {
        input: codepipeline.CodePipelineSource.connection(
          'Kaladin12/musifyre',
          'main',
          {
            connectionArn: CODESTAR_CONNECTION_ARN
          }
        ),
        installCommands: ['cd musifyre-cdk', 'npm install -g aws-cdk'],
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
  }
}
