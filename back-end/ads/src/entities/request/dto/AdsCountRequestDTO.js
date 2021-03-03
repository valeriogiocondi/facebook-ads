module.exports = class AdsCountRequestDTO {

    constructor(params) {
        
        this.batchJobIdList  = params.batchJobIdList;
        this.batchJobExecutedIdList  = params.batchJobExecutedIdList;
    }
};