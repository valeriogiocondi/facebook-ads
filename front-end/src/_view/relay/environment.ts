import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import config from '../../config';

export default new Environment({

	/* 
     * 	For more information
     *
     *	https://relay.dev/docs/en/relay-environment.html
     *	https://relay.dev/docs/en/network-layer.html
     *  https://relay.dev/docs/en/graphql-server-specification.html
     *
     */

	network: Network.create(
		function(operation, variables) {

			return fetch(config.server.graphql, {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify({
                    query: operation.text,
                    variables,
				}),
			}).then(response => {
				return response.json();
			});
        }
	),
	store: new Store(new RecordSource()),  
});