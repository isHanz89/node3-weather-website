const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=ac66cc0c126030bbdd33a44c0749bbf6&units=f&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback("unable to find location!", undefined)
        }
        else {

            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out.')

            // callback(undefined, {
            //     weather: body.current.weather_descriptions[0],
            //     temperature: body.current.temperature,
            //     feelslike: body.current.feelslike
            // })
        }
    })
}


module.exports = forecast


