/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type LoginVerifyQueryVariables = {
    token: string;
};
export type LoginVerifyQueryResponse = {
    readonly loginVerify: string | null;
};
export type LoginVerifyQuery = {
    readonly response: LoginVerifyQueryResponse;
    readonly variables: LoginVerifyQueryVariables;
};



/*
query LoginVerifyQuery(
  $token: String!
) {
  loginVerify(token: $token)
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
            "name": "loginVerify",
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "LoginVerifyQuery",
            "selections": (v1 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "LoginVerifyQuery",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "LoginVerifyQuery",
            "operationKind": "query",
            "text": "query LoginVerifyQuery(\n  $token: String!\n) {\n  loginVerify(token: $token)\n}\n"
        }
    } as any;
})();
(node as any).hash = '16a32333b4645ba1dd70db7b179fb95e';
export default node;
