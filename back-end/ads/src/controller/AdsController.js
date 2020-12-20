const AdsUseCase = require('../application/use_cases/AdsUseCase');
const AdsDTOMapperRequest = require('../entities/request/mappers/AdsRequestMapper');
const AdsDTOMapperResponse = require('../entities/response/mappers/AdsResponseMapper');

class AdsController {

    constructor() {

    }
    
    async getAll() {

        return AdsUseCase.getAll().then((responseBO) => {

            return AdsDTOMapperResponse.toDTO(responseBO);

        }, (err) => {
            
            throw err;
        });
    }

    async getById(requestDTO) {

        let requestBO = AdsDTOMapperRequest.toBO(requestDTO);
        
        return AdsUseCase.getById(requestBO).then((responseBO) => {

            return AdsDTOMapperResponse.toDTO(responseBO);

        }, (err) => {
            
            throw err;
        });
    }

    async getAdsBySocialPageId(requestDTO) {
        
        let requestBO = AdsDTOMapperRequest.toBO(requestDTO);

        return AdsUseCase.getAdsBySocialPageId(requestBO).then((responseBO) => {

            return AdsDTOMapperResponse.toDTO(responseBO);

        }, (err) => {
            
            throw err;
        });
    }
    
    async getAdsByJobId(requestDTO) {
        
        let requestBO = AdsDTOMapperRequest.toBO(requestDTO);
        
        return AdsUseCase.getAdsByJobId(requestBO).then((responseBO) => {
            
            return AdsDTOMapperResponse.toDTO(responseBO);

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

        let requestBO = AdsDTOMapperRequest.toBO(requestDTO);
        
        return AdsUseCase.saveAds(requestBO).then((responseBO) => {

            return AdsDTOMapperResponse.toDTO(responseBO);

        }, (err) => {
           
            throw err;
        });
    }
};

module.exports = new AdsController();