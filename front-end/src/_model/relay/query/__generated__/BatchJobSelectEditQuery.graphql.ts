/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type BatchJobSelectEditQueryVariables = {
    authToken: string;
    id: string;
};
export type BatchJobSelectEditQueryResponse = {
    readonly getBatchJobById: {
        readonly token: string;
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
            readonly adActiveStatus: number | null;
            readonly adReachedCountries: number | null;
            readonly adType: number | null;
            readonly impressionCondition: number | null;
            readonly searchTerms: string | null;
            readonly time: string | null;
            readonly created: string | null;
        };
        readonly adsList: ReadonlyArray<{
            readonly _id: string | null;
            readonly id: string | null;
            readonly adCreationTime: string | null;
            readonly adCreativeBody: string | null;
            readonly adCreativeLinkCaption: string | null;
            readonly adCreativeLinkDescription: string | null;
            readonly adCreativeLinkTitle: string | null;
            readonly adDeliveryStartTime: string | null;
            readonly adSnapshotUrl: string | null;
            readonly currency: string | null;
            readonly publisherPlatforms: ReadonlyArray<string | null> | null;
            readonly spend: {
                readonly lowerBound: string | null;
                readonly upperBound: string | null;
            } | null;
            readonly created: string | null;
        } | null> | null;
    } | null;
    readonly getActiveStatusList: {
        readonly token: string;
        readonly activeStatusList: ReadonlyArray<{
            readonly idActiveStatus: string;
            readonly valueActiveStatus: string;
        } | null>;
    } | null;
    readonly getReachedCountriesList: {
        readonly token: string;
        readonly reachedCountriesList: ReadonlyArray<{
            readonly idReachedCountries: string;
            readonly valueReachedCountries: string;
        } | null>;
    } | null;
    readonly getTypeList: {
        readonly token: string;
        readonly typeList: ReadonlyArray<{
            readonly idType: string;
            readonly valueType: string;
        } | null>;
    } | null;
    readonly getImpressionConditionList: {
        readonly token: string;
        readonly impressionConditionList: ReadonlyArray<{
            readonly idImpressionCondition: string;
            readonly valueImpressionCondition: string;
        } | null>;
    } | null;
    readonly getPublisherPlatformList: {
        readonly token: string;
        readonly publisherPlatformList: ReadonlyArray<{
            readonly idPublisherPlatform: string;
            readonly valuePublisherPlatform: string;
        } | null>;
    } | null;
};
export type BatchJobSelectEditQuery = {
    readonly response: BatchJobSelectEditQueryResponse;
    readonly variables: BatchJobSelectEditQueryVariables;
};



