module.exports = class BatchJobResponseBO {

    constructor(params) {
    
        this.id = params.id;   
        this.page_social = params.page_social_id;
        this.ad_active_status = params.ad_active_status;
        this.ad_reached_countries = params.ad_reached_countries;
        this.ad_type = params.ad_type;
        this.impression_condition = params.impression_condition;
        this.search_terms = params.search_terms;
        this.time = params.time;
        this.num_ads = params.num_ads;
        this.created = params.created;   
    }
};