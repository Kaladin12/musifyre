import { Stack, StackProps } from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { CODESTAR_CONNECTION_ARN } from '../constants';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class MusifyreCodePipeline extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new codepipeline.CodePipeline(this, 'MysifyrePipeline', {
      pipelineName: 'musifyre-pipeline',
      selfMutation: false,
      synth: new codepipeline.CodeBuildStep('synthStep', {
        rolePolicyStatements: [
          new PolicyStatement({
            actions: ['codeartifact:*'],
            resources: ['*'],
            effect: Effect.ALLOW
          }),
          new PolicyStatement({
            actions: ['sts:GetServiceBearerToken'],
            resources: ['*'],
            effect: Effect.ALLOW
          })
        ],
        input: codepipeline.CodePipelineSource.connection(
          'Kaladin12/musifyre',
          'main',
          {
            connectionArn: CODESTAR_CONNECTION_ARN
          }
        ),
        installCommands: ['ls', 'cd musifyre-cdk', 'npm install -g aws-cdk'],
        commands: ['npm ci', 'npm run build', 'npx cdk synth', 'npm publish'],
        primaryOutputDirectory: 'musifyre-cdk/cdk.out'
      })
    });
  }
}
