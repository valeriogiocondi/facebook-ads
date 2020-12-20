import { DemographicDistributionType, DemographicDistributionPersonDataType } from './demographic-distribution-type';

class FacebookAdsClass {
    
    adCreationTime: string; 
    adCreativeBody: string; 
    adCreativeLinkCaption: string; 
    adCreativeLinkDescription: string; 
    adCreativeLinkTitle: string; 
    adDeliveryStartTime: string; 
    adSnapshotUrl: string; 
    currency: string; 
    demographicDistribution: DemographicDistributionType; 
    fundingEntity: string;
    id: string;
    impressions: {
        lowerBound: number;
        upperBound: number
    };
    pageId: string;
    pageName: string;
    publisherPlatforms: string[];
    regionDistribution: {
        percentage: number;
        region: string;
    } [];
    spend: {
        lowerBound: number;
        upperBound: number;
    };

    constructor(obj: any) {
        
        this.adCreationTime = obj.adCreationTime;
        this.adCreativeBody = obj.adCreativeBody;
        this.adCreativeLinkCaption = obj.adCreativeLinkCaption;
        this.adCreativeLinkDescription = obj.adCreativeLinkDescription;
        this.adCreativeLinkTitle = obj.adCreativeLinkTitle;
        this.adDeliveryStartTime = obj.adDeliveryStartTime;
        this.adSnapshotUrl = obj.adSnapshotUrl;
        this.currency = obj.currency;
        this.fundingEntity = obj.fundingEntity;
        this.id = obj.id;
        this.impressions = obj.impressions;
        this.pageId = obj.pageId;
        this.pageName = obj.pageName;
        this.publisherPlatforms = obj.publisherPlatforms;
        this.regionDistribution = obj.regionDistribution;
        this.spend = obj.spend;
        this.demographicDistribution = this.serializeDemographicDistribution(obj.demographicDistribution);
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
                // this.demographicDistribution.female.data.push(person);
            else
                demographiDistribution.male.data.push(person);
                // this.demographicDistribution.male.data.push(person);
        });

        return demographiDistribution;
    }
};

export default FacebookAdsClass;