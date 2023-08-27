import * as cdk from 'aws-cdk-lib';
import { aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface dynamoTablesProps {
  tableName: string;
}

export class DynamoConstruct extends Construct {
  public roomsTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props: dynamoTablesProps) {
    super(scope, id);

    this.roomsTable = new dynamodb.Table(this, props.tableName, {
      tableName: props.tableName,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
  }
}
