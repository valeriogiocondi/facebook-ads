module.exports = class AdsCountResponseDTO {

    constructor(params) {
        
        this.batchJobId = params.batchJobId;
        this.batchJobExecutedId = params.batchJobExecutedId;
        this.count = params.count;
    }
};