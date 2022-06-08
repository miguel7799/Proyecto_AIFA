const express = require('express');
const router = express.Router();
const Gates = require('../models/Gates');
const Request = require('../models/Request');
const {isAuthenticated} = require('../helpers/auth')
const nodemailer = require("nodemailer");

router.get('/request/add/:gate', isAuthenticated, (req, res) =>{
    const {gate} = req.params;
    console.log(gate)
    res.render('request/new-request', {gate});
});



router.post('/request/new-request', isAuthenticated,async (req, res) =>{
    const {gate_number, company, status, date_request} = req.body;
    console.log("a")
    const errors = []
    if(!gate_number){
        errors.push({text: 'Sleccione una puerta'});
    }
    if(!company){
        errors.push({text: 'Seleccione su Compañia'});

    } 
    if(errors.length > 0){
        res.render('request/new-request',{
            errors
        });
    }else{
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "tyler.lang46@ethereal.email", // generated ethereal user
              pass: "4XJ99jkh9zB4NytbnW", // generated ethereal password
            },
          });
    
        const mailOcptions = await transporter.sendMail({
            from: "AIFA Request Services", // sender address
            to: "abrahamgdc@hotmail.com", // list of receivers
            subject: "Reservation request", // Subject line
            text: "Your request has been received", // plain text body
        });
    
        console.log("menasje enviado", mailOcptions.messageId);
        console.log("Aqui")
        const newRequest = new Request({gate_number, company, status, date_request});
        console.log(newRequest)
        await newRequest.save();
        req.flash('success_msg', 'Request was sent successfully!');
        res.redirect('/change-status/'+ gate_number)
        //res.send('ok')
        
    }
});

router.get('/acepted/:gate_number' , isAuthenticated, async(req, res)=>{
    const { gate_number }=req.params;
    await Request.deleteOne({gate_number: gate_number});
    await Gates.findOneAndUpdate({gate_number:gate_number}, {status:"disable"});
    res.redirect('/request');
    
    
});



router.get('/declined/:gate_number' , isAuthenticated, async(req, res)=>{
    const { gate_number }=req.params;
    await Request.deleteOne({gate_number: gate_number});
    await Gates.findOneAndUpdate({gate_number:gate_number}, {status:"enable"});
    res.redirect('/request');
    
});





router.get('/request', isAuthenticated , async (req, res) => {
    // res.send('Todas las solicitudes');
    const requests = await Request.find().sort({current_date: 'desc'});
    res.render('request/all-requests', { requests });
});




module.exports = router;