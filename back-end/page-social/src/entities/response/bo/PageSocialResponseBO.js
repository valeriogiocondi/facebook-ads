module.exports = class PageSocialResponseBO {

    constructor(params) {
    
        this.id = params.id;
        this.page_internal_id = params.page_internal_id;
        this.page_name = params.page_name;
        this.publisher_platform = {
            id: params.AdsPublisherPlatform.id,
            value: params.AdsPublisherPlatform.value,
        }
    }
};