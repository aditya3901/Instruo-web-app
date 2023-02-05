const Paytm = require('paytm-pg-node-sdk');

module.exports = function connectToPaytm() {
    var env = process.env.NODE_ENV === "development" ? Paytm.LibraryConstants.STAGING_ENVIRONMENT : Paytm.LibraryConstants.PRODUCTION_ENVIRONMENT;
    var mid = process.env.MERCHANT_ID;
    var key = process.env.MERCHANT_KEY;
    var website = process.env.WEBSITE;
    var client_id = process.env.CLIENT_ID;
    var callbackUrl = process.env.CALLBACK;
    Paytm.MerchantProperties.setCallbackUrl(callbackUrl);
    Paytm.MerchantProperties.initialize(env, mid, key, client_id, website);
    Paytm.MerchantProperties.setConnectionTimeout(500);
    return;
}