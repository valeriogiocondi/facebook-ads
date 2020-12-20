import { DemographicDistributionType, DemographicDistributionPersonDataType } from './demographic-distribution-type';

class FacebookAdsClass {
    
    ad_creation_time: string; 
    ad_creative_body: string; 
    ad_creative_link_caption: string; 
    ad_creative_link_description: string; 
    ad_creative_link_title: string; 
    ad_delivery_start_time: string; 
    ad_snapshot_url: string; 
    currency: string; 
    demographic_distribution: DemographicDistributionType; 
    funding_entity: string;
    id: string;
    impressions: {
        lower_bound: number;
        upper_bound: number
    };
    page_id: string;
    page_name: string;
    publisher_platforms: string[];
    region_distribution: {
        percentage: number;
        region: string;
    } [];
    spend: {
        lower_bound: number;
        upper_bound: number;
    };

    constructor(obj: any) {
        
        this.ad_creation_time = obj.ad_creation_time;
        this.ad_creative_body = obj.ad_creative_body;
        this.ad_creative_link_caption = obj.ad_creative_link_caption;
        this.ad_creative_link_description = obj.ad_creative_link_description;
        this.ad_creative_link_title = obj.ad_creative_link_title;
        this.ad_delivery_start_time = obj.ad_delivery_start_time;
        this.ad_snapshot_url = obj.ad_snapshot_url;
        this.currency = obj.currency;
        this.funding_entity = obj.funding_entity;
        this.id = obj.id;
        this.impressions = obj.impressions;
        this.page_id = obj.page_id;
        this.page_name = obj.page_name;
        this.publisher_platforms = obj.publisher_platforms;
        this.region_distribution = obj.region_distribution;
        this.spend = obj.spend;
        this.demographic_distribution = this.serializeDemographicDistribution(obj.demographic_distribution);
    }

    private serializeDemographicDistribution(array: any[]): DemographicDistributionType {

        /* 
         *  Split general Demographic Distribution into MALE and FEMAL separate fields.
         *
         */

        let demographiDistribution: DemographicDistributionType = { 
            female: {
                label: 'Donna',
                data: [],
            },
            male: {
                label: 'Uomo',
                data: [],
            } 
        };

        let person: DemographicDistributionPersonDataType = {
            age: 0,
            percentage: ''
        }

        array.map((item) => {
            
            person = Object.assign([], {
                age: item.age,
                percentage: item.percentage+'%',
                // percentage: parseFloat(item.percentage).toFixed(6)+'%',
            })

            if (item.gender === "female")
                demographiDistribution.female.data.push(person);
                // this.demographic_distribution.female.data.push(person);
            else
                demographiDistribution.male.data.push(person);
                // this.demographic_distribution.male.data.push(person);
        });

        return demographiDistribution;
    }
};

export default FacebookAdsClass;