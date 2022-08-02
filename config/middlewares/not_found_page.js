const { StatusCodes } = require('http-status-codes');
const pageNotFound = (req, res) => { 
    res.status(StatusCodes.NOT_FOUND).send(`<h1>Page Not Found</h1><br><a href="/">Back</a>`)
}
module.exports = pageNotFound;