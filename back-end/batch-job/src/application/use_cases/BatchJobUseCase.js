const BatchJobPersistence = require('../../frameworks/persistance/sequelize/BatchJobPeristence');

class BatchJob {

    constructor() {

    }
    
    async getAll(requestBO) {
        
        return BatchJobPersistence.getAll(requestBO);
    }
    
    async getAll(requestBO) {
        
        return BatchJobPersistence.getAll(requestBO);
    }
    
    async getById(requestBO) {

        return BatchJobPersistence.getById(requestBO);
    }
    
    async insert(requestBO) {
        
        return BatchJobPersistence.insert(requestBO);
    }
    
    async edit(requestBO) {
        
        return BatchJobPersistence.edit(requestBO);
    }
    
    async delete(requestBO) {
        
        return BatchJobPersistence.delete(requestBO);
    } 
};

module.exports = new BatchJob();