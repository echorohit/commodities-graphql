var graphql = require('graphql');
var fetch = require('bluebird').promisify(require('request'));
var url = require('./config').url;
// Here is some dummy data to make this piece of code simpler.
// It will be changeable after introducing mutation.

var TODOs = [
    {
        "id": 1446412739542,
        "title": "Read emails",
        "completed": false
    },
    {
        "id": 1446412740883,
        "title": "Buy orange",
        "completed": true
    }
];

var TodoType = new graphql.GraphQLObjectType({
    name: 'todos',
    fields: function () {
        return {
            id: {
                type: graphql.GraphQLInt
            },
            title: {
                type: graphql.GraphQLString
            },
            completed: {
                type: graphql.GraphQLBoolean
            }
        }
    }
});

var commodityType = new graphql.GraphQLObjectType({
    name: 'commodity',
    fields: {
        id: {
            type: graphql.GraphQLInt
        },
        timestamp: {
            type: graphql.GraphQLInt
        },
        state: {
            type: graphql.GraphQLString
        },
        district: {
            type: graphql.GraphQLString
        },
        market: {
            type: graphql.GraphQLString
        },
        commodity: {
            type: graphql.GraphQLString
        },
        variety: {
            type: graphql.GraphQLString
        },
        arrival_date: {
            type: graphql.GraphQLString
        },
        min_price: {
            type: graphql.GraphQLFloat
        },
        max_price: {
            type: graphql.GraphQLFloat
        },
        modal_price: {
            type: graphql.GraphQLFloat
        }
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            todos: {
                type: new graphql.GraphQLList(TodoType),
                resolve: function () {
                    return TODOs;
                }
            },
            commodities: {
                type: new graphql.GraphQLList(commodityType),
                resolve: () => {
                    return fetch(url).then(function (res) {
                        console.log(res.body);
                        return res.body;
                    })
                }
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: queryType
});