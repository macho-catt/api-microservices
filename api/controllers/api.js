const apiRouter = require('express').Router()

apiRouter.get('/api/whoami', async(request, response) => {
  const api = {
    ipaddress: request.headers.host,
    language: request.headers['accept-language'],
    software: request.headers['user-agent']
  }

  response.json(api)
})

apiRouter.get('/api/:date', async(request, response) => {
  // Valid requests include unix format and if it's parsable via new Date(date_string)
  const dateFromRequest = request.params.date
  const regex = /[-&a-zA-Z]/
  const found = dateFromRequest.match(regex)

  if (found){
    const date = new Date(dateFromRequest)

    if (isNaN(date)){
      response.json({error: "Invalid Date"})
      response.status(304).end()
    }

    else{
      const api = {
        unix: Math.floor(date.getTime()),
        utc: date.toUTCString()
      }

      response.json(api)
    }
  }

  else{
    const milliseconds = dateFromRequest * 1
    const date = new Date(milliseconds)

    const api = {
      unix: Math.floor(date.getTime()),
      utc: date.toUTCString()
    }

    response.json(api)
  }
})

module.exports = apiRouter