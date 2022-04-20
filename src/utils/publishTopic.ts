import SNS from 'aws-sdk/clients/sns'

export const publishToTopic = async (jsonPayload: string, snsClient: SNS): Promise<any> => {
    const publishedMessage = await snsClient.publish({
      Message: JSON.stringify(jsonPayload),
      TopicArn: process.env.MAIN_TOPIC_ARN
    })
    .promise()
    return publishedMessage
  }