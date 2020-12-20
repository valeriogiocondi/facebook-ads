module.exports = class BatchJobRequestBO {

    constructor(params) {

        this.id = params.id;
        this.page_social_id = params.page_social_id;
        this.page_internal_id = params.page_internal_id;
        this.ad_active_status = params.ad_active_status;
        this.ad_reached_countries = params.ad_reached_countries;
        this.ad_type = params.ad_type;
        this.impression_condition = params.impression_condition;
        this.search_terms = params.search_terms;
        this.time = params.time;
        this.created = params.created;
        this.page = params.page;
        this.limit = params.limit;
    }
};