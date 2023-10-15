import { Construct } from 'constructs';
import { aws_sns as sns } from 'aws-cdk-lib';

interface snsConstructProps {
  topicName: string;
}

class snsConstruct extends Construct {
  public roomTopic: sns.Topic;

  constructor(scope: Construct, id: string, props: snsConstructProps) {
    super(scope, id);
    this.createRoomsTopic(props.topicName);
  }

  private createRoomsTopic(name: string) {
    this.roomTopic = new sns.Topic(this, name, {
      topicName: name
    });
  }
}
