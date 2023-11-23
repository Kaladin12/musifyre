#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MusifyreCdkStack } from '../lib/musifyre-cdk-stack';
import { MusifyreCodePipeline as MusifyreCodePipelineStack } from '../lib/pipeline-stack';

const envParams = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION
};

const app = new cdk.App();
/*
new MusifyreCdkStack(app, 'MusifyreCdkStack', {
  env: envParams
  
}); 
*/
new MusifyreCodePipelineStack(app, 'musifyrePipelineStack', {
  env: envParams
});
