var graphql = require ('graphql').graphql;
var express = require('express');
var graphQLHTTP = require('express-graphql');
var Schema = require('./schema');
var query = 'query { todos { id, title, completed }, commodities { id, timestamp, state, district, market, commodity, variety, arrival_date, min_price, max_price, modal_price } }'
var fetch = require('whatwg-fetch');


var app = express()
    .use('/', graphQLHTTP({ schema: Schema, pretty: true, context: {fetch} }))
    .listen(8080, function (err) {
        console.log('GraphQL Server is now running on localhost:8080');
    });