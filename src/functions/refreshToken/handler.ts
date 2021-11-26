import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import OAuthClient from "intuit-oauth";
// import axios from "axios";
// import opn from "opn";
const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const oauthClient = new OAuthClient({
    clientId: "AB7UHYmMY5wJ1EkvJ6ucUC4IuUObLIeLktIyTGR4pOkUPy77qO",
    clientSecret: "uMTURId5oAgevSKVDe2BPZEwwSuLz4NwMw3zzhJS",
    environment: "sandbox", // ‘sandbox’ or ‘production’
    redirectUri: "http://localhost:3000/dev/createFile",
  });

  const response = await oauthClient
  .refreshUsingToken(event.body.refreshToken)
  
  return formatJSONResponse({ message: response });
};

export const main = middyfy(hello);
