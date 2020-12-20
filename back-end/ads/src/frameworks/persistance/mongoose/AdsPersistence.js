const IAds = require('../../../application/contracts/IAds');
const ModelAds = require('../../../entities/mongoose/Ads');
const AdsResponseBO = require('../../../entities/response/bo/AdsResponseBO');

class AdsPersistence extends IAds {

    /* 
     *  Get all ads
     *
     */
    async getAll() {

        return new Promise((resolve, reject) => {

            try {
                resolve(ModelAds.find().limit(20));

            } catch (err) {
                
                console.error(err);
                reject(err);
            }
        });
    };

    /* 
     *  Get ads by id
     *
     */
    async getById(requestBO) {

        return new Promise((resolve, reject) => {

            let id = requestBO._id;

            try {
                resolve(ModelAds.findById(id, null));

            } catch (err) {
                
                console.error(err);
                reject(err);
            }
        });
    };

    /* 
     *  Get ads by SocialPage ID
     *
     */
    async getAdsBySocialPageId(requestBO) {

        return new Promise((resolve, reject) => {

            let criteria = {
                page_id: requestBO.page_id
            };
            
            ModelAds.find(criteria).then((res) => {

                let boList = res.map((item) => {

                    return new AdsResponseBO(item);
                });

                resolve(boList);
                
            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });
        });
    };

    /* 
     *  Get ads by Batch Job ID
     *
     */
    async getAdsByJobId(requestBO) {

        return new Promise((resolve, reject) => {

            let criteria = {
                'batch_job_id': requestBO.batch_job_id
            };

            ModelAds.find(criteria, (err, res) => {
                
                let boList = res.map((item) => {

                    return new AdsResponseBO(item);
                });

                resolve(boList);

                if (err) {
                    console.error(err);
                    reject(err);
                }
                
                (res) ? resolve(res.map(item => item.id)) : resolve(null);
            });
        });
    };

    /* 
     *  Check if AdsList by batch_job_id already exist 
     *
     */
    async checkAdsListExist(requestBO) {

        return new Promise((resolve, reject) => {
            
            let criteria = {
                'id': { $in: requestBO.ads_id_list },
                'batch_job_id': requestBO.batch_job_id
            };

            ModelAds.find(criteria, (err, res) => {

                if (err) {

                    console.error(err);
                    reject(err);
                }
                
                (res) ? resolve(res.map(item => item.id)) : resolve(null);
            });
        });
    };

    /* 
     *  Save an ads get from Facebook API
     *
     */
    async saveAds(requestBO) {
    
        return new Promise((resolve, reject) => {

            ModelAds.insertMany(requestBO).then((res) => {
    
                resolve(res);

            }).catch((err) => {

                console.error(err);
                reject(err);
            });

            // is usually an array of ADS - but we handle the single case
            // if (Array.isArray(requestBO)) {

            //     let res = requestBO.map((item) => {

            //         (new ModelAds(item)).save((err, res) => {
                
            //             if (err) {
                            
            //                 console.error(err);
            //                 reject(err);
            //             }
        
            //             return res;
            //         });
            //     });

                // resolve(res);
            // }

            // (new ModelAds(requestBO)).save((err, res) => {
                
            //     if (err) {
                    
            //         console.error(err);
            //         reject(err);
            //     }

            //     resolve(res);
            // });
        });
    };
};

module.exports = new AdsPersistence();