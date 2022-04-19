import SNS, { PublishResponse } from 'aws-sdk/clients/sns'
import * as handleSMS from '../utils/handleSms'
import * as smsLambda from './sms-lambda'
import { normalSQSEvent, badSQSEvent } from '../../__mocks__/sms-lambda-mocks'


const publishResponse = {
    ResponseMetadata: { 
        RequestId: 'cd9f696d-d658-529c-85be-33b52b7d1ae7' },
    MessageId: '0c13eae8-fc96-50db-8f30-b03001b3d8a0'
  }


// jest.mock('./publisher-lambda', () => ({
//     ...jest.requireActual('./publisher-lambda'),
//     publishToTopic: jest.fn()
// }))

const spy = jest.spyOn(handleSMS, 'handleSMS')

const sns = new SNS({})

describe('SMS Lambda', () => {
    beforeEach(() => {

    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('Should return correct response when handler is called with body', async() =>  {
        spy.mockReturnValue(Promise.resolve(publishResponse))
        const result = (await smsLambda.handler(normalSQSEvent))
        console.log('thisss --->', result)
        expect(result.statusCode).toEqual(200)
    })
    it('Should fail when handler is called without body', async() =>  {
        spy.mockReturnValue(Promise.resolve(publishResponse))
        const result = (await smsLambda.handler(badSQSEvent)).statusCode
        expect(result).toEqual(500)
    })
})