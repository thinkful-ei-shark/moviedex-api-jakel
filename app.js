require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const helmet = require('helmet')
const app = express();


app.use(morgan('dev'));
app.use(cors())
app.use(helmet())

const movieData = require('./moviedex');

console.log(process.env.API_TOKEN)

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization')

    if(!authToken||authToken.split(' ')[1] !== apiToken){
        return res.status(400).json({error: 'Unauthorized request'})
    }

    console.log('validate bearer token middleware')
    debugger
    //next middleware
    next();
})
app.get('/movie', (req, res) => {
    const { genre = '', country = '', avg_vote = '' } = req.query;

    if (!genre) {
        data = [...movieData]
    }

    if (genre) {
        data = [...movieData]
        data = data.filter(item => item.genre.toLowerCase() === genre.toLowerCase());
    }

    if (country) {
        data = data.filter(item => item.country.toLowerCase() === country.toLowerCase())
    }

    if (avg_vote) {
        data = data.filter(item => Number(item.avg_vote) >= Number(avg_vote))
    }

    res.json(data)
})




app.listen(8080, () => { console.log("server is on 8080") })

