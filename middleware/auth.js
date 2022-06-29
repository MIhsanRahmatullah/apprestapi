 var connection = require('../koneksi')
 var mysql = require('mysql')
 var md5 = require('md5')
 var response = require('../res')
 var jwt = require('jsonwebtoken')
 var config = require('../config/secret')
 var ip = require('ip')

 //controller untuk register
 exports.registrasi = function(res,req){
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    var query= "SELECT email FROM ?? WHERE ??"
    var table= ["user", "email", post.email]

    query = mysql.format(query,table)

    connection.query(query, function(err, rows){
        if(error){
            console.log(err)
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?"
                var table = ["user"]
                query = mysql.format(query, table)
                connection.query(query, post, function(err, rows){
                    if(error){
                        console.log(err)
                    } else{
                        response.ok('Berhasil menambahkan data user baru', res)
                    }
                })
            }else{
                response.ok('Email sudah terdaftar')
            }
        }
    })
 }