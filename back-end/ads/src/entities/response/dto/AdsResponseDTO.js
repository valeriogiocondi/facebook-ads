module.exports = class AdsResponseDTO {

    constructor(params) {
        
        this._id = params._id;
        this.id = params.id;
        this.adCreationTime = params.adCreationTime; 
        this.adCreativeBody = params.adCreativeBody; 
        this.adCreativeLinkCaption = params.adCreativeLinkCaption; 
        this.adCreativeLinkDescription = params.adCreativeLinkDescription; 
        this.adCreativeLinkTitle = params.adCreativeLinkTitle; 
        this.adDeliveryStartTime = params.adDeliveryStartTime; 
        this.adSnapshotUrl = params.adSnapshotUrl; 
        this.currency = params.currency; 
        this.fundingEntity = params.fundingEntity;
        this.pageId = params.pageId;
        this.pageName = params.pageName;
        this.impressions = params.impressions;
        this.publisherPlatforms = params.publisherPlatforms;
        this.demographicDistribution = params.demographicDistribution;
        this.regionDistribution = params.regionDistribution;
        this.spend = params.spend;
        this.batchJobId = params.batchJobId;
        this.created = params.created;
    }
};