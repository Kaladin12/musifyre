import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { readFileSync } from 'fs';

export class EC2Construct extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const vpc = new ec2.Vpc(this, 'ec2Vpc', {
      maxAzs: 1
    });

    const securityGroup = new ec2.SecurityGroup(this, 'ec2Sg', {
      vpc: vpc,
      allowAllOutbound: true
    });

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'Allow all HTTP traffic'
    );

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow all SSH traffic'
    );

    const machineImage = ec2.MachineImage.genericLinux({
      'us-east-1': 'ami-06db4d78cb1d3bbf9'
    });

    const ec2Instance = new ec2.Instance(this, 'musifyreEC2', {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2, // instance class
        ec2.InstanceSize.MICRO // instance type
      ),
      machineImage: machineImage,
      securityGroup: securityGroup
    });

    const userData = readFileSync('data/instance-init.sh', 'utf8');
    ec2Instance.addUserData(userData);
  }
}
