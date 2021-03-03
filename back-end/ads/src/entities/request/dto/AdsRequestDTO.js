module.exports = class AdsRequestDTO {

    constructor(params) {
        
        // Fields useful in order to save Ads
        this._id                 = params._id;
        this.pageId              = params.pageId;
        this.batchJobId          = params.batchJobId;
        this.batchJobExecutedId  = params.batchJobExecutedId;
        this.page                = params.page;
        this.limit               = params.limit;
    }
};