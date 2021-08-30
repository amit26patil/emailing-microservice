import AWS from 'aws-sdk'

export class S3Client {
  protected client: AWS.S3

  constructor(
    accessKeyId: string,
    secretAccessKey: string
  ) {
    this.client = new AWS.S3({
      accessKeyId,
      secretAccessKey
    })
  }

  public async put(
    request: AWS.S3.Types.PutObjectRequest
  ): Promise<AWS.S3.Types.PutObjectOutput> {
    return new Promise((resolve, reject) => {
      this.client.putObject(request, (error, data) => {
        if (error) {
          return reject(error)
        }

        return resolve(data)
      })
    })
  }

  public createJsonRequest(
    bucket: string,
    filename: string,
    jsonObj: Object
  ) {
    const request: AWS.S3.Types.PutObjectRequest = {
      Bucket: bucket,
      Key: filename,
      Body: JSON.stringify(jsonObj),
      ContentType: 'application/json; charset=utf-8',
    }

    return request;
  }
}