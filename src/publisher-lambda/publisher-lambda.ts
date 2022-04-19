import { APIGatewayEvent, APIGatewayProxyEvent } from "aws-lambda";
import AWS from 'aws-sdk'
import SNS from 'aws-sdk/clients/sns'
import { publishToTopic } from '../utils/publishTopic'
AWS.config.update({region: 'eu-west-1'})


const sns = new SNS({})

export const handler = async (event: APIGatewayProxyEvent) => {
  try{
    if (event?.body){
      console.log('---event------', event)
      const body = JSON.parse(event.body)
      const phoneNumber = body?.payload?.phoneNumber
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber)

      if(isPhoneNumberValid(formattedPhoneNumber)){
        body.payload.phoneNumber = formattedPhoneNumber
        const publishedMessage = await publishToTopic(body.payload, sns)
        console.log(`--- Published message result --- \n ${publishedMessage}`)
        return makeApiResponse(200, `Message published to topic`)
      }
      else{
        return makeApiResponse(403, 'Invalid phone number')
      }
    }
    else{
      return makeApiResponse(403, 'No body found')
    }
  }
  catch(e){
    return makeApiResponse(500, `Error: \n ${e}`)
  }
}

const isPhoneNumberValid = (phoneNumber: string) => {
  const phoneNumberRegex = RegExp(/^((\+44\s?|0)7([45789]\d{2}|624)\s?\d{3}\s?\d{3})$/)
  return phoneNumberRegex.test(phoneNumber)
}
const formatPhoneNumber = (phoneNumber: string) => {
  const nonWhitespaceNumber = phoneNumber.replace(/ /g,'')
  const areaCode = '+44'
  if(phoneNumber.slice(0,2) == '44') {
    return '+'.concat(nonWhitespaceNumber)
  }

  if(phoneNumber.charAt(0) == '0'){
    const formattedNumber = areaCode.concat(nonWhitespaceNumber.slice(1))
    return formattedNumber
  }
  return nonWhitespaceNumber
}

export const makeApiResponse = (statusCode: number, body: string) => {
  return {
    statusCode,
    body
  }
}