var express           = require('express'),
    app               = express(),
    //mailer            = require('express-mailer');
    bodyParser        = require('body-parser'),
    nodemailer        = require('nodemailer'),
    smtpTransport     = require("nodemailer-smtp-transport");
    //xoauth2 = require('xoauth2');

app.use(bodyParser());
app.get('/', function(req, res){
    res.sendfile(__dirname + '/client/index.html');
});

app.get('/send', function (req, res) {
    res.send("send");
});

// EMail configuration
/*var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "***@gmail.com",
        pass: "***"
    }
});  */  

var smtpTransport = nodemailer.createTransport(smtpTransport({
    host : "smtp.gmail.com",
    secureConnection : false,
    port: 587,
    auth : {
        user : "**@gmail.com",
        pass : "***"
    }
}));

app.post('/send', function (req, res, next) {
    console.log(req.body.name);
    
    var mailOptions = {
        from: req.body.email, // sender address
        to: '***@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: req.body.name, // plaintext body
        html: '<b>Hello world 🐴</b>' +  req.body.name+ '<br>' + req.body.email// html body
    };
    smtpTransport.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log('error' + error);
        }else{
            console.log('Message sent: ' + info.response);
        }
        //smtpTransport.close();
        //res.render("send", { success: "building web app" });
    });
});


app.listen(3000);