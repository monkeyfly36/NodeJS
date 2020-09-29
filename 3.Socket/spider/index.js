const originRequest = require("request")
const cheerio = require("cheerio")  // 后端的jquery
const iconv = require("iconv-lite") // gb2312 --> utf8

function request(url, callback) {
    const options = {
        url: url,
        encoding: null
    };
    originRequest(url, options, callback);
}

for (let i = 100553; i < 100563; i++) {
    const url = `https://www.dy2018.com/i/${i}.html`;
    request(url, function (err, res, body) {
        const html = iconv.decode(body, "gb2312")
        // console.log(html)
        const $ = cheerio.load(html)
        console.log($(".title_all h1").text())
    });
}