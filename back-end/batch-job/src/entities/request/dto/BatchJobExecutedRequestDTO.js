module.exports = class BatchJobExecutedRequestDTO {

    constructor(params) {
        
        this.id = params.id;
        this.batchJobId = params.batchJobId;
        this.pageSocialId = params.pageSocialId;
        this.byBatch = params.byBatch;
        this.page = params.page;
        this.limit = params.limit;
    }
};