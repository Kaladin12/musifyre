"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EC2Construct = void 0;
const ec2 = require("aws-cdk-lib/aws-ec2");
const constructs_1 = require("constructs");
const cdk_ec2_key_pair_1 = require("cdk-ec2-key-pair");
const fs_1 = require("fs");
class EC2Construct extends constructs_1.Construct {
    constructor(scope, id, props) {
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
        const key = new cdk_ec2_key_pair_1.KeyPair(this, 'A-Key-Pair', {
            name: 'musifyre-kp',
            description: 'This is a Key Pair',
            storePublicKey: true // by default the public key will not be stored in Secrets Manager
        });
        const publicSubnet = vpc.selectSubnets({
            subnetType: ec2.SubnetType.PUBLIC
        });
        const securityGroup = new ec2.SecurityGroup(this, 'ec2Sg', {
            vpc: vpc,
            allowAllOutbound: true
        });
        securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow all HTTP traffic');
        securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow all SSH traffic');
        const machineImage = ec2.MachineImage.genericLinux({
            'us-east-1': 'ami-06db4d78cb1d3bbf9'
        });
        const ec2Instance = new ec2.Instance(this, 'musifyreEC2', {
            vpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, // instance class
            ec2.InstanceSize.MICRO // instance type
            ),
            machineImage: machineImage,
            securityGroup: securityGroup,
            associatePublicIpAddress: true,
            vpcSubnets: publicSubnet,
            detailedMonitoring: true,
            keyName: key.keyPairName
        });
        const userData = (0, fs_1.readFileSync)('data/instance-init.sh', 'utf8');
        ec2Instance.addUserData(userData);
    }
}
exports.EC2Construct = EC2Construct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWMyQ29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWMyQ29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDJDQUEyQztBQUMzQywyQ0FBdUM7QUFDdkMsdURBQTJDO0FBQzNDLDJCQUFrQztBQUVsQyxNQUFhLFlBQWEsU0FBUSxzQkFBUztJQUN6QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDdEMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNsRCxPQUFPLEVBQUUsY0FBYztZQUN2QixtQkFBbUIsRUFBRTtnQkFDbkI7b0JBQ0UsSUFBSSxFQUFFLG1CQUFtQjtvQkFDekIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTTtvQkFDakMsUUFBUSxFQUFFLEVBQUU7b0JBQ1osbUJBQW1CLEVBQUUsSUFBSTtpQkFDMUI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sR0FBRyxHQUFHLElBQUksMEJBQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQzFDLElBQUksRUFBRSxhQUFhO1lBQ25CLFdBQVcsRUFBRSxvQkFBb0I7WUFDakMsY0FBYyxFQUFFLElBQUksQ0FBQyxrRUFBa0U7U0FDeEYsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUNyQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNO1NBQ2xDLENBQUMsQ0FBQztRQUVILE1BQU0sYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ3pELEdBQUcsRUFBRSxHQUFHO1lBQ1IsZ0JBQWdCLEVBQUUsSUFBSTtTQUN2QixDQUFDLENBQUM7UUFFSCxhQUFhLENBQUMsY0FBYyxDQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFDaEIsd0JBQXdCLENBQ3pCLENBQUM7UUFFRixhQUFhLENBQUMsY0FBYyxDQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFDaEIsdUJBQXVCLENBQ3hCLENBQUM7UUFFRixNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztZQUNqRCxXQUFXLEVBQUUsdUJBQXVCO1NBQ3JDLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3hELEdBQUc7WUFDSCxZQUFZLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQy9CLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLGlCQUFpQjtZQUN2QyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0I7YUFDeEM7WUFDRCxZQUFZLEVBQUUsWUFBWTtZQUMxQixhQUFhLEVBQUUsYUFBYTtZQUM1Qix3QkFBd0IsRUFBRSxJQUFJO1lBQzlCLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxXQUFXO1NBQ3pCLENBQUMsQ0FBQztRQUVILE1BQU0sUUFBUSxHQUFHLElBQUEsaUJBQVksRUFBQyx1QkFBdUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvRCxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDRjtBQWpFRCxvQ0FpRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgKiBhcyBlYzIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5pbXBvcnQgeyBLZXlQYWlyIH0gZnJvbSAnY2RrLWVjMi1rZXktcGFpcic7XHJcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBFQzJDb25zdHJ1Y3QgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCk7XHJcblxyXG4gICAgY29uc3QgdnBjID0gbmV3IGVjMi5WcGModGhpcywgJ2VjMlZwYycsIHtcclxuICAgICAgaXBBZGRyZXNzZXM6IGVjMi5JcEFkZHJlc3Nlcy5jaWRyKCcxMC4wLjEzNy4wLzI0JyksXHJcbiAgICAgIHZwY05hbWU6ICdtdXNpZnlyZS12cGMnLFxyXG4gICAgICBzdWJuZXRDb25maWd1cmF0aW9uOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ211c2lmeXJlUHVibGljVnBjJyxcclxuICAgICAgICAgIHN1Ym5ldFR5cGU6IGVjMi5TdWJuZXRUeXBlLlBVQkxJQyxcclxuICAgICAgICAgIGNpZHJNYXNrOiAyOCxcclxuICAgICAgICAgIG1hcFB1YmxpY0lwT25MYXVuY2g6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGtleSA9IG5ldyBLZXlQYWlyKHRoaXMsICdBLUtleS1QYWlyJywge1xyXG4gICAgICBuYW1lOiAnbXVzaWZ5cmUta3AnLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgaXMgYSBLZXkgUGFpcicsXHJcbiAgICAgIHN0b3JlUHVibGljS2V5OiB0cnVlIC8vIGJ5IGRlZmF1bHQgdGhlIHB1YmxpYyBrZXkgd2lsbCBub3QgYmUgc3RvcmVkIGluIFNlY3JldHMgTWFuYWdlclxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcHVibGljU3VibmV0ID0gdnBjLnNlbGVjdFN1Ym5ldHMoe1xyXG4gICAgICBzdWJuZXRUeXBlOiBlYzIuU3VibmV0VHlwZS5QVUJMSUNcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNlY3VyaXR5R3JvdXAgPSBuZXcgZWMyLlNlY3VyaXR5R3JvdXAodGhpcywgJ2VjMlNnJywge1xyXG4gICAgICB2cGM6IHZwYyxcclxuICAgICAgYWxsb3dBbGxPdXRib3VuZDogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgc2VjdXJpdHlHcm91cC5hZGRJbmdyZXNzUnVsZShcclxuICAgICAgZWMyLlBlZXIuYW55SXB2NCgpLFxyXG4gICAgICBlYzIuUG9ydC50Y3AoODApLFxyXG4gICAgICAnQWxsb3cgYWxsIEhUVFAgdHJhZmZpYydcclxuICAgICk7XHJcblxyXG4gICAgc2VjdXJpdHlHcm91cC5hZGRJbmdyZXNzUnVsZShcclxuICAgICAgZWMyLlBlZXIuYW55SXB2NCgpLFxyXG4gICAgICBlYzIuUG9ydC50Y3AoMjIpLFxyXG4gICAgICAnQWxsb3cgYWxsIFNTSCB0cmFmZmljJ1xyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBtYWNoaW5lSW1hZ2UgPSBlYzIuTWFjaGluZUltYWdlLmdlbmVyaWNMaW51eCh7XHJcbiAgICAgICd1cy1lYXN0LTEnOiAnYW1pLTA2ZGI0ZDc4Y2IxZDNiYmY5J1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgZWMySW5zdGFuY2UgPSBuZXcgZWMyLkluc3RhbmNlKHRoaXMsICdtdXNpZnlyZUVDMicsIHtcclxuICAgICAgdnBjLFxyXG4gICAgICBpbnN0YW5jZVR5cGU6IGVjMi5JbnN0YW5jZVR5cGUub2YoXHJcbiAgICAgICAgZWMyLkluc3RhbmNlQ2xhc3MuVDIsIC8vIGluc3RhbmNlIGNsYXNzXHJcbiAgICAgICAgZWMyLkluc3RhbmNlU2l6ZS5NSUNSTyAvLyBpbnN0YW5jZSB0eXBlXHJcbiAgICAgICksXHJcbiAgICAgIG1hY2hpbmVJbWFnZTogbWFjaGluZUltYWdlLFxyXG4gICAgICBzZWN1cml0eUdyb3VwOiBzZWN1cml0eUdyb3VwLFxyXG4gICAgICBhc3NvY2lhdGVQdWJsaWNJcEFkZHJlc3M6IHRydWUsXHJcbiAgICAgIHZwY1N1Ym5ldHM6IHB1YmxpY1N1Ym5ldCxcclxuICAgICAgZGV0YWlsZWRNb25pdG9yaW5nOiB0cnVlLFxyXG4gICAgICBrZXlOYW1lOiBrZXkua2V5UGFpck5hbWVcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHVzZXJEYXRhID0gcmVhZEZpbGVTeW5jKCdkYXRhL2luc3RhbmNlLWluaXQuc2gnLCAndXRmOCcpO1xyXG4gICAgZWMySW5zdGFuY2UuYWRkVXNlckRhdGEodXNlckRhdGEpO1xyXG4gIH1cclxufVxyXG4iXX0=