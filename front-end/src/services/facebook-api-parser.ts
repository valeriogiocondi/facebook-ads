// import FacebookAds from '../types/facebook-ads-objects/facebook-ads';  
import FacebookAds from '../_model/types/facebook-ads-objects/facebook-ads-class';  

class FacebookApiParser {

    parse(objStr: string): FacebookAds[] {

        /* 
         *  We return an array of FacebookAds, by a string (data fetch from Facebok API Service)
         *
         */

        let data = JSON.parse(objStr).data;

        /* 
         *  data is an Array of object        
         *        
         *  We convert a generic Object into a FacebookAds object
         */        
        return data.map((item: any) => {
            
            return new FacebookAds(item);
        });
    }
}


// SINGLETON
// Export an instance of the class directly
export const facebookApiParser = new FacebookApiParser();