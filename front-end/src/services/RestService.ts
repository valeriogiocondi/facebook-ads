import HttpResponse from '../_model/types/http-response';
const axios = require('axios');

class RestService  {

    async get(url: string, params?: any): Promise<any> {

        let composeUrl = (url: string, params: any) => {
            
            url += "?";

            for (let [key, value] of Object.entries(params)) {
                
                if (value !== null)
                    if (typeof value === "object")
                        url += key+"="+JSON.stringify(value)+"&";
                    else
                        url += key+"="+value+"&";
            }
            return url.substr(0, url.length-1);
        }

        if (url != "") {

            url = composeUrl(url, params);

            return new Promise((resolve, reject) => {
            
                fetch(url, {
                    method: 'GET'
                })
                .then(response => {

                    response.json().then((res) => {

                        resolve(JSON.stringify(res));
                    });
                });
            });
        }

        return new Promise((resolve, reject) => {

            reject();
        });
    }

    async post(url: string, data?: any, async?: boolean, callback?: Function): Promise<any> {

        if (url != "") {

            if (async)
                return axios
                    .post(url, data)
                    .then(function (response: any) {
                
                        if (callback)
                            callback(response);
                    })
                    .catch(function (error: any) {
                
                        console.log(error);
                    })
                ;

                return await axios
                    .post(url, data)
                    .then(function (response: any) {
                
                        if (callback)
                            callback(response);
                    })
                    .catch(function (error: any) {
                
                        console.log(error);
                    })
                ;
        
            // return new Promise((resolve, reject) => {
            
            //     fetch(url, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(params),
            //     })
            //     .then(response => resolve(response.json()))
            //     ;
            // });
        }
        
        return new Promise((resolve, reject) => {

            reject();
        });
    }

    parseResponse(xhr: XMLHttpRequest): HttpResponse {

        return {
            statusCode: xhr.status,
            statusText: xhr.statusText,
            payload: xhr.responseText,
        }
    }
}


// SINGLETON
// Export an instance of the class directly
export default new RestService();