const express = require("express");
const app= express();
const crypto= require('crypto');

let iv = crypto.randomBytes(16);
let key = '12345678123456781234567812345678';

app.get("/", (req, res) => {
    res.render("index", {
      "encrypted": "",
      "decrypted": ""
    });
  });

app.post('/encrypt', (req, res)=>{
  const text= req.body.text;
  // let hash = crypto
  //   .createHash('sha1')
  //   .update(text)
  //   .digest('hex');
  //   console.log("Hash: "+hash);

    
    //Encrypt Text
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    console.log("Encrypted: "+encrypted);
    res.render('index', {
      "encrypted": encrypted,
      "decrypted": ""
    });

})

app.post('/decrypt', (req, res)=>{

  //Decrypt text
  const dtext= req.body.dtext;
  let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(dtext, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    console.log("Decrypted: "+decrypted);
    res.render('index', {
      "encrypted": "",
      "decrypted": decrypted
    });
})


  
module.exports= app;