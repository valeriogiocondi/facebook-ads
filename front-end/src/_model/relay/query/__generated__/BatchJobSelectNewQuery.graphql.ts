/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type BatchJobSelectNewQueryVariables = {
    authToken: string;
};
export type BatchJobSelectNewQueryResponse = {
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
export type BatchJobSelectNewQuery = {
    readonly response: BatchJobSelectNewQueryResponse;
    readonly variables: BatchJobSelectNewQueryVariables;
};



/*
query BatchJobSelectNewQuery(
  $authToken: String!
) {
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
        } as any)
    ], v1 = [
        ({
            "kind": "Variable",
            "name": "authToken",
            "variableName": "authToken"
        } as any)
    ], v2 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
    } as any), v3 = [
        ({
            "alias": null,
            "args": (v1 /*: any*/),
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
            "args": (v1 /*: any*/),
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
            "args": (v1 /*: any*/),
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
            "args": (v1 /*: any*/),
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
            "args": (v1 /*: any*/),
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
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "BatchJobSelectNewQuery",
            "selections": (v3 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "BatchJobSelectNewQuery",
            "selections": (v3 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "BatchJobSelectNewQuery",
            "operationKind": "query",
            "text": "query BatchJobSelectNewQuery(\n  $authToken: String!\n) {\n  getActiveStatusList(authToken: $authToken) {\n    token\n    activeStatusList {\n      idActiveStatus\n      valueActiveStatus\n    }\n  }\n  getReachedCountriesList(authToken: $authToken) {\n    token\n    reachedCountriesList {\n      idReachedCountries\n      valueReachedCountries\n    }\n  }\n  getTypeList(authToken: $authToken) {\n    token\n    typeList {\n      idType\n      valueType\n    }\n  }\n  getImpressionConditionList(authToken: $authToken) {\n    token\n    impressionConditionList {\n      idImpressionCondition\n      valueImpressionCondition\n    }\n  }\n  getPublisherPlatformList(authToken: $authToken) {\n    token\n    publisherPlatformList {\n      idPublisherPlatform\n      valuePublisherPlatform\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '01f148bbca28fde29738e8a4276cf2e0';
export default node;
