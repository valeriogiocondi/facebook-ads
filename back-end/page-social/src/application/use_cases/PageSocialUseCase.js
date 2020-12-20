const PageSocialPersistence = require('../../frameworks/persistance/sequelize/PageSocialPeristence');

class PageSocial {

    constructor() {

    }
    
    async getAll(requestBO) {
        
        return PageSocialPersistence.getAll(requestBO);
    }
    
    async getById(requestBO) {

        return PageSocialPersistence.getById(requestBO);
    }
    
    async getByPageId(requestBO) {

        return PageSocialPersistence.getByPageId(requestBO);
    }
    
    async insert(requestBO) {
        
        return PageSocialPersistence.insert(requestBO);
    }
    
    async edit(requestDTO, requestBO) {
        
        return PageSocialPersistence.edit(requestDTO, requestBO);
    }
    
    async delete(requestBO) {
        
        return PageSocialPersistence.delete(requestBO);
    }
    
};

module.exports = new PageSocial();