module.exports = class BatchJobExecutedResponseBO {

    constructor(params) {
    
        this.id = params.id;
        this.batch_job_id = params.batch_job_id;
        this.page_social_id = params.page_social_id;
        this.by_batch = params.by_batch;
        this.date_create = params.date_create;
    }
};