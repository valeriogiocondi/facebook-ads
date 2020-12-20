const IAuth = require('../../../application/contracts/IAuth');
const ModelAuth = require('../../../entities/sequelize/AuthModel');
const AuthResponseBO = require('../../../entities/response/bo/AuthResponseBO');

class AuthPeristence extends IAuth {

    async get(requestBO) {

        return new Promise((resolve, reject) => {

            let criteria = { 
                where: {
                    username: requestBO.username
                },
                order: [ [ 'date_create', 'DESC' ]]
            };

            ModelAuth.findOne(criteria).then((result) => {

                if (result)
                    resolve(new AuthResponseBO(result));
                    
                resolve({});
                
            }).catch((err) => {
            
                console.log(err);
                reject(err);
            });  
        });  
    };

    async insert(requestBO) {

        return new Promise((resolve, reject) => {

            ModelAuth.create(requestBO).then((result) => {

                resolve(result);
                
            }).catch((err) => {
            
                console.log(err);
                reject(err);
            });  
        });  
    };
};

module.exports = new AuthPeristence();