const https = require('https');

class serviceREST {

    constructor() {
    }

    async get(url) {

        return new Promise((resolve, reject) => {

            console.log(url)
            console.log("\n\n\n")

            https.get(url, (res) => {
                
                const hasResponseFailed = res.status >= 400;
                var responseBody = '';

                if (hasResponseFailed) {
                    reject(`Request to ${res.url} failed with HTTP ${res.status}`);
                }

                /* 
                 *  the response stream's (an instance of Stream) current data. See:
                 *  
                 *  https://nodejs.org/api/stream.html#stream_event_data 
                 * 
                 */
                res.on('data', chunk => responseBody += chunk.toString());

                // once all the data has been read, resolve the Promise 
                res.on('end', () => {
                    
                    resolve(JSON.parse(responseBody));
                });
                
            }).on("error", (err) => {
                
                console.error("Error in serviceREST serviceRest.js - at serviceRest.get: " + err);
                throw err;
            });

        });

    };

    post() {

    };

};

// SINGLETON
// we need just an instance
module.exports = new serviceREST();