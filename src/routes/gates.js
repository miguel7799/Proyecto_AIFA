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
    // console.log(user.name)

});


router.get('/change-status/:id', isAuthenticated ,async (req, res) =>{
    const {id} = req.params;
    // console.log(id)
    const change = await Gates.findOneAndUpdate({gate_number:id}, {status:"request"});
    // change.status = "request";
    // console.log(change)
    await change.save();


    // console.log(change);
    // res.redirect('/request/add/'+change.gate_number)
    res.redirect('/gates')
});






module.exports = router;