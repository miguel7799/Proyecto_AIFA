const express = require('express');
const router = express.Router();
const Gates = require('../models/Gates');
const Request = require('../models/Request');
const {isAuthenticated} = require('../helpers/auth')
const nodemailer = require("nodemailer");

router.get('/request/add', isAuthenticated, (req, res) =>{
    res.render('request/new-request');
});



router.post('/request/new-request', isAuthenticated,async (req, res) =>{
    const {gate_number, company, status, date_request} = req.body;
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
              user: "ik3ba2rnopkcovwd@ethereal.email", // generated ethereal user
              pass: "K8Z7bE182sCrvHaCjM", // generated ethereal password
            },
          });
    
        const mailOcptions = await transporter.sendMail({
            from: "AIFA Request Services", // sender address
            to: "miguelmaldo2398@gmail.com", // list of receivers
            subject: "Solicitud de Reserva", // Subject line
            text: "SU SOLICITUD HA SIDO RECIBIDA", // plain text body
        });
    
        console.log("menasje enviado", mailOcptions.messageId);
        const newRequest = new Request({gate_number, company, status, date_request});
        console.log(newRequest)
        await newRequest.save();
        req.flash('success_msg', 'Se realizo la Peticion');
        res.redirect('/gates')
        //res.send('ok')
    }
});

router.get('/acepted/:gate_number' , isAuthenticated, async(req, res)=>{
    // const { gate_number }=req.params;
    // const change = await Gates.findById(gate_number);
    // change.status = "disable";
    // await change.save();
    // await Request.remove({gate_number: gate_number});
    // res.redirect('/request');
    const { gate_number }=req.params;
    await Request.deleteOne({_gate_number: gate_number});
    res.redirect('/request');
    
    
});



router.get('/declined/:gate_number' , isAuthenticated, async(req, res)=>{
    const { gate_number }=req.params;
    await Request.deleteOne({_gate_number: gate_number});
    // console.log(req.params.id)
    // res.send('recivido');
    res.redirect('/request');
    
});




router.get('/request', isAuthenticated , async (req, res) => {
    // res.send('Todas las solicitudes');
    const requests = await Request.find().sort({current_date: 'desc'});
    res.render('request/all-requests', { requests });
});




module.exports = router;