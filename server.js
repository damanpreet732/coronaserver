//express part 
const express = require('express');
const path = require('path');
const app = express();

// var port = process.env.PORT || 1234 

app.use(require('body-parser').urlencoded({extended:true}))
app.use('/static', express.static(path.join(__dirname, 'coronatracker')))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/coronatracker/index.html');
    // res.sendFile(__dirname + '/coronatracker/style.css');
    // res.sendFile(__dirname + '/coronatracker/script.js');

})
app.get('/feedbackapi',(req,res)=>{
    let sql = `select * from feedbacks` ;
    connection.query(sql,(err,rows)=>{
        res.send(JSON.stringify(rows));
    })
})

app.get('/feedbacks',(req,res)=>{
    res.sendFile(__dirname+"/coronatracker/feedbacks.html");
})

app.get('/covid-19',(req,res)=>{
    res.sendFile(__dirname+"/coronatracker/covid-19.html");
})

app.get('/aboutus',(req,res)=>{
    res.sendFile(__dirname+"/coronatracker/aboutus.html");
})

app.get('/prevention',(req,res)=>{
    res.sendFile(__dirname+"/coronatracker/prevention.html");
})

app.listen(1234,(err)=>{
    if(err) throw err ;
    console.log("Server Started")
});

//sql part 
const mysql = require('mysql2');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "rules" ,
    database : 'coronatracker',
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("SQL Connected");
});
app.post('/' , (req,res)=>{
    let fullname = "null" ;
    if(req.body.fullname != null){
        fullname = req.body.fullname ;
    }
    let phone = 0 ;
    if(req.body.phone){
        phone = req.body.phone ;
    }
    let email = "null" ;
    if(req.body.email != null){
        email = req.body.email ;
    }
    let feedback = "null" ;
    if(req.body.feedback != null){
        feedback = req.body.feedback ;
    }
    let docontact = "null" ;
    if(req.body.docontact != null){
        docontact = req.body.docontact ;
    }
    let sql = `insert into feedbacks values(
        "${fullname}",
        ${phone},
        "${email}",
        "${feedback}",
        "${docontact}"
    );`
    connection.query(sql,(err,rows)=>{
        if(err) throw err ;
        else console.log("Row Inserted");
    })
    res.sendFile(__dirname + '/coronatracker/index2.html');
    }
)