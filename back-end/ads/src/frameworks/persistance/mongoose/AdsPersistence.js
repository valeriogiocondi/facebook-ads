const IAds = require('../../../application/contracts/IAds');
const ModelAds = require('../../../entities/mongoose/Ads');
const AdsResponseBO = require('../../../entities/response/bo/AdsResponseBO');
const AdsCountResponseBO = require('../../../entities/response/bo/AdsCountResponseBO');

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
                page_id: requestBO.page_id,
            };
            const limit = (requestBO.limit && requestBO.limit > 0) ? requestBO.limit : 10;
            const offset = (requestBO.page && requestBO.page > 0) ? requestBO.page : 1;
            
            ModelAds
                .find(criteria)
                .skip( (offset-1)*limit )
                .limit(limit)
                .then((res) => {

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
            const limit = (requestBO.limit && requestBO.limit > 0) ? requestBO.limit : 10;
            const offset = (requestBO.page && requestBO.page > 0) ? requestBO.page : 1;
            
            ModelAds
                .find(criteria)
                .skip( (offset-1)*limit )
                .limit(limit)
                .then((res, err) => {

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

        // return new Promise((resolve, reject) => {

        //     let criteria = {
        //         'batch_job_id': requestBO.batch_job_id
        //     };

        //     ModelAds.find(criteria, (err, res) => {
                
        //         let boList = res.map((item) => {

        //             return new AdsResponseBO(item);
        //         });

        //         resolve(boList);

        //         if (err) {
        //             console.error(err);
        //             reject(err);
        //         }
                
        //         (res) ? resolve(res.map(item => item.id)) : resolve(null);
        //     });
        // });
    };

    /* 
     *  count ads by Batch Job ID
     *
     */
    async countAdsByJobId(requestBO) {

        return (
            Promise.all(
                requestBO.batch_job_id_list
                    .map(async (id) => {

                        const criteria = {
                            'batch_job_id': id
                        };
                        
                        return (
                            new AdsCountResponseBO({
                                batch_job_id: id,
                                count: await ModelAds.countDocuments(criteria).exec(),
                            })
                        );
                    })
            )
        );
    };

    /* 
     *  Get ads by Batch Job Executed ID
     *
     */
    async getAdsByJobExecutedId(requestBO) {

        return new Promise((resolve, reject) => {

            let criteria = {
                'batch_job_executed_id': requestBO.batch_job_executed_id
            };
            const limit = (requestBO.limit && requestBO.limit > 0) ? requestBO.limit : 10;
            const offset = (requestBO.page && requestBO.page > 0) ? requestBO.page : 1;
            
            ModelAds
                .find(criteria)
                .skip( (offset-1)*limit )
                .limit(limit)
                .then((res, err) => {

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
     *  count ads by Batch Job Executed ID
     *
     */
    async countAdsByJobExecutedId(requestBO) {

        return new Promise((resolve, reject) => {

            requestBO.batch_job_executed_id_list
                .map(async (id) => {

                    const criteria = {
                        'batch_job_executed_id': id
                    };
                    
                    resolve (
                        new AdsCountResponseBO({
                            batch_job_executed_id: id,
                            count: await ModelAds.countDocuments(criteria).exec(),
                        })
                    );
                })
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
        });
    };
};

module.exports = new AdsPersistence();