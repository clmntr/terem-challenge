let weatherDataCtrl = require('./weatherData.controller');

module.exports = ( app ) => {

    // /weatherData
    app
        .route('/api/weatherData')
        .get(weatherDataCtrl.getWeatherData)

    // /weatherData/:year
    app
        .route('/api/weatherData/:year')
        .get(weatherDataCtrl.getWeatherDataForYear)

    // /weatherData/:year/:month
    app
        .route('/api/weatherData/:year/:month')
        .get(weatherDataCtrl.getWeatherDataForMonth)


}