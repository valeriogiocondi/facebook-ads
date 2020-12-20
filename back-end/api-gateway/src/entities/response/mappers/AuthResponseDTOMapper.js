const AuthResponseDTO = require("../dto/AuthResponseDTO");
const AuthResponseBO = require("../bo/AuthResponseBO");

class AuthResponseDTOMapper {

    toDTO(bo) {

        try {
            
            let converter = (bo) => {

                if (Object.keys(bo).length === 0)
                    return {};

                let obj = {
                    id: bo.id,
                    token: bo.token,
                };
                return new AuthResponseDTO(obj);
            }

            if (!Array.isArray(bo))
                return converter(bo);
            
            return bo.map((item) => {

                return converter(item);
            });
                
            } catch (err) {
                    
                console.log(err);
                throw new Error('Error occurred in AuthResponseDTOMapper.toBO(): ' + JSON.stringify(err));
            }
    }

    toBO(dto) {
        
        try {

            let converter = (dto) => {
                
            let obj = {
                    id: dto.id,
                    token: dto.token,
                };
                return new AuthResponseBO(obj);
            }

            if (!Array.isArray(dto))
                return converter(dto);

            return dto.map((item) => {

                return converter(item);
            });
                
        } catch (err) {
                
            console.log(err);
            throw new Error('Error occurred in AuthResponseDTOMapper.toBO(): ' + JSON.stringify(err));
        }
    }
}

module.exports = new AuthResponseDTOMapper();