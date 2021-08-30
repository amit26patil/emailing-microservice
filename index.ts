import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';

import 'source-map-support/register';
import EmailRequest from './models/emailRequest';
import { NodeMailerServiceConstant } from './services/constant';
import EmailServiceFactory from './services/emailServiceFactory';
import { S3Client } from './services/s3Service';

export const handler: APIGatewayProxyHandler = async (event : APIGatewayProxyEvent, _context) => {
  try
  {
    var fileName = `${randomUUID()}.json`;
    var s3Client = new S3Client(process.env.ACCESS_KEY_ID, process.env.SECRET_ACCESS_KEY);

    let request = JSON.parse(event["body"]) as EmailRequest;
    var emailDeliveryService = EmailServiceFactory.getServiceInstance(NodeMailerServiceConstant);
    var response = await emailDeliveryService
                            .sendMail(request)
                            .catch(async (err)=>{
                                var errReq = s3Client.createJsonRequest(`${process.env.bucketName}/fail`,fileName, err);
                                await s3Client.put(errReq);
                                return null;
                            });
    if(response){
        let req = s3Client.createJsonRequest(`${process.env.bucketName}/success`,fileName,response);
        await s3Client.put(req);
    }
    return getReponseObject("Success", 200, event);
  } catch(ex) { 
    return getReponseObject(ex.toString(), 500, event)
  }
}
function getReponseObject(message: string,status:number, event: APIGatewayProxyEvent) {
    return {
        statusCode: status,
        body: JSON.stringify({
            message: message,
            input: event,
        }, null, 2),
    };
}

