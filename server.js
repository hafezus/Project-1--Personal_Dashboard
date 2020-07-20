const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;

const axios = require('axios')
const express = require('express')
const { default: Axios } = require('axios');

const app = express()

app.use(express.json());
app.use(express.static('public')); 

app.post('/weather', (req, res)=>{
    let url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${req.body.latitude},${req.body.longitude}`
    Axios({
        url: url,
        responseType: 'json'
    }).then(data => {res.json(data.data.current); console.log(data.data.current)} )
})

app.get('/', (req, res)=>{
    res.render('index')
})

app.listen(5000, ()=> {
    console.log("App running...")
})