const { string } = require('handlebars-helpers/lib');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const GateSchema = new Schema({
    gate_number: {type: String, required:true},
    status: {type: String, required:true},
});

module.exports = mongoose.model('Gate', GateSchema)