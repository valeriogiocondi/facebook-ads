/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type AdsSelectQueryVariables = {
    adsId: string;
};
export type AdsSelectQueryResponse = {
    readonly adsById: {
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
        readonly fundingEntity: string | null;
        readonly pageId: string | null;
        readonly pageName: string | null;
        readonly impressions: {
            readonly lowerBound: string | null;
            readonly upperBound: string | null;
        } | null;
        readonly publisherPlatforms: ReadonlyArray<string | null> | null;
        readonly demographicDistribution: ReadonlyArray<{
            readonly percentage: string | null;
            readonly age: string | null;
            readonly gender: string | null;
        } | null> | null;
        readonly spend: {
            readonly lowerBound: string | null;
            readonly upperBound: string | null;
        } | null;
        readonly created: string | null;
    } | null;
};
export type AdsSelectQuery = {
    readonly response: AdsSelectQueryResponse;
    readonly variables: AdsSelectQueryVariables;
};



/*
query AdsSelectQuery(
  $adsId: ID!
) {
  adsById(id: $adsId) {
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
    fundingEntity
    pageId
    pageName
    impressions {
      lowerBound
      upperBound
    }
    publisherPlatforms
    demographicDistribution {
      percentage
      age
      gender
    }
    spend {
      lowerBound
      upperBound
    }
    created
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "adsId",
            "type": "ID!"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lowerBound",
            "storageKey": null
        } as any),
        ({
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "upperBound",
            "storageKey": null
        } as any)
    ], v2 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "adsId"
                }
            ],
            "concreteType": "Ads",
            "kind": "LinkedField",
            "name": "adsById",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "_id",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                },
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
                    "name": "fundingEntity",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "pageId",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "pageName",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "AdsImpressions",
                    "kind": "LinkedField",
                    "name": "impressions",
                    "plural": false,
                    "selections": (v1 /*: any*/),
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
                    "concreteType": "AdsDemographicDistribution",
                    "kind": "LinkedField",
                    "name": "demographicDistribution",
                    "plural": true,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "percentage",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "age",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "gender",
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "AdsSpend",
                    "kind": "LinkedField",
                    "name": "spend",
                    "plural": false,
                    "selections": (v1 /*: any*/),
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
            "name": "AdsSelectQuery",
            "selections": (v2 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "AdsSelectQuery",
            "selections": (v2 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "AdsSelectQuery",
            "operationKind": "query",
            "text": "query AdsSelectQuery(\n  $adsId: ID!\n) {\n  adsById(id: $adsId) {\n    _id\n    id\n    adCreationTime\n    adCreativeBody\n    adCreativeLinkCaption\n    adCreativeLinkDescription\n    adCreativeLinkTitle\n    adDeliveryStartTime\n    adSnapshotUrl\n    currency\n    fundingEntity\n    pageId\n    pageName\n    impressions {\n      lowerBound\n      upperBound\n    }\n    publisherPlatforms\n    demographicDistribution {\n      percentage\n      age\n      gender\n    }\n    spend {\n      lowerBound\n      upperBound\n    }\n    created\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '12828272a5dbe27bd0cbdc4f6cce8473';
export default node;
