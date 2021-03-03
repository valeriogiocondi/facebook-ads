export type AdsType = {
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
    impressions:                    AdsImpressionsType
    publisherPlatforms:             Array<string>
    demographicDistribution:        Array<AdsDemographicDistributionType>
    regionDistribution:             Array<AdsRegionDistributionType>
    spend:                          AdsSpendType
    created:                        string
};

export type AdsImpressionsType = {
    lowerBound: string
    upperBound: string
}
export type AdsDemographicDistributionType = { 
    percentage: string 
    age: string 
    gender: string 
}
export type AdsRegionDistributionType = { 
    percentage: string 
    region: string 
}
export type AdsSpendType = {
    lowerBound: string
    upperBound: string
}