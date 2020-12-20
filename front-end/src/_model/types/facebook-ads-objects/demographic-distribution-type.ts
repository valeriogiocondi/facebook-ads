export type DemographicDistributionType = {
    female: DemographicDistributionPersonType,
    male: DemographicDistributionPersonType,
};

export type DemographicDistributionPersonType = {
    
    label: string,
    data: DemographicDistributionPersonDataType[],
};

export type DemographicDistributionPersonDataType = {
    age: number,
    percentage: string,
};