const redux = require('../frameworks/redux');
const FacebookApiUseCase = require('../application/use_cases/FacebookApiUseCase');

// SERVICES
const serviceREST = require('../frameworks/services/serviceRest');

// RabbitMQ
const RabbitMQ_layer = require('../frameworks/rabbitMQ');

// ENUMS
const activeStatusEnum = require("../entities/enums/ActiveStatusEnum");
const reachedCountriesEnum = require("../entities/enums/ReachedCountriesEnum");
const typeEnum = require("../entities/enums/TypeEnum");
const impressionConditionEnum = require("../entities/enums/ImpressionConditionEnum");
const publisherPlatformEnum = require("../entities/enums/PublisherPlatformEnum");


class FacebookApiController {
    
    async getPageName(requestDTO) {

        let params = {
            "search_page_ids": requestDTO.pageInternalId,
            "ad_active_status": "ALL",
            "ad_reached_countries": reachedCountriesEnum[requestDTO.adReachedCountries - 1].valueReachedCountries,
        };

        return FacebookApiUseCase.getPageName(params).then((response) => {

            if (response.data && response.data.length > 0)
                return response.data[0].page_name;
            else
                return "";
        });
    }

    async getAdsList(params) {
        
        /* 
         *  Fetch data from Facebook API 
         *
         *  $params:
         *
         *  { 
         *      search_page_ids: '153080620724',
         *      publisher_platforms: '1',
         *      ad_active_status: '2',
         *      ad_reached_countries: '3',
         *      ad_type: '4',
         *      impression_condition: '1' 
         *  }
         */

        // TODO
        // Delete mock
        if (Object.keys(params).length == 0) {
            
            params = { 
                search_page_ids: '153080620724',
                publisher_platforms: '0',
                ad_active_status: '1',
                ad_reached_countries: '2',
                ad_type: '3',
                impression_condition: '0',
                batch_job_id: '1',
            };
            // throw new Error();   
        }

        params.ad_active_status =         activeStatusEnum[+params.ad_active_status].valueActiveStatus;
        params.ad_reached_countries =     reachedCountriesEnum[+params.ad_reached_countries].valueReachedCountries;
        params.ad_type =                  typeEnum[+params.ad_type].valueType;
        params.impression_condition =     impressionConditionEnum[+params.impression_condition].valueImpressionCondition;
        params.publisher_platforms =      publisherPlatformEnum[+params.publisher_platforms].valuePublisherPlatform.toUpperCase();


        // search_page_ids=153080620724&
        // ad_active_status=ALL&
        // ad_type=POLITICAL_AND_ISSUE_ADS&
        // ad_reached_countries=US&
        // publisher_platforms=FACEBOOK&limit=25
        // &after=c2NyYXBpbmdfY3Vyc29yOk1UWXdOREEzTXpFeU5UbzBOVEV6TkRnM05Ea3hOamsyT0RZAPQZDZD

        /* 
         *  save ads list into DB
         *  call FB-api to get more ads
         *
         *  recursive function
         */
        let saveAdsPagination = async (adsPayload, batchJobId) => {

            /* 
             * Check if ADS are already in DB
             * 
             */

            let requestBO = {
                ads_id_list: adsPayload.data.map(item => item.id),
                batch_job_id: batchJobId
            };
            
            // Get all ADS with this $batchJobId
            let responseMessage = await RabbitMQ_layer.joinWith("ads.check", { body: requestBO } );
            
            // excluding ads already saved in DB
            let adsToSave = 
                    adsPayload.data
                        .filter(item => !responseMessage.payload.includes(item.id))
                        .map((item) => {
                            item.batch_job_id = batchJobId; 
                            return item;
                        });

            if (adsToSave.length > 0) {

                /* 

                *  TODO
                *  The response.data must be
                *
                *  page_id
                *  page_name
                *  ads_list
                */
                await RabbitMQ_layer.joinWith("ads.save", { body: adsToSave } );
    
                /* 
                 *  Get next ADS
                 *
                 *  FB-URL adsPayload.paging.next
                 *
                 */
                if (adsPayload.paging) {  
    
                    serviceREST.get(adsPayload.paging.next).then((response) => {
    
                        saveAdsPagination(response);
                    });
                }
            }
        };

        return FacebookApiUseCase.getAdsList(params).then((response) => {

            if (response.error) {
                
                console.error(response.error);
                // throw response.error;
                return response.error;

                // TODO
                // Return response.error
                    
                /* 
                *    {
                *        "error":{
                *            "message":"Error validating access token: Session has expired on Wednesday, 06-May-20 15:00:00 PDT. The current time is Thursday, 07-May-20 13:29:02 PDT.",
                *            "type":"OAuthException",
                *            "code":190,
                *            "error_subcode":463,
                *            "fbtrace_id":"A8Avc6cIW8-q9WjnPfE0zdD"
                *        }
                *    }
                */

                /*  
                 *    {
                 *        "error": {
                 *            "message": 'Failed to pass parameter validation.',
                 *            "type": 'OAuthException',
                 *            "code": 1009,
                 *            "error_subcode": 2334020,
                 *            "is_transient": false,
                 *            "error_user_title": 'Invalid Parameter',
                 *            "error_user_msg": 'The specified ad_type param is invalid, current supported values are: POLITICAL_AND_ISSUE_ADS',
                 *            "fbtrace_id": 'AIg8t813Rahcrt6hbBAQGmS' 
                 *        }
                 *    }
                */
            }

            if (response.data) {
                
                /* 
                *  SAVE JOB AS EXECUTED 
                */
                try {

                    let job = { 
                        batchJobId: params.batch_job_id,
                        pageSocialId: params.page_social_id,
                        byBatch: params.by_batch,
                    };

                    RabbitMQ_layer.joinWith( "batch-job.executed.save", { body: job } );
                    
                } catch (err) {

                    console.error(err);
                }
                
                /* 
                 *  SAVE ADS 
                 */
                saveAdsPagination(response, params.batch_job_id);
            }
            
            // TODO
            // Handle DTO Error, maybe inside AdsDTOMapperResponse
            return response.data;

        }).catch((err) => {

            console.error("Error in controller facebookApi.js - at FacebookApiUseCase.getAdsList => " + JSON.stringify(err));
        });
    };
    
    getActiveStatus() {

        return activeStatusEnum;
    }
    
    getReachedCountries() {

        return reachedCountriesEnum;
    }
    
    getType() {

        return typeEnum;
    }
    
    getImpressionCondition() {

        return impressionConditionEnum;
    }
    
    getPublisherPlatform() {

        return publisherPlatformEnum;
    }
};

module.exports = new FacebookApiController();