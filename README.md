# Weather Forecast

### A program to show the weather forecast for the various areas across Victoria
### This program uses Node.js to collect XML data and to run a web server using Express

#### To make it work, simply run getweather.js through Node in order to collect the day's weather information from the Bureau of Meteorology.
#### Unfortunately the Bureau of Meteorology only have their data accessible in XML via FTP. This can be gathered through a Node module called JS2FTP, which is built into getweather.js
#### Next, run parseweather.js through Node in order to process the XML data and pass that through to the Express server.
#### To access the data, then just head to http://localhost:8080/weather.html where it will be displayed in conjunction with displayweather.js
#### The search bar can be used to find a location's weather on demand.
