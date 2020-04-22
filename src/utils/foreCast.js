const request = require('request')
const foreCast = (latitude, longitude, callback) =>
{
    //url = 'http://api.weatherstack.com/current?access_key=6647c72cfc8729fa9bf634d7599d0cf3&query=' + latitude + ',' + longitude
    url = 'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon=' + longitude + '&units=metric&appid=bd4ebec8eafb6e173f7d3ceb1361619e'
    //url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + '' + '&lon=' + '' + '&appid=bd4ebec8eafb6e173f7d3ceb1361619e'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Server not found.', undefined);
        }
        else if (body.cod !==200) {
            callback('Data  not fetched.', undefined);
        }
        else {
            callback(undefined, `Currenty ${body.weather[0].main}. It is ${body.main.temp} degrees at ${body.name}.`)
        }
    })
}
module.exports = foreCast