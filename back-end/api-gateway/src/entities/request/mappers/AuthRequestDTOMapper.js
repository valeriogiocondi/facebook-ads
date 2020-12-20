const AuthRequestDTO = require("../dto/AuthRequestDTO");
const AuthRequestBO = require("../bo/AuthRequestBO");

class AuthRequestDTOMapper {

    toDTO(bo) {

        let converter = (bo) => {

            let obj = {
                id: bo.id, 
                username: bo.username,
                token: bo.token,
            };
            return new AuthRequestDTO(obj);
        }

        if (!Array.isArray(bo))
            return converter(bo);
        
        return bo.map((item) => {

            return converter(item);
        });
    }

    toBO(dto) {
        
        let converter = (dto) => {
            
           let obj = {
                id: dto.id, 
                username: dto.username,
                token: dto.token,
            };
            return new AuthRequestBO(obj);
        }

        if (!Array.isArray(dto))
            return converter(dto);

        return dto.map((item) => {

            return converter(item);
        });
    }
}

module.exports = new AuthRequestDTOMapper();