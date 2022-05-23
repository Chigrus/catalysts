const https = require('https');
const zlib = require('zlib');

global.METALLS_DATA = {
    PT: 'Н/Д',
    PD: 'Н/Д',
    RH: 'Н/Д',
};

const headers = {
    "Pragma": "no-cache",
    "Cache-Control": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
    "Accept": "*/*",
    "sec-ch-ua-mobile": "?0","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
    "Origin": "https://www.kitco.com",
    "Sec-Fetch-Site": "same-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest":"empty",
    "Referer": "https://www.kitco.com/",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
};
const URL = 'https://proxy.kitco.com/getPM?symbol=PT,PD,RH&currency=RUB&unit=gram&market=1&random=0.4369541841461382';

const errorHandler = e => {
    console.error('Fetch metalls data error:', e);
    setTimeout(fetchData, 5000);
};

const getTimeUntilNextMidnight = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d - Date.now();
};

const fetchData = () => {
    https.request(URL, {headers}, res => {
        let result = '';
        res.once('error', errorHandler)
            .pipe(zlib.createUnzip())
            .once('error', errorHandler)
            .on('data', d => {
                result += d;
            })
            .once('end', () => {
                global.METALLS_DATA = result.split('\n')
                    .map(line => line.trim().split(','))
                    .reduce((acc, line) => {
                        if (line.length < 6) { return acc }
                        acc[line[0]] = line[5];
                        return acc;
                    }, {});
                setTimeout(fetchData, getTimeUntilNextMidnight());
            });
    }).once('error', errorHandler).end();
};
fetchData();