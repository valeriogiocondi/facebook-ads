module.exports = class AuthResponseBO {

    constructor(params) {
    
        this.id = params.id;   
        this.username = params.username;   
        this.token = params.token;   
    }
};