import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
// import * as AWS from "aws-sdk";
// import * as multipart from "aws-lambda-multipart-parser";
// import * as fs from "fs";
import OAuthClient from "intuit-oauth";
import schema from "./schema";
import * as AWS from "aws-sdk";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const oauthClient = new OAuthClient({
    clientId: "AB7UHYmMY5wJ1EkvJ6ucUC4IuUObLIeLktIyTGR4pOkUPy77qO",
    clientSecret: "uMTURId5oAgevSKVDe2BPZEwwSuLz4NwMw3zzhJS",
    environment: "sandbox", // ‘sandbox’ or ‘production’
    redirectUri: "http://localhost:3000/dev/createFile",
  });

  const dynamo = new AWS.DynamoDB.DocumentClient({
    region: "localhost",

    endpoint: "http://localhost:8000",
  });

  await dynamo
    .put({
      TableName: "HamzaTable",
      Item: {
        realmId: event.queryStringParameters.realmId,
        code: event.queryStringParameters.code,
        state: event.queryStringParameters.state,
      },
    })
    .promise();

  // console.log(event)
  // const parseRedirect = `http://localhost:3000/dev/createFile?code=${event.queryStringParameters.code}&state=${event.queryStringParameters.state}&realmId=${event.queryStringParameters.realmId}`;

  // const tokenDetails = await oauthClient.createToken(parseRedirect);
  // return formatJSONResponse({
  //   message: tokenDetails.token,
  //   event,
  // });
};

export const main = middyfy(hello);
