/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type AdsListSelectQueryVariables = {
    authToken: string;
    limit?: number | null;
    page?: number | null;
};
export type AdsListSelectQueryResponse = {
    readonly adsList: {
        readonly token: string;
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
            readonly fundingEntity: string | null;
            readonly pageId: string | null;
            readonly pageName: string | null;
        } | null>;
    } | null;
};
export type AdsListSelectQuery = {
    readonly response: AdsListSelectQueryResponse;
    readonly variables: AdsListSelectQueryVariables;
};



/*
query AdsListSelectQuery(
  $authToken: String!
  $limit: Int
  $page: Int
) {
  adsList(authToken: $authToken, limit: $limit, page: $page) {
    token
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
      fundingEntity
      pageId
      pageName
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
                    "name": "limit",
                    "variableName": "limit"
                },
                {
                    "kind": "Variable",
                    "name": "page",
                    "variableName": "page"
                }
            ],
            "concreteType": "AdsListResponse",
            "kind": "LinkedField",
            "name": "adsList",
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
            "name": "AdsListSelectQuery",
            "selections": (v1 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "AdsListSelectQuery",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "AdsListSelectQuery",
            "operationKind": "query",
            "text": "query AdsListSelectQuery(\n  $authToken: String!\n  $limit: Int\n  $page: Int\n) {\n  adsList(authToken: $authToken, limit: $limit, page: $page) {\n    token\n    adsList {\n      _id\n      id\n      adCreationTime\n      adCreativeBody\n      adCreativeLinkCaption\n      adCreativeLinkDescription\n      adCreativeLinkTitle\n      adDeliveryStartTime\n      adSnapshotUrl\n      currency\n      fundingEntity\n      pageId\n      pageName\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '6420190ba9372cba010c48ffeef65adc';
export default node;
