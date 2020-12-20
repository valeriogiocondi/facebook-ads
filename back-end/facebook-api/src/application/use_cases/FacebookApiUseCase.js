const facebookApiService = require('../../frameworks/services/facebookApi.js');

class FacebookApiUseCase {

    constructor() {

    }
    
    async getPageName(params) {
        
        return await facebookApiService.getPageName(params);
    }
    
    async getAdsList(params) {
        
        return await facebookApiService.getAdsList(params);
    }
};

module.exports = new FacebookApiUseCase();