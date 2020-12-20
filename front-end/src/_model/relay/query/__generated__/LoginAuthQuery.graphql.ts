/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type LoginAuthQueryVariables = {
    username: string;
    password: string;
};
export type LoginAuthQueryResponse = {
    readonly loginAuth: string | null;
};
export type LoginAuthQuery = {
    readonly response: LoginAuthQueryResponse;
    readonly variables: LoginAuthQueryVariables;
};



/*
query LoginAuthQuery(
  $username: String!
  $password: String!
) {
  loginAuth(username: $username, password: $password)
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "username",
            "type": "String!"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "password",
            "type": "String!"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "password",
                    "variableName": "password"
                },
                {
                    "kind": "Variable",
                    "name": "username",
                    "variableName": "username"
                }
            ],
            "kind": "ScalarField",
            "name": "loginAuth",
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "LoginAuthQuery",
            "selections": (v1 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "LoginAuthQuery",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "LoginAuthQuery",
            "operationKind": "query",
            "text": "query LoginAuthQuery(\n  $username: String!\n  $password: String!\n) {\n  loginAuth(username: $username, password: $password)\n}\n"
        }
    } as any;
})();
(node as any).hash = '2deb51c70777946fcb745d4906bc92ec';
export default node;
