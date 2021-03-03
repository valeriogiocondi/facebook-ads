const AdsUseCase = require('../application/use_cases/AdsUseCase');
const AdsMapperRequest = require('../entities/request/mappers/AdsRequestMapper');
const AdsMapperResponse = require('../entities/response/mappers/AdsResponseMapper');
const AdsCountRequestMapper = require('../entities/request/mappers/AdsCountRequestMapper');
const AdsCountResponseMapper = require('../entities/response/mappers/AdsCountResponseMapper');
const AdsSaveRequestMapper = require('../entities/request/mappers/AdsSaveRequestMapper');

class AdsController {

    constructor() {

    }
    
    async getAll() {

        return AdsUseCase.getAll().then((responseBO) => {

            return AdsMapperResponse.toDTO(responseBO);

        }, (err) => {
            
            throw err;
        });
    }

    async getById(requestDTO) {

        let requestBO = AdsMapperRequest.toBO(requestDTO);
        
        return AdsUseCase.getById(requestBO).then((responseBO) => {

            return AdsMapperResponse.toDTO(responseBO);

        }, (err) => {
            
            throw err;
        });
    }

    async getAdsBySocialPageId(requestDTO) {
        
        let requestBO = AdsMapperRequest.toBO(requestDTO);

        return AdsUseCase.getAdsBySocialPageId(requestBO).then((responseBO) => {

            return AdsMapperResponse.toDTO(responseBO);

        }, (err) => {
            
            throw err;
        });
    }
    
    async getAdsByJobId(requestDTO) {
        
        let requestBO = AdsMapperRequest.toBO(requestDTO);
        
        return AdsUseCase.getAdsByJobId(requestBO).then((responseBO) => {
            
            return AdsMapperResponse.toDTO(responseBO);

        }, (err) => {
            
            throw err;
        });
    }

    async countAdsByJobId(requestDTO) {
        
        let requestBO = AdsCountRequestMapper.toBO(requestDTO);
        
        return AdsUseCase.countAdsByJobId(requestBO).then((responseBO) => {

            return AdsCountResponseMapper.toDTO(responseBO);

        }, (err) => {
            
            throw err;
        });
    }

    async getAdsByJobExecutedId(requestDTO) {

        let requestBO = AdsMapperRequest.toBO(requestDTO);
                
        return AdsUseCase.getAdsByJobExecutedId(requestBO).then((responseBO) => {
        
            return AdsMapperResponse.toDTO(responseBO);

        }, (err) => {
            
            throw err;
        });
    }

    async countAdsByJobExecutedId(requestDTO) {
        
        let requestBO = AdsCountRequestMapper.toBO(requestDTO);
        
        return AdsUseCase.countAdsByJobExecutedId(requestBO).then((responseBO) => {

            return AdsCountResponseMapper.toDTO(responseBO);

        }, (err) => {
            
            throw err;
        });
    }

    async checkAdsListExist(requestBO) {

        /* 
         *  It's more performing than use getAdsByJobId() and filter Ads list
         *
         */
        return AdsUseCase.checkAdsListExist(requestBO).then((response) => {

            return response;

        }, (err) => {
            
            throw err;
        });
    }

    async saveAds(requestDTO) {

        let requestBO = AdsSaveRequestMapper.toBO(requestDTO);
        
        return AdsUseCase.saveAds(requestBO).then((responseBO) => {

            return AdsMapperResponse.toDTO(responseBO);

        }, (err) => {
           
            throw err;
        });
    }
};

module.exports = new AdsController();