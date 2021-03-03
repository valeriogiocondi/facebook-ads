const RabbitMQ_layer = require('../../rabbitMQ');
const outcomingREST = require('../../rest/outcoming');
const AuthController = require('../../../controller/AuthController');

// const rabbitMQ = redux.getState().saveRabbitObj;

/* 
 * TO SEE SCHEMA
 *  -> express-server/src/frameworks/graphql/resolvers/index.js
 *
 *  TO SEE QUERY (RELAY)
 *  -> react-client/src/_model/relay/query/*.ts
 * 
 */

module.exports = () => {

    return {
        
        Query: {
            
            /* 
            *  LOGIN
            */
            async loginAuth(parent, args, context, info) {

                console.log(args);
                return AuthController.login(args);
            },
            async loginVerify(parent, args, context, info) {

                // console.log(args);
                return AuthController.verify(args);
            },
            async logout(parent, args, context, info) {

                return AuthController.logout(args);
            },

            /* 
            *  ADS
            */
            async adsList() {

                
                console.log("GraphQL - Ads List");
                let response = await outcomingREST.ads.getAll(args.params);
                return {'token': args.authToken, 'adsList': response};
                // let msg = {};
                // msg = JSON.stringify(msg);
            
                // channel.publish(exchange, "ads", Buffer.from(msg));

                // return Controllers.Ads.getAll();
            },
            async adsById(parent, args, context, info) {

                console.log("GraphQL - Ads By ID");
                let response = await outcomingREST.ads.getById(args.params);
                return response;

                // let requestDTO = new AdsRequestDTO({ id: args.id });
                // return Controllers.Ads.getById(requestDTO);
            },

            async exportCsvAdsBySocialPageId(parent, args, context, info) {

                console.log("GraphQL - Ads By Page ID");
                let response = await outcomingREST.pageSocial.getAdsBySocialPageIdExportCSV(args);
                console.log("-----" + JSON.stringify(response))
                return {'token': args.authToken, 'code': response.code, 'payload': response.payload };

                // let requestDTO = new AdsRequestDTO({ pageId: args.pageSocialInternalId });
                // return Controllers.PageSocial.exportCSV(requestDTO);
            },

            async exportCsvAdsByBatchJobId(parent, args, context, info) {

                console.log("GraphQL - Ads By Batch");
                let response = await outcomingREST.batchJob.getCsvAdsByBatch(args);
                // return response;
                return {'token': args.authToken, 'code': response.code, 'payload': response.payload };

                // let requestDTO = new AdsRequestDTO({ batchJobId: args.batchJobId });
                // return Controllers.Ads.getAdsByJobId(requestDTO);
            },

            /* 
            *  FACEBOOK-API
            */
            async getActiveStatusList(parent, args, context, info) {
                
                let response = await outcomingREST.facebookApi.getActiveStatusList();
                return {'token': args.authToken, 'activeStatusList': response};
            },
            async getReachedCountriesList(parent, args, context, info) {
                
                let response = await outcomingREST.facebookApi.getReachedCountriesList();
                return {'token': args.authToken, 'reachedCountriesList': response};
            },
            async getTypeList(parent, args, context, info) {
                
                let response = await outcomingREST.facebookApi.getTypeList();
                return {'token': args.authToken, 'typeList': response};
            },
            async getImpressionConditionList(parent, args, context, info) {
                
                let response = await outcomingREST.facebookApi.getImpressionConditionList();
                return {'token': args.authToken, 'impressionConditionList': response};
            },
            async getPublisherPlatformList(parent, args, context, info) {
                
                let response = await outcomingREST.facebookApi.getPublisherPlatformList();
                return {'token': args.authToken, 'publisherPlatformList': response};
            },

            /* 
            *  BATCH JOB
            */
            async getBatchJobList(parent, args, context, info) {
                
                console.log("GraphQL - Batch Job List");

                let response = await outcomingREST.batchJob.getAll(args);
                return {'token': args.authToken, 'batchJobList': response};
            },
            async getBatchJobById(parent, args, context, info) {

                console.log("GraphQL - Batch Job By ID");
                
                return {
                    'token': args.authToken, 
                    'batchJob': await outcomingREST.batchJob.getById(args), 
                    'adsList': await outcomingREST.batchJob.getAdsByBatchJobId(args),
                };
            },
            async getBatchJobExecutedList(parent, args, context, info) {
                
                console.log("GraphQL - Batch Job Executed List");

                let response = await outcomingREST.batchJobExecuted.getAll(args);
                return {'token': args.authToken, 'batchJobExecutedList': response};
            },
            async getBatchJobExecutedById(parent, args, context, info) {

                console.log("GraphQL - Batch Job Executed By ID");

                return {
                    'token': args.authToken, 
                    'batchJobExecuted': await outcomingREST.batchJobExecuted.getById(args), 
                    'adsList': await outcomingREST.batchJobExecuted.getAdsByJobExecutedId(args),
                };
            },
            
            /* 
            *  PAGE SOCIAL 
            */
            async getPageSocialList(parent, args, context, info) {

                console.log("GraphQL - Page Social List");
                let response = await outcomingREST.pageSocial.getAll(args);
                return {'token': args.authToken, 'pageSocialList': response};
            },
            async getPageSocial(parent, args, context, info) {

                console.log("GraphQL - Ads by Page Social IS");
                let pageSocial = await outcomingREST.pageSocial.getById(args);
                let adsList = await outcomingREST.pageSocial.getAdsBySocialPageId(args);
                return {'token': args.authToken, 'pageSocial': pageSocial, 'adsList': adsList};
            },
        },

        Mutation: {
            async insertBatchJob(parent, args, context, info) {  

                console.log("GraphQL - Insert Batch Job");
                let response = await outcomingREST.batchJob.insert(args.params);
                return response;
            },
            async editBatchJob(parent, args, context, info) {

                console.log("GraphQL - Edit Batch Job");
                let response = await outcomingREST.batchJob.edit(args.params);
                return response;
            },
            async deleteBatchJob(parent, args, context, info) {

                console.log("GraphQL - Delete Batch Job");
                let response = await outcomingREST.batchJob.delete(args.params);
                return response;

                // let requestDTO = new BatchJobRequestDTO(args.params);

                // let responseDTO = Controllers.BatchJob.delete(requestDTO);
                // return responseDTO;
            },
        }
    }
};