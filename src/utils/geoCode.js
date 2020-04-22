const request = require('request')
const geoCode = (address, callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1pdC1rbXIiLCJhIjoiY2s4cmMwZHZxMDFrZTNscGVzYzJ5Mzg0aCJ9._YkIuhpMCw1TTeHKLEy-1A&limit=1'
    request({ url, json: true }, (error, {body} = {}) =>
    {    
        if (error)
        {
            callback('Server not found.', undefined);
        }
        else if (body.features.length === 0)
        {
            callback('Data  not fetched.', undefined);
        }
        else
        {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    } 
    )
}
module.exports = geoCode