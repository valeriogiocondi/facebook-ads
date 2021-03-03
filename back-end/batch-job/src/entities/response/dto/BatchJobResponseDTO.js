module.exports = class BatchJobResponseDTO {

    constructor(params) {

        this.id = params.id;
        this.pageSocial = params.pageSocial;
        this.adActiveStatus = params.adActiveStatus;
        this.adReachedCountries = params.adReachedCountries;
        this.adType = params.adType;
        this.impressionCondition = params.impressionCondition;
        this.searchTerms = params.searchTerms;
        this.time = params.time;
        this.numAds = params.numAds;
        this.created = params.created;   
    }
};