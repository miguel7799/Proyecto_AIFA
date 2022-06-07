const express = require('express');
const router = express.Router();
const Gates = require('../models/Gates');
const Request = require('../models/Request');
const {isAuthenticated} = require('../helpers/auth')
const nodemailer = require("nodemailer");


router.get('/gates', isAuthenticated ,  async (req, res) => {
    // res.send('Todas las solicitudes');
    const gates = await Gates.find().sort({gate_number: 'asc'});
    res.render('gates/gates', { gates });
});


router.get('/change-status/:id', isAuthenticated ,async (req, res) =>{
    const {id} = req.params;
    const change = await Gates.findById(id);
    change.status = "request";
    await change.save();
    console.log(change);
    res.redirect('/request/add?gate='+ change.gate_number)
});






module.exports = router;