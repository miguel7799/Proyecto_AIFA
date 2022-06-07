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
    res.redirect('/request/add')
});

// router.post('/send-email', async (req, res) => {
    // const transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //       user: "ik3ba2rnopkcovwd@ethereal.email", // generated ethereal user
    //       pass: "K8Z7bE182sCrvHaCjM", // generated ethereal password
    //     },
    //   });

    // const mailOcptions = await transporter.sendMail({
    //     from: "AIFA Request Services", // sender address
    //     to: "miguelmaldo2398@gmail.com", // list of receivers
    //     subject: "Respuesta de Reserva de Puerta", // Subject line
    //     text: "Hello world?", // plain text body
    // });

    // console.log("menasje enviado", mailOcptions.messageId);
    // res.redirect('/gates');

    // transporter.sendMail(mailOcptions ,(error, info) =>{
    //     if(error){
    //         res.status(500).send(error.message);
    //     } else{
    //         console.log('email enviado');
    //         res.status(200).jsonp(req.body);
    //     }
    // });
// });



module.exports = router;