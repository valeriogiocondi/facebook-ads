type FacebookAds = {
    _id: string,
    ad_creation_time: string, 
    ad_creative_body: string, 
    ad_creative_link_caption: string, 
    ad_creative_link_description: string, 
    ad_creative_link_title: string, 
    ad_delivery_start_time: string, 
    ad_snapshot_url: string, 
    currency: string, 
    demographic_distribution:  {
        percentage: number,
        age: string,
        gender: string,
    } [], 
    funding_entity: string,
    id: string,
    impressions: {
        lower_bound: number,
        upper_bound: number
    },
    page_id: string,
    page_name: string,
    publisher_platforms: string[],
    region_distribution: {
        percentage: number,
        region: string,
    } [],
    spend: {
        lower_bound: number,
        upper_bound: number,
    },
        

    // ad_creative_body: string,
    // spend: {
    //     lower_bound: number,
    //     upper_bound: number,
    // },
    // demographic_distribution: {
    //     percentage: number,
    //     age: string,
    //     gender: string,
    // } [],
    // id: string,

    // page_id: string,
    // ad_snapshot_url: string,
    // ad_delivery_start_time: string,
    // id: string,
};

export default FacebookAds;