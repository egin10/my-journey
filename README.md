# my-journey
Express and Google Maps API basic

Usage :
1. clone `git clone https://github.com/egin10/my-journey.git`
2. install dependencies `cd my-journey && npm i`
3. run your mongoDB
4. edit on `config/gAPI.js` with your Google Maps API_KEY
5. uncomment `res.locals.API_KEY = require('./config/gAPI').API_KEY;` and delete `res.locals.API_KEY = require('./config/g_api').API_KEY;`
6. edit on `config/db.js` with your mongoDB URL
7. run `npm start` or `node app`
8. enjoy!

DEMO : [mapjourney](https://mapjourney.herokuapp.com/)

Explore it!
