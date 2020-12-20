/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type LogoutQueryVariables = {
    token: string;
};
export type LogoutQueryResponse = {
    readonly logout: string | null;
};
export type LogoutQuery = {
    readonly response: LogoutQueryResponse;
    readonly variables: LogoutQueryVariables;
};



/*
query LogoutQuery(
  $token: String!
) {
  logout(token: $token)
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "token",
            "type": "String!"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "token",
                    "variableName": "token"
                }
            ],
            "kind": "ScalarField",
            "name": "logout",
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "LogoutQuery",
            "selections": (v1 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "LogoutQuery",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "LogoutQuery",
            "operationKind": "query",
            "text": "query LogoutQuery(\n  $token: String!\n) {\n  logout(token: $token)\n}\n"
        }
    } as any;
})();
(node as any).hash = '42ff658089b4d138abb6e32cf3f3b667';
export default node;
