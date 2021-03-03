module.exports = class AdsSaveRequestBO {

    constructor(params) {
        
        this._id                           = params._id;
        this.id                            = params.id;
        this.ad_creation_time              = params.ad_creation_time;
        this.ad_creative_body              = params.ad_creative_body;
        this.ad_creative_link_caption      = params.ad_creative_link_caption;
        this.ad_creative_link_description  = params.ad_creative_link_description;
        this.ad_creative_link_title        = params.ad_creative_link_title;
        this.ad_delivery_start_time        = params.ad_delivery_start_time;
        this.ad_snapshot_url               = params.ad_snapshot_url;
        this.currency                      = params.currency;
        this.funding_entity                = params.funding_entity;
        this.page_id                       = params.page_id;
        this.page_name                     = params.page_name;
        this.impressions                   = params.impressions;
        this.publisher_platforms           = params.publisher_platforms;
        this.demographic_distribution      = params.demographic_distribution;
        this.region_distribution           = params.region_distribution;
        this.spend                         = params.spend;
        this.batch_job_id                  = params.batch_job_id;
        this.batch_job_executed_id         = params.batch_job_executed_id;
        this.created                       = params.created;
    }
};