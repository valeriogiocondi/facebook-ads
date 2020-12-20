const config = require('../../config/facebook-api');
const serviceREST = require('./serviceRest');

class FacebookApiService {

    constructor() {
        
        // TODO
        // Move url and accessToken in configFile

        this.fields = "id,ad_creation_time,ad_creative_body,ad_creative_link_caption,ad_creative_link_description,ad_creative_link_title,ad_delivery_start_time,ad_delivery_stop_time,ad_snapshot_url,currency,demographic_distribution,funding_entity,impressions,page_id,page_name,publisher_platforms,region_distribution,spend";
    }

    _composeURL(params, type_field) {

        let newURL = config.url;
        newURL += "access_token="+config.accessToken+"&";

        if (type_field === "all")
            newURL += "fields=" + this.fields + "&";
        else
            newURL += "fields=" + type_field + "&";

        if (params) {

            for (let [key, value] of Object.entries(params)) {
                    
                if (value)
                    newURL += (key+"="+value+"&");
            }
        }
        return newURL.substr(0, newURL.length-1);
    }

    async getPageName(params) {
        
        try {

            let url = this._composeURL(params, "page_name");

            // TODO
            // Use an object to respond

            let res = await serviceREST.get(url);

            // console.log(res);

            return res;

        } catch (err) {
            
            throw new Error('Error occurred in service/facebookApi.js at FacebookApiService.getAdsList(): ' + err);
        }
    }

    async getAdsList(params) {
        
        try {

            let url = this._composeURL(params, "all");

            // TODO
            // Use an object to respond

            //     // let response: HttpResponse = {
            //     //     statusCode: 200,
            //     //     statusText: "200",
            //     //     payload: fakeApi,
            //     // };

            return await serviceREST.get(url);

        } catch (err) {
            
            throw new Error('Error occurred in service/facebookApi.js at FacebookApiService.getAdsList(): ' + err);
        }
    }
};

module.exports = new FacebookApiService;