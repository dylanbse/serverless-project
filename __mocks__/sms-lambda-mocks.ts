import { SQSEvent } from "aws-lambda"

const woo = '{\n' +
'  "Type" : "Notification",\n' +
'  "MessageId" : "8f004117-e8de-5124-b4ac-1bcf324fbdf4",\n' +
'  "TopicArn" : "arn:aws:sns:eu-west-1:872030569168:dev-my-topic",\n' +
'  "Message" : "\\"{\\\\n    \\\\\\"payload\\\\\\": {\\\\n        \\\\\\"phoneNumber\\\\\\": \\\\\\"+447932857640\\\\\\",\\\\n        \\\\\\"message\\\\\\": \\\\\\"You smell\\\\\\"\\\\n    }\\\\n}\\"",\n' +
'  "Timestamp" : "2022-04-19T15:42:09.499Z",\n' +
'  "SignatureVersion" : "1",\n' +
'  "Signature" : "B6QUWVpvU8fcm48fUlzx7IPTQv1/7xEcFUQh3gG6piZFENQ2MnxGHk7N6U9YlC1LCfXJ8ub1xcy5MXbrau6knSPg+noLdy3uKSk0pOiHpqsSgpIFjY/+jQ5egiMYhQ+8iE3K1INrifcJYbmVBs6BS209RURt0xU7GYHnY6UsQmhHPr0oa79dxA7xfUBM1XlbmftN787r/iDq9tGFTMMBtQKx3KArrFGwyBFz0pkMgM3/Z8nXdMmBM/u4LEHg/Kf5vK3S0uHTFatkNjX2WVpehP3KhU4NfN8jSsoVPhJ0mTeu0/UO2OZuOek9hcHJMbDJYWyKjb3qH/QYpsCVAAqwnA==",\n' +
'  "SigningCertURL" : "https://sns.eu-west-1.amazonaws.com/SimpleNotificationService-7ff5318490ec183fbaddaa2a969abfda.pem",\n' +
'  "UnsubscribeURL" : "https://sns.eu-west-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:eu-west-1:872030569168:dev-my-topic:24843b0c-d7f0-4177-b3fa-689aa80730ba"\n' +
'}'

const mockSQSEvent = (body: string) => {
    return {
        "Records": [
          {
            "messageId": "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
            "receiptHandle": "MessageReceiptHandle",
            "body": body,
            "attributes": {
              "ApproximateReceiveCount": "1",
              "SentTimestamp": "1523232000000",
              "SenderId": "123456789012",
              "ApproximateFirstReceiveTimestamp": "1523232000001"
            },
            "messageAttributes": {},
            "md5OfBody": "{{{md5_of_body}}}",
            "eventSource": "aws:sqs",
            "eventSourceARN": "arn:aws:sqs:us-east-1:123456789012:MyQueue",
            "awsRegion": "us-east-1"
          }
        ]
      }
}

export const badSQSEvent = mockSQSEvent("{\"payload\": \"phoneJumber\": \"+447932857640\", \"message\": \"this is a message\"}")
export const normalSQSEvent = mockSQSEvent(woo)