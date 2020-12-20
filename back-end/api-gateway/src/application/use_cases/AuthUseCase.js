const AuthPeristence = require('../../frameworks/persistance/sequelize/AuthPeristence');

class Auth {

    constructor() {

    }
    
    async get(requestBO) {
        
        return AuthPeristence.get(requestBO);
    }

    async insert(requestBO) {
        
        return AuthPeristence.insert(requestBO);
    }
};

module.exports = new Auth();