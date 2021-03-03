const batchJobExecutedPersistence = require('../../frameworks/persistance/sequelize/BatchJobExecutedPersistence');

class BatchJobExecuted {

    constructor() {

    }
    
    async getAll(requestBO) {
        
        return batchJobExecutedPersistence.getAll(requestBO);
    }
    
    async getById(requestBO) {

        return batchJobExecutedPersistence.getById(requestBO);
    }

    async getByBatchJobId(requestBO) {

        return batchJobExecutedPersistence.getByBatchJobId(requestBO);
    }

    async getAdsByJobExecuted(requestBO) {

        return batchJobExecutedPersistence.getAdsByJobExecuted(requestBO);
    }
    
    async insert(requestBO) {
        
        return batchJobExecutedPersistence.insert(requestBO);
    }
    
    async delete(requestBO) {
        
        return batchJobExecutedPersistence.delete(requestBO);
    }
};

module.exports = new BatchJobExecuted();