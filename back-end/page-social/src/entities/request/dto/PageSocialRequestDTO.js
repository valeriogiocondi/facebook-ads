module.exports = class PageSocialRequestDTO {

    constructor(params) {
        
        this.id = params.id;
        this.pageIdList = params.pageIdList;
        this.pageInternalId = params.pageInternalId;
        this.pageName = params.pageName;
        this.publisherPlatformId = params.publisherPlatformId;
        this.page = params.page;
        this.limit = params.limit;
    }
};