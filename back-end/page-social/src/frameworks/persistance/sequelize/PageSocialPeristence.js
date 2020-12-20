const { Op } = require("sequelize");
const IPageSocial = require('../../../application/contracts/IPageSocial');
const ModelPageSocial = require('../../../entities/sequelize/PageSocialModel');
const PageSocialResponseBO = require('../../../entities/response/bo/PageSocialResponseBO');
const publisherPlatformEnum = require('../../../entities/enum/PublisherPlatformEnum');

class PageSocial extends IPageSocial {

    /* 
     *  Get all PageSocial
     *
     */
    async getAll(requestBO) {
    
        return new Promise((resolve, reject) => {

            let criteria = { order: [['id', 'ASC']] };
            
            if (requestBO.limit && requestBO.page)
                criteria = {
                    limit: requestBO.limit, 
                    offset: requestBO.page-1, 
                };
            
            if (requestBO.page_id_list && requestBO.page_id_list.length > 0) {

                criteria = {

                    where: {
                        id: {
                          [Op.in]: requestBO.page_id_list.map(item => item.id)
                        }
                    }
                };
            }

            ModelPageSocial.findAll(criteria).then((result) => {

                let boList = result.map((item) => {

                    item.AdsPublisherPlatform = {

                        id: publisherPlatformEnum[item.publisher_platform_id - 1].idPublisherPlatform,
                        value: publisherPlatformEnum[item.publisher_platform_id - 1].valuePublisherPlatform,
                    };
                    return new PageSocialResponseBO(item);
                });
                resolve(boList);
                
            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });
        });  
    };

    /* 
     *  Get PageSocial by id
     *
     */
    async getById(requestBO) {
        
        return new Promise((resolve, reject) => {

            let criteria = { 
                where: {
                    id: requestBO.id
                },
            };

            ModelPageSocial.findOne(criteria).then((result) => {

                if (result) {
                    
                    result.AdsPublisherPlatform = {

                        id: publisherPlatformEnum[result.publisher_platform_id - 1].idPublisherPlatform, 
                        value: publisherPlatformEnum[result.publisher_platform_id - 1].valuePublisherPlatform,
                    };
                    resolve(new PageSocialResponseBO(result));
                }
                resolve({});
                
            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });
        });
    };

    /* 
     *  Get PageSocial by page_internal_id
     *
     */
    async getByPageId(requestBO) {
        
        return new Promise((resolve, reject) => {

            let criteria = {
                where: {
                  [Op.and]: [
                    { page_internal_id: requestBO.page_internal_id },
                    { publisher_platform_id: requestBO.publisher_platform_id }
                  ]
                }
            };

            ModelPageSocial.findOne(criteria).then((result) => {

                if (result) {
                    
                    result.AdsPublisherPlatform = {

                        id: publisherPlatformEnum[result.publisher_platform_id - 1].idPublisherPlatform,
                        value: publisherPlatformEnum[result.publisher_platform_id - 1].valuePublisherPlatform,
                    };
                    resolve(new PageSocialResponseBO(result));
                }
                resolve({});

            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });
        });
    };

    /* 
     *  Insert new PageSocial
     *
     */
    async insert(requestBO) {

        return new Promise((resolve, reject) => {

            ModelPageSocial.create(requestBO).then((result) => {

                result.AdsPublisherPlatform = {

                    id: publisherPlatformEnum[result.publisher_platform_id - 1].idPublisherPlatform, 
                    value: publisherPlatformEnum[result.publisher_platform_id - 1].valuePublisherPlatform,
                };
                resolve(new PageSocialResponseBO(result));
                
            }).catch((err) => {
            
                console.error(err);
                reject(err);
            });
        });
    };
};

module.exports = new PageSocial();