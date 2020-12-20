module.exports = class PageSocialRequestBO {

    constructor(params) {
        
        this.id = params.id;
        this.page_id_list = params.page_id_list;
        this.page_internal_id = params.page_internal_id;
        this.page_name = params.page_name;
        this.publisher_platform_id = params.publisher_platform_id;
        this.page = params.page;
        this.limit = params.limit;
    }
};