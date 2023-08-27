import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { KeyPair } from 'cdk-ec2-key-pair';
import { readFileSync } from 'fs';

interface ec2Props {
  s3Arn: string;
}

export class EC2Construct extends Construct {
  constructor(scope: Construct, id: string, props: ec2Props) {
    super(scope, id);

    const vpc = new ec2.Vpc(this, 'ec2Vpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.137.0/24'),
      vpcName: 'musifyre-vpc',
      subnetConfiguration: [
        {
          name: 'musifyrePublicVpc',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 28,
          mapPublicIpOnLaunch: true
        }
      ]
    });

    const key = new KeyPair(this, 'A-Key-Pair', {
      name: 'musifyre-kp',
      description: 'This is a Key Pair',
      storePublicKey: true
    });

    const publicSubnet = vpc.selectSubnets({
      subnetType: ec2.SubnetType.PUBLIC
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

    const instanceRole = new cdk.aws_iam.Role(this, 'musifyreInstanceRole', {
      assumedBy: new cdk.aws_iam.ServicePrincipal('ec2.amazonaws.com')
    });

    instanceRole.addToPolicy(
      new cdk.aws_iam.PolicyStatement({
        effect: cdk.aws_iam.Effect.ALLOW,
        actions: ['s3:PutObject', 's3:GetObject', 's3:PutObjectAcl'],
        resources: [props.s3Arn + '/*'] // Replace with your bucket name
      })
    );

    const instanceProfile = new cdk.aws_iam.CfnInstanceProfile(
      this,
      'InstanceProfile',
      {
        roles: [instanceRole.roleName]
      }
    );

    const ec2Instance = new ec2.Instance(this, 'musifyreEC2', {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2, // instance class
        ec2.InstanceSize.MICRO // instance type
      ),
      machineImage: machineImage,
      securityGroup: securityGroup,
      associatePublicIpAddress: true,
      vpcSubnets: publicSubnet,
      detailedMonitoring: true,
      keyName: key.keyPairName,
      role: instanceRole
    });

    const userData = readFileSync('data/instance-init.sh', 'utf8');
    ec2Instance.addUserData(userData);
  }
}
