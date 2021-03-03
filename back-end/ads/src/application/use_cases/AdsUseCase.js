const AdsPersistence = require('../../frameworks/persistance/mongoose/AdsPersistence');

class Ads {

    constructor() {

    }
    
    async getAll() {
        
        return await AdsPersistence.getAll();
    }

    async getById(requestBO) {
        
        if (!requestBO) {

            throw new Error('Ads Use Case - Validation failed');
        }
        
        return await AdsPersistence.getById(requestBO);
    }

    async getAdsBySocialPageId(requestBO) {
        
        if (!requestBO) {

            throw new Error('Ads Use Case - Validation failed');
        }
        
        return await AdsPersistence.getAdsBySocialPageId(requestBO);
    }

    async getAdsByJobId(requestBO) {
        
        if (!requestBO) {

            throw new Error('Ads Use Case - Validation failed');
        }
        
        //TODO
        // search if Ads already exists
        
        return await AdsPersistence.getAdsByJobId(requestBO);
    }

    async countAdsByJobId(requestBO) {
        
        if (!requestBO) {

            throw new Error('Ads Use Case - Validation failed');
        }
        
        //TODO
        // search if Ads already exists
        
        return await AdsPersistence.countAdsByJobId(requestBO);
    }
    
    async getAdsByJobExecutedId(requestBO) {
        
        if (!requestBO) {

            throw new Error('Ads Use Case - Validation failed');
        }
        
        //TODO
        // search if Ads already exists
        
        return await AdsPersistence.getAdsByJobExecutedId(requestBO);
    }

    async countAdsByJobExecutedId(requestBO) {
        
        if (!requestBO) {

            throw new Error('Ads Use Case - Validation failed');
        }
        
        //TODO
        // search if Ads already exists
        
        return await AdsPersistence.countAdsByJobExecutedId(requestBO);
    }

    async checkAdsListExist(requestBO) {
        
        if (!requestBO) {

            throw new Error('Ads Use Case - Validation failed');
        }
        
        //TODO
        // search if Ads already exists
        
        return await AdsPersistence.checkAdsListExist(requestBO);
    }

    async saveAds(requestBO) {
        
        if (!requestBO) {

            throw new Error('Ads Use Case - Validation failed');
        }

        console.log(requestBO)
        
        return await Promise.all([
            AdsPersistence.saveAds(requestBO),
        ]);
    }
};

module.exports = new Ads();