/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type BatchJobInput = {
    id: string;
    pageId?: number | null;
    pageInternalId?: string | null;
    publisherPlatformId?: number | null;
    adActiveStatus?: number | null;
    adReachedCountries?: number | null;
    adType?: number | null;
    impressionCondition?: number | null;
    searchTerms?: string | null;
    time?: string | null;
    created?: string | null;
};
export type BatchJobInsertQueryVariables = {
    params: BatchJobInput;
};
export type BatchJobInsertQueryResponse = {
    readonly insertBatchJob: {
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
    } | null;
};
export type BatchJobInsertQuery = {
    readonly response: BatchJobInsertQueryResponse;
    readonly variables: BatchJobInsertQueryVariables;
};



/*
mutation BatchJobInsertQuery(
  $params: BatchJobInput!
) {
  insertBatchJob(params: $params) {
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
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "params",
            "type": "BatchJobInput!"
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
                    "name": "params",
                    "variableName": "params"
                }
            ],
            "concreteType": "BatchJob",
            "kind": "LinkedField",
            "name": "insertBatchJob",
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
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "BatchJobInsertQuery",
            "selections": (v2 /*: any*/),
            "type": "Mutation"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "BatchJobInsertQuery",
            "selections": (v2 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "BatchJobInsertQuery",
            "operationKind": "mutation",
            "text": "mutation BatchJobInsertQuery(\n  $params: BatchJobInput!\n) {\n  insertBatchJob(params: $params) {\n    id\n    pageSocial {\n      id\n      internalId\n      name\n      publisherPlatform {\n        idPublisherPlatform\n        valuePublisherPlatform\n      }\n    }\n    adActiveStatus\n    adReachedCountries\n    adType\n    impressionCondition\n    searchTerms\n    time\n    created\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '0dcd7837d760e8ef4056437f015fa0ca';
export default node;
