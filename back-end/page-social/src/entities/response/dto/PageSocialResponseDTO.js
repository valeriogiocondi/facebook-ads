module.exports = class PageSocialResponseDTO {

    constructor(params) {

        this.id = params.id;
        this.internalId = params.internalId;
        this.name = params.name;
        this.publisherPlatform = {
            idPublisherPlatform: params.publisherPlatform.id,
            valuePublisherPlatform: params.publisherPlatform.value,
        };
    }
};