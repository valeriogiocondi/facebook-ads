/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type PageSocialSelectQueryVariables = {
    authToken: string;
    pageID: string;
    pageInternalID: string;
};
export type PageSocialSelectQueryResponse = {
    readonly getAdsBySocialPageId: {
        readonly token: string;
        readonly pageSocial: {
            readonly id: string;
            readonly internalId: string;
            readonly name: string;
            readonly publisherPlatform: {
                readonly idPublisherPlatform: string;
                readonly valuePublisherPlatform: string;
            };
        };
        readonly ads: ReadonlyArray<{
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
            readonly publisherPlatforms: ReadonlyArray<string | null> | null;
            readonly created: string | null;
        } | null>;
    } | null;
};
export type PageSocialSelectQuery = {
    readonly response: PageSocialSelectQueryResponse;
    readonly variables: PageSocialSelectQueryVariables;
};



/*
query PageSocialSelectQuery(
  $authToken: String!
  $pageID: ID!
  $pageInternalID: ID!
) {
  getAdsBySocialPageId(authToken: $authToken, id: $pageID, internalID: $pageInternalID) {
    token
    pageSocial {
      id
      internalId
      name
      publisherPlatform {
        idPublisherPlatform
        valuePublisherPlatform
      }
    }
    ads {
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
      publisherPlatforms
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
            "name": "pageID",
            "type": "ID!"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "pageInternalID",
            "type": "ID!"
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
                    "name": "id",
                    "variableName": "pageID"
                },
                {
                    "kind": "Variable",
                    "name": "internalID",
                    "variableName": "pageInternalID"
                }
            ],
            "concreteType": "PageSocialAdsResponse",
            "kind": "LinkedField",
            "name": "getAdsBySocialPageId",
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
                    "concreteType": "Ads",
                    "kind": "LinkedField",
                    "name": "ads",
                    "plural": true,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "_id",
                            "storageKey": null
                        },
                        (v1 /*: any*/),
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
                            "kind": "ScalarField",
                            "name": "publisherPlatforms",
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
            "name": "PageSocialSelectQuery",
            "selections": (v2 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "PageSocialSelectQuery",
            "selections": (v2 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "PageSocialSelectQuery",
            "operationKind": "query",
            "text": "query PageSocialSelectQuery(\n  $authToken: String!\n  $pageID: ID!\n  $pageInternalID: ID!\n) {\n  getAdsBySocialPageId(authToken: $authToken, id: $pageID, internalID: $pageInternalID) {\n    token\n    pageSocial {\n      id\n      internalId\n      name\n      publisherPlatform {\n        idPublisherPlatform\n        valuePublisherPlatform\n      }\n    }\n    ads {\n      _id\n      id\n      adCreationTime\n      adCreativeBody\n      adCreativeLinkCaption\n      adCreativeLinkDescription\n      adCreativeLinkTitle\n      adDeliveryStartTime\n      adSnapshotUrl\n      currency\n      fundingEntity\n      pageId\n      pageName\n      publisherPlatforms\n      created\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'c00c5083c9bc81b83de62e659d8f9839';
export default node;
