module.exports = class BatchJobRequestDTO {

    constructor(params) {

        this.id = params.id;
        this.pageId = params.pageId;
        this.pageInternalId = params.pageInternalId;
        this.publisherPlatformId = params.publisherPlatformId;
        this.adActiveStatus = params.adActiveStatus;
        this.adReachedCountries = params.adReachedCountries;
        this.adType = params.adType;
        this.impressionCondition = params.impressionCondition;
        this.searchTerms = params.searchTerms;
        this.time = params.time;
        this.created = params.created;
        this.page = params.page;
        this.limit = params.limit;
    }
};