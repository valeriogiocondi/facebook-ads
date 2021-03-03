import { AdsType } from "./AdsType";
import PageSocialType from "./PageSocialType";

type BatchJobType = {
    id:                     number
    pageSocial:             PageSocialType
    numAds:                 number
    adsList:                AdsType[]
    adActiveStatus?:        number
    adReachedCountries?:    number
    adType?:                number
    impressionCondition?:   number    
    searchTerms?:           string
    time?:                  string
    created?:               string
};


export default BatchJobType;