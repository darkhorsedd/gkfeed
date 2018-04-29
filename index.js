const rp = require('request-promise');
const xml2js = require('xml2js');
const express = require('express');
const dateFormat = require('dateformat');
const feedparser = require('feedparser-promised');
const app = express();

const RSS_URL = 'http://176.31.110.217/gk/index.php';
const RSS_POLL_TIMEOUT = 15 * 60 * 1000
let dataCache = {};

app.set('port', process.env.PORT || 3000);

app.get('/', (appReq, appRes) => {
  appRes.setHeader('Content-Type', 'application/json');
  appRes.json(dataCache);
});

app.listen(app.get('port'), function() {
  console.log('RSS proxy running on port', app.get('port'));
});

function updateDataCache() {
rp(RSS_URL)
    .then(function (htmlString) {
        dataCache=JSON.parse(htmlString);
    })
    .catch(function (err) {
        // Crawling failed...
    });
}

updateDataCache();
setInterval(updateDataCache, RSS_POLL_TIMEOUT);
