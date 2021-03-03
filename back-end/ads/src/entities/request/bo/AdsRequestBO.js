module.exports = class AdsRequestBO {

    constructor(params) {
        
        this._id                    = params._id;
        this.page_id                = params.page_id;
        this.batch_job_id           = params.batch_job_id;
        this.batch_job_executed_id  = params.batch_job_executed_id;
        this.page                   = params.page;
        this.limit                  = params.limit;
    }
};