/*
query BatchJobSelectEditQuery(
  $authToken: String!
  $id: ID!
) {
  getBatchJobById(authToken: $authToken, id: $id) {
    token
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
      adActiveStatus
      adReachedCountries
      adType
      impressionCondition
      searchTerms
      time
      created
    }
    adsList {
      _id
      id
      adCreationTime
      adCreativeBody
      adCreativeLinkCaption
      adCreativeLinkDescription
      adCreativeLinkTitle
      adDeliveryStartTime
      adSnapshotUrl
      currency
      publisherPlatforms
      spend {
        lowerBound
        upperBound
      }
      created
    }
  }
  getActiveStatusList(authToken: $authToken) {
    token
    activeStatusList {
      idActiveStatus
      valueActiveStatus
    }
  }
  getReachedCountriesList(authToken: $authToken) {
    token
    reachedCountriesList {
      idReachedCountries
      valueReachedCountries
    }
  }
  getTypeList(authToken: $authToken) {
    token
    typeList {
      idType
      valueType
    }
  }
  getImpressionConditionList(authToken: $authToken) {
    token
    impressionConditionList {
      idImpressionCondition
      valueImpressionCondition
    }
  }
  getPublisherPlatformList(authToken: $authToken) {
    token
    publisherPlatformList {
      idPublisherPlatform
      valuePublisherPlatform
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
            "name": "id",
            "type": "ID!"
        } as any)
    ], v1 = ({
        "kind": "Variable",
        "name": "authToken",
        "variableName": "authToken"
    } as any), v2 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
    } as any), v3 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any), v4 = [
        ({
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "idPublisherPlatform",
            "storageKey": null
        } as any),
        ({
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "valuePublisherPlatform",
            "storageKey": null
        } as any)
    ], v5 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "created",
        "storageKey": null
    } as any), v6 = [
        (v1 /*: any*/)
    ], v7 = [
        ({
            "alias": null,
            "args": [
                (v1 /*: any*/),
                {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "id"
                }
            ],
            "concreteType": "BatchJobResponse",
            "kind": "LinkedField",
            "name": "getBatchJobById",
            "plural": false,
            "selections": [
                (v2 /*: any*/),
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "BatchJob",
                    "kind": "LinkedField",
                    "name": "batchJob",
                    "plural": false,
                    "selections": [
                        (v3 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "PageSocial",
                            "kind": "LinkedField",
                            "name": "pageSocial",
                            "plural": false,
                            "selections": [
                                (v3 /*: any*/),
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
                                    "selections": (v4 /*: any*/),
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
                        (v5 /*: any*/)
                    ],
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "Ads",
                    "kind": "LinkedField",
                    "name": "adsList",
                    "plural": true,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "_id",
                            "storageKey": null
                        },
                        (v3 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "adCreationTime",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "adCreativeBody",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "adCreativeLinkCaption",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "adCreativeLinkDescription",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "adCreativeLinkTitle",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "adDeliveryStartTime",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "adSnapshotUrl",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "currency",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "publisherPlatforms",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "AdsSpend",
                            "kind": "LinkedField",
                            "name": "spend",
                            "plural": false,
                            "selections": [
                                {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "lowerBound",
                                    "storageKey": null
                                },
                                {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "upperBound",
                                    "storageKey": null
                                }
                            ],
                            "storageKey": null
                        },
                        (v5 /*: any*/)
                    ],
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any),
        ({
            "alias": null,
            "args": (v6 /*: any*/),
            "concreteType": "ActiveStatusResponse",
            "kind": "LinkedField",
            "name": "getActiveStatusList",
            "plural": false,
            "selections": [
                (v2 /*: any*/),
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "ActiveStatus",
                    "kind": "LinkedField",
                    "name": "activeStatusList",
                    "plural": true,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "idActiveStatus",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "valueActiveStatus",
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any),
        ({
            "alias": null,
            "args": (v6 /*: any*/),
            "concreteType": "ReachedCountriesResponse",
            "kind": "LinkedField",
            "name": "getReachedCountriesList",
            "plural": false,
            "selections": [
                (v2 /*: any*/),
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "ReachedCountries",
                    "kind": "LinkedField",
                    "name": "reachedCountriesList",
                    "plural": true,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "idReachedCountries",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "valueReachedCountries",
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any),
        ({
            "alias": null,
            "args": (v6 /*: any*/),
            "concreteType": "TypeResponse",
            "kind": "LinkedField",
            "name": "getTypeList",
            "plural": false,
            "selections": [
                (v2 /*: any*/),
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "Type",
                    "kind": "LinkedField",
                    "name": "typeList",
                    "plural": true,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "idType",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "valueType",
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any),
        ({
            "alias": null,
            "args": (v6 /*: any*/),
            "concreteType": "ImpressionConditionResponse",
            "kind": "LinkedField",
            "name": "getImpressionConditionList",
            "plural": false,
            "selections": [
                (v2 /*: any*/),
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "ImpressionCondition",
                    "kind": "LinkedField",
                    "name": "impressionConditionList",
                    "plural": true,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "idImpressionCondition",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "valueImpressionCondition",
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any),
        ({
            "alias": null,
            "args": (v6 /*: any*/),
            "concreteType": "PublisherPlatformResponse",
            "kind": "LinkedField",
            "name": "getPublisherPlatformList",
            "plural": false,
            "selections": [
                (v2 /*: any*/),
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "PublisherPlatform",
                    "kind": "LinkedField",
                    "name": "publisherPlatformList",
                    "plural": true,
                    "selections": (v4 /*: any*/),
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
            "name": "BatchJobSelectEditQuery",
            "selections": (v7 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "BatchJobSelectEditQuery",
            "selections": (v7 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "BatchJobSelectEditQuery",
            "operationKind": "query",
            "text": "query BatchJobSelectEditQuery(\n  $authToken: String!\n  $id: ID!\n) {\n  getBatchJobById(authToken: $authToken, id: $id) {\n    token\n    batchJob {\n      id\n      pageSocial {\n        id\n        internalId\n        name\n        publisherPlatform {\n          idPublisherPlatform\n          valuePublisherPlatform\n        }\n      }\n      adActiveStatus\n      adReachedCountries\n      adType\n      impressionCondition\n      searchTerms\n      time\n      created\n    }\n    adsList {\n      _id\n      id\n      adCreationTime\n      adCreativeBody\n      adCreativeLinkCaption\n      adCreativeLinkDescription\n      adCreativeLinkTitle\n      adDeliveryStartTime\n      adSnapshotUrl\n      currency\n      publisherPlatforms\n      spend {\n        lowerBound\n        upperBound\n      }\n      created\n    }\n  }\n  getActiveStatusList(authToken: $authToken) {\n    token\n    activeStatusList {\n      idActiveStatus\n      valueActiveStatus\n    }\n  }\n  getReachedCountriesList(authToken: $authToken) {\n    token\n    reachedCountriesList {\n      idReachedCountries\n      valueReachedCountries\n    }\n  }\n  getTypeList(authToken: $authToken) {\n    token\n    typeList {\n      idType\n      valueType\n    }\n  }\n  getImpressionConditionList(authToken: $authToken) {\n    token\n    impressionConditionList {\n      idImpressionCondition\n      valueImpressionCondition\n    }\n  }\n  getPublisherPlatformList(authToken: $authToken) {\n    token\n    publisherPlatformList {\n      idPublisherPlatform\n      valuePublisherPlatform\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '3076f71bef886f5f077e36a4396b709f';
export default node;
