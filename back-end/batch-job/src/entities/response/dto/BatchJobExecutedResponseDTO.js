module.exports = class BatchJobExecutedResponseDTO {

    constructor(params) {

        this.id = params.id;
        this.batchJob = params.batchJob;
        this.byBatch = params.byBatch;
        this.numAds = params.numAds;
        this.created = params.created;
    }
};