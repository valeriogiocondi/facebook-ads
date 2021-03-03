const serviceREST = require('../../services/serviceRest');

module.exports = {

  // console.log("OUTCOMING REST !!!");

  ads: {

    getAll: async () => {

      try {

        var options = {
          host: process.env.ADS_HOST,
          port: process.env.ADS_PORT,
          path: '/ads/',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
        return await serviceREST.request(options).then(result => {console.log(result); return result});

      } catch (error) {
        
        console.error(error)
      }
    },

    getById: async (requestDTO) => {

      try {

        var options = {
          host: process.env.ADS_HOST,
          port: process.env.ADS_PORT,
          path: `/ads/${requestDTO.id}/`,
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
        return await serviceREST.request(options).then(result => {console.log(result); return result});

      } catch (error) {
        
        console.error(error)
      }
    },
  },


  pageSocial: {

    getAll: async (requestDTO) => {
    
      try {

        requestDTO = JSON.stringify(requestDTO);

        var options = {
          host: process.env.PAGE_SOCIAL_HOST,
          port: process.env.PAGE_SOCIAL_PORT,
          path: '/page-social/',
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
            'Content-Length': requestDTO.length
          },
          body: requestDTO
        };
        return await serviceREST.request(options).then(result => result);

      } catch (error) {
        
        console.error(error)
      }
    },

    getById: async (requestDTO) => {

      try {
        
        var options = {
          host: process.env.PAGE_SOCIAL_HOST,
          port: process.env.PAGE_SOCIAL_PORT,
          path: `/page-social/${requestDTO.id}/`,
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
        return await serviceREST.request(options).then(result => result);ceREST.request(options).then(result => result);

      } catch (error) {
        
        console.error(error)
      }
    },

    getAdsBySocialPageId: async (requestDTO) => {

      try {

        var options = {
          host: process.env.PAGE_SOCIAL_HOST,
          port: process.env.PAGE_SOCIAL_PORT,
          path: `/page-social/ads/${requestDTO.internalID}/`,
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
          },
        };
        return await serviceREST.request(options).then(result => {console.log(result); return result});

      } catch (error) {
        
        console.error(error)
      }
    },

    getAdsBySocialPageIdExportCSV: async (requestDTO) => {

      try {

        var options = {
          host: process.env.PAGE_SOCIAL_HOST,
          port: process.env.PAGE_SOCIAL_PORT,
          path: `/page-social/ads/${requestDTO.pageInternalId}/export-csv/`,
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
          },
        };
        return await serviceREST.request(options).then(result => {console.log(result); return result});

      } catch (error) {
        
        console.error(error)
      }
    },
  },


  batchJob: {

    getAll: async (requestDTO) => {
    
      try {

        requestDTO = JSON.stringify(requestDTO);

        var options = {
          host: process.env.BATCH_JOB_HOST,
          port: process.env.BATCH_JOB_PORT,
          path: '/batch-job/',
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
            'Content-Length': requestDTO.length
          },
          body: requestDTO
        };
        return await serviceREST.request(options).then(result => result);

      } catch (error) {
        
        console.error(error)
      }
    },

    getAllForBatch: async (requestDTO) => {
    
      try {

        requestDTO = JSON.stringify(requestDTO);

        var options = {
          host: process.env.BATCH_JOB_HOST,
          port: process.env.BATCH_JOB_PORT,
          path: '/batch-job/batch-go/',
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
            'Content-Length': requestDTO.length
          },
          body: requestDTO
        };
        return await serviceREST.request(options).then(result => result);

      } catch (error) {
        
        console.error(error)
      }
    },

    getById: async (requestDTO) => {
    
      try {

        var options = {
          host: process.env.BATCH_JOB_HOST,
          port: process.env.BATCH_JOB_PORT,
          path: `/batch-job/${requestDTO.id}/`,
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
        return await serviceREST.request(options).then(result => result);
          
      } catch (error) {
        
        console.error(error)
      }
    },

    getAdsByBatchJobId: async (requestDTO) => {

      try {

        var options = {
          host: process.env.BATCH_JOB_HOST,
          port: process.env.BATCH_JOB_PORT,
          path: `/batch-job/ads/${requestDTO.id}/page/${requestDTO.page}/limit/${requestDTO.limit}/`,
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
          },
        };
        return await serviceREST.request(options).then(result => result);

      } catch (error) {
        
        console.error(error)
      }
    },

    getCsvAdsByBatch: async (requestDTO) => {

      try {

        var options = {
          host: process.env.BATCH_JOB_HOST,
          port: process.env.BATCH_JOB_PORT,
          path: '/batch-job/ads/' + requestDTO.batchJobId + '/export-csv/',
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
          },
        };
        return await serviceREST.request(options).then(result => {console.log(result); return result});

      } catch (error) {
        
        console.error(error)
      }
    },

    insert: async (requestDTO) => {

      try {

        requestDTO = JSON.stringify(requestDTO);
  
        var options = {
          host: process.env.BATCH_JOB_HOST,
          port: process.env.BATCH_JOB_PORT,
          path: '/batch-job/insert/',
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            'Content-Length': requestDTO.length
          },
          body: requestDTO
        };
        return await serviceREST.request(options).then(result => result);
        
      } catch (error) {
        
        console.error(error)
      }
    },

    edit: async (requestDTO) => {
    
      try {

        requestDTO = JSON.stringify(requestDTO);

        var options = {
          host: process.env.BATCH_JOB_HOST,
          port: process.env.BATCH_JOB_PORT,
          path: '/batch-job/edit/',
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json', 
            'Content-Length': requestDTO.length
          },
          body: requestDTO
        };
        return await serviceREST.request(options).then(result => result);
        
      } catch (error) {
        
        console.error(error)
      }
    },

    delete: async (requestDTO) => {
    
      try {

        requestDTO = JSON.stringify(requestDTO);

        var options = {
          host: process.env.BATCH_JOB_HOST,
          port: process.env.BATCH_JOB_PORT,
          path: '/batch-job/delete/',
          method: 'DELETE',
          headers: { 
            'Content-Type': 'application/json', 
            'Content-Length': requestDTO.length
          },
          body: requestDTO
        };
        return await serviceREST.request(options).then(result => result);

      } catch (error) {
        
        console.error(error)
      }
    }
  },

  
  batchJobExecuted: {

    getAll: async (requestDTO) => {
    
      try {

        requestDTO = JSON.stringify(requestDTO);

        var options = {
          host: process.env.BATCH_JOB_HOST,
          port: process.env.BATCH_JOB_PORT,
          path: '/batch-job-executed/',
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
            'Content-Length': requestDTO.length
          },
          body: requestDTO
        };
        return await serviceREST.request(options).then(result => result);

      } catch (error) {
        
        console.error(error)
      }
    },

    getById: async (requestDTO) => {

      var options = {
        host: process.env.BATCH_JOB_HOST,
        port: process.env.BATCH_JOB_PORT,
        path: `/batch-job-executed/${requestDTO.id}/`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      return await serviceREST.request(options).then(result => result);
    },

    getAdsByJobExecutedId: async (requestDTO) => {

      try {

        var options = {
          host: process.env.BATCH_JOB_HOST,
          port: process.env.BATCH_JOB_PORT,
          path: `/batch-job-executed/ads/${requestDTO.id}/page/${requestDTO.page}/limit/${requestDTO.limit}/`,
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
          },
        };
        return await serviceREST.request(options).then(result => result);

      } catch (error) {
        
        console.error(error)
      }
    },

    countAdsByJobExecutedId: async (requestDTO) => {

      try {

        var options = {
          host: process.env.BATCH_JOB_HOST,
          port: process.env.BATCH_JOB_PORT,
          path: `/batch-job-executed/ads/count/${requestDTO.id}/`,
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
          },
        };
        return await serviceREST.request(options).then(result => result);

      } catch (error) {
        
        console.error(error)
      }
    },
  },

  
  facebookApi: {

    getAds: async (requestDTO) => {

      try {

        requestDTO = JSON.stringify(requestDTO);

        var options = {
          host: process.env.FB_API_HOST,
          port: process.env.FB_API_PORT,
          path: '/facebook-api/get-ads/',
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json', 
            'Content-Length': requestDTO.length
          },
          body: requestDTO
        };
        return await serviceREST.request(options).then(result => result);
        
      } catch (error) {
        
        console.error(error)
      }
    },

    getActiveStatusList: async () => {

      var options = {
        host: process.env.FB_API_HOST,
        port: process.env.FB_API_PORT,
        path: '/facebook-api/active-status/',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      return await serviceREST.request(options).then(result => result);
    },

    getReachedCountriesList: async () => {

      var options = {
        host: process.env.FB_API_HOST,
        port: process.env.FB_API_PORT,
        path: '/facebook-api/reached-countries/',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      return await serviceREST.request(options).then(result => result);
    },

    getTypeList: async () => {

      var options = {
        host: process.env.FB_API_HOST,
        port: process.env.FB_API_PORT,
        path: '/facebook-api/type/',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      return await serviceREST.request(options).then(result => result);
    },

    getImpressionConditionList: async () => {

      var options = {
        host: process.env.FB_API_HOST,
        port: process.env.FB_API_PORT,
        path: '/facebook-api/impression-condition/',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      return await serviceREST.request(options).then(result => result);
    },

    getPublisherPlatformList: async () => {

      var options = {
        host: process.env.FB_API_HOST,
        port: process.env.FB_API_PORT,
        path: '/facebook-api/publisher-platform/',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      return await serviceREST.request(options).then(result => result);
    },
  }

};