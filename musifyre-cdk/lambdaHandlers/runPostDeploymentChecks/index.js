const AWS = require('aws-sdk');

exports.handler = async function (event, context) {
  var codepipeline = new AWS.CodePipeline();

  // Retrieve the Job ID from the Lambda action
  var jobId = event['CodePipeline.job'].id;

  // Retrieve the value of UserParameters from the Lambda action configuration in CodePipeline, in this case a URL which will be
  // health checked by this function.
  var url =
    event['CodePipeline.job'].data.actionConfiguration.configuration
      .UserParameters;

  // Notify CodePipeline of a successful job
  var putJobSuccess = function (message) {
    var params = {
      jobId: jobId
    };
    codepipeline.putJobSuccessResult(params, function (err, data) {
      if (err) {
        context.fail(err);
      } else {
        context.succeed(message);
      }
    });
  };

  // Notify CodePipeline of a failed job
  var putJobFailure = function (message) {
    var params = {
      jobId: jobId,
      failureDetails: {
        message: JSON.stringify(message),
        type: 'JobFailed',
        externalExecutionId: context.awsRequestId
      }
    };
    codepipeline.putJobFailureResult(params, function (err, data) {
      context.fail(message);
    });
  };

  putJobFailure('FAIL');
};
