/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type BatchJobListSelectQueryVariables = {
    authToken: string;
    limit: number;
    page: number;
};
export type BatchJobListSelectQueryResponse = {
    readonly getBatchJobList: {
        readonly token: string;
        readonly batchJobList: ReadonlyArray<{
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
            readonly adActiveStatus: number | null;
            readonly adReachedCountries: number | null;
            readonly adType: number | null;
            readonly impressionCondition: number | null;
            readonly searchTerms: string | null;
            readonly time: string | null;
            readonly created: string | null;
        } | null>;
    } | null;
};
export type BatchJobListSelectQuery = {
    readonly response: BatchJobListSelectQueryResponse;
    readonly variables: BatchJobListSelectQueryVariables;
};



/*
query BatchJobListSelectQuery(
  $authToken: String!
  $limit: Int!
  $page: Int!
) {
  getBatchJobList(authToken: $authToken, limit: $limit, page: $page) {
    token
    batchJobList {
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
      adActiveStatus
      adReachedCountries
      adType
      impressionCondition
      searchTerms
      time
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
            "type": "Int!"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "page",
            "type": "Int!"
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
            "concreteType": "BatchJobListResponse",
            "kind": "LinkedField",
            "name": "getBatchJobList",
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
                    "concreteType": "BatchJob",
                    "kind": "LinkedField",
                    "name": "batchJobList",
                    "plural": true,
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
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "adActiveStatus",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "adReachedCountries",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "adType",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "impressionCondition",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "searchTerms",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "time",
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
            "name": "BatchJobListSelectQuery",
            "selections": (v2 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "BatchJobListSelectQuery",
            "selections": (v2 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "BatchJobListSelectQuery",
            "operationKind": "query",
            "text": "query BatchJobListSelectQuery(\n  $authToken: String!\n  $limit: Int!\n  $page: Int!\n) {\n  getBatchJobList(authToken: $authToken, limit: $limit, page: $page) {\n    token\n    batchJobList {\n      id\n      pageSocial {\n        id\n        internalId\n        name\n        publisherPlatform {\n          idPublisherPlatform\n          valuePublisherPlatform\n        }\n      }\n      adActiveStatus\n      adReachedCountries\n      adType\n      impressionCondition\n      searchTerms\n      time\n      created\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '79d475a749dd27c5441c563ebdd0afe4';
export default node;
