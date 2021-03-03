const IBatchJobExecuted = require('../../../application/contracts/IBatchJobExecuted');
const ModelBatchJobExecuted = require('../../../entities/sequelize/BatchJobExecutedModel');
const BatchJobExecutedResponseBO = require('../../../entities/response/bo/BatchJobExecutedResponseBO');
const ModelBatchJob = require('../../../entities/sequelize/BatchJobModel');

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

            if (!criteria.limit) criteria.limit = 10;
            if (!criteria.offset) criteria.offset = 1;
            
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
     *  Get batch job executed by $id
     *
     */
    async getById(requestBO) {
    
        return new Promise((resolve, reject) => {

            let criteria = {
                where: { id: requestBO.id },
            };
            
            // fk - BATCH_JOB_DAT
            ModelBatchJob.hasMany(ModelBatchJobExecuted, { foreignKey: 'batch_job_id' });
            ModelBatchJobExecuted.belongsTo(ModelBatchJob, { foreignKey: 'batch_job_id' });
            
            ModelBatchJobExecuted
                .findOne({
                    include: [
                        { model: ModelBatchJob },
                    ],
                    ...criteria,
                }).then((result) => {
                    
                    resolve(new BatchJobExecutedResponseBO(result));

                }).catch((err) => {
                
                    console.error(err);
                    reject(result);
                }
            );
        });
    };


    /* 
     *  Get batch job executed by $batch_job_id
     *
     */
    async getByBatchJobId(requestBO) {
        
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
                where: { batch_job_id: requestBO.batch_job_id }
            };

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