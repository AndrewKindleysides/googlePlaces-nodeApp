var express = require('express'),
    logger = require('morgan'),
    app = express(),
    request = require('request'),
    template = require('jade').compileFile(__dirname + '/src/templates/homepage.jade'),
    $ = require('jquery');

app.use(logger('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res, next) {
    try {
        request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBmGnTLFdIe52_IiohzA3wec5psEXyvZkk&location=53.489350,-2.241024', function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var json = JSON.parse(body);
                var list = []

                json.results.forEach(function (value) {
                    var img;
                    list.append({})



                    list += '<div id=googlePlace_' + value.name + '>' + value.name + '<div><img src="smiley.gif"height="42" width="42"></div>' + '</div>';
                });

                var html = '<div>' + list + '</div>'
                res.send(html);
            }
        });
    } catch (e) {
        next(e);
    }
})

app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
