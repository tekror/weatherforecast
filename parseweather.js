const fs = require('fs')
const xml2js = require('xml2js')
const express = require('express')
const path = require('path')

function alphaSortArray(a, b) {
  if (a.suburb < b.suburb) {
    return -1
  }
  if (a.suburb > b.suburb) {
    return 1
  }

  return 0
}

function tidyDate(date) {
  date = date.split('-', 3)
  date[2] = date[2].split('T', 1)[0]
  date = date[2] + '/' + date[1] + '/' + date[0]
  return date
}

function parseWeather() {
  let weatherArray = []

  fs.readFile('weather.txt', function(err, data) {
    const parser = new xml2js.Parser()
    let weatherArray = []

    parser.parseString(data, function (err, result) {
      result.product.forecast[0].area
        .filter((area) => {
          // let weatherData = {}
          return area.$.type === 'location'
        }).forEach((area) => {
          let weatherData = {}
          weatherData['suburb'] = area.$.description

          area['forecast-period'].forEach((period) => {
            let date = period.$['start-time-local']
            date = tidyDate(date)
            weatherData[date] = {}

            period.element
              .forEach((element) => {
                if (element && element.$['type'] === 'air_temperature_minimum') {
                  weatherData[date]['minTemp'] = element['_']
                }
                else if (element && element.$['type'] === 'air_temperature_maximum') {
                  weatherData[date]['maxTemp'] = element['_']
                }
                else if (element && element.$['type'] === 'precipitation_range') {
                  weatherData[date]['rainAmount'] = element['_']
                }
              })

            period.text
              .forEach((text) => {
                if (text && text.$['type'] === 'precis') {
                  weatherData[date]['description'] = text['_']
                }
                else if (text && text.$['type'] === 'probability_of_precipitation') {
                  weatherData[date]['rainChance'] = text['_']
                }
              })
          })

        weatherArray.push(weatherData)
      })
    })

    weatherArray.sort(alphaSortArray)

    presentWeather(weatherArray)
  })
}

function presentWeather(weatherArray) {
  const port = 8080
  const app = express()

  app.use(express.static(path.join(__dirname, 'static')))

  app.get('/weather', function (request, response) {
    response.json(weatherArray)
    console.log('get')
  })

  app.listen(port)
}

parseWeather()
