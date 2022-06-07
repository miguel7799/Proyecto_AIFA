const mongoose = require('mongoose');
const {Schema} = mongoose;

const RequestSchema = new Schema({
    gate_number: {type: String, required:true},
    company: {type: String, required:true},
    current_date: {type: Date, default: Date.now},
    date_request: {type: Date, required:true}
});

module.exports = mongoose.model('Request', RequestSchema)