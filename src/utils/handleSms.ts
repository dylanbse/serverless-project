import SNS from 'aws-sdk/clients/sns'


export interface SMSPayload {
    phoneNumber: string,
    message: string
}

export const handleSMS = async (payload: SMSPayload, snsClient: SNS ) => {
    try{
      const params = {
        Message: payload.message,
        PhoneNumber: payload.phoneNumber
      }
      const publishText = await snsClient.publish(params).promise()
      console.log('publish text', publishText)
      return publishText
    }
    catch(e){
      console.log('error: ', e)
      return e
    }
  }
  