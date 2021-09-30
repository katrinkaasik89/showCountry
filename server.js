const express = require ('express');
const axios = require ('axios');
const ejs= require ('ejs');
const app = express();

app.use(express.static('public'));
app.set('view engine', ejs);
app.use(express.urlencoded({extended: true}));

//https://restcountries.eu/rest/v2/name/{name}?fullText=true 

app.get('/', (req, res)=> {
   
    res.render('show.ejs', {cInformation: '' });

});

app.post('/cinfo', (req, res)=> {
    let userCountry = req.body.country;
    const url =`https://restcountries.com/v2/name/${userCountry}`;
 
    
    

    axios.get(url)
    .then((response)=> {
      
        let detailedInfo = {
            cName: response.data[0].name,
            cDomain: response.data[0].topLevelDomain[0],
            cCode: response.data[0].callingCodes[0],
            cCapital: response.data[0].capital,
            cRegion: response.data[0].region,
            cSRegion: response.data[0].subregion,
            cPopulation: response.data[0].population,
            cTimezone: response.data[0].timezones[0],
            cLanguage: response.data[0].languages[2],
            cCurrency: response.data[0].currencies[2],
            cFlag: response.data[0].flag,

        };

       console.log(detailedInfo);
        
        

        res.render('show.ejs', {cInformation:detailedInfo});
    })
    .catch((error)=> {
        console.log(error);
    })

});
app.listen(3000, ()=> { 
    console.log('server is running on port 3000');
});
