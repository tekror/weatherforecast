function getDayOfWeek(str) {
  let weekday = new Array(7)
  weekday[0] =  'Sunday'
  weekday[1] = 'Monday'
  weekday[2] = 'Tuesday'
  weekday[3] = 'Wednesday'
  weekday[4] = 'Thursday'
  weekday[5] = 'Friday'
  weekday[6] = 'Saturday'

  arr = str.split('/')
  date = new Date(arr[2] + '/' + arr[1] + '/' + arr[0])

  return currentDay = weekday[date.getDay()]
}

function htmlWeather(json, userChoice) {
  document.getElementById('weather').innerHTML = ''
  json.forEach((area) => {
    let areaDiv = document.createElement('div')
    areaDiv.className = 'area'

    if (area.suburb.toLowerCase().match(userChoice)) {
      areaDiv.innerHTML = '<h3>' + area.suburb + '</h3>'

      Object.keys(area).forEach((key) => {
          if (key != 'suburb') {
            let dayDiv = document.createElement('div')
            dayDiv.className = 'day'
            let dateDiv = document.createElement('div')
            dateDiv.className = 'date'
            dateDiv.innerHTML += '<h4>' + getDayOfWeek(key) + '</h4>'
            dateDiv.innerHTML += '<h4>' + key.toString() + '</h4>'
            dayDiv.append(dateDiv)
            let minTemp, maxTemp, rainAmount, rainChance, description

            Object.keys(area[key]).forEach((type) => {
              let data = area[key][type]

              if (type === 'minTemp') {
                minTemp = data
              }
              else if (type === 'maxTemp') {
                maxTemp = data
              }
              else if (type === 'rainAmount') {
                rainAmount = data
              }
              else if (type === 'rainChance') {
                rainChance = data
              }
              else if (type === 'description') {
                description = data
              }
            })

            let tempDiv = document.createElement('div')
            tempDiv.className = 'temp'

            if (maxTemp) {
              let maxTempDiv = document.createElement('div')
              maxTempDiv.className = 'maxTemp'
              maxTempDiv.innerHTML += maxTemp
              tempDiv.append(maxTempDiv)
            }
            else {
              let blankDiv = document.createElement('div')
              blankDiv.className = 'blankTemp'
              tempDiv.append(blankDiv)
            }

            if (minTemp) {
              let minTempDiv = document.createElement('div')
              minTempDiv.className = 'minTemp'
              minTempDiv.innerHTML += minTemp
              tempDiv.append(minTempDiv)
            }
            else {
              let blankDiv = document.createElement('div')
              blankDiv.className = 'blankTemp'
              tempDiv.append(blankDiv)
            }

            dayDiv.append(tempDiv)

            let rainDiv = document.createElement('div')
            rainDiv.className = 'rain'

            if (rainChance) {
              let rainChanceDiv = document.createElement('div')
              rainChanceDiv.className = 'rainChance'
              let rainChanceIcon = document.createElement('img')
              rainChanceIcon.src = 'rain.png'
              rainChanceDiv.append(rainChanceIcon)
              rainChanceDiv.innerHTML += ' - ' + rainChance
              rainDiv.append(rainChanceDiv)
            }
            else {
              let blankDiv = document.createElement('div')
              blankDiv.className = 'blankRain'
              rainDiv.append(blankDiv)
            }

            if (rainAmount) {
              let rainAmountDiv = document.createElement('div')
              rainAmountDiv.className = 'rainAmount'
              let rainAmountIcon = document.createElement('img')
              rainAmountIcon.src = 'rain gauge.png'
              rainAmountDiv.append(rainAmountIcon)
              rainAmountDiv.innerHTML += ' - ' + rainAmount
              rainDiv.append(rainAmountDiv)
            }
            else {
              let blankDiv = document.createElement('div')
              blankDiv.className = 'blankRain'
              rainDiv.append(blankDiv)
            }

            dayDiv.append(rainDiv)

            if (description) {
              let descriptionDiv = document.createElement('div')
              descriptionDiv.className = 'description'
              descriptionDiv.innerHTML += description
              dayDiv.append(descriptionDiv)
            }
            else {
              let blankDiv = document.createElement('div')
              blankDiv.className = 'blank'
              dayDiv.append(blankDiv)
            }

            areaDiv.append(dayDiv)
          }
        })

        document.getElementById('weather').append(areaDiv)
      }
  })
}

function presentWeather() {
  let userLoc = document.getElementById('userLoc').value.toLowerCase()
  let regexLoc = new RegExp(userLoc)

  fetch('/weather')
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      htmlWeather(json, regexLoc)
    })
}

presentWeather()
