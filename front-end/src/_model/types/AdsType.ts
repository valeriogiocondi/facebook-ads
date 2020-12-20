type AdsType = {
    _id:                            string
    id:                             string
    adCreationTime:                 string 
    adCreativeBody:                 string 
    adCreativeLinkCaption:          string 
    adCreativeLinkDescription:      string 
    adCreativeLinkTitle:            string 
    adDeliveryStartTime:            string 
    adSnapshotUrl:                  string 
    currency:                       string 
    fundingEntity:                  string
    pageId:                         string
    pageName:                       string
    impressions:                    AdsImpressions
    publisherPlatforms:             Array<string>
    demographicDistribution:        Array<AdsDemographicDistribution>
    regionDistribution:             Array<AdsRegionDistribution>
    spend:                          AdsSpend
    created:                        string
};

type AdsImpressions = {
    lowerBound: string
    upperBound: string
}
type AdsDemographicDistribution = { 
    percentage: string 
    age: string 
    gender: string 
}
type AdsRegionDistribution = { 
    percentage: string 
    region: string 
}
type AdsSpend = {
    lowerBound: string
    upperBound: string
}

export default AdsType;