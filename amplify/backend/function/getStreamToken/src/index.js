/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STREAM_KEY
	STREAM_SECRET
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const StreamChat=require('stream-chat').StreamChat;
const {STREAM_KEY,STREAM_SECRET}=process.env;
exports.handler = async (event) => {
	if(!event?.identity?.sub){
		return "";
	}
    console.log(`EVENT: ${JSON.stringify(event)}`);
	const client=StreamChat.getInstance(STREAM_KEY,STREAM_SECRET);
	const token=client.createToken(event.identity.sub)
    return token;
};
