import { AdsType } from "./AdsType";
import BatchJobType from "./BatchJobType";

type BatchJobExecutedType = {
    id:             number
    batchJob:       BatchJobType
    byBatch:        number
    numAds:         number
    adsList:        AdsType[]
    timeExecuted:   string
    created:        string
};


export default BatchJobExecutedType;