/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type AdsBySocialPageIdSelectQueryVariables = {
    authToken: string;
    pageInternalId: string;
};
export type AdsBySocialPageIdSelectQueryResponse = {
    readonly exportCsvAdsBySocialPageId: {
        readonly token: string;
        readonly code: number;
        readonly payload: string | null;
    };
};
export type AdsBySocialPageIdSelectQuery = {
    readonly response: AdsBySocialPageIdSelectQueryResponse;
    readonly variables: AdsBySocialPageIdSelectQueryVariables;
};



/*
query AdsBySocialPageIdSelectQuery(
  $authToken: String!
  $pageInternalId: String!
) {
  exportCsvAdsBySocialPageId(authToken: $authToken, pageInternalId: $pageInternalId) {
    token
    code
    payload
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "authToken",
            "type": "String!"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "pageInternalId",
            "type": "String!"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "authToken",
                    "variableName": "authToken"
                },
                {
                    "kind": "Variable",
                    "name": "pageInternalId",
                    "variableName": "pageInternalId"
                }
            ],
            "concreteType": "ExportCsvResponseDTO",
            "kind": "LinkedField",
            "name": "exportCsvAdsBySocialPageId",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "token",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "code",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "payload",
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "AdsBySocialPageIdSelectQuery",
            "selections": (v1 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "AdsBySocialPageIdSelectQuery",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "AdsBySocialPageIdSelectQuery",
            "operationKind": "query",
            "text": "query AdsBySocialPageIdSelectQuery(\n  $authToken: String!\n  $pageInternalId: String!\n) {\n  exportCsvAdsBySocialPageId(authToken: $authToken, pageInternalId: $pageInternalId) {\n    token\n    code\n    payload\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '65bdb002916b835799d1bfb8699e8cee';
export default node;
