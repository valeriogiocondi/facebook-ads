const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const moment = require("moment");
const ExporCsvResponseDTO = require('../entities/response/dto/ExporCsvResponseDTO');

module.exports = exportCSV = (payload) => {

    if (payload.length) {

        // TODO
        // Move into mischellanous, will be use by other Controllers

        let dirname = ""
            // + './data-csv/' 
            + '/Users/valerio/_CODING/TESI-MICROSERVICES/data-csv/batch/' 
            + payload[0].pageId
            + '/'
        ;
        let filename = ""
            + dirname
            + moment().format("YYYY-MM-DDTHH-mm-ss") 
            + '.csv' 
        ;
        
        fs.mkdir(dirname, { recursive: true }, (err) => {

            if (err) throw err;

            fs.writeFile(filename, '', function (err) {
                if (err) throw new Error();
            }); 

            /* 
             *  Formatting Data fields
             */
            ((obj) => {

                return obj.map((item, index) => {

                    item.index = index+1;
                    item.demographicDistribution = JSON.stringify(item.demographicDistribution);
                    item.regionDistribution = JSON.stringify(item.regionDistribution);
                    item.adCreationTime = moment(item.adCreationTime).format("YYYY-MM-DDTHH:mm:ss");
                    item.adDeliveryStartTime = moment(item.adDeliveryStartTime).format("YYYY-MM-DDTHH:mm:ss");
                    item.created = moment(item.created).format("YYYY-MM-DDTHH:mm:ss");
                });

            })(payload);

            const csvWriter = createCsvWriter({
                path: filename,
                header: [
                    {id: 'index', title: '#'},
                    {id: 'id', title: 'id'},
                    {id: 'adCreationTime', title: 'ad_creation_time'},
                    {id: 'adCreativeBody', title: 'ad_creative_body'},
                    {id: 'adCreativeLinkCaption', title: 'ad_creative_link_caption'},
                    {id: 'adCreativeLinkDescription', title: 'ad_creative_link_description'},
                    {id: 'adCreativeLinkTitle', title: 'ad_creative_link_title'},
                    {id: 'adDeliveryStartTime', title: 'ad_delivery_start_time'},
                    {id: 'adSnapshotUrl', title: 'ad_snapshot_url'},
                    {id: 'currency', title: 'currency'},
                    {id: 'fundingEntity', title: 'funding_entity'},
                    {id: 'impressions', title: 'impressions'},
                    {id: 'pageId', title: 'page_id'},
                    {id: 'pageName', title: 'page_name'},
                    {id: 'impressions', title: 'impressions'},
                    {id: 'publisherPlatforms', title: 'publisher_platforms'},
                    {id: 'demographicDistribution', title: 'demographic_distribution'},
                    {id: 'spend', title: 'spend'},
                    {id: 'regionDistribution', title: 'region_distribution'},
                    {id: 'created', title: 'created'},
                ]
            });
            
            csvWriter
                .writeRecords(payload)
                .then(() => console.log('The CSV file was written successfully'));

            // var file = fs.createReadStream('./public/modules/datacollectors/output.pdf');
            // var stat = fs.statSync('./public/modules/datacollectors/output.pdf');
            // res.setHeader('Content-Length', stat.size);
            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
            // file.pipe(res);
        });
        
        return new ExporCsvResponseDTO({
            code: 200,
            payload: filename
        });
    }
    return new ExporCsvResponseDTO({
        code: 404,
        payload: null
    });
};