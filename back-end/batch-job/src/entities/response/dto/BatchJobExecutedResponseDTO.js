module.exports = class BatchJobExecutedResponseDTO {

    constructor(params) {

        this.id = params.id;
        this.batchJob = params.batchJob;
        this.byBatch = params.byBatch;
        this.created = params.created;
    }
};