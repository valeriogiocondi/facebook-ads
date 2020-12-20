/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type PageSocialListSelectQueryVariables = {
    authToken: string;
    limit: number;
    page: number;
};
export type PageSocialListSelectQueryResponse = {
    readonly getPageSocialList: {
        readonly token: string;
        readonly pageSocialList: ReadonlyArray<{
            readonly id: string;
            readonly internalId: string;
            readonly name: string;
            readonly publisherPlatform: {
                readonly idPublisherPlatform: string;
                readonly valuePublisherPlatform: string;
            };
        } | null>;
    } | null;
};
export type PageSocialListSelectQuery = {
    readonly response: PageSocialListSelectQueryResponse;
    readonly variables: PageSocialListSelectQueryVariables;
};



/*
query PageSocialListSelectQuery(
  $authToken: String!
  $limit: Int!
  $page: Int!
) {
  getPageSocialList(authToken: $authToken, limit: $limit, page: $page) {
    token
    pageSocialList {
      id
      internalId
      name
      publisherPlatform {
        idPublisherPlatform
        valuePublisherPlatform
      }
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
            "concreteType": "PageSocialListResponse",
            "kind": "LinkedField",
            "name": "getPageSocialList",
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
                    "name": "pageSocialList",
                    "plural": true,
                    "selections": [
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
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "PageSocialListSelectQuery",
            "selections": (v1 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "PageSocialListSelectQuery",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "PageSocialListSelectQuery",
            "operationKind": "query",
            "text": "query PageSocialListSelectQuery(\n  $authToken: String!\n  $limit: Int!\n  $page: Int!\n) {\n  getPageSocialList(authToken: $authToken, limit: $limit, page: $page) {\n    token\n    pageSocialList {\n      id\n      internalId\n      name\n      publisherPlatform {\n        idPublisherPlatform\n        valuePublisherPlatform\n      }\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '568d336343f4fc0fa3bf581e1edc9dc5';
export default node;
