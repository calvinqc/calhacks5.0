import {
    Stitch,
    AwsServiceClient,
} from 'mongodb-stitch-browser-sdk'
const stitchClient = Stitch.initializeDefaultAppClient('vinacann-vceuu');
const aws = stitchClient.getServiceClient(AwsServiceClient.factory, "MyAwsService");

async function connectS3() {
    const s3 = context.services.get('MyAwsService').s3("us-east-1");
    try {
        const result = await s3.PutObject({
            "Bucket": "my-bucket",
            "Key": "example",
            "Body": "hello there"
        });
        console.log(EJSON.stringify(result));
        return result;
    } catch(error) {
        console.error(EJSON.stringify(error));
    }
};

function handleFileUpload(file) {

    if (!file) {
        return
    }

    const key = `${this.client.auth.user.id}-${file.name}`;
    const bucket = 'vinacann';
    const url = `http://${bucket}.s3.amazonaws.com/${encodeURIComponent(key)}`;

    return convertImageToBSONBinaryObject(file)
        .then(result => {
            // AWS S3 Request
            const args = {
                ACL: 'public-read',
                Bucket: bucket,
                ContentType: file.type,
                Key: key,
                Body: result
            }

            const request = new AwsRequest.Builder()
                .withService('s3')
                .withAction('PutObject')
                .withRegion('us-east-1')
                .withArgs(args)
                .build()

            return this.aws.execute(request)
        })
        .then(result => {

            // MongoDB Request
            const picstream = this.mongodb.db('vinacann').collection('picstream')
            return picstream.insertOne({
                owner_id: this.client.auth.user.id,
                url,
                file: {
                    name: file.name,
                    type: file.type
                },
                ETag: result.ETag,
                ts: new Date()
            })
        })
        .then(result => {
            // Update UI
            this.getEntries()
        })
        .catch(console.error)
}


function convertImageToBSONBinaryObject(file) {}
