const cachedItem = {
}; //anything declared outside the event handler function is reused between invocations.
const AWS = require('aws-sdk')
exports.handler = async (event, context, callback) => {
    const ssm = new AWS.SSM();
    let data;
    if (cachedItem && cachedItem.expiresOn > Date.now()) {
    // Fetch data from cache
    data = cachedItem.value;
    console.log("isDataCached",data);
    } else{
    // Set the data in cache
     let parameter= await ssm.getParameter({
            Name: `/testing/cache`
        }).promise();
        cachedItem.value = parameter;
        cachedItem.expiresOn = Date.now() + 3600 * 1000 // expires after 1 hour
        data = parameter;
    }

    // rest of the code here, use data as parameter 
    
}
    