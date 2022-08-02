require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./config/db/connect');
const app = express();

const errorHandler = require('./config/middlewares/error_handler');
const pageNotFound = require('./config/middlewares/not_found_page');

//********************* importing main routes *********************/
const indexRoute = require('./routes/index');

//********************* importing other packages ********************/
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimiter = require('express-rate-limit');
const xss = require('xss-clean');

//********************* security packages *********************/
// uncomment while deployment
// app.set('trust proxy', 1);
// app.use(rateLimiter({
//     windowMs: 15 * 60 * 1000, //in 15 minutes 100 max requests
//     max: 100
// }));

// app.use(cors());
// app.use(helmet());
// app.use(xss());
// app.use(mongoSanitize());

//********************* other middlewares ***********************/
app.use(morgan("tiny")); //logger

//********************* body parsing middleware ********************/
app.use(express.json())

//********************* Main routes **********************/
app.get('/', (req, res) => {
    res.send("Polling System API");
});
app.use('/api/v1', indexRoute);


//********************* Error handling and page not found route ***********************/
app.use(pageNotFound);
app.use(errorHandler);

//********************** Spinning up the server ***********************/
const PORT = process.env.PORT || 5000;
const start = async () => { 
    try {
        await connectDB(process.env.MONGO_DB_URI);
        app.listen(PORT, () => { 
            console.log(`Server is running on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();