const IBatchJobExecuted = require('../../../application/contracts/IBatchJobExecuted');
const ModelBatchJobExecuted = require('../../../entities/sequelize/BatchJobExecutedModel');
const BatchJobExecutedResponseBO = require('../../../entities/response/bo/BatchJobExecutedResponseBO');
const ModelBatchJob = require('../../../entities/sequelize/BatchJobModel');

// const ModelPageSocial = require('../../../entities/sequelize/PageSocialModel');
// const ModelAdsPublisherPlatform = require('../../../entities/sequelize/AdsPublisherPlatformModel');
// const ModelAds = require('../../../entities/sequelize/AdsModel');

class BatchJobExecutedPersistence extends IBatchJobExecuted {

    /* 
     *  Get all batch-jobs executed
     *
     */
    async getAll(requestBO) {

        return new Promise((resolve, reject) => {

            let criteria = {
                order: [['id', 'DESC']],
                limit: requestBO.limit, 
                offset: requestBO.page-1, 
            };
            
            // fk - BATCH_JOB_DAT
            ModelBatchJob.hasMany(ModelBatchJobExecuted, { foreignKey: 'batch_job_id' });
            ModelBatchJobExecuted.belongsTo(ModelBatchJob, { foreignKey: 'batch_job_id' });
            
            ModelBatchJobExecuted
                .findAll({
                    include: [
                        { model: ModelBatchJob },
                    ],
                    ...criteria,
                }).then((result) => {
                    
                    let boList = result.map((item) => {

                        return new BatchJobExecutedResponseBO(item);
                    });
                    resolve(boList);

                }).catch((err) => {
                
                    console.error(err);
                    reject(err);
                }
            );
        });  
    };

    /* 
     *  Get batch job executed by id
     *
     */
    async getByJobId(requestBO) {
        
        return new Promise((resolve, reject) => {

            let criteria = {
                where: { batch_job_id: requestBO.batch_job_id },
            };
            
            // fk - BATCH_JOB_DAT
            ModelBatchJob.hasMany(ModelBatchJobExecuted, { foreignKey: 'batch_job_id' });
            ModelBatchJobExecuted.belongsTo(ModelBatchJob, { foreignKey: 'batch_job_id' });
            
            ModelBatchJobExecuted
                .findAll({
                    include: [
                        { model: ModelBatchJob },
                    ],
                    ...criteria,
                }).then((result) => {
                    
                    let boList = result.map((item) => {
                        
                        return new BatchJobExecutedResponseBO(item);
                    });
                    resolve(boList);

                }).catch((err) => {
                
                    console.error(err);
                    reject(result);
                }
            );
        });
    };

    /* 
     *  Get ADS by all single batch job executed
     */
    async getAdsByJobExecuted(requestBO) {
        
        return new Promise((resolve, reject) => {

            let criteria = { 
                where: { batch_job_id: requestBO.id },
                include: [
                    // { model: ModelAds }
                ]
            };
            
            // ModelBatchJobExecuted.belongsToMany(ModelAds, { through: 'BATCH_JOB_EXECUTED_TO_ADS_REL' });
            // ModelAds.belongsToMany(ModelBatchJobExecuted, { through: 'BATCH_JOB_EXECUTED_TO_ADS_REL' });

            ModelBatchJobExecuted.findAll(criteria).then((result) => {

                    let boList = result.map((item) => {

                        return new BatchJobExecutedResponseBO(item);
                    });
                    resolve(boList);

                }).catch((err) => {
                
                    console.error(err);
                    reject(result);
                }
            );
        });
    };

    /* 
     *  Insert new job executed
     *
     */
    async insert(requestBO) {
        
        return new Promise((resolve, reject) => {

            ModelBatchJobExecuted.create(requestBO).then((result) => {

                resolve(new BatchJobExecutedResponseBO(result));
                
            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });
        });
    };

};

module.exports = new BatchJobExecutedPersistence();