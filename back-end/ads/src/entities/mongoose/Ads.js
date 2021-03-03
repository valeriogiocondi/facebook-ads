var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adsSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, auto: true},
  id: String,
  ad_creation_time: Date, 
  ad_creative_body: String, 
  ad_creative_link_caption: String, 
  ad_creative_link_description: String, 
  ad_creative_link_title: String, 
  ad_delivery_start_time: Date, 
  ad_snapshot_url: String, 
  currency: String, 
  funding_entity: String,
  page_id: String,
  page_name: String,
  impressions: {
      lower_bound: String,
      upper_bound: String
  },
  publisher_platforms: [String],
  demographic_distribution: [{ 
      percentage: String, 
      age: String, 
      gender: String 
  }],
  region_distribution: [{ 
      percentage: String, 
      region: String 
  }],
  spend: {
      lower_bound: String,
      upper_bound: String,
  },
  batch_job_id: String,
  batch_job_executed_id: String,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('data_facebook_ads', adsSchema);