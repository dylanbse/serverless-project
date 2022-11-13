import { SQSEvent } from "aws-lambda";
import SNS from 'aws-sdk/clients/sns'
import AWS from 'aws-sdk'
require('dotenv').config();
import { handleSMS, SMSPayload } from '../utils/handleSms'
AWS.config.update({region: 'eu-west-1'})
const sns = new SNS({})

export const handler = async (event: SQSEvent) => {
  try{

    console.log('------- Event ------', event)

    const bodyObject = JSON.parse(event.Records[0].body)
    const messageObject = JSON.parse(bodyObject.Message)
    const payload: SMSPayload = {
      phoneNumber: messageObject.phoneNumber,
      message: messageObject.message
    }
    console.log(`Payload to send ----- \n ${payload.message} --- ${payload.phoneNumber}`)

    const publishedSMS = await handleSMS(payload, sns)

    return makeApiResponse(200, `Result: \n ${publishedSMS}`)
  }
  catch(e){
    return makeApiResponse(500, `Error: \n ${e}`)
  }
}

const makeApiResponse = (statusCode: number, body: string) => {
  return {
    statusCode,
    body
  }
}