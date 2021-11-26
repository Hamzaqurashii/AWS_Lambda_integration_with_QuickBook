import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
// import * as AWS from "aws-sdk";
// import * as multipart from "aws-lambda-multipart-parser";
// import * as fs from "fs";
import OAuthClient from "intuit-oauth";
import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const oauthClient = new OAuthClient({
    clientId: "AB7UHYmMY5wJ1EkvJ6ucUC4IuUObLIeLktIyTGR4pOkUPy77qO",
    clientSecret: "uMTURId5oAgevSKVDe2BPZEwwSuLz4NwMw3zzhJS",
    environment: "sandbox", // ‘sandbox’ or ‘production’
    redirectUri: "http://localhost:3000/dev/createFile",
  });

  // console.log(event)
  const parseRedirect = `http://localhost:3000/dev/createFile?code=${event.queryStringParameters.code}&state=${event.queryStringParameters.state}&realmId=${event.queryStringParameters.realmId}`;

  const tokenDetails = await oauthClient.createToken(parseRedirect);
  // .then(function (authResponse) {
  //   console.log("The Token is  " + JSON.stringify(authResponse.getJson()));
  //   return formatJSONResponse({
  //     message: authResponse.getJson(),
  //     event,
  //   });
  // })
  // .catch(function (e) {
  //   console.error("The error message is :" + e.originalMessage);
  //   console.error(e.intuit_tid);
  // });

  // console.log(tokenDetails.token);
    return formatJSONResponse({
      message: tokenDetails.token,
      event,
    });

};

export const main = middyfy(hello);
