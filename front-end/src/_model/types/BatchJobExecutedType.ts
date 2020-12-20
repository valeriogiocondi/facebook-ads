import PageSocialType from "./PageSocialType";
import BatchJobType from "./BatchJobType";

type BatchJobExecutedType = {
    id:             number
    pageSocial:     PageSocialType
    batchJob:       BatchJobType
    byBatch:        number
    created:        string
};


export default BatchJobExecutedType;