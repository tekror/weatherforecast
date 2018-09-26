const jsftp = require('jsftp')

const ftp = new jsftp({
  host: 'ftp2.bom.gov.au',
  user: 'anonymous',
  pass: 'guest'
})

ftp.get('anon/gen/fwo/IDV10753.xml', 'weather.txt')

setTimeout(function() {
  ftp.raw('QUIT')
  ftp.destroy()
}, 5000)
