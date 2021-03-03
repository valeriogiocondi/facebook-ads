module.exports = class AdsCountRequestBO {

    constructor(params) {
        
        this.batch_job_id_list  = params.batch_job_id_list;
        this.batch_job_executed_id_list  = params.batch_job_executed_id_list;
    }
};