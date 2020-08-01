if (process.env.NODE_ENV!=='production'){
    require('dotenv').config();
} 

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;
//const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;
//const CURRENTS_API_KEY = process.env.CURRENTS_API_KEY;
const NEWSAPI_API_KEY = process.env.NEWSAPI_API_KEY;

const axios = require('axios')
const express = require('express')
const { default: Axios } = require('axios');

const app = express()

app.use(express.json());
app.use(express.static('public')); 

app.post('/weather', (req, res)=>{
    let url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=Dubai` //Hardcoded Dubai. Change this depending on your location
    
    //http://api.weatherstack.com/current?access_key=86b73ab759c123181cf42633ba1caee6&query=Dubai
    //let url = `api.openweathermap.org/data/2.5/forecast/daily?q=Dubai&cnt=AE&appid=${OPEN_WEATHER_MAP_API_KEY}`
    
    //console.log(req.body.latitude, req.body.longitude)
    axios({
        url: url,
        responseType: 'json'
    }).then(data => { 
        res.json(data.data.current); 
        //console.log(data)
    })
})

app.post('/news', (req, res)=>{
    let url = `https://newsapi.org/v2/top-headlines?language=en&country=us&apiKey=${NEWSAPI_API_KEY}`; //Hardcoded Dubai. Change this depending on your location
    
    axios({
        url: url,
        responseType: 'json'
    }).then(data => { 
        res.json(data.data); 
        console.log(data)
    })
})

app.listen(5000, ()=> {
    console.log("App running...")
})