/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type BatchJobExecutedListSelectMutationVariables = {
    authToken: string;
    limit?: number | null;
    page?: number | null;
};
export type BatchJobExecutedListSelectMutationResponse = {
    readonly getBatchJobExecutedList: {
        readonly token: string;
        readonly batchJobExecutedList: ReadonlyArray<{
            readonly id: string;
            readonly batchJob: {
                readonly id: string;
                readonly pageSocial: {
                    readonly id: string;
                    readonly internalId: string;
                    readonly name: string;
                    readonly publisherPlatform: {
                        readonly idPublisherPlatform: string;
                        readonly valuePublisherPlatform: string;
                    };
                };
            };
            readonly byBatch: number;
            readonly numAds: number | null;
            readonly created: string | null;
        } | null>;
    } | null;
};
export type BatchJobExecutedListSelectMutation = {
    readonly response: BatchJobExecutedListSelectMutationResponse;
    readonly variables: BatchJobExecutedListSelectMutationVariables;
};



/*
query BatchJobExecutedListSelectMutation(
  $authToken: String!
  $limit: Int
  $page: Int
) {
  getBatchJobExecutedList(authToken: $authToken, limit: $limit, page: $page) {
    token
    batchJobExecutedList {
      id
      batchJob {
        id
        pageSocial {
          id
          internalId
          name
          publisherPlatform {
            idPublisherPlatform
            valuePublisherPlatform
          }
        }
      }
      byBatch
      numAds
      created
    }
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
            "name": "limit",
            "type": "Int"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "page",
            "type": "Int"
        } as any)
    ], v1 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any), v2 = [
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
                    "name": "limit",
                    "variableName": "limit"
                },
                {
                    "kind": "Variable",
                    "name": "page",
                    "variableName": "page"
                }
            ],
            "concreteType": "BatchJobExecutedListResponse",
            "kind": "LinkedField",
            "name": "getBatchJobExecutedList",
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
                    "concreteType": "BatchJobExecuted",
                    "kind": "LinkedField",
                    "name": "batchJobExecutedList",
                    "plural": true,
                    "selections": [
                        (v1 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "BatchJob",
                            "kind": "LinkedField",
                            "name": "batchJob",
                            "plural": false,
                            "selections": [
                                (v1 /*: any*/),
                                {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "PageSocial",
                                    "kind": "LinkedField",
                                    "name": "pageSocial",
                                    "plural": false,
                                    "selections": [
                                        (v1 /*: any*/),
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "internalId",
                                            "storageKey": null
                                        },
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "name",
                                            "storageKey": null
                                        },
                                        {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "PublisherPlatform",
                                            "kind": "LinkedField",
                                            "name": "publisherPlatform",
                                            "plural": false,
                                            "selections": [
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "idPublisherPlatform",
                                                    "storageKey": null
                                                },
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "valuePublisherPlatform",
                                                    "storageKey": null
                                                }
                                            ],
                                            "storageKey": null
                                        }
                                    ],
                                    "storageKey": null
                                }
                            ],
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "byBatch",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "numAds",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "created",
                            "storageKey": null
                        }
                    ],
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
            "name": "BatchJobExecutedListSelectMutation",
            "selections": (v2 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "BatchJobExecutedListSelectMutation",
            "selections": (v2 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "BatchJobExecutedListSelectMutation",
            "operationKind": "query",
            "text": "query BatchJobExecutedListSelectMutation(\n  $authToken: String!\n  $limit: Int\n  $page: Int\n) {\n  getBatchJobExecutedList(authToken: $authToken, limit: $limit, page: $page) {\n    token\n    batchJobExecutedList {\n      id\n      batchJob {\n        id\n        pageSocial {\n          id\n          internalId\n          name\n          publisherPlatform {\n            idPublisherPlatform\n            valuePublisherPlatform\n          }\n        }\n      }\n      byBatch\n      numAds\n      created\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'ec6d3e629ac3765c767afd8b5d8e930a';
export default node;
