import SNS from 'aws-sdk/clients/sns'

export const publishToTopic = async (jsonPayload: string, snsClient: SNS): Promise<any> => {
    const publishedMessage = await snsClient.publish({
      Message: JSON.stringify(jsonPayload),
      TopicArn: "arn:aws:sns:eu-west-1:872030569168:dev-my-topic"
    })
    .promise()
    return publishedMessage
  }