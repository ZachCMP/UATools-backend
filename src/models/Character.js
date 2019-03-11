const mongoose = require('mongoose');
const Schema = mongoose.Schema

var IdentitySchema = new Schema({
    name : String,
    type: String,
    grants: String,
    percent : Number,
    description : String,
    ofCourse : String,
    substitutes : String,
    features : [ new Schema({type: String, value: String}) ]
})

var RelationshipSchema = new Schema({
    type : String,
    percent : Number,
    target : String
})

var CharacterSchema = new Schema({
  bio : {
    firstName : String,
    lastName : String,
    middleName : String,
    nickname : String,
    streetName : String,
    name: String,
    cabal : String,
    objective : String,
    characteristics : String,
    history : String,
    obsession : String,
    passions : {
        fear : String,
        rage : String,
        noble : String
    }
  },
  madness : [ new Schema({
        type : String,
        origin : String
    })],
  meters : {
    helplessness : {
        hardened : Number,
        failed : Number
    },
    isolation : {
        hardened : Number,
        failed : Number
    },
    "self" : {
        hardened : Number,
        failed : Number
    },
    unnatural : {
        hardened : Number,
        failed : Number
    },
    violence : {
        hardened : Number,
        failed : Number
    }
  },
  identities : [ IdentitySchema ],
  relationships : [ RelationshipSchema ],
  wounds : {
        threshold : Number,
        list : [ new Schema({
            origin : String,
            amount : Number
        })]
  },
  supernatural : [ new Schema({any: Object}) ],
  inventory : [ new Schema({any:Object}) ]
})

module.exports = db => db.model('Character', CharacterSchema)
