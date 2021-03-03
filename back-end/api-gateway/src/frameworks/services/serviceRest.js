const http = require('http');

class serviceREST {

    constructor() {
    }

    async request(options) {

        return new Promise((resolve, reject) => {

            let requestHTTP = http.request(options, function(res) {

                /* 
                 *  the response stream's (an instance of Stream) current data. See:
                 *  
                 *  https://nodejs.org/api/stream.html#stream_event_data 
                 * 
                 */

                var responseBody = '';

                if (res.status >= 400) {
                    reject(`Request to ${res.url} failed with HTTP ${res.status}`);
                }

                res.setEncoding('utf8');
                
                res.on('data', (chunk) => {
                    
                    responseBody += chunk.toString()
                });

                res.on('end', () => {
                    
                    resolve(JSON.parse(responseBody));
                });
            });

            if (options.body)
                requestHTTP.write(options.body);

            // try {
                requestHTTP.on("error", (err) => {
                    
                    console.error(err)
                    // throw err;
                });

            // } catch(e) {

            //     console.error("Connection refused!")
            // }
            requestHTTP.end();
        });
    };

};

// SINGLETON
// we need just an instance
module.exports = new serviceREST();