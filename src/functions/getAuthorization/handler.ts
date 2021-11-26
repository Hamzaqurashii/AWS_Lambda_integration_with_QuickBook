import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import OAuthClient from "intuit-oauth";
// import axios from "axios";
import opn from "opn";
const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const oauthClient = new OAuthClient({
    clientId: "AB7UHYmMY5wJ1EkvJ6ucUC4IuUObLIeLktIyTGR4pOkUPy77qO",
    clientSecret: "uMTURId5oAgevSKVDe2BPZEwwSuLz4NwMw3zzhJS",
    environment: "sandbox", // ‘sandbox’ or ‘production’
    redirectUri: "http://localhost:3000/dev/createFile",
  });

  var authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: "testState",
  });


  if (authUri) {
    opn(authUri);
    return formatJSONResponse({ message: authUri });
  }
};

export const main = middyfy(hello);
