const { gql } = require('apollo-server')

const typeDefs = gql`
type Query {
    adsList(authToken: String!, limit: Int, page: Int): AdsListResponse
    adsById(id: ID!): Ads
    adsBySocialPageId(pageSocialInternalId: String!): PageSocialResponseDTO
    adsByBatchJobId(batchJobId: ID!): [Ads]

    exportCsvAdsBySocialPageId(authToken: String, pageInternalId: String!): ExportCsvResponseDTO!
    exportCsvAdsByBatchJobId(authToken: String, batchJobId: ID!): ExportCsvResponseDTO!

    getBatchJobList(authToken: String!, limit: Int, page: Int): BatchJobListResponse
    getBatchJobById(authToken: String, params: BatchJobInput!): BatchJobResponse
    
    getBatchJobExecutedList(authToken: String!, limit: Int, page: Int): BatchJobExecutedListResponse

    getActiveStatusList(authToken: String!): ActiveStatusResponse
    getReachedCountriesList(authToken: String!): ReachedCountriesResponse
    getTypeList(authToken: String!): TypeResponse
    getImpressionConditionList(authToken: String!): ImpressionConditionResponse
    getPublisherPlatformList(authToken: String!): PublisherPlatformResponse

    getPageSocialList(authToken: String!, limit: Int, page: Int): PageSocialListResponse
    getPageSocial(authToken: String!, id: ID!): PageSocialResponse
    getAdsBySocialPageId(authToken: String!, id: ID!, internalID: ID!): PageSocialAdsResponse

    loginAuth(username: String!, password: String!): String
    loginVerify(token: String!): String
    logout(token: String!): String
}

type Mutation { 
    insertBatchJob(params: BatchJobInput!): BatchJob
    editBatchJob(params: BatchJobInput!): BatchJob
    deleteBatchJob(params: BatchJobInput!): BatchJob
}   


"""
------------------------------------
                INPUT               
------------------------------------
"""
interface Input {
    page: Int
    limit: Int
}

input BatchJobInput {
    id: ID!,
    pageId: Int,
    pageInternalId: String,
    publisherPlatformId: Int,
    adActiveStatus: Int,
    adReachedCountries: Int,
    adType: Int,
    impressionCondition: Int,
    searchTerms: String,
    time: String,
    created: String,
}   


"""
------------------------------------
               RESPONSE               
------------------------------------
"""

interface Response {
    token: String!
}
type PageSocialListResponse implements Response {
    token: String!
    pageSocialList: [PageSocial]!
}
type PageSocialResponse implements Response {
    token: String!
    pageSocial: PageSocial!
}
type PageSocialAdsResponse implements Response {
    token: String!
    pageSocial: PageSocial!
    ads: [Ads]!
}
type BatchJobListResponse implements Response {
    token: String!
    batchJobList: [BatchJob]!
}
type BatchJobResponse implements Response {
    token: String!
    batchJob: BatchJob!
}
type BatchJobExecutedListResponse implements Response {
    token: String!
    batchJobExecutedList: [BatchJobExecuted]!
}
type AdsListResponse implements Response {
    token: String!
    adsList: [Ads]!
}
type ActiveStatusResponse implements Response {
    token: String!
    activeStatusList: [ActiveStatus]!
}
type ReachedCountriesResponse implements Response {
    token: String!
    reachedCountriesList: [ReachedCountries]!
}
type TypeResponse implements Response {
    token: String!
    typeList: [Type]!
}
type ImpressionConditionResponse implements Response {
    token: String!
    impressionConditionList: [ImpressionCondition]!
}
type PublisherPlatformResponse implements Response {
    token: String!
    publisherPlatformList: [PublisherPlatform]!
}


"""
------------------------------------
                TYPES                              
------------------------------------
"""

type Ads {
    _id: String
    id: String
    adCreationTime: String 
    adCreativeBody: String 
    adCreativeLinkCaption: String 
    adCreativeLinkDescription: String 
    adCreativeLinkTitle: String 
    adDeliveryStartTime: String 
    adSnapshotUrl: String 
    currency: String 
    fundingEntity: String
    pageId: String
    pageName: String
    impressions: AdsImpressions
    publisherPlatforms: [String]
    demographicDistribution: [AdsDemographicDistribution]
    regionDistribution: [AdsRegionDistribution]
    spend: AdsSpend
    created: String
}
type AdsImpressions {
    lowerBound: String
    upperBound: String
}
type AdsDemographicDistribution { 
    percentage: String 
    age: String 
    gender: String 
}
type AdsRegionDistribution { 
    percentage: String 
    region: String 
}
type AdsSpend {
    lowerBound: String
    upperBound: String
}

type PageSocial {
    id: ID!
    internalId: String!
    name: String!
    publisherPlatform: PublisherPlatform!
}
type BatchJob {
    id: ID!
    pageSocial: PageSocial!
    adActiveStatus: Int
    adReachedCountries: Int
    adType: Int
    impressionCondition: Int    
    searchTerms: String
    time: String
    created: String
}
type BatchJobExecuted {
    id: ID!
    pageSocial: PageSocial
    batchJob: BatchJob!
    byBatch: Int!
    created: String
}



"""
-------------------
    TYPOLOGICAL                   
-------------------
"""
type ActiveStatus { 
    idActiveStatus: ID!
    valueActiveStatus: String!
}
type ReachedCountries { 
    idReachedCountries: ID!
    valueReachedCountries: String!
}
type Type { 
    idType: ID!
    valueType: String!
}
type ImpressionCondition { 
    idImpressionCondition: ID!
    valueImpressionCondition: String!
}
type PublisherPlatform { 
    idPublisherPlatform: ID!
    valuePublisherPlatform: String!
}

type PageSocialResponseDTO {
    code: Int!
    payload: String
}
type ExportCsvResponseDTO implements Response {
    token: String!
    code: Int!
    payload: String
}
`;

module.exports = typeDefs