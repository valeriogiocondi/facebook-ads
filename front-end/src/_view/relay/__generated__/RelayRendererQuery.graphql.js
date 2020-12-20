/**
 * @flow
 * @relayHash 843d597a02aa8020d516417e39e27009
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type RelayRendererQueryVariables = {||};
export type RelayRendererQueryResponse = {|
  +adsById: ?{|
    +id: ?string,
    +currency: ?string,
  |},
  +adsList: ?$ReadOnlyArray<?{|
    +id: ?string,
    +currency: ?string,
  |}>,
  +countryStateList: ?$ReadOnlyArray<?{|
    +name: ?string,
    +code: ?string,
    +country: string,
  |}>,
  +countryList: ?$ReadOnlyArray<?{|
    +country: ?string,
    +numeric: ?string,
  |}>,
|};
export type RelayRendererQuery = {|
  variables: RelayRendererQueryVariables,
  response: RelayRendererQueryResponse,
|};
*/


/*
query RelayRendererQuery {
  adsById(id: "5e960f15f1e87526ec7c2ca6") {
    id
    currency
  }
  adsList {
    id
    currency
  }
  countryStateList {
    name
    code
    country
  }
  countryList {
    country
    numeric
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "id",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "currency",
    "args": null,
    "storageKey": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "country",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "adsById",
    "storageKey": "adsById(id:\"5e960f15f1e87526ec7c2ca6\")",
    "args": [
      {
        "kind": "Literal",
        "name": "id",
        "value": "5e960f15f1e87526ec7c2ca6"
      }
    ],
    "concreteType": "Ads",
    "plural": false,
    "selections": (v0/*: any*/)
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "adsList",
    "storageKey": null,
    "args": null,
    "concreteType": "Ads",
    "plural": true,
    "selections": (v0/*: any*/)
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "countryStateList",
    "storageKey": null,
    "args": null,
    "concreteType": "CountryState",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "code",
        "args": null,
        "storageKey": null
      },
      (v1/*: any*/)
    ]
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "countryList",
    "storageKey": null,
    "args": null,
    "concreteType": "Country",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "numeric",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RelayRendererQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "RelayRendererQuery",
    "argumentDefinitions": [],
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "RelayRendererQuery",
    "id": null,
    "text": "query RelayRendererQuery {\n  adsById(id: \"5e960f15f1e87526ec7c2ca6\") {\n    id\n    currency\n  }\n  adsList {\n    id\n    currency\n  }\n  countryStateList {\n    name\n    code\n    country\n  }\n  countryList {\n    country\n    numeric\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ae018c9ceb4930417799df1ba479b05e';

module.exports = node;
