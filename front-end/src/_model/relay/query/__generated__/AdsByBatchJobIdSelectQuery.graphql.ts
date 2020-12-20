/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type AdsByBatchJobIdSelectQueryVariables = {
    authToken: string;
    batchJobId: string;
};
export type AdsByBatchJobIdSelectQueryResponse = {
    readonly exportCsvAdsByBatchJobId: {
        readonly token: string;
        readonly code: number;
        readonly payload: string | null;
    };
};
export type AdsByBatchJobIdSelectQuery = {
    readonly response: AdsByBatchJobIdSelectQueryResponse;
    readonly variables: AdsByBatchJobIdSelectQueryVariables;
};



/*
query AdsByBatchJobIdSelectQuery(
  $authToken: String!
  $batchJobId: ID!
) {
  exportCsvAdsByBatchJobId(authToken: $authToken, batchJobId: $batchJobId) {
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
            "name": "batchJobId",
            "type": "ID!"
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
                    "name": "batchJobId",
                    "variableName": "batchJobId"
                }
            ],
            "concreteType": "ExportCsvResponseDTO",
            "kind": "LinkedField",
            "name": "exportCsvAdsByBatchJobId",
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
            "name": "AdsByBatchJobIdSelectQuery",
            "selections": (v1 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "AdsByBatchJobIdSelectQuery",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "AdsByBatchJobIdSelectQuery",
            "operationKind": "query",
            "text": "query AdsByBatchJobIdSelectQuery(\n  $authToken: String!\n  $batchJobId: ID!\n) {\n  exportCsvAdsByBatchJobId(authToken: $authToken, batchJobId: $batchJobId) {\n    token\n    code\n    payload\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'adceedd51953e9ee110ea6a3739cb99c';
export default node;
