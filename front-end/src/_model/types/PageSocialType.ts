import { AdsType } from "./AdsType";
import PublisherPlatformType from "./PublisherPlatformType";

type PageSocialType = {
    id:                 number  
    internalId:         string  
    name:               string    
    publisherPlatform:  PublisherPlatformType
    numAds:             number
    adsList:            AdsType[]
};


export default PageSocialType;