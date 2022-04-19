// if event.body return 200
// if not event.body return 500
import * as publisher from './publisher-lambda'
import * as publishTopic from '../utils/publishTopic'
import { 
    normalApiEvent, 
    noBodyApiEvent,
    badNumberApiEvent,
    altNumberApiEvent,
    altNumberApiEventTwo
 } from '../../__mocks__/publish-lambda-mocks'

const publishResponse = {
    ResponseMetadata: { 
        RequestId: '11f1eb69-3dce-5dc5-a441-b1b1d8a36491' 
    },
    MessageId: '13e6d047-b8b3-5753-ad0e-8a9f5dddbe071997'
}


jest.mock('./publisher-lambda', () => ({
    ...jest.requireActual('./publisher-lambda'),
    publishToTopic: jest.fn()
}))

const spy = jest.spyOn(publishTopic, 'publishToTopic')

describe('Publisher Lambda', () => {
    beforeEach(() => {

    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('Should return correct response when handler is called with body and valid payload', async() =>  {
        spy.mockReturnValue(Promise.resolve(publishResponse))
        const result = await publisher.handler(normalApiEvent)
        expect(result).toEqual({"body": "Message published to topic", "statusCode": 200})
    })

    it('Should pass when handler is called with phone number starts with 44', async() =>  {
        spy.mockReturnValue(Promise.resolve(publishResponse))
        const result = await publisher.handler(altNumberApiEvent)
        expect(result).toEqual({"body": "Message published to topic", "statusCode": 200})
    })
    it('Should pass when handler is called with phone number starts with 44', async() =>  {
        spy.mockReturnValue(Promise.resolve(publishResponse))
        const result = await publisher.handler(altNumberApiEventTwo)
        expect(result).toEqual({"body": "Message published to topic", "statusCode": 200})
    })

    it('Should fail when handler is called without body', async() =>  {
        spy.mockReturnValue(Promise.resolve(publishResponse))
        const result = await publisher.handler(noBodyApiEvent)
        expect(result).toEqual({"body": "No body found", "statusCode": 403})
    })

    it('Should fail when handler is called with bad phone number', async() =>  {
        spy.mockReturnValue(Promise.resolve(publishResponse))
        const result = await publisher.handler(badNumberApiEvent)
        expect(result).toEqual({"body": "Invalid phone number", "statusCode": 403})
    })

})