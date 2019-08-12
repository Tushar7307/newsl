//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res)
{
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res)
{
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  console.log(firstName, lastName, email);

  var data= {
        members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
        FNAME: firstName,
        LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url:"https://us20.api.mailchimp.com/3.0/lists/a840b0b5dd",
    method:"POST",
    headers: {
    "Authorization" :"tushar1 17518a89820fa62677a6eb773d689c99-us20 "
    },
    body:jsonData
  };

  request(options, function(error, respones, body)
{
  if(error)
      {
        res.sendFile(__dirname + "/success.html");
      }
  else{
     if(respones.statusCode===200){
     res.sendFile(__dirname + "/success.html");
   }
     else{
       res.sendFile(__dirname +"/failure.html");
     }
  }
   });
});

app.post("/failure.", function(req, res)
{
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function()
{
  console.log("server is running on port 3000");
});

//Api keys
//17518a89820fa62677a6eb773d689c99-us20

//list id
//a840b0b5dd
